from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class OrderItem(BaseModel):
    product_id: str
    quantity: int
    price: Optional[float] = None # Capture price at time of order

class OrderCreate(BaseModel):
    items: List[OrderItem]
    total_price: float

class OrderResponse(BaseModel):
    order_id: str
    user_id: str
    items: List[OrderItem]
    total_price: float
    status: str
    created_at: str

class OrderHistoryResponse(BaseModel):
    items: List[OrderResponse]
    last_evaluated_key: Optional[dict] = None

class RefundRequest(BaseModel):
    amount: Optional[float] = None
    items: Optional[List[OrderItem]] = None
