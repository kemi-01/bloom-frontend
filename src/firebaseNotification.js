import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB4ozOCuxs1mP7TkJRFIzQL8UrTjaNoYKQ",
  authDomain: "bloom-notifications.firebaseapp.com",
  projectId: "bloom-notifications",
  storageBucket: "bloom-notifications.firebasestorage.app",
  messagingSenderId: "488812714675",
  appId: "1:488812714675:web:707f372b23384ba09aeec6",
  measurementId: "G-TQK7V6NN9F"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request permission & get FCM token
export async function requestPermissionAndToken() {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;

    const token = await getToken(messaging, {
      vapidKey: "BDOgbn6ukV6r53GM-95O-swY4bDBCqyHTTqB0yJ4qEMtkw6jI-BTno4VJqE8dpJdtjYz366_taIXJz1_kClIioc"
    });
    console.log("FCM Token:", token);

    // Send token to backend
    await fetch("http://localhost:5000/api/admin/save-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });

    return token;
  } catch (err) {
    console.error("Error getting FCM token:", err);
    return null;
  }
}

// Handle foreground messages
onMessage(messaging, (payload) => {
  console.log("Message received: ", payload);

  // Play notification sound
  const audio = new Audio("/notification.mp3"); // place your ringtone in public folder
  audio.play().catch((err) => console.log("Audio play blocked:", err));

  // Show browser notification
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png"
  });
});
