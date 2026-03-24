// import React from "react";

// export default function ChatPagetherapy() {
//   const openWhatsApp = () => {
//     window.open(
//       "https://wa.me/13137074681?text=Hello%20I%20need%20therapy%20support",
//       "_blank"
//     );
//   };

//   return (
//     <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
//       <h1 className="text-3xl font-semibold mb-4">
//       Lets just talk it out 
//       </h1>

//       <p className="text-gray-700 mb-6 text-center px-4">
//         Click below to start chatting 
//       </p>
      

//       <button
//         onClick={openWhatsApp}
//         className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition"
//       >
//         Chat on WhatsApp
//       </button>

//       <p className="text-xs text-gray-500 mt-3 text-center max-w-sm">
//   Sessions are handled directly on WhatsApp. Pricing and session structure
//   will be shared before any session begins.
// </p>

//     </div>
//   );
// }




import React from "react";
import { motion } from "framer-motion";

export default function ChatPagetherapy() {
  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-black text-white overflow-hidden px-6">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[140px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-pink-600/10 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative text-center max-w-md"
      >

        {/* Floating Icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-purple-600/20 flex items-center justify-center backdrop-blur-xl border border-white/10"
        >
          <span className="text-4xl">💬</span>
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-transparent bg-clip-text">
          Let’s Talk It Out
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
          A calm, private space where your thoughts are heard without judgment.
          <br />
          We're building something meaningful for you at Bloom 🌸
        </p>

        {/* Badge */}
        <div className="inline-block px-5 py-2 rounded-full bg-purple-600/20 text-purple-300 text-sm mb-6 border border-purple-500/30">
          Coming Soon
        </div>

        {/* Soft Message */}
        <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
          Our goal is to create a safe and trusted space with verified
          professionals where every conversation is confidential and supportive.
        </p>

      </motion.div>
    </div>
  );
}