
// import React, { useState, useEffect } from "react"; 
// import { motion } from "framer-motion";
// import { FaBell, FaChevronDown, FaChevronUp } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import EncouragementPopup from "../pages/EncouragementPopup";


// import LoginModal from "../components/LoginModal";
// import HomeNotifications from "../components/HomeNotifications"; 

// export default function Home() {
//   const bloomText = "BLOOM";
//   const navigate = useNavigate();

//   const [showLogin, setShowLogin] = useState(false);
//   const [user, setUser] = useState(null);
//   const [closeNotifications, setCloseNotifications] = useState(false);
//   const [showPages, setShowPages] = useState(false); // New state for dropdown
// const hasAccess = user?.bloomAccess === true;

//   // Load user on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem("bloomUser");
//     if (!storedUser) setShowLogin(true);
//     else setUser(JSON.parse(storedUser));
//   }, []);

//   const handleLoginSuccess = (loggedInUser) => {
//     setUser(loggedInUser);
//     setShowLogin(false);
//   };


//   useEffect(() => {
//   const open = () => setShowPayment(true);
//   window.addEventListener("open-payment", open);

//   return () => {
//     window.removeEventListener("open-payment", open);
//   };
// }, []);


//   return (
//     <div
//       className="relative w-screen h-screen overflow-hidden text-white"
//       onClick={() => setCloseNotifications((prev) => !prev)}
//     >
//       {/* Background */}
//      <div
//   className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
//   style={{ backgroundImage: "url('https://res.cloudinary.com/dcoojr90p/image/upload/v1764323496/roommates_gqvev6.jpg')" }}
// />

//       <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

//       {/* BLOOM text animation */}
//       <div className="absolute top-10 left-10 flex space-x-1 text-white text-4xl md:text-6xl font-extrabold z-20">
//         {bloomText.split("").map((char, index) => (
//           <motion.span
//             key={index}
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.2, duration: 0.5, type: "spring", stiffness: 500 }}
//           >
//             {char}
//           </motion.span>
//         ))}
//       </div>

//       {/* Notifications Bell */}
//       {user && <HomeNotifications user={user} triggerClose={closeNotifications} />}

//       {/* Center Text */}
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20">
//         <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
//           GET WHO.... <br /> GET YOU
//         </h1>

//         {/* Dropdown Arrow */}
//         <div
//           className="flex justify-center items-center cursor-pointer text-xl md:text-2xl mb-2"
//           onClick={(e) => {
//             e.stopPropagation(); // Prevent closing notifications
//             setShowPages((prev) => !prev);
//           }}
//         >
//           {showPages ? <FaChevronUp /> : <FaChevronDown />}
//         </div>

//         {/* Dropdown Buttons */}
//         {showPages && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex flex-col space-y-3 mt-2"
//           >
//             <button
//               className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full"
//               onClick={() => navigate("/therapy")}
//             >
//               Relief Room
//             </button>
           
//           </motion.div>
//         )}
//       </div>
//   <EncouragementPopup />
//       {/* Login modal if no user */}
//       {showLogin && <LoginModal onClose={() => setShowLogin(false)} onSuccess={handleLoginSuccess} />}
//     </div>
//   );
// }
















import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import EncouragementPopup from "../pages/EncouragementPopup";
import LoginModal from "../components/LoginModal";
import HomeNotifications from "../components/HomeNotifications";
import PaymentModal from "../components/PaymentModal";


export default function Home() {
  const bloomText = "BLOOM";
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [user, setUser] = useState(null);
  const [closeNotifications, setCloseNotifications] = useState(false);
  const [showPages, setShowPages] = useState(false);

  const hasAccess = user?.bloomAccess === true;

   const [recentUsers, setRecentUsers] = useState([]);


   

  // Load user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("bloomUser");
    if (!storedUser) {
      setShowLogin(true);
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setShowLogin(false);
  };

  // Global payment trigger (from sidebar, profile, discover)
  useEffect(() => {
    const open = () => setShowPayment(true);
    window.addEventListener("open-payment", open);

    return () => {
      window.removeEventListener("open-payment", open);
    };
  }, []);

  
  return (
    <div
      className="relative w-screen h-screen overflow-hidden text-white"
      onClick={() => setCloseNotifications((prev) => !prev)}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dcoojr90p/image/upload/v1764323496/roommates_gqvev6.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* BLOOM text animation */}
      <div className="absolute top-10 left-10 flex space-x-1 text-4xl md:text-6xl font-extrabold z-20">
        {bloomText.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.2,
              duration: 0.5,
              type: "spring",
              stiffness: 500,
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* Notifications */}
      {user && (
        <HomeNotifications
          user={user}
          triggerClose={closeNotifications}
        />
      )}

      {/* Center Content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          GET WHO....
          <br />
          GET YOU
        </h1>

        {/* Dropdown Toggle */}
        <div
          className="flex justify-center items-center cursor-pointer text-xl md:text-2xl mb-2"
          onClick={(e) => {
            e.stopPropagation();
            setShowPages((prev) => !prev);
          }}
        >
          {showPages ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {/* Dropdown Pages */}
        {showPages && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col space-y-3 mt-2"
          >
            {/* Therapy stays OPEN */}
            <button
              className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full"
              onClick={() => navigate("/therapy")}
            >
              Relief Room
            </button>
          </motion.div>
        )}
      </div>

      <EncouragementPopup />

      {/* Login Modal */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      {/* Payment Modal */}
      {showPayment && (
        <PaymentModal
          onClose={() => setShowPayment(false)}
          onPaymentSuccess={() => window.location.reload()}
        />
      )}
    </div>
  );
}
