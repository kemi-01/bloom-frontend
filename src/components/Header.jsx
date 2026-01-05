import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users/me/notifications`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
        });
        setNotifications(res.data);
        setUnreadCount(res.data.filter(n => !n.read).length);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>Bloom</h1>

      <div className="relative cursor-pointer" onClick={() => navigate("/notifications")}>
        <FaBell size={24} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-600 text-white rounded-full text-xs px-1">
            {unreadCount}
          </span>
        )}
      </div>
    </div>
  );
}
