import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";


export default function FaceVerification({ onVerified }) {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
const navigate = useNavigate();

  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [idFile, setIdFile] = useState(null);
  const [fullName, setFullName] = useState("");
  const [status, setStatus] = useState(""); // pending | approved | rejected
  const [submissionId, setSubmissionId] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
 const [notification, setNotification] = useState({ message: "", type: "" });

  const [timer, setTimer] = useState(0);
const [showApprovedPopup, setShowApprovedPopup] = useState(false);
const user = JSON.parse(localStorage.getItem("bloomUser"));


  // ✅ Environment-safe API URL
  const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";



  const steps = [
    "Say your full name while looking into the camera before clicking next ",
    "Say today's date and year before clicking next",
    "Give us a warm smile while looking into the camera 😊 before clicking next",
    "Add a clear photo of your ID before clicking next",
  ];

  

    // Function to show notification for 3 seconds
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  // Start recording
  const startRecording = async () => {
    setRecording(true);
    setStepIndex(0);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      
      
      
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "video/webm; codecs=vp9,opus" });
      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        setVideoUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
      };
      mediaRecorderRef.current.start();
    } catch (err) {
      console.error("Error accessing camera/mic:", err);
      alert("Camera or microphone not accessible.");
      setRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const nextStep = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
      if (stepIndex === steps.length - 2) stopRecording();
    }
  };

  const handleFileChange = (e) => setIdFile(e.target.files[0]);

  const handleSubmit = async () => {
  if (!user?._id) {
    showNotification("Please log in again", "error");
    return;
  }

  if (!idFile || !fullName) {
    showNotification("❌ Please provide your full name and upload an ID.", "error");
    return;
  }

    setUploading(true);
    try {
      const blob = await fetch(videoUrl).then((r) => r.blob());
      const formData = new FormData();
      formData.append("video", blob, "face-verification.webm");
      formData.append("id", idFile);
      formData.append("name", fullName);
      formData.append("userId", user._id); 

      const res = await fetch(`${SERVER_URL}/api/verify-face`, {
        method: "POST",
        body: formData,
      });

    const data = await res.json();

if (data.success) {
  showNotification(
    "Verification submitted. We’ll check and get back to you shortly.",
    "success"
  );

  setStatus("pending");
  setSubmissionId(data.submission._id);
  setTimer(40);



      
      } else {
     showNotification(`❌ Verification failed: ${data.message}`, "error");
      }
    } catch (err) {
      console.error(err);
      showNotification("❌ Error uploading. Try again later.", "error");
    } finally {
      setUploading(false);
    }
  };


useEffect(() => {
  if (timer <= 0 && submissionId && status === "pending") {
    // ✅ Admin NOT ACTIVE flow begins here

    localStorage.setItem("verificationStatus", "pending");

    if (typeof onVerified === "function") {
      onVerified({ verificationStatus: "pending" });
    }

    navigate("/welcome");
    return;
  }

  if (timer <= 0) return;

  const countdown = setInterval(() => {
    setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
  }, 1000);

  return () => clearInterval(countdown);
}, [timer, submissionId, status]);












// Polling for verification status
// Polling for verification status
useEffect(() => {
  if (!submissionId) return;

  const interval = setInterval(async () => {
    try {
      const res = await fetch(`${SERVER_URL}/api/verify-face/${submissionId}`);
      if (!res.ok) throw new Error("Failed to fetch status");

      const data = await res.json();
      if (!data.success) return;

      const newStatus = data.submission.status;
      setStatus(newStatus);

      if (newStatus === "approved") {
        clearInterval(interval);

        // ✅ persist approval
        const updatedUser = {
          ...user,
          verificationStatus: "approved",
        };

        localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
        localStorage.removeItem("verificationStatus");

        setShowApprovedPopup(true);
        showNotification("✅ Your verification approved. Welcome!", "success");

        if (typeof onVerified === "function") {
          onVerified({ verificationStatus: "approved" });
        }
      }

      if (newStatus === "rejected") {
        clearInterval(interval);
        showNotification(
          "❌ Your verification was rejected. Please submit again.",
          "error"
        );
        resetVerification();
      }
    } catch (err) {
      console.error("Error polling verification status:", err);
    }
  }, 3000);

  return () => clearInterval(interval);
}, [submissionId]);


// Helper to reset states
const resetVerification = () => {
  setSubmissionId(null);
  setStatus("");
  setVideoUrl(null);
  setIdFile(null);
  setFullName("");
  setStepIndex(0);
  setShowApprovedPopup(false);
};




 // Called when user clicks continue on approved popup
const handleApprovedContinue = () => {
  setShowApprovedPopup(false);
  navigate("/welcome"); // ✅ NOT /info
};



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
     
     {showApprovedPopup && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-2">
    <div className="bg-white p-4 rounded-lg max-w-lg w-full relative">
      <p className="text-lg font-bold text-green-600 mb-4">
        ✅ Your verification is approved!
      </p>
      <button
        onClick={handleApprovedContinue}
        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Continue
      </button>
    </div>
  </div>
)}

       {/* Notification */}
  {notification.message && (
  <div
    className={`fixed top-6 left-1/2 z-50 transform -translate-x-1/2 flex items-center space-x-3 max-w-md w-full px-6 py-4 rounded-xl shadow-lg text-white font-medium text-sm
      bg-sky-500
      animate-slideDown fade-out`}
  >
    {/* Icon */}
    <span className="text-xl">ℹ️</span>

    {/* Message */}
    <span className="flex-1">{notification.message}</span>

    {/* Close button */}
    <button
      className="text-white text-lg font-bold focus:outline-none hover:text-gray-200 transition"
      onClick={() => setNotification({ message: "", type: "" })}
      aria-label="Close notification"
    >
      &times;
    </button>
  </div>
)}

      
     
      <h2 className="text-2xl font-bold text-purple-700 mb-2">Let's comfirm it's really you</h2>
            <p className="mb-4 text-lg text-gray-600 text-center max-w-xl">
        We verify accounts to keep Bloom safe. This helps protect our community from fake profiles and harassment.
      </p>

      <p className="mb-4 text-lg text-gray-600 text-center">
        {!recording && !videoUrl ? "Press Start to Begin Face Verification" : steps[stepIndex]}
      </p>

      {/* Step Progress */}
      {recording && (
        <div className="flex justify-center mb-4 space-x-2" aria-hidden>
          {steps.slice(0, steps.length - 1).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full ${
                i <= stepIndex ? "bg-purple-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}

      <div className="relative w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 mb-4 border-4 border-purple-600 rounded-full overflow-hidden">
        <Webcam
          ref={webcamRef}
          audio
          mirrored
          videoConstraints={{ facingMode: "user" }}
          className="w-full h-full object-cover rounded-full"
          aria-label="Camera preview"
        />
        {recording && (
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold  bg-opacity-30">
            
          </div>
        )}
      </div>

      {!recording && !videoUrl && (
        <button
          onClick={startRecording}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Begin Let.s confrim it's really you
        </button>
      )}

      {recording && (
        <button
          onClick={nextStep}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          aria-label="Next verification step"
        >
          {stepIndex < steps.length - 2 ? "Next" : "Finish"}
        </button>
      )}

    {videoUrl && stepIndex === 3 && (
  <div className="mt-6 w-full flex flex-col items-center">
    <input
      type="text"
      placeholder=" your full name"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      className="mb-4 px-4 py-2 border rounded w-85 text-base focus:outline focus:ring-2 focus:ring-purple-300"
    aria-required="true"

    />

    <label
      htmlFor="idUpload"
      className="w-90 h-40 border-2 border-dashed border-purple-500 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50 transition"
   aria-label="upload photo of ID"
   >
      {idFile ? (
        <img
          src={URL.createObjectURL(idFile)}
          alt="Uploaded ID"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <>
          <span className="text-gray-600">Add your photo</span>
          <span className="text-xs mt-1 text-gray-500">(Accepted: Passport, ID, Driver’s License, etc.)</span>
        </>
      )}
    </label>
    <input id="idUpload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

    <p className="text-sm text-gray-500 text-center mt-2">
      The name on your ID must match the name you said in the video and your entering.
    </p>

    <button
      onClick={handleSubmit}
      disabled={uploading || !fullName}
      className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
    >
      {uploading ? "Uploading..." : "Submit Verification"}
    </button>

    <button
      onClick={() => {
        setVideoUrl(null);
        setIdFile(null);
        setFullName("");
        setStepIndex(0);
        setStatus("");
        setSubmissionId(null);
      }}
      className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
    >
      Restart Verification
    </button>

    {status && (
      <p className="mt-2 text-sm font-medium text-gray-700">
        Status: <span className="font-bold">{status}</span>
      </p>
    )}

          {/* Timer UI */}
             {timer > 0 && (
            <p className="mt-2 text-center text-gray-700 font-medium">
              Please wait {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)} before retrying.
            </p>
          )}



        </div>

   
           
  

      )}






    </div>
  );
}



































































































































// first working code 

// import { useRef, useState, useEffect } from "react";
// import Webcam from "react-webcam";
// import { useNavigate } from "react-router-dom";


// export default function FaceVerification({ onVerified }) {
//   const webcamRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
// const navigate = useNavigate();

//   const [recording, setRecording] = useState(false);
//   const [videoUrl, setVideoUrl] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [idFile, setIdFile] = useState(null);
//   const [fullName, setFullName] = useState("");
//   const [status, setStatus] = useState(""); // pending | approved | rejected
//   const [submissionId, setSubmissionId] = useState(null);
//   const [stepIndex, setStepIndex] = useState(0);
//   const [notification, setNotification] = useState("");
//   const [timer, setTimer] = useState(0);
// const [holdExtra, setHoldExtra] = useState(false); // track if they choose 30-min hold
// const [showHoldOption, setShowHoldOption] = useState(false); 
// const [holdTimer, setHoldTimer] = useState(0); // 30-min hold countdown
// const [showApprovedPopup, setShowApprovedPopup] = useState(false);

//   // ✅ Environment-safe API URL
//   const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";



//   const steps = [
//     "Say your full name while looking into the camera before clicking next ",
//     "Say today's date and year before clicking next",
//     "Give us a warm smile while looking into the camera 😊 before clicking next",
//     "Add a clear photo of your ID before clicking next",
//   ];

  

//     // Function to show notification for 3 seconds
//   const showNotification = (message, type = "success") => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification({ message: "", type: "" }), 3000);
//   };

//   // Start recording
//   const startRecording = async () => {
//     setRecording(true);
//     setStepIndex(0);
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      
      
      
//       mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "video/webm; codecs=vp9,opus" });
//       const chunks = [];
//       mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
//       mediaRecorderRef.current.onstop = () => {
//         const blob = new Blob(chunks, { type: "video/webm" });
//         setVideoUrl(URL.createObjectURL(blob));
//         stream.getTracks().forEach((track) => track.stop());
//       };
//       mediaRecorderRef.current.start();
//     } catch (err) {
//       console.error("Error accessing camera/mic:", err);
//       alert("Camera or microphone not accessible.");
//       setRecording(false);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     }
//   };

//   const nextStep = () => {
//     if (stepIndex < steps.length - 1) {
//       setStepIndex(stepIndex + 1);
//       if (stepIndex === steps.length - 2) stopRecording();
//     }
//   };

//   const handleFileChange = (e) => setIdFile(e.target.files[0]);

//   const handleSubmit = async () => {
//     if (!idFile || !fullName) {
//       showNotification("❌ Please provide your full name and upload an ID before submitting.", "error");
//       return;
//     }

//     setUploading(true);
//     try {
//       const blob = await fetch(videoUrl).then((r) => r.blob());
//       const formData = new FormData();
//       formData.append("video", blob, "face-verification.webm");
//       formData.append("id", idFile);
//       formData.append("name", fullName);

//       const res = await fetch(`${SERVER_URL}/api/verify-face`, {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (data.success) {
//        setNotification("Verification submitted. We’ll check and get back to you shortly.");
//         setStatus("pending");
//         setSubmissionId(data.submission._id);
//         setTimer(30 * 60); // 30 minutes = 1800 seconds

//         setHoldTimer(0);
//   setShowHoldOption(false);
//         setHoldExtra(false);
//       } else {
//      showNotification(`❌ Verification failed: ${data.message}`, "error");
//       }
//     } catch (err) {
//       console.error(err);
//       showNotification("❌ Error uploading. Try again later.", "error");
//     } finally {
//       setUploading(false);
//     }
//   };


 
// useEffect(() => {
//   if (timer <= 0) {
//   if (submissionId) {
//     setShowHoldOption(true); // show choice ONLY
//   }
//   return;
// }


//   const countdown = setInterval(() => {
//     setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
//   }, 1000);

//   return () => clearInterval(countdown);
// }, [timer, submissionId]);



// // 30s hold countdown
// useEffect(() => {
//   if (holdTimer <= 0) return;

//   const countdown = setInterval(() => {
//     setHoldTimer((prev) => (prev <= 1 ? 0 : prev - 1));
//   }, 1000);

//   return () => clearInterval(countdown);
// }, [holdTimer]);





// const startHold = () => {
//   setHoldExtra(true);
//   setShowHoldOption(false);
//   setHoldTimer(5 * 60); // or 30 * 60 if you want 30 mins
// };



// // Polling for verification status
// useEffect(() => {
//   if (!submissionId) return;

//   let interval = setInterval(async () => {

  

//     try {
//     const res = await fetch(`${SERVER_URL}/api/verify-face/${submissionId}`);

//       if (!res.ok) throw new Error("Failed to fetch status");
//       const data = await res.json();

//       if (!data.success) return;

//       const status = data.submission.status;
//       setStatus(status);

//       if (status === "approved") {
//         clearInterval(interval);
//         setShowApprovedPopup(true);
//         showNotification("✅ Your verification approved. Welcome!", "success");
//         onVerified();
//       } else if (status === "rejected") {
//         clearInterval(interval);
//         showNotification("❌ Your verification was rejected. Please submit again.", "error");
//         resetVerification();
//       }
//     } catch (err) {
//       console.error("Error polling verification status:", err);
//     }
//   }, 3000);

//   // Clean up interval on unmount or submissionId change
//   return () => clearInterval(interval);
// }, [submissionId, onVerified]);

// // Helper to reset states
// const resetVerification = () => {
//   setSubmissionId(null);
//   setStatus("");
//   setVideoUrl(null);
//   setIdFile(null);
//   setFullName("");
//   setStepIndex(0);
//   setShowApprovedPopup(false);
// };




//  // Called when user clicks continue on approved popup
//  const handleApprovedContinue = () => {
//   setShowApprovedPopup(false);
//   if (typeof onVerified === "function") onVerified(); // step moves to InfoUploadForm
//   navigate("/info"); // redirect if needed
// };




//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
     
//      {showApprovedPopup && (
//   <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-2">
//     <div className="bg-white p-4 rounded-lg max-w-lg w-full relative">
//       <p className="text-lg font-bold text-green-600 mb-4">
//         ✅ Your verification is approved!
//       </p>
//       <button
//         onClick={handleApprovedContinue}
//         className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//       >
//         Continue
//       </button>
//     </div>
//   </div>
// )}

//        {/* Notification */}
//   {notification.message && (
//   <div
//     className={`fixed top-6 left-1/2 z-50 transform -translate-x-1/2 flex items-center space-x-3 max-w-md w-full px-6 py-4 rounded-xl shadow-lg text-white font-medium text-sm
//       bg-sky-500
//       animate-slideDown fade-out`}
//   >
//     {/* Icon */}
//     <span className="text-xl">ℹ️</span>

//     {/* Message */}
//     <span className="flex-1">{notification.message}</span>

//     {/* Close button */}
//     <button
//       className="text-white text-lg font-bold focus:outline-none hover:text-gray-200 transition"
//       onClick={() => setNotification({ message: "", type: "" })}
//       aria-label="Close notification"
//     >
//       &times;
//     </button>
//   </div>
// )}

      
     
//       <h2 className="text-2xl font-bold text-purple-700 mb-2">Let's comfirm it's really you</h2>
//             <p className="mb-4 text-lg text-gray-600 text-center max-w-xl">
//         We verify accounts to keep Bloom safe. This helps protect our community from fake profiles and harassment.
//       </p>

//       <p className="mb-4 text-lg text-gray-600 text-center">
//         {!recording && !videoUrl ? "Press Start to Begin Face Verification" : steps[stepIndex]}
//       </p>

//       {/* Step Progress */}
//       {recording && (
//         <div className="flex justify-center mb-4 space-x-2" aria-hidden>
//           {steps.slice(0, steps.length - 1).map((_, i) => (
//             <div
//               key={i}
//               className={`w-4 h-4 rounded-full ${
//                 i <= stepIndex ? "bg-purple-600" : "bg-gray-300"
//               }`}
//             />
//           ))}
//         </div>
//       )}

//       <div className="relative w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 mb-4 border-4 border-purple-600 rounded-full overflow-hidden">
//         <Webcam
//           ref={webcamRef}
//           audio
//           mirrored
//           videoConstraints={{ facingMode: "user" }}
//           className="w-full h-full object-cover rounded-full"
//           aria-label="Camera preview"
//         />
//         {recording && (
//           <div className="absolute inset-0 flex items-center justify-center text-white font-bold  bg-opacity-30">
            
//           </div>
//         )}
//       </div>

//       {!recording && !videoUrl && (
//         <button
//           onClick={startRecording}
//           className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//         >
//           Begin Let.s confrim it's really you
//         </button>
//       )}

//       {recording && (
//         <button
//           onClick={nextStep}
//           className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//           aria-label="Next verification step"
//         >
//           {stepIndex < steps.length - 2 ? "Next" : "Finish"}
//         </button>
//       )}

//     {videoUrl && stepIndex === 3 && (
//   <div className="mt-6 w-full flex flex-col items-center">
//     <input
//       type="text"
//       placeholder=" your full name"
//       value={fullName}
//       onChange={(e) => setFullName(e.target.value)}
//       className="mb-4 px-4 py-2 border rounded w-85 text-base focus:outline focus:ring-2 focus:ring-purple-300"
//     aria-required="true"

//     />

//     <label
//       htmlFor="idUpload"
//       className="w-90 h-40 border-2 border-dashed border-purple-500 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50 transition"
//    aria-label="upload photo of ID"
//    >
//       {idFile ? (
//         <img
//           src={URL.createObjectURL(idFile)}
//           alt="Uploaded ID"
//           className="w-full h-full object-cover rounded-lg"
//         />
//       ) : (
//         <>
//           <span className="text-gray-600">Add your photo</span>
//           <span className="text-xs mt-1 text-gray-500">(Accepted: Passport, ID, Driver’s License, etc.)</span>
//         </>
//       )}
//     </label>
//     <input id="idUpload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

//     <p className="text-sm text-gray-500 text-center mt-2">
//       The name on your ID must match the name you said in the video and your entering.
//     </p>

//     <button
//       onClick={handleSubmit}
//       disabled={uploading || !fullName}
//       className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
//     >
//       {uploading ? "Uploading..." : "Submit Verification"}
//     </button>

//     <button
//       onClick={() => {
//         setVideoUrl(null);
//         setIdFile(null);
//         setFullName("");
//         setStepIndex(0);
//         setStatus("");
//         setSubmissionId(null);
//       }}
//       className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
//     >
//       Restart Verification
//     </button>

//     {status && (
//       <p className="mt-2 text-sm font-medium text-gray-700">
//         Status: <span className="font-bold">{status}</span>
//       </p>
//     )}

//           {/* Timer UI */}
//              {timer > 0 && (
//             <p className="mt-2 text-center text-gray-700 font-medium">
//               Please wait {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)} before retrying.
//             </p>
//           )}

//           {holdTimer > 0 && (
//             <p className="mt-2 text-center text-gray-700 font-medium">
//               Hold active: {Math.floor(holdTimer / 60)}:{("0" + (holdTimer % 60)).slice(-2)} remaining
//             </p>
//           )}

//           {timer === 0 && holdTimer === 0 && showHoldOption && (
//             <p className="mt-2 text-center text-yellow-800 font-medium">
//               Thank you for your patience. We may take a little longer to verify your identity.
//             </p>
//           )}


//         </div>

   
           
  

//       )}
// {showHoldOption && (
//   <div>
//     <p>Your verification is still under review.</p>
//     <button onClick={startHold}>
//       Wait {holdTimer === 0 ? "5" : Math.floor(holdTimer / 60)} more minutes
//     </button>
//   </div>
// )}





//     </div>
//   );
// }

