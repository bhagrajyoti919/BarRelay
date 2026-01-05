import { messaging } from "../firebase";
import { getToken } from "firebase/messaging";
import API from "../api/api";

export async function registerPushToken() {
  const token = await getToken(messaging, {
    vapidKey: "YOUR_PUBLIC_VAPID_KEY"
  });

  if (token) {
    await API.post("/auth/save-fcm-token", { token });
  }
}
