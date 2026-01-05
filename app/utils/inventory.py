from app.database import get_table
from app.config import INVENTORY_TABLE

def deduct_inventory(items):
    table = get_table(INVENTORY_TABLE)

    for item in items:
        product_id = item["product_id"]
        quantity = item["quantity"]

        record = table.get_item(Key={"product_id": product_id}).get("Item")
        if not record or record["stock"] < quantity:
            raise Exception("Insufficient stock")

        table.update_item(
            Key={"product_id": product_id},
            UpdateExpression="SET stock = stock - :q",
            ExpressionAttributeValues={":q": quantity}
        )

def restore_inventory(items):
    table = get_table(INVENTORY_TABLE)

    for item in items:
        table.update_item(
            Key={"product_id": item["product_id"]},
            UpdateExpression="SET stock = stock + :q",
            ExpressionAttributeValues={":q": item["quantity"]}
        )
