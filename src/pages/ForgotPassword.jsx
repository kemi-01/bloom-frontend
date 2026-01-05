






import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";



const API_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
 const [phone, setPhone] = useState("");
const [email, setEmail] = useState("");
const [showPassword, setShowPassword] = useState(false);

  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const checkPasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength("Weak – at least 6 characters.");
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setPasswordStrength("Weak – must contain a number.");
      return false;
    }
    if (!/[A-Za-z]/.test(password)) {
      setPasswordStrength("Weak – must contain a letter.");
      return false;
    }
    setPasswordStrength("Strong");
    return true;
  };

  const sendResetLink = async () => {
    if (!email) return showNotification("Enter your email", "error");

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/forgot-password/send-link`, {
       phone ,   email,
      });

      if (res.data.success) {
    showNotification(
  "Reset code sent via WhatsApp/SMS to your registered phone number. Ensure your phone is not on DND.",
  "success"
);


        setStep(2);
      } else {
        showNotification(res.data.message, "error");
      }
    } catch (err) {
      showNotification("Failed to send reset link", "error");
    } finally {
      setLoading(false);
    }
  };

  const verifyToken = async () => {
    if (!token) return showNotification("Enter token", "error");

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/forgot-password/verify-token`, { token });

      if (res.data.success) {
        showNotification("Token verified. Enter new password.", "success");
        setStep(3);
      } else {
        showNotification(res.data.message, "error");
      }
    } catch (err) {
      showNotification("Token verification failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (!checkPasswordStrength(newPassword)) {
      return showNotification("Password is too weak", "error");
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/forgot-password/reset`, {
        token,
        newPassword,
      });

      if (res.data.success) {
        showNotification("Password reset successfully! Redirecting...", "success");

        setStep(1);
        setEmail("");
        setToken("");
        setNewPassword("");

        setTimeout(() => navigate("/?openLogin=true"), 1500);
      } else {
        showNotification(res.data.message, "error");
      }
    } catch (err) {
      showNotification("Password reset failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">

        {notification && (
          <div
            className={`p-3 rounded text-sm font-semibold ${
              notification.type === "success"
                ? "bg-green-100 text-green-700"
                : notification.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {notification.message}
          </div>
        )}

        {step === 1 && (
          <>
            <h2 className="text-xl font-bold">Forgot Password</h2>
                <h2 className="text-x font-bold">(PLEASE MAKE SURE YOUR PHONE IS NOT ON DND FOR EASY ACCESS)</h2>
      <PhoneInput
  country="ng"
  value={phone}
  onChange={(value) => setPhone("+" + value)}
  inputStyle={{ width: "100%" }}
  placeholder="Enter your phone number"
/>

         <input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full border p-2 rounded mt-2"
/>

            <button
              onClick={sendResetLink}
              disabled={loading}
              className="w-full bg-purple-600 text-white p-2 rounded mt-2"
            >
              {loading ? "Sending..." : "Send SMS Code"}
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full border border-gray-400 text-gray-700 p-2 rounded mt-2"
            >
              Go Back
            </button>
          </>
        )}
<p className="text-sm text-gray-500 mt-1">
  You will receive a 6-digit code via WhatsApp/SMS on your registered phone.
</p>

        {step === 2 && (
          <>
           <h2 className="text-xl font-bold">Enter WhatsApp/SMS Code</h2>
<input
  type="text"
  placeholder="Enter the 6-digit code from your phone"
  value={token}
  onChange={(e) => setToken(e.target.value)}
  className="w-full border p-2 rounded"
/>

            <button
              onClick={verifyToken}
              disabled={loading}
              className="w-full bg-green-600 text-white p-2 rounded mt-2"
            >
              {loading ? "Verifying..." : "Verify Token"}
            </button>
          </>
        )}

        <button
  onClick={sendResetLink}
  disabled={loading}
  className="w-full border border-gray-400 text-gray-700 p-2 rounded mt-2"
>
  Resend Code
</button>


      {step === 3 && (
  <>
    <h2 className="text-xl font-bold">Reset Password</h2>
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
          checkPasswordStrength(e.target.value);
        }}
        className="w-full border p-2 rounded pr-10"
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-2 text-gray-500 cursor-pointer hover:text-purple-600"
      >
        {showPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
      </span>
    </div>
    {passwordStrength && (
      <p
        className={`text-sm ${
          passwordStrength === "Strong" ? "text-green-600" : "text-red-600"
        }`}
      >
        {passwordStrength}
      </p>
    )}

    <button
      onClick={resetPassword}
      disabled={loading}
      className="w-full bg-purple-600 text-white p-2 rounded mt-2"
    >
      {loading ? "Resetting..." : "Reset Password"}
    </button>
  </>
)}

      </div>
    </div>
  );
}
