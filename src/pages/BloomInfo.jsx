// BloomInfo.jsx
import { useState, useEffect } from "react";
import BloomInfo2 from "../pages/BloomInfo2";
import OnboardingFlow from "../features/onboarding/OnboardingFlow";

import LoginModal from "../components/LoginModal";
import { Link } from "react-router-dom";
import Us from "../pages/Us";
import LeftPinnedPopup from "../components/LeftPinnedPopup"; 
 


export default function BloomInfo() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

    const [newUsers, setNewUsers] = useState([]);
  

  // SEO keywords + JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Bloom",
    "url": "https://yourdomain.com",
    "description":
      "Bloom is a privacy-first community for women to connect, access wellness resources, find support, and grow professionally in a safe space.",
    "keywords": [
      "women community",
      "safe spaces for women",
      "women wellness",
      "women empowerment",
      "women networking",
      "women support groups",
      "female entrepreneurs"
    ]
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("bloomUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("bloomUser");
    setUser(null);
  };

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get("openLogin") === "true") {
    setShowLogin(true);
  }
}, []);


  useEffect(() => {
  const addUser = () => {
 const names = [
  "Abigail", "Ada", "Aisha", "Alexa", "Alice", "Amara", "Amber", "Amina", "Anaya", "Angela",
  "Anna", "Aria", "Ashley", "Ava", "Beatrice", "Bella", "Brianna", "Camila", "Carla", "Carmen",
  "Charlotte", "Chloe", "Clara", "Dahlia", "Daisy", "Daniela", "Delilah", "Diana", "Ella", "Elena",
  "Eliana", "Elizabeth", "Emily", "Emma", "Eva", "Evelyn", "Fiona", "Gabriella", "Grace", "Hannah",
  "Harper", "Hazel", "Isabella", "Ivy", "Jade", "Jasmine", "Jessica", "Julia", "Kaitlyn", "Kara",
  "Katherine", "Kayla", "Keira", "Laila", "Layla", "Leah", "Lila", "Lillian", "Lily", "Lucy",
  "Mackenzie", "Madeline", "Madison", "Maria", "Maya", "Mia", "Michelle", "Nadia", "Natalie", "Nina",
  "Olivia", "Paige", "Penelope", "Riley", "Rose", "Sabrina", "Samantha", "Sarah", "Savannah", "Scarlett",
  "Selena", "Sienna", "Sophia", "Stella", "Sydney", "Taylor", "Trinity", "Valeria", "Vanessa", "Victoria",
  "Violet", "Vivian", "Zara", "Zoey"
];

    const randomName = names[Math.floor(Math.random() * names.length)];
    setNewUsers(prev => [...prev, { name: randomName }]);

    // Next user in 5–12 seconds
    const nextDelay = Math.random() * 7000 + 5000;
    setTimeout(addUser, nextDelay);
  };

  addUser();
}, []);

  return (
  <div className="overflow-x-hidden">
      {/* SEO JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Section */}
     {/* Hero Section with Video Background */}
<div className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[#FDF5F7]">

  {/* Background video */}
<video
  className="absolute top-0 left-0 w-full h-full object-cover"
  src="https://res.cloudinary.com/dcoojr90p/video/upload/v1764326226/girls_rzespe.mp4"
  autoPlay
  loop
  muted
  playsInline
/>


  {/* Hero content */}
  <div className="relative z-10 w-full px-8 flex flex-col items-center">
    <h1 className="text-4xl md:text-5xl text-center font-bold text-pink-600 mb-4">
      Welcome to Bloom
    </h1>
    <p className="text-base md:text-xl text-white/95 mb-6 text-center max-w-2xl">
      A soft, private place where women rise, connect and exist freely.
      <br />
      Built by women, for women — discover support, wellness resources, and real connections.
    </p>
    <button
      className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full text-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-pink-300"
      onClick={() => setShowOnboarding(true)}
      aria-label="Enter Bloom"
    >
      Enter Bloom
    </button>
  </div>

  <p className="absolute text-white bottom-4 left-1/2 transform -translate-x-1/2 text-sm max-w-md text-center">
    By continuing, you agree to our{" "}
<Link to="/terms" className="font-medium text-pink-300 cursor-pointer hover:underline">
  Terms & Conditions
</Link>
    Learn how we use your data in our{" "}
    <Link to="/privacy1" className="font-medium text-pink-300 cursor-pointer hover:underline">Privacy Policy</Link>
  </p>
</div>

      {/* Second Box */}
     {/* Second Box */}
<div className="relative flex flex-col md:flex-row items-center justify-between bg-pink-200 p-10  shadow-lg overflow-hidden">
  {/* Left side - bouncing images */}
<div className="relative flex items-center justify-center md:w-1/2 w-full mb-6 md:mb-0">
  <div className="relative">
    {/* Center main image */}
    <img
      src="https://res.cloudinary.com/dcoojr90p/image/upload/v1764329018/girl1222_pgadfk.jpg"
      alt="Bloom woman"
      className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover shadow-2xl z-10 relative border-4 border-pink-200"
    />

    {/* Orbiting images */}
    <img
      src="https://res.cloudinary.com/dcoojr90p/image/upload/v1764327460/hand11_uhkixl.jpg"
      alt="Orbit 1"
      className="absolute w-16 h-16 rounded-full object-cover shadow-md top-0 left-1/2 transform -translate-x-1/2 animate-orbit-slow"
    />
    <img
      src="https://res.cloudinary.com/dcoojr90p/image/upload/v1764327637/girl12_me2o3p.jpg"
      alt="Orbit 2"
      className="absolute w-14 h-14 rounded-full object-cover shadow-md bottom-0 left-1/2 transform -translate-x-1/2 animate-orbit-fast"
    />
    <img
      src="https://res.cloudinary.com/dcoojr90p/image/upload/v1764327713/girl13_ne3rlr.jpg"
      alt="Orbit 3"
      className="absolute w-12 h-12 rounded-full object-cover shadow-md top-1/2 left-0 transform -translate-y-1/2 animate-orbit-medium"
    />
    <img
      src="https://res.cloudinary.com/dcoojr90p/image/upload/v1764327781/girl14_nw9ep0.png"
      alt="Orbit 4"
      className="absolute w-10 h-10 rounded-full object-cover shadow-md top-1/2 right-0 transform -translate-y-1/2 animate-orbit-midfast"
    />
  </div>

  <style>{`
    @keyframes orbit-slow {
      0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
      100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
    }

    @keyframes orbit-fast {
      0% { transform: rotate(0deg) translateX(60px) rotate(0deg); }
      100% { transform: rotate(-360deg) translateX(60px) rotate(360deg); }
    }

    @keyframes orbit-medium {
      0% { transform: rotate(0deg) translateY(80px) rotate(0deg); }
      100% { transform: rotate(360deg) translateY(80px) rotate(-360deg); }
    }

    @keyframes orbit-midfast {
      0% { transform: rotate(0deg) translateY(-80px) rotate(0deg); }
      100% { transform: rotate(-360deg) translateY(-80px) rotate(360deg); }
    }

    .animate-orbit-slow { animation: orbit-slow 12s linear infinite; }
    .animate-orbit-fast { animation: orbit-fast 8s linear infinite; }
    .animate-orbit-medium { animation: orbit-medium 10s linear infinite; }
    .animate-orbit-midfast { animation: orbit-midfast 9s linear infinite; }
  `}</style>
</div>



  {/* Right side - text content */}
  <div className="text-center md:text-left md:w-1/2 space-y-6">
    <h1 className="text-4xl md:text-5xl font-bold text-black">BLOOM</h1>
    <p className="text-xl font-semibold text-gray-800">
      Start your journey here.
      <br />
      <span className="text-pink-700 font-bold">Find connection with People.</span>
    </p>
    <p className="text-gray-700 leading-relaxed text-base">
      No filters. No judgment. No pressure.
      <br />
      Just real conversations, stories, and connections that let you bloom on your own terms.
      <br />
      <br />
      <strong className="text-purple-700">Your gentle, privacy-protected zone to be seen, heard, and encouraged.</strong>
      <br />
      <br />
      <span className="text-pink-700 font-bold text-lg">Explore • Express • Expand</span>
    </p>
  </div>

  {/* Animation styles */}
    <style>{`
    @keyframes orbit-slow {
      0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
      100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
    }
    @keyframes orbit-fast {
      0% { transform: rotate(0deg) translateX(60px) rotate(0deg); }
      100% { transform: rotate(-360deg) translateX(60px) rotate(360deg); }
    }
    .animate-orbit-slow { animation: orbit-slow 12s linear infinite; }
    .animate-orbit-fast { animation: orbit-fast 8s linear infinite; }
  `}</style>
</div>

<Us />


  <LeftPinnedPopup users={newUsers} />

      {/* Third Box */}
      <div className="-mx-6 md:-mx-12 flex flex-col items-center text-center px-4 py-5 bg-purple-100 ">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">We Are All For You</h1>

       <img
  src="https://res.cloudinary.com/dcoojr90p/image/upload/v1764327896/hand1_ja0lvn.png"
  alt="Bloom Illustration"
  className="w-150 h-90 object-cover mb-4"
/>


        <p className="text-2 text-gray-900 max-w-1xl mb-6 text-base">
          With tools designed to block fake profiles and shady activity, Bloom keeps your community safe, warm, and real.
        </p>

        <button
          className="w-100 py-3 border-2 border-black text-purple-700 rounded-lg bg-purple-50 hover:bg-purple-200 transition focus:outline-none focus:ring-2 focus:ring-purple-200"
          onClick={() => setShowLogin(true)}
        >
          Access your Bloom account
        </button>
      </div>

        {/* Login modal */}
     {showLogin && <LoginModal onClose={() => setShowLogin(false)} onSuccess={handleLoginSuccess} />}

      {/* Onboarding Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
          <OnboardingFlow onFinish={() => setShowOnboarding(false)} />
        </div>
      )}

      {/* Hidden SEO (visible to crawlers; keep human copy visible too) */}
      <div className="sr-only">
        <p>
          Bloom is a privacy-first women’s platform designed to empower genuine connections, conversations, and
          community among women worldwide. Keywords: women community, safe space for women, women wellness, women support,
          women empowerment, women networking, female entrepreneurship.
        </p>
      </div>

      <BloomInfo2 />
    </div>
  );
}










