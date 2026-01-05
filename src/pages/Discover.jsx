



// // src/pages/Discover.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSwipeable } from "react-swipeable";
// import { useNavigate } from "react-router-dom";
// import { FaUserCircle, FaEnvelope, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// export default function Discover() {
//   const navigate = useNavigate();
//   const [profiles, setProfiles] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const currentUserId = localStorage.getItem("bloomUserId"); // or however you store it

//   const API_URL = import.meta.env.VITE_SERVER_URL;


  

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/users/discover/all`, {
//   headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` }
// });

//         setProfiles(res.data);
//       } catch (err) {
//         console.error("Error fetching discover profiles:", err);
//       }  finally {
//         setLoading(false);
//        } 
//     };
//     fetchProfiles();
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
//     if (!profiles[currentIndex]) return;
//     setCurrentImageIndex(
//       (prev) => (prev + 1) % profiles[currentIndex].discover.images.length
//     );
    
//   };

//   const handlePrevImage = () => {
//     if (!profiles[currentIndex]) return;
//     setCurrentImageIndex(
//       (prev) =>
//         (prev - 1 + profiles[currentIndex].discover.images.length) %
//         profiles[currentIndex].discover.images.length
//     );
//   };

//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: handleNextProfile,
//     onSwipedRight: handlePrevProfile,
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true,
//   });

//   const profile = profiles[currentIndex] || null;

//   const viewProfile = () => {
//     navigate(`/profile/${profile._id}`);
//   };

//  const messageUser = () => {
//     navigate(`/chat?user=${profile._id}`);
//   };


//  if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-gray-400">
//         Loading profiles...
//       </div>
//     );
//   }

  
//  return (
//   <div className="flex flex-col items-center justify-center min-h-screen bg-[#111] text-white">
//     {profile && (
//       <>
//         <div {...swipeHandlers} className="relative w-full">
//           {/* Image container */}
//           <div
//             className="relative w-full h-[500px] cursor-pointer"
//             onClick={handleNextImage}
//           >
//             <img
//               src={profile.discover.images[currentImageIndex]}
//               alt={`profile-${currentImageIndex}`}
//               className="w-full h-full object-cover"
//             />

//             {/* Top-right: Country & Pronouns */}
//             <div className="absolute top-4 right-4 px-3 py-1 rounded text-sm">
//               {profile.discover.country} | {profile.discover.pronouns}
//             </div>

//             {/* Bottom-left: Name, Write-up, Tags */}
//             <div className="absolute bottom-4 left-4 p-3 rounded max-w-[90%] md:max-w-[70%]">
//               <h2 className="text-4xl text-red-700 font-bold">{profile.name}</h2>
//               <p className="text-red-800 text-sm mt-1">{profile.discover.writeUp}</p>
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {profile.discover.tags.map((tag, idx) => (
//                   <span
//                     key={idx}
//                     className="px-2 py-1 bg-purple-600 rounded-full text-white text-xs"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Bottom-right: Profile & Message icons */}
//            {/* Bottom-right: Profile & Message icons */}
// <div className="absolute bottom-4 right-4 flex flex-col gap-2">
//   <button
//     onClick={viewProfile}
//     className="p-2 rounded-full hover:bg-white/20"
//   >
//     <FaUserCircle size={24} />
//   </button>

//   {/* Show message icon only if this is NOT the current user */}
//   {profile._id !== currentUserId && (
//     <button
//       onClick={messageUser}
//       className="p-2 rounded-full hover:bg-white/20"
//     >
//       <FaEnvelope size={24} />
//     </button>
//   )}
// </div>


// {profile._id === currentUserId && (
//   <p className="absolute top-4 left-4 text-sm text-gray-300 italic bg-black/50 px-2 py-1 rounded">
//     This is your profile
//   </p>
// )}

//             {/* Left & Right arrows */}
//             <button
//               onClick={handlePrevImage}
//               className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-white/20"
//             >
//               <FaChevronLeft />
//             </button>
//             <button
//               onClick={handleNextImage}
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-white/20"
//             >
//               <FaChevronRight />
//             </button>
//           </div>
//         </div>

//         {/* NEXT USER BUTTON */}
//         <button
//           onClick={handleNextProfile}
//           className="mt-4 w-full md:w-[50%] lg:w-[30%] py-3 bg-transparent border border-purple-600 text-purple-600 rounded-xl hover:bg-purple-600 hover:text-white transition-colors"
//         >
//           Discover All
//         </button>
//       </>
//     )}

//     {!profile && (
//       <p className="text-center mt-10 text-gray-400">
//         No profiles to discover yet.
//       </p>
//     )}
//   </div>
// );
// }


































// src/pages/Discover.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEnvelope, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PaymentModal from "./../components/PaymentModal";

export default function Discover() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const currentUserId = localStorage.getItem("bloomUserId"); // or however you store it
const [showUnlockModal, setShowUnlockModal] = useState(false);

const [showPaymentModal, setShowPaymentModal] = useState(false);
const user = JSON.parse(localStorage.getItem("bloomUser"));
// const isUnlocked = user?.bloomAccess === true;
const [isUnlocked, setIsUnlocked] = useState(user?.bloomAccess === true);

  const API_URL = import.meta.env.VITE_SERVER_URL;


  

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users/discover/all`, {
  headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` }
});

        setProfiles(res.data);
      } catch (err) {
        console.error("Error fetching discover profiles:", err);
      }  finally {
        setLoading(false);
       } 
    };
    fetchProfiles();
  }, []);



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

  const handleNextImage = () => {
    if (!profiles[currentIndex]) return;
    setCurrentImageIndex(
      (prev) => (prev + 1) % profiles[currentIndex].discover.images.length
    );
    
  };

  const handlePrevImage = () => {
    if (!profiles[currentIndex]) return;
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + profiles[currentIndex].discover.images.length) %
        profiles[currentIndex].discover.images.length
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextProfile,
    onSwipedRight: handlePrevProfile,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const profile = profiles[currentIndex] || null;

  const viewProfile = () => {
    navigate(`/profile/${profile._id}`);
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
  setIsUnlocked(updatedUser.bloomAccess); // unlock button immediately
  localStorage.setItem("bloomUser", JSON.stringify(updatedUser)); // keep localStorage in sync
  setShowPaymentModal(false);
};

  
 return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-[#111] text-white">
    {profile && (
      <>
        <div {...swipeHandlers} className="relative w-full">
          {/* Image container */}
          <div
            className="relative w-full h-[500px] cursor-pointer"
            onClick={handleNextImage}
          >
            <img
              src={profile.discover.images[currentImageIndex]}
              alt={`profile-${currentImageIndex}`}
              className="w-full h-full object-cover"
            />

            {/* Top-right: Country & Pronouns */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded text-sm">
              {profile.discover.country} | {profile.discover.pronouns}
            </div>

            {/* Bottom-left: Name, Write-up, Tags */}
            <div className="absolute bottom-4 left-4 p-3 rounded max-w-[90%] md:max-w-[70%]">
              <h2 className="text-4xl text-red-700 font-bold">{profile.name}</h2>
              <p className="text-red-800 text-sm mt-1">{profile.discover.writeUp}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.discover.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-purple-600 rounded-full text-white text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom-right: Profile & Message icons */}
           {/* Bottom-right: Profile & Message icons */}
<div className="absolute bottom-4 right-4 flex flex-col gap-2">
  <button
    onClick={viewProfile}
    className="p-2 rounded-full hover:bg-white/20"
  >
    <FaUserCircle size={24} />
  </button>

  {/* Show message icon only if this is NOT the current user */}
  {profile._id !== currentUserId && (
    <button
      onClick={messageUser}
      className="p-2 rounded-full hover:bg-white/20"
    >
      <FaEnvelope size={24} />
    </button>
  )}
</div>


{profile._id === currentUserId && (
  <p className="absolute top-4 left-4 text-sm text-gray-300 italic bg-black/50 px-2 py-1 rounded">
    This is your profile
  </p>
)}

            {/* Left & Right arrows */}
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-white/20"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-white/20"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* NEXT USER BUTTON */}
     <button
  onClick={() => {
    if (!isUnlocked) {
      setShowUnlockModal(true);
    } else {
      handleNextProfile();
    }
  }}
  className="mt-4 w-full md:w-[50%] lg:w-[30%] py-3 bg-transparent border border-purple-600 text-purple-600 rounded-xl hover:bg-purple-600 hover:text-white transition-colors"
>
  Discover All
</button>


      </>
    )}

    {!profile && (
      <p className="text-center mt-10 text-gray-400">
        No profiles to discover yet.
      </p>
    )}

{/* Unlock explanation modal */}
{showUnlockModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-[#1a1a1a] rounded-2xl p-6 w-[90%] max-w-md text-center">
      <h2 className="text-2xl font-semibold mb-3">Hey beautiful 🌸</h2>

      <p className="text-gray-300 mb-6">
          Unlock Bloom to discover womxn around the world, connect freely,
        and be seen in a safe, intentional space.
      </p>

      <button
        onClick={() => {
          setShowUnlockModal(false);
          setShowPaymentModal(true);
        }}
        className="w-full py-3 bg-purple-600 rounded-xl text-white font-medium mb-3"
      >
        Unlock Bloom
      </button>

      <button
        onClick={() => setShowUnlockModal(false)}
        className="text-sm text-gray-400 underline"
      >
        Maybe later
      </button>
    </div>
  </div>
)}

{/* Payment modal */}
{showPaymentModal && (
 <PaymentModal
  onClose={() => setShowPaymentModal(false)}
  onPaymentSuccess={(updatedUser) => {
    setIsUnlocked(updatedUser.bloomAccess); // update state immediately
    
  }}
/>

)}



    

  </div>
);
}