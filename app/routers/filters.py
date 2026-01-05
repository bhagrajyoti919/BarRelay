from fastapi import APIRouter
from app.database import get_table
from app.config import PRODUCTS_TABLE

router = APIRouter(prefix="/filters", tags=["Filters"])

@router.get("/category/{category}")
def filter_by_category(category: str):
    table = get_table(PRODUCTS_TABLE)
    data = table.scan()
    return [p for p in data["Items"] if p["category"] == category]

@router.get("/price")
def filter_by_price(min_price: int, max_price: int):
    table = get_table(PRODUCTS_TABLE)
    data = table.scan()
    return [p for p in data["Items"] if min_price <= p["price"] <= max_price]
