import firebase_admin
from firebase_admin import credentials, messaging
import os

try:
    if os.path.exists("firebase-service-account.json"):
        cred = credentials.Certificate("firebase-service-account.json")
        firebase_admin.initialize_app(cred)
    else:
        print("Warning: firebase-service-account.json not found. Firebase features will be disabled.")
except Exception as e:
    print(f"Warning: Failed to initialize Firebase: {e}")
