from fastapi import APIRouter, HTTPException, Header, Request, Depends
from app.config import STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, ORDERS_TABLE
from app.schemas.payment import PaymentIntentRequest, PaymentIntentResponse
from app.database import get_table
from app.utils.security import get_current_user

router = APIRouter(prefix="/payments", tags=["Payments"])

@router.post("/create-intent", response_model=PaymentIntentResponse)
def create_payment_intent(
    payment_request: PaymentIntentRequest, 
    current_user: dict = Depends(get_current_user)
):
    # In a real app, call Stripe API here
    # import stripe
    # stripe.api_key = STRIPE_SECRET_KEY
    # intent = stripe.PaymentIntent.create(...)
    
    # Mock response
    return {
        "client_secret": "pi_1234567890_secret_12345",
        "payment_intent_id": "pi_1234567890"
    }

@router.post("/webhook")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None)):
    # Verify webhook signature
    payload = await request.body()
    
    # In a real app:
    # try:
    #     event = stripe.Webhook.construct_event(
    #         payload, stripe_signature, STRIPE_WEBHOOK_SECRET
    #     )
    # except Exception:
    #     raise HTTPException(status_code=400, detail="Invalid signature")

    # Mock Event Processing
    # Assume payload contains event type and order_id (metadata)
    # For simulation, let's assume the user sends a specific JSON structure for testing
    
    try:
        data = await request.json()
        event_type = data.get("type")
        
        if event_type == "payment_intent.succeeded":
            # Extract order_id from metadata
            order_id = data["data"]["object"]["metadata"].get("order_id")
            
            if order_id:
                table = get_table(ORDERS_TABLE)
                table.update_item(
                    Key={"order_id": order_id},
                    UpdateExpression="SET #s = :s",
                    ExpressionAttributeNames={"#s": "status"},
                    ExpressionAttributeValues={":s": "paid"}
                )
    except Exception:
         # Log error
         pass

    return {"status": "success"}
