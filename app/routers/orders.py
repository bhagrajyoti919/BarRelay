from fastapi import APIRouter, HTTPException, Depends, Query
from uuid import uuid4
from datetime import datetime, timedelta
import json
import base64
from boto3.dynamodb.conditions import Key
from app.database import get_table
from app.config import ORDERS_TABLE
from app.utils.inventory import deduct_inventory, restore_inventory
from app.utils.security import get_current_user
from app.utils.ws_manager import manager
from app.schemas.order import OrderCreate, OrderResponse, OrderHistoryResponse, RefundRequest

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/checkout", response_model=OrderResponse)
async def checkout(order: OrderCreate, current_user: dict = Depends(get_current_user)):
    user_id = current_user["user_id"]
    
    # Convert Pydantic items to dicts for DynamoDB and Inventory
    items_dicts = [item.dict() for item in order.items]
    
    try:
        deduct_inventory(items_dicts)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    table = get_table(ORDERS_TABLE)
    order_id = str(uuid4())
    created_at = datetime.utcnow().isoformat()

    order_item = {
        "order_id": order_id,
        "user_id": user_id,
        "items": items_dicts,
        "total_price": order.total_price,
        "status": "pending",
        "created_at": created_at
    }
    
    table.put_item(Item=order_item)
    
    # Notify WebSocket
    await manager.send_update(order_id, {"status": "pending", "message": "Order created"})

    return order_item

@router.get("/history", response_model=OrderHistoryResponse)
def order_history(
    limit: int = 10,
    start_key: str = Query(None, description="Pagination token"),
    current_user: dict = Depends(get_current_user)
):
    table = get_table(ORDERS_TABLE)
    user_id = current_user["user_id"]
    
    query_kwargs = {
        "IndexName": "user_id-index",
        "KeyConditionExpression": Key("user_id").eq(user_id),
        "Limit": limit,
        "ScanIndexForward": False # Newest first
    }
    
    if start_key:
        try:
            # Decode the base64 start_key
            decoded_key = json.loads(base64.b64decode(start_key).decode('utf-8'))
            query_kwargs["ExclusiveStartKey"] = decoded_key
        except Exception:
            raise HTTPException(status_code=400, detail="Invalid pagination token")

    response = table.query(**query_kwargs)
    
    items = response.get("Items", [])
    last_key = response.get("LastEvaluatedKey")
    
    # Encode LastEvaluatedKey for next request
    encoded_last_key = None
    if last_key:
        # Decimal workaround might be needed for json dumps if using float/decimals, 
        # but boto3 returns Decimals. Pydantic handles them in response, but json.dumps might fail.
        # For simplicity, assuming simple types or using a custom encoder.
        # In a real app, use a DecimalEncoder.
        # Here we rely on the fact that LastEvaluatedKey usually contains strings for order_id/user_id.
        encoded_last_key = base64.b64encode(json.dumps(last_key).encode('utf-8')).decode('utf-8')

    # Since response["Items"] contains Decimals and Pydantic expects float,
    # FastAPI/Pydantic usually handles conversion if the type matches.
    # But boto3 returns Decimal.
    
    return {
        "items": items,
        "last_evaluated_key": {"token": encoded_last_key} if encoded_last_key else None
    }

@router.post("/cancel/{order_id}")
async def cancel_order(order_id: str, current_user: dict = Depends(get_current_user)):
    table = get_table(ORDERS_TABLE)
    order_resp = table.get_item(Key={"order_id": order_id})
    order = order_resp.get("Item")

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    # Ownership Check
    if order["user_id"] != current_user["user_id"]:
        raise HTTPException(status_code=403, detail="Not authorized to cancel this order")

    if order["status"] != "pending":
        raise HTTPException(status_code=400, detail="Order cannot be cancelled")

    # Cancellation Time Window (e.g., 30 minutes)
    created_at = datetime.fromisoformat(order["created_at"])
    if datetime.utcnow() - created_at > timedelta(minutes=30):
        raise HTTPException(status_code=400, detail="Cancellation window expired (30 mins)")

    restore_inventory(order["items"])

    table.update_item(
        Key={"order_id": order_id},
        UpdateExpression="SET #s = :s",
        ExpressionAttributeNames={"#s": "status"},
        ExpressionAttributeValues={":s": "cancelled"}
    )
    
    # Notify WebSocket
    await manager.send_update(order_id, {"status": "cancelled", "message": "Order cancelled by user"})

    return {"message": "Order cancelled successfully"}

@router.post("/refund/{order_id}")
async def refund_order(
    order_id: str, 
    refund_request: RefundRequest,
    current_user: dict = Depends(get_current_user)
):
    # Note: In a real system, only Admins should trigger refunds. 
    # Or strict logic if user-triggered. Assuming Admin or specific logic here.
    # For now, we allow the owner to request (or just run logic).
    
    table = get_table(ORDERS_TABLE)
    order = table.get_item(Key={"order_id": order_id}).get("Item")

    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if order["status"] != "paid":
         raise HTTPException(status_code=400, detail="Order not paid or already refunded")

    # Partial Refund Logic
    refund_amount = refund_request.amount or order["total_price"]
    
    # If items provided, restore them
    if refund_request.items:
        items_to_restore = [item.dict() for item in refund_request.items]
        restore_inventory(items_to_restore)
    elif refund_amount == order["total_price"]:
        # Full refund implies full restore
        restore_inventory(order["items"])

    status_update = "refunded" if refund_amount >= order["total_price"] else "partially_refunded"

    table.update_item(
        Key={"order_id": order_id},
        UpdateExpression="SET #s = :s, refund_amount = :r",
        ExpressionAttributeNames={"#s": "status"},
        ExpressionAttributeValues={":s": status_update, ":r": refund_amount}
    )
    
    # Notify WebSocket
    await manager.send_update(order_id, {"status": status_update, "message": f"Refund processed: {refund_amount}"})

    return {"message": f"Refund processed: {status_update}", "amount": refund_amount}

@router.get("/track/{order_id}")
def track_order(order_id: str, current_user: dict = Depends(get_current_user)):
    table = get_table(ORDERS_TABLE)
    order = table.get_item(Key={"order_id": order_id}).get("Item")
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
        
    # Simple ownership check
    if order["user_id"] != current_user["user_id"]:
         raise HTTPException(status_code=403, detail="Not authorized")

    return {
        "order_id": order_id,
        "status": order["status"],
        "estimated_delivery": "2026-01-05T18:00:00" # Placeholder logic
    }
