


// import React, { useEffect } from "react";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { FaHome, FaCommentAlt, FaHeart, FaCog, FaUser } from "react-icons/fa";
// import axios from "axios";

// export default function Layout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get the logged-in user safely
//   const storedUser = localStorage.getItem("bloomUser");
//   const user = storedUser ? JSON.parse(storedUser) : null;

//   // Persistent bottom menu items
//   const menuItems = [
//     { icon: <FaHome />, path: "/home" },
//     { icon: <FaCommentAlt />, path: "/chat" },
//     { icon: <FaHeart />, path: "/discover" },
//     { icon: <FaCog />, path: "/settings" },
//   ];

//   if (user) {
//     menuItems.push({ icon: <FaUser />, path: `/profile/${user._id}` });
//   }

//   // JWT + bloomAccess check
//   useEffect(() => {
//     const token = localStorage.getItem("bloomToken");
//     if (!token || !user) {
//       // Not logged in
//       navigate("/");
//       return;
//     }

//     // Optional: verify token + user data with backend
//     axios
//       .get(`${import.meta.env.VITE_SERVER_URL}/api/home-data`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then(res => {
//         const backendUser = res.data.user;

//         // If user doesn't have bloomAccess, redirect to payment/welcome
//         if (!backendUser.bloomAccess) {
//           navigate("/payment"); // or wherever you handle access
//         }
//       })
//       .catch(() => {
//         // Invalid token
//         localStorage.removeItem("bloomToken");
//         localStorage.removeItem("bloomUser");
//         navigate("/"); 
//       });
//   }, [navigate, user]);

//   return (
//     <div className="relative min-h-screen">
//       {/* Page content */}
//       <Outlet />

//       {/* Persistent Bottom Navigation */}
//       <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full flex items-center justify-between gap-12 z-50 w-3/4 md:w-1/2">
//         {menuItems.map((item, index) => (
//           <div
//             key={index}
//             className={`text-xl md:text-2xl cursor-pointer ${
//               location.pathname === item.path || 
//               (item.path.startsWith("/profile") && location.pathname.startsWith("/profile"))
//                 ? "text-purple-700"
//                 : "text-white"
//             }`}
//             onClick={() => navigate(item.path)}
//           >
//             {item.icon}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




















import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaCommentAlt, FaHeart, FaCog, FaUser } from "react-icons/fa";
import axios from "axios";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the logged-in user safely
  const storedUser = localStorage.getItem("bloomUser");
  const user = storedUser ? JSON.parse(storedUser) : null;
const hasAccess = user?.bloomAccess === true;

  // Persistent bottom menu items
  const menuItems = [
    { icon: <FaHome />, path: "/home" },
    { icon: <FaCommentAlt />, path: "/chat" },
    { icon: <FaHeart />, path: "/discover" },
    { icon: <FaCog />, path: "/settings" },
  ];

  if (user) {
    menuItems.push({ icon: <FaUser />, path: `/profile/${user._id}` });
  }

  // JWT + bloomAccess check
  useEffect(() => {
    const token = localStorage.getItem("bloomToken");
    if (!token || !user) {
      // Not logged in
      navigate("/");
      return;
    }

    // Optional: verify token + user data with backend
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/home-data`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        const backendUser = res.data.user;

       
      })
      .catch(() => {
        // Invalid token
        localStorage.removeItem("bloomToken");
        localStorage.removeItem("bloomUser");
        navigate("/"); 
      });
  }, [navigate, user]);



  

  return (
    <div className="relative min-h-screen">
      {/* Page content */}
      <Outlet />

      {/* Persistent Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full flex items-center justify-between gap-12 z-50 w-3/4 md:w-1/2">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`text-xl md:text-2xl cursor-pointer ${
              location.pathname === item.path || 
              (item.path.startsWith("/profile") && location.pathname.startsWith("/profile"))
                ? "text-purple-700"
                : "text-white"
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
}
