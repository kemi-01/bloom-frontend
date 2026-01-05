import { useEffect, useState } from "react";

export default function LoginErrorPopup({ message, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Start fade out after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setVisible(false);
    }, 2500);

    // Fully close after 3 seconds
    const closeTimer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-opacity-50">
      <div
        className={`bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-lg relative transition-opacity duration-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <h2 className="text-lg font-bold mb-4 text-red-600">Login Failed</h2>
        <p className="mb-4">{message}</p>
        {message.includes("not found") && (
          <p className="text-sm text-gray-700">
            Please click <strong>"Enter Bloom"</strong> on the main page to create your account first.
          </p>
        )}
      </div>
    </div>
  );
}
