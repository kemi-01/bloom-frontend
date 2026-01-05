




import React, { useEffect, useState } from "react";
import { FaBell, FaTimes } from "react-icons/fa";
import { io } from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HomeNotifications({ user, triggerClose }) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const token = localStorage.getItem("bloomToken");
  const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

  // Close dropdown when parent triggers
  useEffect(() => {
    if (triggerClose) setShowDropdown(false);
  }, [triggerClose]);

  // Fetch notifications
  useEffect(() => {
    if (!user) return;

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
  }, [user]);

  // Socket.IO for real-time notifications
  useEffect(() => {
    if (!user) return;

    const socket = io(SERVER_URL, { auth: { token } });

    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
      socket.emit("joinRoom", user._id);
    });

    socket.on("newNotification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => socket.disconnect();
  }, [user]);

  // Mark all as read
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
      console.error("Failed to mark notifications as read:", err);
    }
  };

  // Navigate to profile
  const handleNotificationClick = (notification) => {
    if (notification.user?._id) {
      navigate(`/profile/${notification.user._id}`);
      setShowDropdown(false);
    }
  };

  // Delete single notification
  const handleDeleteNotification = async (id) => {
    try {
      await axios.delete(`${SERVER_URL}/api/users/notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      setUnreadCount((prev) => prev - 1);
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <div className="absolute top-4 right-4 z-50">
        <button onClick={handleBellClick} className="relative text-white p-2">
          <FaBell size={24} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 mt-12 w-72 max-h-80 overflow-y-auto bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
          <h2 className="text-white font-bold p-3 border-b border-gray-700">Notifications</h2>
          <ul className="space-y-2 p-2">
            {notifications.length === 0 && (
              <li className="text-gray-400">No notifications</li>
            )}
            {notifications.map((n) => (
              <li
  key={n._id}
  className={`p-2 rounded flex items-center justify-between cursor-pointer transition hover:bg-blue-500 ${
    n.read ? "bg-gray-700" : "bg-blue-600"
  }`}
>
  <div
    className="flex items-center space-x-3 flex-1"
    onClick={() => handleNotificationClick(n)}
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
  </div>

  <button
    onClick={(e) => {
      e.stopPropagation();
      handleDeleteNotification(n._id);
    }}
    className="ml-2 text-gray-400 hover:text-red-500"
  >
    <FaTimes />
  </button>
</li>

            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
