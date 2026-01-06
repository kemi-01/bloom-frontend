








import { useState } from "react";
import { motion } from "framer-motion";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

export default function InfoUploadForm({ onInfoVerified }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    surname: "",
    username: "",
    phone: "",
    password: "",
    email: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    const { firstName, surname, username, phone, password, email } = form;

    if (!firstName || !surname || !username || !phone || !password || !email) {
      alert("Please fill all fields");
      return;
    }

     // Remove spaces from phone
  const sanitizedPhone = phone.replace(/\s+/g, "");

    setLoading(true);

    try {
    const BASE_URL = "https://api.bloomwomxn.com"; // live backend
const res = await axios.post(`${BASE_URL}/api/register`, {
  ...form,
  phone: sanitizedPhone,
});

      if (res.data.success) {
        localStorage.setItem("bloomUser", JSON.stringify(res.data.user));
        localStorage.setItem("bloomToken", res.data.token);
        onInfoVerified(res.data.user);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg bg-white/80 backdrop-blur-lg border border-purple-100 shadow-2xl rounded-3xl p-8"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center text-purple-700 mb-6"
        >
          Create Your Bloom Account
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="input-modern px-3 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            value={form.surname}
            onChange={handleChange}
            className="input-modern px-3 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="input-modern px-3 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
          />

          {/* Phone Input */}
          <div className="col-span-1 md:col-span-2">

   

            <PhoneInput
  country="ng"
  value={form.phone}
  onChange={(phone) =>
    setForm({
      ...form,
      phone: phone.startsWith("+") ? phone : "+" + phone,
    })
  }
  inputStyle={{ width: "100%" }}
  containerStyle={{ width: "100%" }}
  placeholder="Enter phone number"
/>

            <p className="text-xs text-gray-500 mt-1">
              Enter your phone number in international format no spacing  (e.g., +2348012345678)
            </p>
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="input-modern px-3 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
          />

          <div className="relative col-span-1 md:col-span-2">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="input-modern pr-10 px-3 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer hover:text-purple-600 transition"
            >
              {showPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
            </span>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-xl font-semibold transition-all shadow-md ${
            loading
              ? "bg-purple-300 text-white cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg"
          }`}
        >
          {loading ? "Submitting..." : "Submit & Continue"}
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-500 mt-4"
        >
          By continuing, you agree to our{" "}
          <span
            className="text-purple-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate("/terms")}
          >
            Terms & Conditions
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
}
