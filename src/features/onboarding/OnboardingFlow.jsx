

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FaceVerification from "./FaceVerification";
import InfoUploadForm from "./InfoUploadForm";

export default function OnboardingFlow({ setUser, setPaid }) {
  const [step, setStep] = useState(1);
  const [user, setLocalUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNextStep = (nextStep) => {
    setError("");
    setStep(nextStep);
  };

  // ✅ After Info form submission
  const handleInfoSubmit = (userData) => {
    setLocalUser(userData);

    if (typeof setUser === "function") {
      setUser(userData);
    }

    localStorage.setItem("bloomUser", JSON.stringify(userData));
    
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto min-h-screen flex flex-col p-6">
      {loading && (
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center text-gray-700 font-semibold">
          Please wait...
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

   
{step === 1 && (
  <InfoUploadForm
    onInfoVerified={(userData) => {
      handleInfoSubmit(userData);
      handleNextStep(2); // ✅ move to Face
    }}
  />
)}

{step === 2 && (
  <FaceVerification
    onVerified={(payload) => {
      if (payload?.verificationStatus) {
        localStorage.setItem(
          "verificationStatus",
          payload.verificationStatus
        );
      }
      navigate("/welcome"); // ✅ only here
    }}
  />
)}


    </div>
  );
}





















// first working code 





// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import FaceVerification from "./FaceVerification";
// import InfoUploadForm from "./InfoUploadForm";

// export default function OnboardingFlow({ setUser, setPaid }) {
//   const [step, setStep] = useState(1);
//   const [user, setLocalUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleNextStep = (nextStep) => {
//     setError("");
//     setStep(nextStep);
//   };

//   // ✅ After Info form submission
//   const handleInfoSubmit = (userData) => {
//     setLocalUser(userData);

//     if (typeof setUser === "function") {
//       setUser(userData);
//     }

//     localStorage.setItem("bloomUser", JSON.stringify(userData));
//     navigate("/welcome");
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-white overflow-auto min-h-screen flex flex-col p-6">
//       {loading && (
//         <div className="absolute inset-0 bg-black/10 flex items-center justify-center text-gray-700 font-semibold">
//           Please wait...
//         </div>
//       )}

//       {error && (
//         <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
//           {error}
//         </div>
//       )}

//       {step === 1 && <FaceVerification onVerified={() => handleNextStep(2)} />}

//       {step === 2 && (
//         <InfoUploadForm
//           onInfoVerified={handleInfoSubmit}
//           onBack={() => handleNextStep(1)}
//         />
//       )}
//     </div>
//   );
// }