from firebase_admin import messaging
from app.database import get_table
from app.config import USERS_TABLE

def send_push_notification(user_id: str, title: str, body: str):
    table = get_table(USERS_TABLE)
    user = table.get_item(Key={"user_id": user_id}).get("Item")

    if not user or "fcm_token" not in user:
        return

    message = messaging.Message(
        notification=messaging.Notification(
            title=title,
            body=body
        ),
        token=user["fcm_token"]
    )

    messaging.send(message)
