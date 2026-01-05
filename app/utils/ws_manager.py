from typing import Dict
from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, order_id: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[order_id] = websocket

    def disconnect(self, order_id: str):
        self.active_connections.pop(order_id, None)

    async def send_update(self, order_id: str, message: dict):
        if order_id in self.active_connections:
            await self.active_connections[order_id].send_json(message)

manager = ConnectionManager()
