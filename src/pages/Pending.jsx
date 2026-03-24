import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SERVER_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

export default function Pending() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Load user
  useEffect(() => {
    const storedUser = localStorage.getItem("bloomUser");
    if (!storedUser) {
      navigate("/login");
      return;
    }

    const parsed = JSON.parse(storedUser);

    if (parsed.verificationStatus === "approved") {
      navigate("/home");
      return;
    }

    setUser(parsed);
  }, [navigate]);

  // Poll backend
  useEffect(() => {
    if (!user?._id) return;
    if (user.verificationStatus !== "pending") return;

    const interval = setInterval(async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${SERVER_URL}/api/users/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.headers.get("content-type")?.includes("application/json")) {
          throw new Error("API did not return JSON");
        }

        const data = await res.json();

        if (data.verificationStatus === "approved") {
          const updatedUser = {
            ...user,
            verificationStatus: "approved",
          };

          localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
          localStorage.removeItem("verificationStatus");

          clearInterval(interval);
          navigate("/home");
        }
      } catch (err) {
        console.error("Pending sync failed:", err);
        setError("Unable to sync verification status.");
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [user, navigate]);

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-600">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/20 backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-md w-full text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          Verification in Progress
        </h2>

        <p className="text-white/90 mb-6">
          Hi {user?.username || "Bloom User"}, your account is under review.
          You’ll be redirected automatically once approved or log back in later🌸
        </p>

     
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="w-12 h-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-6"
        />

        {error && <p className="text-red-200 text-sm">{error}</p>}

        <button
          onClick={() => navigate("/welcome")}
          className="mt-4 text-white underline text-sm hover:text-pink-200"
        >
          Back to Welcome
        </button>
      </motion.div>
    </div>
  );
}

