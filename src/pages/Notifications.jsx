
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBell,  } from "react-icons/fa";
import { io } from "socket.io-client";

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const token = localStorage.getItem("bloomToken");
  const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

  // Fetch notifications on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/users/me/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(res.data);
        setUnreadCount(res.data.filter((n) => !n.read).length);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    };
    fetchNotifications();
  }, []);

  // Socket.IO for real-time notifications
  useEffect(() => {
    const socket = io(SERVER_URL, { auth: { token } });

    socket.on("newNotification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => socket.disconnect();
  }, []);

  const handleBellClick = async () => {
    setShowDropdown((prev) => !prev);

    if (unreadCount === 0) return;

    try {
      await axios.put(`${SERVER_URL}/api/users/notifications/read-all`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all notifications as read", err);
    }
  };

  const handleNotificationClick = (notification) => {
    navigate(`/profile/${notification.user._id}`);
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button onClick={handleBellClick} className="relative text-white p-2">
        <FaBell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
          <h2 className="text-white font-bold p-3 border-b border-gray-700">Notifications</h2>
          <ul className="space-y-2 p-2">
            {notifications.length === 0 && <li className="text-gray-400">No notifications</li>}
            {notifications.map((n) => (
              <li
                key={n._id}
                onClick={() => handleNotificationClick(n)}
                className={`p-2 rounded flex items-center space-x-3 cursor-pointer transition hover:bg-blue-500 ${
                  n.read ? "bg-gray-700" : "bg-blue-600"
                }`}
              >
                <div className="w-10 h-10 flex-shrink-0">
                  {n.user?.profilePic ? (
                    <img
                      src={n.user.profilePic}
                      alt={n.user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-sm font-bold text-white">
                      {n.user?.name ? n.user.name.charAt(0).toUpperCase() : "?"}
                    </div>
                  )}
                </div>
                <span className="text-white text-sm md:text-base">{n.message}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
