import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "XXX",
  authDomain: "XXX",
  projectId: "XXX",
  messagingSenderId: "XXX",
  appId: "XXX"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
