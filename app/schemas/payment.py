from pydantic import BaseModel
from typing import Optional

class PaymentIntentRequest(BaseModel):
    order_id: str
    currency: str = "usd"

class PaymentIntentResponse(BaseModel):
    client_secret: str
    payment_intent_id: str
