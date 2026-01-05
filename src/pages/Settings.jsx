import React from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("bloomUser");
    navigate("/");
  };

  // Array of sweet messages for womxn
  const messages = [
    "Hello, amazing womxn! Take a deep breath and remember: your presence makes the world brighter.",
    "This is your space to pause, reflect, and shine. You’re doing beautifully.",
    "Dear womxn, you are enough, you are seen, and you deserve a little magic today.",
    "Take care of yourself here. Bloom is your corner to rest, explore, and feel empowered.",
    "Every step you take is powerful. Keep glowing, keep growing, wonderful womxn."
  ];

  // Pick a random message each render
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-2">Settings</h1>

      {/* Rotating sweet message */}
      <p className="mb-6 text-gray-300">{randomMessage}</p>

      <ul>
        <li
          className="bg-red-600 p-3 rounded cursor-pointer hover:bg-red-500 text-center"
          onClick={handleLogout}
        >
          Log Out
        </li>
      </ul>
    </div>
  );
}
