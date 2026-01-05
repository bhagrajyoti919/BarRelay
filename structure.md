# 🏗️ Alcohol Delivery API - Project Structure & Frontend Guidelines

## 📂 Project Structure

```text
d:\project A+\
 ├── .env                  # Environment Variables (Credentials, Keys)
 ├── requirements.txt      # Python Dependencies
 ├── run.py                # Application Entry Point
 ├── structure.md          # Documentation (This File)
 ├── app/                  # Main Application Package
 │    ├── __init__.py
 │    ├── main.py          # FastAPI App Instance & Router Includes
 │    ├── config.py        # Configuration Loader
 │    ├── database.py      # DynamoDB Connection Helper
 │    ├── routers/         # API Route Handlers
 │    │    ├── auth.py     # Login, Signup, Token
 │    │    ├── products.py # Product Listing & Details
 │    │    ├── cart.py     # Shopping Cart Operations
 │    │    ├── orders.py   # Checkout, History, Cancellation
 │    │    ├── payments.py # Stripe Intents & Webhooks
 │    │    └── filters.py  # Product Filtering Logic
 │    ├── schemas/         # Pydantic Models (Request/Response)
 │    │    ├── auth.py
 │    │    ├── order.py
 │    │    └── payment.py
 │    └── utils/           # Helper Functions
 │         ├── inventory.py # Stock Management
 │         └── security.py  # JWT & Password Hashing
```

---

## 🚀 API Endpoints & Frontend Integration Guide

### 1. Authentication (`/auth`)
*   **POST** `/auth/signup`: Register a new user.
    *   **Frontend**: Create a generic Signup form (Email, Password, Name).
*   **POST** `/auth/token`: Login to get Access Token.
    *   **Frontend**: Login form. Store the received `access_token` in `localStorage` or a secure cookie.
    *   **Header**: Send `Authorization: Bearer <token>` for all protected requests below.

### 2. Products (`/products`)
*   **GET** `/products/`: List all products.
    *   **Frontend**: Product Grid/List. Use skeleton loaders while fetching.
*   **GET** `/products/{product_id}`: Get details of a single product.
    *   **Frontend**: Product Detail Page (Image, Description, Price, "Add to Cart" button).

### 3. Cart (`/cart`) - *Protected*
*   **GET** `/cart/`: Get current user's cart.
    *   **Frontend**: Cart Sidebar or Page. Show items, quantities, and subtotal.
*   **POST** `/cart/add`: Add item to cart.
    *   **Frontend**: Call this when "Add to Cart" is clicked. Update local cart state optimistically.

### 4. Orders (`/orders`) - *Protected*
*   **POST** `/orders/checkout`: Place an order.
    *   **Frontend**: Checkout Page. Collect address (if needed) and confirm items.
*   **GET** `/orders/history`: List past orders (Paginated).
    *   **Frontend**: "My Orders" page. Implement "Load More" button using the `last_evaluated_key`.
*   **POST** `/orders/cancel/{order_id}`: Cancel a pending order.
    *   **Frontend**: Show "Cancel" button only if status is `pending` and within 30 mins.
*   **GET** `/orders/track/{order_id}`: Track delivery status.
    *   **Frontend**: Order Status Timeline (Pending -> Paid -> Shipped -> Delivered).
*   **POST** `/orders/refund/{order_id}`: Request a refund.
    *   **Frontend**: Refund Modal. Allow selecting specific items or full amount.

### 5. Payments (`/payments`) - *Protected*
*   **POST** `/payments/create-intent`: Initialize Stripe payment.
    *   **Frontend**: Call this *before* loading the Stripe Elements form. Pass the `client_secret` to Stripe SDK.
*   **POST** `/payments/webhook`: (Backend only) Listens for Stripe events.

---

## 🎨 Frontend Design Recommendations

### **State Management**
*   **Auth State**: Keep `user` object and `isAuthenticated` boolean in a global store (Redux, Context API, Zustand).
*   **Cart State**: Sync cart with server but also keep a local copy for instant UI feedback.

### **UI Components Needed**
1.  **Navbar**: Links to Home, Products, Cart (with badge count), Profile/Login.
2.  **Product Card**: Thumbnail, Title, Price, "Add" Button.
3.  **Protected Route Wrapper**: Redirects unauthenticated users to Login page.
4.  **Toast Notifications**: For success messages ("Added to cart!") or errors ("Stock empty").

### **Flows**
*   **Checkout Flow**:
    1.  View Cart -> Click "Checkout"
    2.  POST `/orders/checkout` -> Get `order_id`
    3.  Redirect to Payment Page
    4.  POST `/payments/create-intent` -> Get `client_secret`
    5.  User enters card details -> Confirm Payment with Stripe
    6.  On success, redirect to Order Success Page (Track Order).

### **Error Handling**
*   Handle `401 Unauthorized` by redirecting to Login.
*   Handle `400 Bad Request` (e.g., "Insufficient Stock") by showing a user-friendly alert.
