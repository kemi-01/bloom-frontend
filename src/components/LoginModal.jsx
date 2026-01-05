








import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineClose, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import LoginErrorPopup from "./LoginErrorPopup";

export default function LoginModal({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

  // NEW: centralized close handler
  const handleClose = () => {
    if (onClose) onClose(); // call parent if passed
    else navigate("/");      // fallback to home
  };

 const handleLogin = async () => {
  if (!username || !password) {
    setErrorMessage("Please enter both username and password.");
    return;
  }

  setLoading(true);
  try {
    const response = await axios.post(`${API_URL}/api/login`, { username, password });

    if (response.data.success) {
      const user = response.data.user;

      // Store full user object
      localStorage.setItem("bloomUser", JSON.stringify(user));

      // Store just the user ID for quick access
      localStorage.setItem("bloomUserId", user._id);

      // Store token
      localStorage.setItem("bloomToken", response.data.token);

      handleClose();        // Close modal or fallback
      navigate("/welcome");  // Go to welcome page
    } else {
      setErrorMessage("Account not found. Create an account first.");
    }
  } catch (err) {
    setErrorMessage(err.response?.data?.message || "Login failed");
    console.error(err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-lg relative">
          {/* Close Button */}
          <button
            onClick={handleClose}  // <-- use handleClose here too
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            <AiOutlineClose size={20} />
          </button>

          <h2 className="text-xl font-bold mb-4">Login to Bloom</h2>

          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-3 p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />

          {/* Password Input */}
          <div className="relative w-full mb-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 pr-10 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              aria-label="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-purple-700 disabled:opacity-60 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition mb-2 w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Forgot Password */}
          <p
            className="mt-2 text-sm text-purple-700 cursor-pointer hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </p>
        </div>
      </div>

      {/* Error Popup */}
      {errorMessage && (
        <LoginErrorPopup message={errorMessage} onClose={() => setErrorMessage("")} />
      )}
    </>
  );
}




























