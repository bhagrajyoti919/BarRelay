from fastapi import APIRouter, Depends
from app.database import get_table
from app.config import CART_TABLE
from app.utils.security import get_current_user

router = APIRouter(prefix="/cart", tags=["Cart"])

@router.post("/add")
def add_to_cart(product_id: str, quantity: int, current_user: dict = Depends(get_current_user)):
    user_id = current_user["user_id"]
    table = get_table(CART_TABLE)

    # Simplified cart logic: Overwrite or append? 
    # For now, just overwriting/adding simple structure as per previous code
    # Real logic would fetch existing cart and append.
    
    table.put_item(Item={
        "user_id": user_id,
        "items": [{
            "product_id": product_id,
            "quantity": quantity
        }]
    })
    return {"message": "Added to cart"}

@router.get("/")
def get_cart(current_user: dict = Depends(get_current_user)):
    user_id = current_user["user_id"]
    table = get_table(CART_TABLE)
    return table.get_item(Key={"user_id": user_id}).get("Item")
