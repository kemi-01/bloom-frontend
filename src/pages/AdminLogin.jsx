
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AdminLogin() {
//     console.log("SERVER_URL:", import.meta.env.VITE_SERVER_URL);
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);


//     // 👇 Use your backend URL from .env file
//   const SERVER_URL = import.meta.env.VITE_SERVER_URL;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch(`${SERVER_URL}/api/admin/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       // Check if response is JSON
//       const contentType = res.headers.get("content-type");
//       let data;
//       if (contentType && contentType.includes("application/json")) {
//         data = await res.json();
//       } else {
//         const text = await res.text();
//         console.error("Expected JSON but got:", text);
//         alert("Server error: unexpected response");
//         setLoading(false);
//         return;
//       }

//       if (res.ok && data.success) {
//         localStorage.setItem("adminToken", data.token); // Store token
//         navigate("/admin-dashboard");
//       } else {
//         alert("Login failed: " + (data.message || "Unknown error"));
//       }
//     } catch (err) {
//       console.error("Network or server error:", err);
//       alert("Error logging in. Check backend server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-sm bg-white shadow-md rounded-lg p-6"
//       >
//         <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">
//           Admin Login
//         </h2>

//         <div className="mb-4">
//           <label className="block text-gray-700">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:border-purple-500"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-gray-700">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:border-purple-500"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }
