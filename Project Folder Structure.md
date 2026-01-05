app/
 ├── main.py
 ├── database.py
 ├── config.py
 ├── routers/
 │    ├── auth.py
 │    ├── products.py
 │    ├── cart.py
 │    ├── orders.py
 │    ├── filters.py
 ├── schemas/
 │    ├── user.py
 │    ├── product.py
 │    ├── cart.py
 │    ├── order.py
 └── utils/
      ├── auth.py

Checkout
 → Inventory Deduction
 → Order Created (status = pending)
 → Payment (later)
 → Delivered

Cancel Order
 → Validate status
 → Refund
 → Inventory Restored
