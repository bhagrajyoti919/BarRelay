import os
from dotenv import load_dotenv

load_dotenv()

AWS_REGION = os.getenv("AWS_REGION", "us-east-1")
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")

USERS_TABLE = os.getenv("USERS_TABLE", "users_table")
PRODUCTS_TABLE = os.getenv("PRODUCTS_TABLE", "products_table")
CART_TABLE = os.getenv("CART_TABLE", "cart_table")
ORDERS_TABLE = os.getenv("ORDERS_TABLE", "orders_table")
INVENTORY_TABLE = os.getenv("INVENTORY_TABLE", "inventory_table")

# Security
SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key_CHANGE_ME")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

# Payment (Placeholders)
STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY", "sk_test_placeholder")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET", "whsec_placeholder")
