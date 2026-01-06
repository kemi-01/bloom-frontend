import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";


export default function FaceVerification({ onVerified }) {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [idFile, setIdFile] = useState(null);
  const [fullName, setFullName] = useState("");
  const [status, setStatus] = useState(""); // pending | approved | rejected
  const [submissionId, setSubmissionId] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [notification, setNotification] = useState("");
  const [timer, setTimer] = useState(0);
const [holdExtra, setHoldExtra] = useState(false); // track if they choose 30-min hold
const [showHoldOption, setShowHoldOption] = useState(false); 
const [holdTimer, setHoldTimer] = useState(0); // 30-min hold countdown
const [showApprovedPopup, setShowApprovedPopup] = useState(false);

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
    if (!idFile || !fullName) {
      showNotification("❌ Please provide your full name and upload an ID before submitting.", "error");
      return;
    }

    setUploading(true);
    try {
      const blob = await fetch(videoUrl).then((r) => r.blob());
      const formData = new FormData();
      formData.append("video", blob, "face-verification.webm");
      formData.append("id", idFile);
      formData.append("name", fullName);

      const res = await fetch(`${SERVER_URL}/api/verify-face`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
       setNotification("Verification submitted. We’ll check and get back to you shortly.");
        setStatus("pending");
        setSubmissionId(data.submission._id);
        setTimer(40); // start 40s timer
        setHoldTimer(0);
  setShowHoldOption(false);
        setHoldExtra(false);
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

 // Initial 40s countdown
  
  // 40-second timer (only after submit)
useEffect(() => {
  if (timer <= 0) {
    if (submissionId) setShowHoldOption(true); // only show hold if submitted
    return;
  }

  const countdown = setInterval(() => {
    setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
  }, 1000);

  return () => clearInterval(countdown);
}, [timer, submissionId]);

// Automatically start 30s hold after 40s
useEffect(() => {
  if (timer === 0 && showHoldOption && holdTimer === 0 && submissionId) {
    setHoldTimer(30);
  }
}, [timer, showHoldOption, holdTimer, submissionId]);

// 30s hold countdown
useEffect(() => {
  if (holdTimer <= 0) return;

  const countdown = setInterval(() => {
    setHoldTimer((prev) => (prev <= 1 ? 0 : prev - 1));
  }, 1000);

  return () => clearInterval(countdown);
}, [holdTimer]);


// Polling for verification status
useEffect(() => {
  if (!submissionId) return;

  let interval = setInterval(async () => {

  

    try {
    const res = await fetch(`${SERVER_URL}/api/verify-face/${submissionId}`);

      if (!res.ok) throw new Error("Failed to fetch status");
      const data = await res.json();

      if (!data.success) return;

      const status = data.submission.status;
      setStatus(status);

      if (status === "approved") {
        clearInterval(interval);
        setShowApprovedPopup(true);
        showNotification("✅ Your verification approved. Welcome!", "success");
        onVerified();
      } else if (status === "rejected") {
        clearInterval(interval);
        showNotification("❌ Your verification was rejected. Please submit again.", "error");
        resetVerification();
      }
    } catch (err) {
      console.error("Error polling verification status:", err);
    }
  }, 3000);

  // Clean up interval on unmount or submissionId change
  return () => clearInterval(interval);
}, [submissionId, onVerified]);

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
    if (onVerified) onVerified();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
     
     
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

          {timer === 0 && holdTimer === 0 && showHoldOption && (
            <p className="mt-2 text-center text-yellow-800 font-medium">
              thank you for your patience we may take a little longer to verify your identity.
            </p>
          )}

          {holdTimer > 0 && (
            <p className="mt-2 text-center text-gray-700 font-medium">
              Hold active: {Math.floor(holdTimer / 60)}:{("0" + (holdTimer % 60)).slice(-2)} remaining
            </p>
          )}


        </div>

   
           
  

      )}
   




    </div>
  );
}













































































































































// import { useState, useRef, useEffect } from "react";
// import Webcam from "react-webcam";
// import * as faceapi from "face-api.js";

// export default function FaceVerification({ onVerified }) {
//   const webcamRef = useRef(null);
//   const [recording, setRecording] = useState(false);
//   const [modelLoaded, setModelLoaded] = useState(false);
//   const [currentInstruction, setCurrentInstruction] = useState("Move LEFT to begin");
//   const [progress, setProgress] = useState({ left: false, right: false, up: false, down: false });
//   const directions = ["left", "right", "up", "down"];

//   // Load face-api models
//   useEffect(() => {
//     const loadModels = async () => {
//       const MODEL_URL = "/models"; // models should be in public/models
//       await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
//       await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
//       setModelLoaded(true);
//     };
//     loadModels();
//   }, []);

//   const startRecording = () => {
//     if (!modelLoaded) return alert("Models are loading...");
//     setRecording(true);
//   };

//   const captureFace = () => webcamRef.current.getScreenshot();

//   useEffect(() => {
//     if (!recording) return;
//     const interval = setInterval(async () => {
//       const video = webcamRef.current?.video;
//       if (!video || video.readyState !== 4) return;

//       const detection = await faceapi
//         .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
//         .withFaceLandmarks();

//       if (!detection) return;

//       const { videoWidth, videoHeight } = video;
//       const centerX = videoWidth / 2;
//       const centerY = videoHeight / 2;
//       const nose = detection.landmarks.getNose();
//       const noseX = nose[3].x;
//       const noseY = nose[3].y;
//       const tolerance = 50;

//       const updatedProgress = { ...progress };
//       const nextDir = directions.find((dir) => !updatedProgress[dir]);
//       if (!nextDir) {
//         clearInterval(interval);
//         setCurrentInstruction("✅ All done! Click Submit");
//         return;
//       }

//       switch (nextDir) {
//         case "left":
//           setCurrentInstruction("Move your head LEFT");
//           if (noseX < centerX - tolerance) updatedProgress.left = true;
//           break;
//         case "right":
//           setCurrentInstruction("Move your head RIGHT");
//           if (noseX > centerX + tolerance) updatedProgress.right = true;
//           break;
//         case "up":
//           setCurrentInstruction("Move your head UP");
//           if (noseY < centerY - tolerance) updatedProgress.up = true;
//           break;
//         case "down":
//           setCurrentInstruction("Move your head DOWN");
//           if (noseY > centerY + tolerance) updatedProgress.down = true;
//           break;
//       }

//       setProgress(updatedProgress);
//     }, 200);

//     return () => clearInterval(interval);
//   }, [recording, progress]);

//   const handleSubmit = () => {
//     const faceImage = captureFace();
//     console.log("Captured face (send to backend or verify manually):", faceImage);
//     alert("✅ Face verification captured. Proceeding to account creation.");
//     onVerified();
//   };

//   const getOverlayStyle = (dir) => {
//     const base = { position: "absolute", backgroundColor: "rgba(0,255,0,0.3)", zIndex: 10, transition: "all 0.3s" };
//     if (dir === "left") return { ...base, left: 0, top: 0, height: "100%", width: progress.left ? "50%" : 0 };
//     if (dir === "right") return { ...base, right: 0, top: 0, height: "100%", width: progress.right ? "50%" : 0 };
//     if (dir === "up") return { ...base, top: 0, left: 0, width: "100%", height: progress.up ? "50%" : 0 };
//     if (dir === "down") return { ...base, bottom: 0, left: 0, width: "100%", height: progress.down ? "50%" : 0 };
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-purple-50 p-4">
//       <h2 className="text-2xl font-bold text-purple-700 mb-4">{currentInstruction}</h2>

//       {!recording && (
//         <button
//           onClick={startRecording}
//           className="mb-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
//         >
//           Start Verification
//         </button>
//       )}

//       <div className="relative w-64 h-64">
//         <Webcam
//           ref={webcamRef}
//           audio={false}
//           videoConstraints={{ facingMode: "user" }}
//           className="rounded-full w-full h-full object-cover border-4 border-purple-400"
//         />
//         {directions.map((dir) => (
//           <div key={dir} style={getOverlayStyle(dir)} />
//         ))}
//       </div>

//       {Object.values(progress).every((v) => v) && (
//         <button
//           onClick={handleSubmit}
//           className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//         >
//           Submit
//         </button>
//       )}
//     </div>
//   );
// }
