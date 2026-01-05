from fastapi import APIRouter
from app.database import get_table
from app.config import PRODUCTS_TABLE

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/")
def list_products():
    try:
        table = get_table(PRODUCTS_TABLE)
        response = table.scan()
        return response.get("Items", [])
    except Exception as e:
        print(f"Database error (likely missing credentials): {e}")
        # Return mock data for preview purposes
        return [
            {
                "product_id": "1",
                "name": "Heineken",
                "price": 5.0,
                "description": "Premium lager beer",
                "image_url": "https://via.placeholder.com/150",
                "category": "Beer",
                "stock": 100
            },
            {
                "product_id": "2",
                "name": "Jack Daniels",
                "price": 25.0,
                "description": "Tennessee Whiskey",
                "image_url": "https://via.placeholder.com/150",
                "category": "Whiskey",
                "stock": 50
            },
            {
                "product_id": "3",
                "name": "Corona",
                "price": 4.5,
                "description": "Mexican pale lager",
                "image_url": "https://via.placeholder.com/150",
                "category": "Beer",
                "stock": 100
            }
        ]

@router.get("/{product_id}")
def get_product(product_id: str):
    table = get_table(PRODUCTS_TABLE)
    return table.get_item(Key={"product_id": product_id}).get("Item")
