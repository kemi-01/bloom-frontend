import React, { useState } from "react";
import axios from "axios";
export default function FriendButton({
  profileUserId,
  currentUserId,
  initialFriendCount = 0,
  initialIsFriend = false,
  onFriendChange,
  onNewNotification, // <-- NEW
}) {
  const [isFriend, setIsFriend] = useState(initialIsFriend);
  const [friendCount, setFriendCount] = useState(initialFriendCount);
  const [loading, setLoading] = useState(false);

  if (profileUserId === currentUserId) return null;

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/friends/toggle`,
        { profileUserId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` } }
      );

      setIsFriend(res.data.isFriend);
      setFriendCount(res.data.friendCount);
      if (onFriendChange) onFriendChange(res.data.friendCount, res.data.isFriend);

      // Notify parent about new notification
      if (res.data.isFriend && onNewNotification) {
        onNewNotification({
          type: "friend",
          message: `${res.data.currentUsername} became your friend`,
        });
      }
    } catch (err) {
      console.error("Failed to toggle friend:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleClick}
        disabled={loading}
        className={`px-4 py-2 rounded ${
          isFriend ? "bg-green-600 text-white cursor-default" : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isFriend ? "Friends" : "Want to be Friends"}
      </button>
      <span className="text-gray-400">Friends: {friendCount}</span>
    </div>
  );
}
