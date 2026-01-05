import { useState, useEffect } from "react";

export default function PrivacyModal({ onClose }) {
  // Check localStorage immediately to prevent flash
  const [showModal, setShowModal] = useState(() => {
    return localStorage.getItem("privacyAcknowledged") !== "true";
  });

  const handleContinue = () => {
    setShowModal(false);
    localStorage.setItem("privacyAcknowledged", "true");
    if (onClose) onClose(); // optional callback to parent
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50 p-6">
      <div className="bg-white text-gray-900 max-w-md w-full p-6 rounded-xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-purple-700">Your Privacy Matters</h2>

        <p className="text-sm leading-relaxed text-gray-700">
          Bloom respects your privacy and keeps your data safe. We never sell
          your personal information. Your data is only used to improve your
          experience and keep our community safe.
        </p>

        <p className="text-sm leading-relaxed text-gray-700">
          You can learn more in our{" "}
           <a href="/privacy1" className="text-purple-600 underline">
    Privacy Policy
  </a>{" "}
          or manage your privacy preferences anytime.
        </p>

        <div className="text-right">
          <button
            onClick={handleContinue}
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg font-medium shadow-md"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
