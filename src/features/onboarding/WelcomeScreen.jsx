// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import Us from "../../pages/Us";
// import PaymentModal from "../../components/PaymentModal";
//  // adjust path as needed

// export default function WelcomeScreen({ user: propUser }) {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(propUser || null);
//   const [showPayment, setShowPayment] = useState(false);

//   // Load user from localStorage if not passed via props
//   useEffect(() => {
//     if (!propUser) {
//       const storedUser = localStorage.getItem("bloomUser");
//       if (storedUser) setUser(JSON.parse(storedUser));
//     }
//   }, [propUser]);

//   const features = [
//     {
//       title: "Connect",
//       description: "Meet like-minded women, join communities, and expand your network.",
//       color: "bg-white/20 backdrop-blur-md",
//     },
//     {
//       title: "Grow",
//       description: "Access resources, learn new skills, and explore safe spaces.",
//       color: "bg-white/20 backdrop-blur-md",
//     },
//     {
//       title: "Explore",
//       description: "Discover events, chats, and experiences tailored just for you.",
//       color: "bg-white/20 backdrop-blur-md",
//     },
//     {
//       title: "Profile",
//       description: "Manage your account, update info, and customize your experience.",
//       color: "bg-white/20 backdrop-blur-md",
//     },
//   ];

//   return (
//     <div className="relative min-h-screen w-screen flex flex-col py-10 items-center justify-center overflow-hidden">
//       {/* Full-screen video background */}
//       <video
//         className="absolute inset-0 w-screen h-screen object-cover z-0"
//         src="https://res.cloudinary.com/dcoojr90p/video/upload/v1764329325/account_si9xyh.mp4"
//         autoPlay
//         loop
//         muted
//         playsInline
//       />

//       {/* Welcome Card */}
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//         className="p-10 rounded-3xl shadow-2xl max-w-md w-full text-center space-y-6 relative z-10 bg-white/20 backdrop-blur-md"
//       >
//         <h2 className="text-4xl font-bold text-purple-700">
//           Welcome, {user?.username || "Bloom User"}!
//         </h2>
//         <p className="text-white text-lg">
//           Your Bloom account is now activated. Connect, explore, and bloom in a safe, empowering space!
//         </p>

//         <button
//           onClick={() => setShowPayment(true)}
//           className="w-full py-3 bg-pink-500 text-white font-bold rounded-xl hover:bg-pink-600 transition-all shadow-lg transform hover:scale-105"
//         >
//           Step into Your Bloom
//         </button>
//       </motion.div>

//       {/* Features */}
//       <div className="mt-12 flex flex-wrap justify-center gap-6 max-w-5xl w-full z-10">
//         {features.map((f, i) => (
//           <motion.div
//             key={f.title}
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: i * 0.2, duration: 0.5 }}
//             whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
//             className={`${f.color} p-6 rounded-3xl w-64 text-center cursor-pointer transition`}
//           >
//             <h3 className="text-xl font-semibold text-purple-700 mb-2">{f.title}</h3>
//             <p className="text-gray-900 text-sm">{f.description}</p>
//           </motion.div>
//         ))}
//       </div>

//       <Us />

//       {/* Payment Modal */}
//       {showPayment && (
//         <PaymentModal
//           onClose={() => setShowPayment(false)}
//           onPaymentSuccess={() => navigate("/home")}
//         />
//       )}
//     </div>
//   );
// }



















import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Us from "../../pages/Us";
import PaymentModal from "../../components/PaymentModal";
 // adjust path as needed

export default function WelcomeScreen({ user: propUser }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(propUser || null);
  const [showPayment, setShowPayment] = useState(false);

  // Load user from localStorage if not passed via props
  useEffect(() => {
    if (!propUser) {
      const storedUser = localStorage.getItem("bloomUser");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, [propUser]);

  const features = [
    {
      title: "Connect",
      description: "Meet like-minded women, join communities, and expand your network.",
      color: "bg-white/20 backdrop-blur-md",
    },
    {
      title: "Grow",
      description: "Access resources, learn new skills, and explore safe spaces.",
      color: "bg-white/20 backdrop-blur-md",
    },
    {
      title: "Explore",
      description: "Discover events, chats, and experiences tailored just for you.",
      color: "bg-white/20 backdrop-blur-md",
    },
    {
      title: "Profile",
      description: "Manage your account, update info, and customize your experience.",
      color: "bg-white/20 backdrop-blur-md",
    },
  ];

  return (
    <div className="relative min-h-screen w-screen flex flex-col py-10 items-center justify-center overflow-hidden">
      {/* Full-screen video background */}
      <video
        className="absolute inset-0 w-screen h-screen object-cover z-0"
        src="https://res.cloudinary.com/dcoojr90p/video/upload/v1764329325/account_si9xyh.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Welcome Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="p-10 rounded-3xl shadow-2xl max-w-md w-full text-center space-y-6 relative z-10 bg-white/20 backdrop-blur-md"
      >
        <h2 className="text-4xl font-bold text-purple-700">
          Welcome, {user?.username || "Bloom User"}!
        </h2>
        <p className="text-white text-lg">
          Your Bloom account is now activated. Connect, explore, and bloom in a safe, empowering space!
        </p>

     <button
  onClick={() => navigate("/home")}   className="w-full py-3 bg-pink-500 text-white font-bold rounded-xl hover:bg-pink-600 transition-all shadow-lg transform hover:scale-105"

>
  Step into Your Bloom
</button>

      </motion.div>

      {/* Features */}
      <div className="mt-12 flex flex-wrap justify-center gap-6 max-w-5xl w-full z-10">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            className={`${f.color} p-6 rounded-3xl w-64 text-center cursor-pointer transition`}
          >
            <h3 className="text-xl font-semibold text-purple-700 mb-2">{f.title}</h3>
            <p className="text-gray-900 text-sm">{f.description}</p>
          </motion.div>
        ))}
      </div>

      <Us />

      {/* Payment Modal */}
      {showPayment && (
        <PaymentModal
          onClose={() => setShowPayment(false)}
          onPaymentSuccess={() => navigate("/home")}
        />
      )}
    </div>
  );
}
