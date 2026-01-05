


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TherapyPage() {
  const [showModal, setShowModal] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleAgreeChange = (e) => setAgreed(e.target.checked);

  const handleStartChat = () => {
    if (agreed) {
      setShowModal(false);
      navigate("/chat-therapy"); 
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-cover bg-center bg-[url('https://res.cloudinary.com/dcoojr90p/image/upload/v1764592689/peace_zlfjkw.jpg')]">
      {/* Therapy Section */}
      <div className="bg-black bg-opacity-30 p-10 rounded-xl text-center shadow-lg">
        <p className="text-white text-3xl mb-6 font-light">
          "Healing takes time, and asking for help is a courageous step."
        </p>
        <button
          onClick={handleOpenModal}
          className="px-8 py-3 bg-blue-400 hover:bg-blue-500 text-white rounded-full text-lg shadow-md transition duration-300"
        >
          We are here for you
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg w-11/12 md:w-1/2 text-center">
            <h2 className="text-2xl font-semibold mb-4">Therapy Terms</h2>
            <p className="mb-4 text-gray-700">
              Your session is <strong>anonymous</strong>. <br />
              Your information is <strong>safe</strong> with us. <br />
              Please read and agree to these terms before starting.
            </p>

            <div className="flex items-center justify-center mb-4">
              <input
                type="checkbox"
                id="agree"
                className="mr-2"
                checked={agreed}
                onChange={handleAgreeChange}
              />
              <label htmlFor="agree" className="text-gray-800">
                I agree to the therapy terms
              </label>
            </div>

            <button
              onClick={handleStartChat}
              disabled={!agreed}
              className={`px-6 py-2 rounded-full text-white transition duration-300 ${
                agreed ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Start Chat
            </button>

            <button
              onClick={handleCloseModal}
              className="mt-4 text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
