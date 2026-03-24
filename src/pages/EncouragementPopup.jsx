// src/pages/EncouragementPopup.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaHeart } from "react-icons/fa";

export default function EncouragementPopup() {
  const messages = [
    "Know you are safe here ❤️",
    "Because we care 🌸",
    "Be careful how you share your personal details 💌",
    "You are valid 🌈",
    "You are seen 👀",
    "Your feelings matter 💛",
    "Take your time, no rush 🕊️",
    "It’s okay to rest 🌙",
    "You are safe here, always ❤️",
  "We see you, and we appreciate you 🌸",
  "Take your time, there’s no rush 🕊️",
  "Your privacy matters—share only what feels right 🔒",
  "You are enough, just as you are ✨",
  "It’s okay to step back and rest 🌙",
  "We care about your well-being 💜",
  "Trust your instincts, they are strong 🦋",
  "Your feelings are valid and honored 💛",
  "You deserve love, respect, and kindness 🌷",
  "It’s okay to say no, your boundaries matter 🛡️",
  "You are brave for being yourself every day 🦄",
  "Take space if you need it, it’s yours 🏞️",
  "You are not alone, we’re here with you 🤝",
  "Be gentle with yourself, always 💖",
  "Your story is important and celebrated 📖",
  "We appreciate you being here 💫",
  "Protect your heart and energy ⚡",
  "It’s okay to ask for help, that’s strength 🙋‍♀️",
  "Your journey is beautiful and unique 🌈",
  "You are allowed to shine in your own way ✨",
  "You are valued more than words can say 💌",
  "Rest, recharge, and honor yourself 🌙",
  "Your safety comes first, always 🧡",
  "It’s okay to love yourself first 💛",
  "We see the real you, and you are amazing 👀",
  "Your identity is powerful and valid 💪",
  "Feel what you feel, we accept it 💌",
  "Celebrate your uniqueness, it’s a gift 🎉",
  "You are resilient, strong, and worthy 🌻",
  "We are grateful you are here 💜",
  "Take your time, your pace is perfect 🕊️",
  "Your happiness matters as much as anyone’s 😄",
  "You can grow and change, and that’s okay 🌱",
  "Your voice deserves to be heard 🎤",
  "You are safe to be yourself here 🌸",
  "We honor your boundaries 🛡️",
  "You are loved just for being you 💖",
  "It’s okay to pause and breathe 🌬️",
  "We appreciate your courage every day 💫",
  "Your choices are yours, always 🎯",
  "Be proud of who you are 🌈",
  "You are enough, your presence matters ✨",
  "You deserve recognition and care 🌷",
  "Rest, it doesn’t make you weak 🌙",
  "You are allowed to express yourself freely 🎨",
  "We’re here to celebrate you 🎊",
  "You are beautiful inside and out 💜",
  "Your safety and well-being is our priority 🧡",
  "You are cherished and appreciated 💛",
  "Every part of you matters, don’t forget 🌸"
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  // Cycle through messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [messages.length]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="fixed right-5 bottom-6 z-40 w-80 md:w-96 bg-gradient-to-br from-purple-600/30 to-pink-500/30 text-white rounded-2xl shadow-2xl p-6 backdrop-blur-lg border border-white/20"


    >
      {/* Close button
      <button
        className="absolute top-3 right-3 text-white hover:text-gray-200 transition-colors"
        onClick={() => setIsOpen(false)}
      >
        <FaTimes />
      </button> */}

      {/* Icon accent */}
      <div className="flex justify-center mb-3">
        <FaHeart className="text-pink-200 text-2xl animate-pulse" />
      </div>

      {/* Animated message */}
      <div className="h-24 flex items-center justify-center text-center px-2">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentMessageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-lg md:text-xl font-semibold tracking-wide"
          >
            {messages[currentMessageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Optional footer */}
      <p className="mt-3 text-center text-sm text-white/80">
        JUST FOR YOU💜
      </p>
    </motion.div>
  );
}
