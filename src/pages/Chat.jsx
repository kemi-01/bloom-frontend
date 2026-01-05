



























































import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useLocation } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";

export default function Chat() {
  // ---------------------------
  // Core refs & config
  // ---------------------------
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const activeConversationRef = useRef(null);

  const currentUserId = localStorage.getItem("bloomUserId");
  const token = localStorage.getItem("bloomToken");
  const API_URL = import.meta.env.VITE_SERVER_URL;

  // ---------------------------
  // State
  // ---------------------------
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [unreadMessages, setUnreadMessages] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState([]);


  // ---------------------------
  // URL param (open chat from Discover)
  // ---------------------------
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const targetUserId = urlParams.get("user");

  // ---------------------------
  // Axios instance
  // ---------------------------
  const api = axios.create({
    baseURL: API_URL,
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });

  // ---------------------------
  // Utilities
  // ---------------------------
  const getOtherUser = (participants = []) => {
    const other =
      participants.find(p => String(p._id) !== String(currentUserId)) || {};
    return {
      _id: other._id || "unknown",
      name: other.name || "Unknown",
      profileImage:
        other.profileImage ||
        other.profilePics?.[0] ||
        "/default-profile.png",
    };
  };

  const normalizeConversation = conv => {
    const participants = (conv.participants || [])
      .map(p => (typeof p === "string" ? { _id: p } : p))
      .sort((a, b) => String(a._id).localeCompare(String(b._id)));

    return {
      ...conv,
      _id: String(conv._id),
      participants,
      otherUser: getOtherUser(participants),
      messages: conv.messages || [],
    };
  };

  const dedupeConversationsById = convs => {
    const map = new Map();
    convs.forEach(c => {
      const n = normalizeConversation(c);
      map.set(n._id, n);
    });
    return Array.from(map.values());
  };
const isValidObjectId = id => /^[0-9a-fA-F]{24}$/.test(id);

const ensureConversationExists = async (currentUserId, targetUserId) => {
  try {
    const user1 = String(currentUserId || "").trim();
    const user2 = String(targetUserId || "").trim(); // fix

    if (!user1 || !user2) return null;

    let res = await api.get("/api/conversations/find", { params: { user1, user2 } });
    let conv = res.data;

    if (!conv) {
      const newRes = await api.post("/api/conversations", { senderId: user1, receiverId: user2 });
      conv = newRes.data;
    }

    return conv;
  } catch (err) {
    console.error(err.response?.data || err);
    return null;
  }
};


  // ---------------------------
  // Fetch conversations
  // ---------------------------
  useEffect(() => {
    if (!currentUserId) return;

    let mounted = true;

    const fetchConversations = async () => {
      try {
        const res = await api.get(`/api/conversations/${currentUserId}`);
        const convs = Array.isArray(res.data) ? res.data : [];

        const populated = await Promise.all(
          convs.map(async conv => {
            const participants = await Promise.all(
              (conv.participants || []).map(async p => {
                if (typeof p === "string") {
                  const r = await api.get(`/api/users/${p}`);
                  return r.data;
                }
                return p;
              })
            );
            return normalizeConversation({ ...conv, participants });
          })
        );

        if (mounted) {
          setConversations(dedupeConversationsById(populated));
        }
      } catch (err) {
        console.error("Failed to fetch conversations:", err);
      }
    };

    fetchConversations();
    return () => {
      mounted = false;
    };
  }, [currentUserId]);


  useEffect(() => {
  if (!currentUserId) return;

  const fetchBlockedUsers = async () => {
    try {
      const res = await api.get(`/api/users/${currentUserId}`);
      setBlockedUsers(res.data.blockedUsers || []);
    } catch (err) {
      console.error("Failed to fetch blocked users:", err);
    }
  };

  fetchBlockedUsers();
}, [currentUserId]);


  // ---------------------------
  // Socket setup (SINGLE source of truth)
  // ---------------------------
  useEffect(() => {
    if (!currentUserId) return;

    socketRef.current = io(API_URL, {
      auth: { token },
    });

    socketRef.current.emit("addUser", currentUserId);

    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current.id);
    });

    

  socketRef.current.on("getMessage", message => {
  if (message.senderId === currentUserId) return;

      setConversations(prev => {
        const idx = prev.findIndex(
          c => String(c._id) === String(message.conversationId)
        );

        if (idx > -1) {
          const conv = prev[idx];
          const exists = conv.messages.some(
            m =>
              m._id === message._id ||
              (m.text === message.text &&
                m.senderId === message.senderId &&
                m.createdAt === message.createdAt)
          );
          if (exists) return prev;

          const updated = {
            ...conv,
            messages: [...conv.messages, message],
          };

          return dedupeConversationsById([
            ...prev.slice(0, idx),
            updated,
            ...prev.slice(idx + 1),
          ]);
        }

        const newConv = normalizeConversation({
          _id: message.conversationId,
          participants: [
            { _id: currentUserId },
            { _id: message.senderId },
          ],
          messages: [message],
        });

        return dedupeConversationsById([newConv, ...prev]);
      });

      setActiveConversation(prev => {
        if (prev && String(prev._id) === String(message.conversationId)) {
          return {
            ...prev,
            messages: [...prev.messages, message],
          };
        }
        return prev;
      });

      setUnreadMessages(prev => {
        if (
          !activeConversationRef.current ||
          String(activeConversationRef.current._id) !==
            String(message.conversationId)
        ) {
          return { ...prev, [message.conversationId]: true };
        }
        return prev;
      });
    });

    // Listen for message status updates (delivered / seen)
socketRef.current.on("updateMessageStatus", ({ messageId, status }) => {
  // Update messages in activeConversation
  setActiveConversation(prev => {
    if (!prev) return prev;

    const updatedMessages = prev.messages.map(msg =>
      msg._id === messageId ? { ...msg, status } : msg
    );

    return { ...prev, messages: updatedMessages };
  });

  // Optional: update conversation list if you display last message preview
  setConversations(prevConvs =>
    prevConvs.map(conv => {
      if (activeConversationRef.current?._id === conv._id) {
        const updatedMessages = conv.messages.map(msg =>
          msg._id === messageId ? { ...msg, status } : msg
        );
        return { ...conv, messages: updatedMessages };
      }
      return conv;
    })
  );
});


    return () => {
      socketRef.current.disconnect();
      socketRef.current = null;
    };
  }, [currentUserId]);

  // ---------------------------
  // Scroll to bottom
  // ---------------------------
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages]);

  // ---------------------------
  // Send message
  // ---------------------------
 const sendMessage = async () => {
  if (!newMessage.trim() || !activeConversation) return;

  const text = newMessage;
  setNewMessage("");

  const optimisticMessage = {
    senderId: currentUserId,
    text,
    conversationId: activeConversation._id,
    createdAt: new Date().toISOString(),
  };

  // Optimistic UI
  setActiveConversation(prev => ({
    ...prev,
    messages: [...prev.messages, optimisticMessage],
  }));

  // 🔥 REAL-TIME SOCKET EMIT
  socketRef.current.emit("sendMessage", {
    senderId: currentUserId,
    receiverId: activeConversation.otherUser._id,
    conversationId: activeConversation._id,
    text,
  });

  try {
  } catch (err) {
    console.error("Failed to send message:", err);
  }
};


  const onEmojiClick = emoji => {
    setNewMessage(prev => prev + emoji.emoji);
  };

  // ---------------------------
  // Select conversation
  // ---------------------------
  const handleSelectConversation = conv => {
    setActiveConversation(conv);
    activeConversationRef.current = conv;
    setUnreadMessages(prev => {
      const copy = { ...prev };
      delete copy[conv._id];
      return copy;
    });


  // 🔥 Emit markAsSeen to backend
  if (socketRef.current) {
    socketRef.current.emit("markAsSeen", {
      conversationId: conv._id,
      readerId: currentUserId, // the user opening the chat
    });
  }
};

  // ---------------------------
  // Open chat from Discover
  // ---------------------------
// ---------------------------
// Open chat from Discover
// ---------------------------
useEffect(() => {
  if (!targetUserId || !currentUserId) return;

  // Quick validation: basic Mongo ObjectId check (24 hex chars)
  const isValidObjectId = id => /^[0-9a-fA-F]{24}$/.test(id);
  if (!isValidObjectId(targetUserId) || !isValidObjectId(currentUserId)) {
    console.warn("Invalid user IDs for conversation:", { targetUserId, currentUserId });
    return;
  }

  const openConversation = async () => {
  try {
    let conv = await ensureConversationExists(currentUserId, targetUserId);

    if (conv) {
      // Make sure participants are full objects
      const participants = await Promise.all(
        (conv.participants || []).map(async p => {
          if (typeof p === "string") {
            const r = await api.get(`/api/users/${p}`);
            return r.data;
          }
          return p;
        })
      );

      conv = normalizeConversation({ ...conv, participants });

      setActiveConversation(conv);
      activeConversationRef.current = conv;
    }
  } catch (err) {
    console.error("Failed to open conversation:", err);
  }
};


  openConversation();
}, [targetUserId, currentUserId]);


  // ---------------------------
  // JSX
  // ---------------------------
  return (
  <div className="flex h-screen bg-[#111] text-white overflow-hidden">

    {/* Mobile Sidebar Toggle Button */}
<button
  className="sm:hidden fixed top-4 left-4 z-50 bg-gray-700 p-2 rounded-lg hover:bg-gray-600"
  onClick={() => setSidebarOpen(prev => !prev)}
>
  ☰
</button>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden" onClick={() => setSidebarOpen(false)}></div>}


      {/* Sidebar */}
      {/* Sidebar */}
<div
  className={`fixed top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-700 p-4 overflow-y-auto transform transition-transform duration-300 z-50
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
  sm:translate-x-0 sm:static sm:translate-x-0`}
>
  <h2 className="text-xl mb-4 flex items-center justify-between">
    Chats
    <button
      className="sm:hidden bg-gray-700 p-1 rounded hover:bg-gray-600"
      onClick={() => setSidebarOpen(false)}
    >
      ✕
    </button>
  </h2>

        {conversations
          .slice()
          .sort((a, b) => new Date(b.messages?.[b.messages.length - 1]?.createdAt || 0) - new Date(a.messages?.[a.messages.length - 1]?.createdAt || 0))
          .map(conv => (
            <div
              key={conv._id}
              className={`flex items-center gap-2 p-2 mb-2 rounded-lg cursor-pointer ${activeConversation?._id === conv._id ? "bg-purple-600" : "bg-gray-800 hover:bg-gray-700"}`}
              onClick={() => { handleSelectConversation(conv); setSidebarOpen(false); }}
            >
              <img src={conv.otherUser?.profileImage || "/default-profile.png"} alt={conv.otherUser?.name || "User"} className="w-10 h-10 rounded-full"/>
              <div>
                <p className="font-bold flex items-center gap-2">
                  {conv.otherUser?.name || "Unknown"}
                  {unreadMessages[conv._id] && <span className="w-2 h-2 bg-red-500 rounded-full inline-block"></span>}
                </p>
                <p className="text-sm text-gray-400">{conv.messages?.[conv.messages.length - 1]?.text || "No messages yet"}</p>
              </div>
            </div>
          ))}
      </div>

      {/* Chat Area */}
      {activeConversation ? (
        <div className="flex flex-1 flex-col h-full relative z-0">
          {/* Top Bar / Header */}
        <div className="flex items-center justify-between p-3 bg-gray-800 mb-2 sticky top-0 z-10 rounded-t-xl">
          <div className="flex items-center gap-2">

            <div className="flex items-center gap-2 ml-2 sm:ml-0">
              <img src={activeConversation.otherUser?.profileImage || "/default-profile.png"} alt={activeConversation.otherUser?.name || "User"} className="w-10 h-10 rounded-full"/>
              <span className="font-bold">{activeConversation.otherUser?.name || "Unknown"}</span>
             </div>

           
  {/* BLOCK BUTTON */}
   <div>
  <button
    className="ml-4 bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 text-sm"
    onClick={async () => {
      const userId = activeConversation.otherUser._id;
      const block = !blockedUsers.includes(userId);
      try {
        const res = await api.post(`/api/conversations/block/${userId}`, { block });
        setBlockedUsers(res.data.blockedUsers);
      } catch (err) {
        console.error("Block/unblock failed:", err);
      }
    }}
  >
    {blockedUsers.includes(activeConversation.otherUser?._id) ? "Unblock" : "Block"}
  </button>
            </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3">
          {(activeConversation.messages || []).map((msg, idx) => (
  <div key={msg._id || idx} className={`my-2 max-w-[70%] p-2 rounded-xl break-words ${String(msg.senderId) === String(currentUserId) ? "bg-purple-600 ml-auto" : "bg-gray-800"}`}>
    {msg.text || (msg.audioUrl && <audio controls src={msg.audioUrl} />) || null}

    {/* Message status for outgoing messages */}
    {String(msg.senderId) === String(currentUserId) && (
      <span className="text-xs text-gray-300 ml-auto block mt-1 text-right">
        {msg.status || "sent"}
      </span>
    )}
  </div>
))}

            <div ref={messagesEndRef}></div>
          </div>

          {/* Input */}
          <div className="flex-shrink-0 p-3 bg-gray-900 border-t border-gray-700 relative">
            {showEmojiPicker && <div className="absolute bottom-20 left-2 z-50"><EmojiPicker onEmojiClick={onEmojiClick} /></div>}
            <div className="flex gap-2 items-center">
              <button className="bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-700" onClick={() => setShowEmojiPicker(prev => !prev)}>😊</button>
              <input type="text" placeholder="Type a message..." className="flex-1 bg-gray-800 px-4 py-2 rounded-l-xl outline-none" value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()}/>
              <button className="bg-purple-600 px-4 py-2 rounded-r-xl hover:bg-purple-700" onClick={sendMessage} disabled={!newMessage.trim()}>Send</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">Select a conversation to start chatting</div>
      )}
    </div>
  );
}



























































