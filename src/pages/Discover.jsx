








// // src/pages/Discover.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSwipeable } from "react-swipeable";
// import { useNavigate } from "react-router-dom";
// import { FaUserCircle, FaEnvelope, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import PaymentModal from "./../components/PaymentModal";


// export default function Discover() {
//   const navigate = useNavigate();
//   const [profiles, setProfiles] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const currentUserId = localStorage.getItem("bloomUserId");
  
//   const [showUnlockModal, setShowUnlockModal] = useState(false);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [showProfilePopup, setShowProfilePopup] = useState(false);
//   const [popupProfile, setPopupProfile] = useState(null);

//   const user = JSON.parse(localStorage.getItem("bloomUser"));
//   const [isUnlocked, setIsUnlocked] = useState(user?.bloomAccess === true);

//   const API_URL = import.meta.env.VITE_SERVER_URL;

//   // Fetch discover profiles
//   useEffect(() => {
//     const fetchProfiles = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/users/discover/all`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` }
//         });
//         setProfiles(res.data);
//       } catch (err) {
//         console.error("Error fetching discover profiles:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfiles();
//   }, []);

//   // Fetch current user
//   useEffect(() => {
//     const fetchUser = async () => {
//       const res = await axios.get(`${API_URL}/api/users/${currentUserId}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` }
//       });
//       localStorage.setItem("bloomUser", JSON.stringify(res.data));
//       setIsUnlocked(res.data.bloomAccess);
//     };
//     fetchUser();
//   }, []);

//   const handleNextProfile = () => {
//     setCurrentIndex((prev) => (prev + 1) % profiles.length);
//     setCurrentImageIndex(0);
//   };

//   const handlePrevProfile = () => {
//     setCurrentIndex((prev) => (prev - 1 + profiles.length) % profiles.length);
//     setCurrentImageIndex(0);
//   };

//   const handleNextImage = () => {
//     if (!images.length) return;
//     setCurrentImageIndex((prev) => (prev + 1) % images.length);
//   };

//   const handlePrevImage = () => {
//     if (!images.length) return;
//     setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: handleNextProfile,
//     onSwipedRight: handlePrevProfile,
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true,
//   });

//   const profile = profiles[currentIndex] || null;
//   const discover = profile?.discover;
//   const images = discover?.images || [];

//  const openProfilePopup = async (profile) => {
//   try {
//     const res = await axios.get(`${API_URL}/api/users/${profile._id}`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//     });
//     setPopupProfile(res.data);  // now popupProfile has full profile info
//     setShowProfilePopup(true);
//   } catch (err) {
//     console.error("Failed to fetch full profile for popup:", err);
//   }
// };



//   const messageUser = () => {
//     navigate(`/chat?user=${profile._id}`);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-gray-400">
//         Loading profiles...
//       </div>
//     );
//   }

//   const handlePaymentSuccess = (updatedUser) => {
//     setIsUnlocked(updatedUser.bloomAccess);
//     localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//     setShowPaymentModal(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-[#111] text-white">
//       {profile && (
//         <>
//           <div {...swipeHandlers} className="relative w-full">
//             <div
//               className="relative w-full h-[500px] cursor-pointer"
//               onClick={handleNextImage}
//             >
//               <img
//                 src={profile?.discover?.images?.[currentImageIndex] || "/placeholder.jpg"}
//                 alt="profile"
//                 className="w-full h-full object-cover"
//               />

//               {/* Top-right: Country & Pronouns */}
//               <div className="absolute top-4 right-4 px-3 py-1 rounded text-sm">
//                 {discover?.country || "—"} | {discover?.pronouns || "—"}
//               </div>

//               {/* Bottom-left: Name, Write-up, Tags */}
//               <div className="absolute bottom-4 left-4 p-3 rounded max-w-[90%] md:max-w-[70%]">
//                 <h2 className="text-4xl text-red-700 font-bold">{profile.name}</h2>
//                 <p className="text-red-800 text-sm mt-1">{discover?.writeUp || ""}</p>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {discover?.tags?.map((tag, idx) => (
//                     <span key={idx} className="px-2 py-1 bg-purple-600 rounded-full text-white text-xs">
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Bottom-right: Profile & Message icons */}
//               <div className="absolute bottom-4 right-4 flex flex-col gap-2">
//               <button
//   onClick={() => openProfilePopup(profile)}
//   className="p-2 rounded-full hover:bg-white/20"
// >
//   <FaUserCircle size={24} />
// </button>


//                 {profile._id !== currentUserId && (
//                   <button
//                     onClick={messageUser}
//                     className="p-2 rounded-full hover:bg-white/20"
//                   >
//                     <FaEnvelope size={24} />
//                   </button>
//                 )}
//               </div>

//               {profile._id === currentUserId && (
//                 <p className="absolute top-4 left-4 text-sm text-gray-300 italic bg-black/50 px-2 py-1 rounded">
//                   This is your profile
//                 </p>
//               )}

//               {/* Left & Right arrows */}
//               <button
//                 onClick={handlePrevImage}
//                 className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-white/20"
//               >
//                 <FaChevronLeft />
//               </button>
//               <button
//                 onClick={handleNextImage}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-white/20"
//               >
//                 <FaChevronRight />
//               </button>
//             </div>
//           </div>

//           {/* NEXT USER BUTTON */}
//           <button
//             onClick={() => {
//               if (!isUnlocked) setShowUnlockModal(true);
//               else handleNextProfile();
//             }}
//             className="mt-4 w-full md:w-[50%] lg:w-[30%] py-3 bg-transparent border border-purple-600 text-purple-600 rounded-xl hover:bg-purple-600 hover:text-white transition-colors"
//           >
//             Discover All
//           </button>
//         </>
//       )}

//       {!profile && (
//         <p className="text-center mt-10 text-gray-400">
//           No profiles to discover yet.
//         </p>
//       )}

//       {/* --- PROFILE POPUP --- */}
//       {showProfilePopup && popupProfile && (
//         <div
//           className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
//           onClick={() => setShowProfilePopup(false)}
//         >
//           <div
//             className="bg-[#1a1a1a] rounded-2xl p-6 w-[90%] max-w-md relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               className="absolute top-3 right-3 text-gray-400 hover:text-white"
//               onClick={() => setShowProfilePopup(false)}
//             >
//               ✕
//             </button>

//             <h2 className="text-2xl font-bold mb-2">{popupProfile.name}</h2>
//             <p className="text-sm text-gray-300 mb-2">{popupProfile.discover?.writeUp || ""}</p>

//             <div className="flex flex-wrap gap-2 mb-3">
//               {popupProfile.discover?.tags?.map((tag, idx) => (
//                 <span
//                   key={idx}
//                   className="px-2 py-1 bg-purple-600 rounded-full text-white text-xs"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>

//             <div className="flex gap-3 justify-center mt-3">
//               <button
//                 onClick={() => navigate(`/profile/${popupProfile._id}`)}
//                 className="py-2 px-4 bg-purple-600 text-white rounded-xl"
//               >
//                 View Full Profile
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Unlock explanation modal */}
//       {showUnlockModal && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-[#1a1a1a] rounded-2xl p-6 w-[90%] max-w-md text-center">
//             <h2 className="text-2xl font-semibold mb-3">Hey beautiful 🌸</h2>
//             <p className="text-gray-300 mb-6">
//               Unlock Bloom to discover womxn around the world, connect freely, and be seen in a safe, intentional space.
//             </p>
//             <button
//               onClick={() => { setShowUnlockModal(false); setShowPaymentModal(true); }}
//               className="w-full py-3 bg-purple-600 rounded-xl text-white font-medium mb-3"
//             >
//               Unlock Bloom
//             </button>
//             <button onClick={() => setShowUnlockModal(false)} className="text-sm text-gray-400 underline">
//               Maybe later
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Payment modal */}
//       {showPaymentModal && (
//         <PaymentModal
//           onClose={() => setShowPaymentModal(false)}
//           onPaymentSuccess={handlePaymentSuccess}
//         />
//       )}
// {showProfilePopup && popupProfile && (
//   <div
//     className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
//     onClick={() => setShowProfilePopup(false)}
//   >
//     <div
//       className="bg-[#111] w-[90%] md:w-[60%] lg:w-[40%] max-h-[90vh] overflow-y-auto p-4 rounded-2xl relative"
//       onClick={(e) => e.stopPropagation()}
//     >
//       <button
//         className="absolute top-2 right-2 text-white text-xl font-bold"
//         onClick={() => setShowProfilePopup(false)}
//       >
//         ×
//       </button>

//       <div className="flex flex-col items-center gap-2">
//         {/* Main profile image */}
//        <img
//   src={popupProfile?.profilePics?.[0] || "/placeholder.jpg"}
//   alt="Profile"
//   className="w-full h-64 md:h-80 rounded-lg object-cover"
// />


//         {/* Name & username */}
//         <h2 className="text-xl font-bold text-white">{popupProfile.name}</h2>
//         <p className="text-gray-400 text-sm">@{popupProfile.username}</p>

//         {/* Bio, pronouns, country */}
//         {popupProfile.bio && <p className="text-gray-300 text-center">{popupProfile.bio}</p>}
//         {popupProfile.pronouns && <p className="text-gray-400 text-sm">{popupProfile.pronouns}</p>}
//         {popupProfile.country && <p className="text-gray-400 text-sm">{popupProfile.country}</p>}

//         {/* Socials */}
//         <div className="flex gap-2 mt-1">
//           {popupProfile.socials?.instagram && (
//             <a
//               href={`https://instagram.com/${popupProfile.socials.instagram}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline text-xs"
//             >
//               Instagram
//             </a>
//           )}
//           {popupProfile.socials?.twitter && (
//             <a
//               href={`https://twitter.com/${popupProfile.socials.twitter}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline text-xs"
//             >
//               Twitter
//             </a>
//           )}
//         </div>

//         <button
//           className="mt-4 px-4 py-2 bg-purple-600 rounded-xl text-white hover:bg-purple-700"
//           onClick={() => {
//             setShowProfilePopup(false);
//             navigate(`/profile/${popupProfile._id}`);
//           }}
//         >
//           View Full Profile
//         </button>
//       </div>
//     </div>
//   </div>
// )}





//     </div>
//   );
// }



























// src/pages/Discover.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEnvelope, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PaymentModal from "./../components/PaymentModal";
import { motion, AnimatePresence } from "framer-motion";

export default function Discover() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const currentUserId = localStorage.getItem("bloomUserId");
  
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [popupProfile, setPopupProfile] = useState(null);

  const user = JSON.parse(localStorage.getItem("bloomUser"));
  const [isUnlocked, setIsUnlocked] = useState(user?.bloomAccess === true);

  const API_URL = import.meta.env.VITE_SERVER_URL;

  // Fetch discover profiles
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users/discover/all`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` }
        });
        setProfiles(res.data);
      } catch (err) {
        console.error("Error fetching discover profiles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${API_URL}/api/users/${currentUserId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` }
      });
      localStorage.setItem("bloomUser", JSON.stringify(res.data));
      setIsUnlocked(res.data.bloomAccess);
    };
    fetchUser();
  }, []);

  const handleNextProfile = () => {
    setCurrentIndex((prev) => (prev + 1) % profiles.length);
    setCurrentImageIndex(0);
  };

  const handlePrevProfile = () => {
    setCurrentIndex((prev) => (prev - 1 + profiles.length) % profiles.length);
    setCurrentImageIndex(0);
  };

// Inside your component, after currentIndex and currentImageIndex
const handleNextImage = () => {
  const profile = profiles[currentIndex];
  const images = profile?.discover?.images || [];
  if (!images.length) return;
  setCurrentImageIndex((prev) => (prev + 1) % images.length);
};

const handlePrevImage = () => {
  const profile = profiles[currentIndex];
  const images = profile?.discover?.images || [];
  if (!images.length) return;
  setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
};

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextProfile,
    onSwipedRight: handlePrevProfile,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const profile = profiles[currentIndex] || null;
  const discover = profile?.discover;
  const images = discover?.images || [];

 const openProfilePopup = async (profile) => {
  try {
    const res = await axios.get(`${API_URL}/api/users/${profile._id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
    });
    setPopupProfile(res.data);  // now popupProfile has full profile info
    setShowProfilePopup(true);
  } catch (err) {
    console.error("Failed to fetch full profile for popup:", err);
  }
};



  const messageUser = () => {
    navigate(`/chat?user=${profile._id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Loading profiles...
      </div>
    );
  }

  const handlePaymentSuccess = (updatedUser) => {
    setIsUnlocked(updatedUser.bloomAccess);
    localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
    setShowPaymentModal(false);
  };

return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-[#111] text-white">
    
    {/* CARD STACK */}
    <div className="relative w-full h-[500px]">
  <AnimatePresence>
    {profiles.slice(currentIndex, currentIndex + 3).map((p, idx) => {
      const isTop = idx === 0; // only top card is interactive
      const images = p.discover?.images || [];
      const imageIndex = isTop ? currentImageIndex : 0;

      return (
        <motion.div
          key={p._id}
          {...(isTop ? swipeHandlers : {})} // swipe only top card
          drag={isTop ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={
            isTop
              ? (e, info) => {
                  if (info.offset.x < -100) handleNextProfile();
                  if (info.offset.x > 100) handlePrevProfile();
                }
              : undefined
          }
          initial={{ scale: 0.9 + idx * 0.05, y: idx * 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ zIndex: 10 - idx }}
          className="absolute w-full h-full rounded-xl cursor-pointer overflow-hidden"
          onClick={isTop ? handleNextImage : undefined} // top card cycles images
        >
          <img
            src={images[imageIndex] || "/placeholder.jpg"}
            alt="profile"
            className="w-full h-full object-cover"
          />

          {/* Top-right: Country & Pronouns */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded text-sm">
            {p.discover?.country || "—"} | {p.discover?.pronouns || "—"}
          </div>

          {/* Bottom-left: Name, Write-up, Tags */}
          <div className="absolute bottom-4 left-4 p-3 rounded max-w-[90%] md:max-w-[70%]">
            <h2 className="text-4xl text-red-700 font-bold">{p.name}</h2>
            <p className="text-red-800 text-sm mt-1">{p.discover?.writeUp || ""}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {p.discover?.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-purple-600 rounded-full text-white text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom-right: Profile & Message icons */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); openProfilePopup(p); }}
              className="p-2 rounded-full hover:bg-white/20"
            >
              <FaUserCircle size={24} />
            </button>

            {p._id !== currentUserId && (
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/chat?user=${p._id}`); }}
                className="p-2 rounded-full hover:bg-white/20"
              >
                <FaEnvelope size={24} />
              </button>
            )}
          </div>

          {p._id === currentUserId && (
            <p className="absolute top-4 left-4 text-sm text-gray-300 italic bg-black/50 px-2 py-1 rounded">
              This is your profile
            </p>
          )}

          {/* Top card arrows */}
          {isTop && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-white/20"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-white/20"
              >
                <FaChevronRight />
              </button>
            </>
          )}
        </motion.div>
      );
    })}
  </AnimatePresence>
</div>

          {/* NEXT USER BUTTON */}
          <button
            onClick={() => {
              if (!isUnlocked) setShowUnlockModal(true);
              else handleNextProfile();
            }}
            className="mt-4 w-full md:w-[50%] lg:w-[30%] py-3 bg-transparent border border-purple-600 text-purple-600 rounded-xl hover:bg-purple-600 hover:text-white transition-colors"
          >
            Discover All
          </button>
        
      

      {!profile && (
        <p className="text-center mt-10 text-gray-400">
          No profiles to discover yet.
        </p>
      )}

      {/* --- PROFILE POPUP --- */}
      {showProfilePopup && popupProfile && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setShowProfilePopup(false)}
        >
          <div
            className="bg-[#1a1a1a] rounded-2xl p-6 w-[90%] max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setShowProfilePopup(false)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-2">{popupProfile.name}</h2>
            <p className="text-sm text-gray-300 mb-2">{popupProfile.discover?.writeUp || ""}</p>

            <div className="flex flex-wrap gap-2 mb-3">
              {popupProfile.discover?.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-purple-600 rounded-full text-white text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-3 justify-center mt-3">
              <button
                onClick={() => navigate(`/profile/${popupProfile._id}`)}
                className="py-2 px-4 bg-purple-600 text-white rounded-xl"
              >
                View Full Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unlock explanation modal */}
      {showUnlockModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] rounded-2xl p-6 w-[90%] max-w-md text-center">
            <h2 className="text-2xl font-semibold mb-3">Hey beautiful 🌸</h2>
            <p className="text-gray-300 mb-6">
              Unlock Bloom to discover womxn around the world, connect freely, and be seen in a safe, intentional space.
            </p>
            <button
              onClick={() => { setShowUnlockModal(false); setShowPaymentModal(true); }}
              className="w-full py-3 bg-purple-600 rounded-xl text-white font-medium mb-3"
            >
              Unlock Bloom
            </button>
            <button onClick={() => setShowUnlockModal(false)} className="text-sm text-gray-400 underline">
              Maybe later
            </button>
          </div>
        </div>
      )}

      {/* Payment modal */}
      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
{showProfilePopup && popupProfile && (
  <div
    className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
    onClick={() => setShowProfilePopup(false)}
  >
    <div
      className="bg-[#111] w-[90%] md:w-[60%] lg:w-[40%] max-h-[90vh] overflow-y-auto p-4 rounded-2xl relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="absolute top-2 right-2 text-white text-xl font-bold"
        onClick={() => setShowProfilePopup(false)}
      >
        ×
      </button>

      <div className="flex flex-col items-center gap-2">
        {/* Main profile image */}
       <img
  src={popupProfile?.profilePics?.[0] || "/placeholder.jpg"}
  alt="Profile"
  className="w-full h-64 md:h-80 rounded-lg object-cover"
/>


        {/* Name & username */}
        <h2 className="text-xl font-bold text-white">{popupProfile.name}</h2>
        <p className="text-gray-400 text-sm">@{popupProfile.username}</p>

        {/* Bio, pronouns, country */}
        {popupProfile.bio && <p className="text-gray-300 text-center">{popupProfile.bio}</p>}
        {popupProfile.pronouns && <p className="text-gray-400 text-sm">{popupProfile.pronouns}</p>}
        {popupProfile.country && <p className="text-gray-400 text-sm">{popupProfile.country}</p>}

        {/* Socials */}
        <div className="flex gap-2 mt-1">
          {popupProfile.socials?.instagram && (
            <a
              href={`https://instagram.com/${popupProfile.socials.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-xs"
            >
              Instagram
            </a>
          )}
          {popupProfile.socials?.twitter && (
            <a
              href={`https://twitter.com/${popupProfile.socials.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-xs"
            >
              Twitter
            </a>
          )}
        </div>

        <button
          className="mt-4 px-4 py-2 bg-purple-600 rounded-xl text-white hover:bg-purple-700"
          onClick={() => {
            setShowProfilePopup(false);
            navigate(`/profile/${popupProfile._id}`);
          }}
        >
          View Full Profile
        </button>
      </div>
    </div>
  </div>
)}





    </div>
  );
}
