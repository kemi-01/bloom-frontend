import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LeftPinnedPopup = ({ users }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [availableUsers, setAvailableUsers] = useState([]);

  // Keep updating availableUsers when new users come in
  useEffect(() => {
    if (users.length > 0) {
      setAvailableUsers(users);
    }
  }, [users]);

  useEffect(() => {
    let timer;

    const showNextUser = () => {
      if (availableUsers.length === 0) return;

      // Pick a random user from the list
      const randomIndex = Math.floor(Math.random() * availableUsers.length);
      setCurrentUser(availableUsers[randomIndex]);

      // Random display time between 0.8s and 1.5s
      const displayTime = Math.random() * 700 + 800;

      timer = setTimeout(() => {
        setCurrentUser(null);
        // Random short delay before showing next
        const nextDelay = Math.random() * 500 + 300; // 0.3s – 0.8s
        timer = setTimeout(showNextUser, nextDelay);
      }, displayTime);
    };

    showNextUser();

    return () => clearTimeout(timer);
  }, [availableUsers]);

  if (!currentUser) return null;

  return (
    <div className="fixed left-4 top-1/3 z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentUser.name + Date.now()} // ensures re-render each time
          initial={{ opacity: 0, x: -30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          <motion.div
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-purple-600 font-bold mr-3"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {currentUser.avatar || currentUser.name.charAt(0).toUpperCase()}
          </motion.div>
          <span className="font-medium">{currentUser.name} just joined Bloom</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LeftPinnedPopup;
