import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

export default function Privacy({ onClose }) {
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // Fetch current privacy setting
  useEffect(() => {
    const fetchPrivacy = async () => {
      try {
        const { data } = await axios.get("/api/users/privacy", {
          withCredentials: true,
        });
        setIsPrivate(data.isPrivate);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch privacy settings. Are you logged in?");
      } finally {
        setLoading(false);
      }
    };
    fetchPrivacy();
  }, []);

  const handleToggle = async () => {
    setUpdating(true);
    const newValue = !isPrivate;
    setIsPrivate(newValue); // optimistic update
    setError("");

    try {
      await axios.put(
        "/api/users/privacy",
        { isPrivate: newValue },
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
      setIsPrivate(!newValue); // rollback
      setError("Failed to update privacy. Try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (!onClose) onClose = () => {}; // fallback if not provided
  if (loading)
    return (
      <p className="p-6 text-gray-700">Loading privacy settings...</p>
    );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start p-6 overflow-auto z-50">
      <div className="bg-red-800 p-6 rounded shadow max-w-2xl w-full relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
          onClick={onClose}
          aria-label="Close privacy panel"
        >
          <FaTimes size={20} />
        </button>

        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

        {/* Private Account Toggle */}
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded shadow mb-4">
          <div>
            <h2 className="font-semibold text-lg text-black">Private Account</h2>
            <p className="text-red-400 text-sm">
              Only users who are your friends can see your profile and posts.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isPrivate}
              onChange={handleToggle}
              disabled={updating}
              aria-label="Toggle private account"
            />
            <div
              className={`w-11 h-6 bg-gray-400 rounded-full peer-checked:bg-pink-600 transition ${
                updating ? "opacity-50" : ""
              }`}
            />
            <span className="ml-3 text-sm font-medium text-gray-900">
              {isPrivate ? "Private" : "Public"}
            </span>
          </label>
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {/* Full Privacy Text */}
        <div className="max-h-[60vh] overflow-y-scroll space-y-4">
          <h2 className="text-xl font-semibold mb-2">
            Bloom Privacy for Womxn
          </h2>

          <section>
            <h3 className="font-semibold">Data We Collect</h3>
            <p className="text-black text-sm leading-relaxed">
              Bloom collects only essential information to provide our
              services. This includes name, username, email, and posts.
            </p>
          </section>

          <section>
            <h3 className="font-semibold">How We Use Data</h3>
            <p className="text-black text-sm leading-relaxed">
              Data is used to improve user experience, connect friends, and
              provide privacy-protected interactions.
            </p>
          </section>

          <section>
            <h3 className="font-semibold">Sharing Data</h3>
            <p className="text-black text-sm leading-relaxed">
              We never share your personal information without consent.
              Private accounts hide posts from non-friends.
            </p>
          </section>

          <section>
            <h3 className="font-semibold">Security Measures</h3>
            <p className="text-black text-sm leading-relaxed">
              We implement encryption, secure storage, and other best
              practices to keep your data safe.
            </p>
          </section>

          <section>
            <h3 className="font-semibold">Your Rights</h3>
            <p className="text-black text-sm leading-relaxed">
              You can toggle private/public anytime. You can request deletion
              of your data via support.
            </p>
          </section>

          <p className="text-black text-sm mt-4">
            Full privacy policy is available on request or via our downloadable
            PDF.
          </p>
        </div>
      </div>
    </div>
  );
}
