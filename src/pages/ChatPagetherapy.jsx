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

export default function ChatPagetherapy() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0f0f] via-[#141414] to-[#1a1a1a] text-white px-6">
      
      <div className="text-center max-w-md animate-fade-in">

        {/* Icon / Soft visual */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-purple-600/20 flex items-center justify-center">
          <span className="text-3xl">💬</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold mb-3">
          Let’s Talk It Out
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-sm leading-relaxed mb-6">
          A safe, private space where you can express yourself freely.
          <br />
          Therapy chat support is coming soon to Bloom 🌸
        </p>

        {/* Coming Soon Badge */}
        <div className="inline-block px-4 py-2 rounded-full bg-purple-600/20 text-purple-300 text-sm mb-6">
          COMING SOON
        </div>

        {/* Optional soft note */}
        <p className="text-xs text-gray-500 leading-relaxed">
          We are currently preparing trusted support partners to ensure
          safe and confidential conversations.
        </p>

      </div>
    </div>
  );
}