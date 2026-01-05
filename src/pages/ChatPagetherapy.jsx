import React from "react";

export default function ChatPagetherapy() {
  const openWhatsApp = () => {
    window.open(
      "https://wa.me/13137074681?text=Hello%20I%20need%20therapy%20support",
      "_blank"
    );
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">
      Lets just talk it out 
      </h1>

      <p className="text-gray-700 mb-6 text-center px-4">
        Click below to start chatting 
      </p>
      

      <button
        onClick={openWhatsApp}
        className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition"
      >
        Chat on WhatsApp
      </button>

      <p className="text-xs text-gray-500 mt-3 text-center max-w-sm">
  Sessions are handled directly on WhatsApp. Pricing and session structure
  will be shared before any session begins.
</p>

    </div>
  );
}
