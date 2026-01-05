// import { useEffect, useState } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [selectedSection, setSelectedSection] = useState("faceVerification");
//   const [verifications, setVerifications] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [modalContent, setModalContent] = useState(null);

//   const token = localStorage.getItem("adminToken");
//   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

//   // Protect route: redirect if no token
//   useEffect(() => {
//     if (!token) navigate("/admin-login");
//   }, [navigate, token]);

//   // Fetch verifications
//   const fetchVerifications = async () => {
//     setLoading(true);
//     try {
   

// const res = await fetch(`${API_URL}/api/verify-face`, {
//   headers: { "Authorization": `Bearer ${token}` }
// });


//       const data = await res.json();
//       if (data.success) setVerifications(data.submissions || []);
//       else {
//         alert("Failed to fetch verifications: " + (data.message || "Unknown error"));
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error fetching verifications");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Approve / Reject
//   const updateStatus = async (id, status) => {
//     try {
//       const res = await fetch(`${API_URL}/api/verify-face/verifications/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify({ status })
//       });
//       const data = await res.json();
//       if (data.success) {
//         setVerifications(prev => prev.map(v => (v._id === id ? { ...v, status: data.submission.status } : v)));
//         setModalContent(null);
//       } else alert("Failed to update status: " + (data.message || "Unknown error"));
//     } catch (err) {
//       console.error(err);
//       alert("Error updating status");
//     }
//   };

//   // Delete
//   const deleteVerification = async (id) => {
//     if (!confirm("Are you sure you want to delete this submission?")) return;
//     try {
//     const res = await fetch(`${API_URL}/api/verify-face/verifications/${id}`, {
//   method: "DELETE",
//   headers: { "Authorization": `Bearer ${token}` }
// });

//       const data = await res.json();
//       if (data.success) setVerifications(prev => prev.filter(v => v._id !== id));
//       else alert("Failed to delete submission: " + (data.message || "Unknown error"));
//     } catch (err) {
//       console.error(err);
//       alert("Error deleting submission");
//     }
//   };

//   // Polling every 5 seconds
//   useEffect(() => {
//     if (!token) return;
//     fetchVerifications();
//     const interval = setInterval(fetchVerifications, 5000);
//     return () => clearInterval(interval);
//   }, [token]);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-purple-800 text-white flex flex-col">
//         <div className="p-6 flex items-center justify-between">
//           <h1 className="text-2xl font-bold">Admin</h1>
          
//           <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
//             <FaBars size={24} />
//           </button>

//              <button
//     onClick={() => navigate("/welcome")}

//   >
//     Go to Welcome
//   </button>
//         </div>
//         <nav className={`flex-col flex px-6 space-y-4 md:flex ${menuOpen ? "flex" : "hidden"}`}>
//           <button
//             onClick={() => setSelectedSection("faceVerification")}
//             className={`text-left w-full p-2 rounded hover:bg-purple-700 ${selectedSection === "faceVerification" ? "bg-purple-700" : ""}`}
//           >
//             Face Verification
//           </button>
         
//         </nav>

       
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-auto">
//         {selectedSection === "faceVerification" && (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Face Verification Submissions</h2>
//             {loading ? (
//               <p>Loading...</p>
//             ) : verifications.length === 0 ? (
//               <p>No submissions yet</p>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {verifications.map(v => (
//                   <div key={v._id} className="bg-white p-4 rounded-lg shadow relative space-y-3">
//                     <button
//                       onClick={() => deleteVerification(v._id)}
//                       className="absolute top-2 right-2 text-red-600 hover:text-red-800"
//                     >
//                       <FaTimes />
//                     </button>
//                     <p className="font-semibold">Name: {v.name}</p>
//                     <p>Status: {v.status}</p>

//                   <video
//   src={`${API_URL}${v.videoUrl}`}
//   controls
//   className="w-full h-48 rounded cursor-pointer"
//   onClick={() => setModalContent({ type: "video", src: `${API_URL}${v.videoUrl}`, id: v._id, status: v.status })}
// />

// <img
//   src={`${API_URL}${v.idUrl}`}
//   alt="ID"
//   className="w-full h-48 object-cover rounded cursor-pointer"
//   onClick={() => setModalContent({ type: "image", src: `${API_URL}${v.idUrl}`, id: v._id, status: v.status })}
// />


//                     {v.status === "pending" && (
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => updateStatus(v._id, "approved")}
//                           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                         >
//                           Approve
//                         </button>
//                         <button
//                           onClick={() => updateStatus(v._id, "rejected")}
//                           className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                         >
//                           Reject
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {selectedSection === "therapistBoard" && (
//           <div>
//             <h2 className="text-2xl font-bold mb-4">Therapist Board</h2>
//             <p>Setup and manage therapists here (coming soon).</p>
//           </div>
//         )}

//         {/* Modal */}
//         {modalContent && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-2"
//             onClick={() => setModalContent(null)}
//           >
//             <div className="bg-white p-4 rounded-lg max-w-lg w-full relative">
//               <button
//                 className="absolute top-2 right-2 text-red-600 hover:text-red-800"
//                 onClick={() => setModalContent(null)}
//               >
//                 <FaTimes />
//               </button>

//               {modalContent.type === "video" ? (
//                 <video src={modalContent.src} controls className="w-full h-64 rounded" />
//               ) : (
//                 <img src={modalContent.src} alt="ID" className="w-full h-64 object-cover rounded" />
//               )}

//               {modalContent.status === "pending" && (
//                 <div className="flex space-x-2 mt-4">
//                   <button
//                     onClick={() => updateStatus(modalContent.id, "approved")}
//                     className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => updateStatus(modalContent.id, "rejected")}
//                     className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
