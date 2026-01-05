// src/pages/Conversations.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Conversations() {
  const [conversations, setConversations] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("bloomUserId");
  const API_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await axios.get(`${API_URL}/api/conversations/${currentUserId}`);
      setConversations(res.data);
    };
    fetchConversations();
  }, []);

  return (
    <div className="min-h-screen bg-[#111] text-white p-4">
      <h2 className="text-2xl mb-4">Chats</h2>
      {conversations.map((conv) => {
        const otherUser = conv.participants.find((u) => u._id !== currentUserId);
        return (
          <div
            key={conv._id}
            className="flex items-center justify-between p-2 mb-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
          onClick={() => navigate(`/chat?user=${otherUser._id}`)}

          >
            <div>
              <p className="font-bold">{otherUser.name}</p>
              <p className="text-sm text-gray-400">
                {conv.messages[conv.messages.length - 1]?.text || "No messages yet"}
              </p>
            </div>
            <div>
              {onlineUsers.includes(otherUser._id) ? (
                <span className="w-3 h-3 rounded-full bg-green-500 block"></span>
              ) : (
                <span className="w-3 h-3 rounded-full bg-gray-500 block"></span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
