from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.utils.ws_manager import manager

router = APIRouter()

@router.websocket("/ws/orders/{order_id}")
async def order_status_ws(websocket: WebSocket, order_id: str):
    await manager.connect(order_id, websocket)

    try:
        while True:
            await websocket.receive_text()  # keep alive
    except WebSocketDisconnect:
        manager.disconnect(order_id)
