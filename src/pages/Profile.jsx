

// // src/pages/ProfilePage.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import EditProfileModal from "../components/EditProfileModal";
// import AddPostModal from "../components/AddPostModal";

// export default function ProfilePage() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [showEdit, setShowEdit] = useState(false);
//   const [showAddPost, setShowAddPost] = useState(false);
//   const [tab, setTab] = useState("all"); // "all", "image", "video"

//   // Load user from localStorage on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem("bloomUser");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       navigate("/login");
//     }
//   }, []);

//   if (!user) return <p className="text-center mt-20">Loading profile...</p>;

//   // Filter posts by tab
//   const filteredPosts =
//     tab === "all" ? user.posts || [] : (user.posts || []).filter((p) => p.type === tab);

//   // Update user state and sync with localStorage
//   const handleProfileUpdate = (updatedUser) => {
//     setUser(updatedUser);
//     localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//   };

//   return (
//     <div className="">
// {/* Profile Header */}
// <div className="flex flex-col items-center mb-6 relative w-full">
//   <div className="relative w-full h-90">
//     {/* Full-width profile image */}
//     <img
//       src={user.profilePic || "/default-avatar.png"}
//       alt="Profile"
//       className="w-full h-full object-cover cursor-pointer rounded-lg"
//     />
//  <div className="absolute left-4 bottom-4 text-white">
//     <h2 className="text-2xl font-bold shadow-lg">{user.name}</h2>
//     <p className="text-sm text-gray-200">@{user.username}</p>
//   </div>

//     {/* Overlay to change image */}
//       <label
//       htmlFor="profile-upload"
//       className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-purple-600 text-white rounded-full flex justify-center items-center cursor-pointer border-2 border-gray-700 shadow hover:bg-purple-700 text-lg font-bold"
//       title="Change Image"
//     >
//       +
//     </label>
//     <input
//       id="profile-upload"
//       type="file"
//       accept="image/*"
//       className="hidden"
//       onChange={(e) => {
//         const file = e.target.files[0];
//         if (!file) return;
//         // Preview locally
//         const preview = URL.createObjectURL(file);
//         setUser({ ...user, profilePic: preview });

//         // Upload to backend
//         const formData = new FormData();
//         formData.append("_id", user._id);
//         formData.append("profilePic", file);

//         axios
//           .put(`${import.meta.env.VITE_SERVER_URL}/api/users/update`, formData, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("bloomToken")}`,
//               "Content-Type": "multipart/form-data",
//             },
//           })
//           .then((res) => {
//             setUser(res.data);
//             localStorage.setItem("bloomUser", JSON.stringify(res.data));
//           })
//           .catch((err) => console.error(err));
//       }}
//     />
//   </div>


     

//         {/* Bio */}
//         {user.bio && <p className="text-center text-gray-600 mt-2">{user.bio}</p>}

//         {/* Pronouns */}
//         {user.pronouns && <p className="text-gray-500 mt-1">{user.pronouns}</p>}

// {/* Music */}
// {user.music && <p className="text-gray-500 mt-1">🎵 {user.music}</p>}

// {/* Country */}
// {user.country && <p className="text-gray-500 mt-1">🌍 {user.country}</p>}

//         {/* Social Links */}
//         <div className="flex gap-4 mt-1">
//           {user.socials?.instagram && (
//             <a
//               href={`https://instagram.com/${user.socials.instagram}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline"
//             >
//               Instagram
//             </a>
//           )}
//           {user.socials?.twitter && (
//             <a
//               href={`https://twitter.com/${user.socials.twitter}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline"
//             >
//               Twitter
//             </a>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-2 mt-2">
//           <button
//             className="px-4 py-1 rounded bg-purple-600 text-white"
//             onClick={() => setShowEdit(true)}
//           >
//             Edit Profile
//           </button>

//           <button
//             className="px-4 py-1 rounded bg-green-600 text-white"
//             onClick={() => navigate("/chat")}
//           >
//             Message
//           </button>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex justify-around mb-6 border-b border-gray-300">
//         {["all", "image", "video"].map((t) => (
//           <button
//             key={t}
//             className={`flex-1 text-center py-3 font-semibold text-lg rounded-t-lg transition-colors duration-200 ${
//               tab === t ? "border-b-4 border-purple-600 text-purple-600" : "text-gray-500 hover:text-gray-700"
//             }`}
//             onClick={() => setTab(t)}
//           >
//             {t.charAt(0).toUpperCase() + t.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Posts */}
//       <div className="grid grid-cols-3 gap-2 mb-6">
//         {filteredPosts.map((post) => (
//           <div key={post.id} className="relative">
//             {post.type === "image" && <img src={post.url} alt="" className="w-full h-24 object-cover" />}
//             {post.type === "video" && <video src={post.url} className="w-full h-24 object-cover" controls />}
//           </div>
//         ))}

//         <div
//           onClick={() => setShowAddPost(true)}
//           className="flex justify-center items-center border border-gray-300 cursor-pointer h-24 text-gray-500 font-bold"
//         >
//           +
//         </div>
//       </div>

//       {/* Modals */}
//       {showEdit && (
//         <EditProfileModal
//           user={user}
//           setUser={handleProfileUpdate} // sync with ProfilePage state
//           onClose={() => setShowEdit(false)}
//         />
//       )}
//       {showAddPost && (
//         <AddPostModal
//           userId={user._id}
//           onClose={() => setShowAddPost(false)}
//           onPostAdded={(newPosts) =>
//             handleProfileUpdate({
//               ...user,
//               posts: Array.isArray(newPosts) ? [...(user.posts || []), ...newPosts] : [...(user.posts || []), newPosts],
//             })
//           }
//         />
//       )}
//     </div>
//   );
// }
























// // src/pages/ProfilePage.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import EditProfileModal from "../components/EditProfileModal";
// import AddPostModal from "../components/AddPostModal";

// export default function ProfilePage() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [showEdit, setShowEdit] = useState(false);
//   const [showAddPost, setShowAddPost] = useState(false);
//   const [tab, setTab] = useState("all"); // "all", "image", "video"
//   const [currentIndex, setCurrentIndex] = useState(0);
// const [selectedPost, setSelectedPost] = useState(null);

//  useEffect(() => {
//   const storedUser = localStorage.getItem("bloomUser");
//   if (storedUser && storedUser !== "undefined") {
//     try {
//       setUser(JSON.parse(storedUser));
//     } catch (err) {
//       console.error("Failed to parse stored user:", err);
//       localStorage.removeItem("bloomUser"); // clear invalid data
//       navigate("/login");
//     }
//   } else {
//     navigate("/login");
//   }
// }, []);


//   if (!user) return <p className="text-center mt-20">Loading profile...</p>;

//   const filteredPosts =
//     tab === "all" ? user.posts || [] : (user.posts || []).filter((p) => p.type === tab);

//  // update user state immediately
// const handleProfileUpdate = (updatedUser) => {
//   if (!updatedUser) return;
//   setUser(updatedUser); // React re-renders instantly
//   localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
// };

// // Optimistic post addition
// const handlePostAddedOptimistic = (newPost) => {
//   setUser((prev) => ({
//     ...prev,
//     posts: [newPost, ...(prev.posts || [])],
//   }));
// };

//   // Delete current image
//   const deleteImage = async (index) => {
//     try {
//       const formData = new FormData();
//       formData.append("_id", user._id);
//       formData.append("action", "delete");
//       formData.append("index", index);

//       const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/update`, formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       });
//       setUser(res.data);
//       setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
//       localStorage.setItem("bloomUser", JSON.stringify(res.data));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Replace current image
//   const replaceImage = async (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("_id", user._id);
//     formData.append("action", "replace");
//     formData.append("index", index);
//    formData.append("profilePic", file); // instead of "image"


//     try {
//       const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/update`, formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       });
//       setUser(res.data);
//       localStorage.setItem("bloomUser", JSON.stringify(res.data));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Add new image
//   const addImage = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("_id", user._id);
//     formData.append("action", "add");
//     formData.append("profilePic", file); 

//     try {
//       const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/update`, formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       });
//       setUser(res.data);
//       setCurrentIndex(res.data.profilePics.length - 1);
//       localStorage.setItem("bloomUser", JSON.stringify(res.data));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="">
//       {/* Profile Header */}
//       <div className="flex flex-col items-center mb-6 relative w-full bg-black">
//     <div className="relative w-full h-[60vh] md:h-[120vh] rounded-lg overflow-hidden">
//   {user.profilePics?.length > 0 ? (
//     <>
//       <img
//         src={user.profilePics[currentIndex]}
//         alt="Profile"
//         className="w-full h-full object-cover cursor-pointer"
//         onClick={() => {
//           // Move to next image, or loop back to the first
//           setCurrentIndex((prev) =>
//             prev < user.profilePics.length - 1 ? prev + 1 : 0
//           );
//         }}
//       />
//              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
//   {user.profilePics.map((_, idx) => (
//     <span
//       key={idx}
//       onClick={() => setCurrentIndex(idx)}
//       className={`w-3 h-3 rounded-full cursor-pointer ${
//         idx === currentIndex ? "bg-red-600" : "bg-gray-300"
//       }`}
//     />
//   ))}
// </div>


//               {/* Delete */}
//               <button
//                 className="absolute top-2 right-2 bg-red-500 text-white  py-1 rounded"
//                 onClick={() => deleteImage(currentIndex)}
//               >
//                 Delete
//               </button>

//               {/* Replace */}
//               <label className="absolute top-2 right-14 bg-purple-600 text-white px-2 py-1 rounded cursor-pointer">
//                 Replace
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => replaceImage(e, currentIndex)}
//                 />
//               </label>
//             </>
//           ) : (
//             <p className="text-center mt-10 text-gray-500">No profile images</p>
//           )}

//           {/* Add new image */}
//           {(!user.profilePics || user.profilePics.length < 5) && (
//             <label className="absolute bottom-2 right-2 bg-purple-600 text-white px-3 py-1 rounded cursor-pointer">
//             <span>+</span>
//   <span className="text-xs">upload 5 image</span>
//               <input type="file" accept="image/*" className="hidden" onChange={addImage} />
//             </label>
//           )}

//           {/* Name and username */}
          
//           <div className="absolute left-4 bottom-4 text-white">
//             <h2 className="text-2xl font-bold shadow-lg">{user.name}</h2>
//             <p className="text-sm text-gray-200">@{user.username}</p>
//           </div>
//         </div>

//       </div>

      
//         {/* Bio */}
//         {user.bio && <p className="text-center text-gray-600 mt-2">{user.bio}</p>}

//         {/* Pronouns */}
//         {user.pronouns && <p className="text-gray-500 mt-1">{user.pronouns}</p>}

//         {/* Music */}
//         {user.music && <p className="text-gray-500 mt-1">🎵 {user.music}</p>}

//         {/* Country */}
//         {user.country && <p className="text-gray-500 mt-1">🌍 {user.country}</p>}

//         {/* Social Links */}
//         <div className="flex gap-4 mt-1">
//           {user.socials?.instagram && (
//             <a
//               href={`https://instagram.com/${user.socials.instagram}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline"
//             >
//               Instagram
//             </a>
//           )}
//           {user.socials?.twitter && (
//             <a
//               href={`https://twitter.com/${user.socials.twitter}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline"
//             >
//               Twitter
//             </a>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-2 mt-2">
//           <button
//             className="px-4 py-1 rounded bg-purple-600 text-white"
//             onClick={() => setShowEdit(true)}
//           >
//             Edit Profile
//           </button>

//           <button
//             className="px-4 py-1 rounded bg-green-600 text-white"
//             onClick={() => navigate("/chat")}
//           >
//             Message
//           </button>
//         </div>

//       {/* Tabs */}
//       <div className="flex justify-around mb-6 border-b border-gray-300">
//         {[ "image", "video"].map((t) => (
//           <button
//             key={t}
//             className={`flex-1 text-center py-3 font-semibold text-lg rounded-t-lg transition-colors duration-200 ${
//               tab === t ? "border-b-4 border-purple-600 text-purple-600" : "text-gray-500 hover:text-gray-700"
//             }`}
//             onClick={() => setTab(t)}
//           >
//             {t.charAt(0).toUpperCase() + t.slice(1)}
//           </button>
//         ))}
//       </div>

//      {/* Posts */}
// <div className="grid grid-cols-3 gap-2 mb-6">
//  {user.posts?.map((post) =>
//   (post.files || []).map((f, idx) => (
//     <div key={post._id + idx} className="relative cursor-pointer" onClick={() => setSelectedPost(post)}>
//       {f.type === "image" ? (
//         <img src={f.url} className="w-full h-24 object-cover" />
//       ) : (
//         <video src={f.url} className="w-full h-24 object-cover" controls />
//       )}
//     </div>
//   ))
// )}

// {selectedPost && (
//   <div className="fixed inset-0 bg-gray-600 bg-opacity-70 flex justify-center items-center z-50">
//     <div className=" p-6 rounded-lg w-11/12 md:w-2/3 max-h-[90vh] overflow-y-auto relative">
//       {/* Close button */}
//       <button
//         onClick={() => setSelectedPost(null)}
//         className="absolute top-2 right-2 text-black text-xl font-bold"
//       >
//         ×
//       </button>

//       {/* Post media */}
//       {selectedPost.files.map((f, idx) => (
//         f.type === "image" ? (
//           <img key={idx} src={f.url} className="w-full mb-4 rounded" />
//         ) : (
//           <video key={idx} src={f.url} className="w-full mb-4 rounded" controls />
//         )
//       ))}

//       {/* Caption */}
//       {selectedPost.caption && (
//         <p className="text-black text-lg mt-2">{selectedPost.caption}</p>
//       )}
//     </div>
//   </div>
// )}

//   {/* Add new post button */}
//   <div
//     onClick={() => setShowAddPost(true)}
//     className="flex justify-center items-center border border-gray-300 cursor-pointer h-24 text-gray-500 font-bold"
//   >
//     +
//   </div>
// </div>


//       {/* Modals */}
//    {/* Modals */}
// {showEdit && (
//   <EditProfileModal
//     user={user}
//     setUser={handleProfileUpdate}
//     onClose={() => setShowEdit(false)}
//   />
// )}
// {/* {showAddPost && (
//   <AddPostModal
//     userId={user._id}
//     onClose={() => setShowAddPost(false)}
//     onPostAdded={(newPost) => {
//       // Add post instantly
//       handlePostAddedOptimistic(newPost);

//       // Optional: fetch full updated user from backend for sync
//       axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users/${user._id}`)
//         .then(res => handleProfileUpdate(res.data))
//         .catch(err => console.error(err));
//     }}
//   />
// )} */}

// {showAddPost && (
//   <AddPostModal
//     userId={user._id}
//     onClose={() => setShowAddPost(false)}
//     onPostAdded={(newPost) => {
//       setUser((prev) => {
//         const updatedUser = {
//           ...prev,
//           posts: [newPost, ...(prev.posts || [])],
//         };
//         localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//         return updatedUser;
//       });
//     }}
//   />
// )}



//     </div>
//   );
// }















// // src/pages/ProfilePage.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import EditProfileModal from "../components/EditProfileModal";
// import AddPostModal from "../components/AddPostModal";

// export default function ProfilePage() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [showEdit, setShowEdit] = useState(false);
//   const [showAddPost, setShowAddPost] = useState(false);
//   const [tab, setTab] = useState("all"); // "all", "image", "video"
//   const [currentIndex, setCurrentIndex] = useState(0);
// const [selectedPost, setSelectedPost] = useState(null);




//  useEffect(() => {
//   const storedUser = localStorage.getItem("bloomUser");
//   if (storedUser && storedUser !== "undefined") {
//     try {
//       setUser(JSON.parse(storedUser));
//     } catch (err) {
//       console.error("Failed to parse stored user:", err);
//       localStorage.removeItem("bloomUser"); // clear invalid data
//       navigate("/login");
//     }
//   } else {
//     navigate("/login");
//   }
// }, []);


//   if (!user) return <p className="text-center mt-20">Loading profile...</p>;

// const filteredPosts = user.posts || [];


//  // update user state immediately
// const handleProfileUpdate = (updatedUser) => {
//   if (!updatedUser) return;
//   setUser(updatedUser); // React re-renders instantly
//   localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
// };

// // Optimistic post addition
// const handlePostAddedOptimistic = (newPost) => {
//   setUser((prev) => ({
//     ...prev,
//     posts: [newPost, ...(prev.posts || [])],
//   }));
// };

//   // Delete current image
//   const deleteImage = async (index) => {
//     try {
//       const formData = new FormData();
//       formData.append("_id", user._id);
//       formData.append("action", "delete");
//       formData.append("index", index);

//       const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/update`, formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       });
//       setUser(res.data);
//       setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
//       localStorage.setItem("bloomUser", JSON.stringify(res.data));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Replace current image
//   const replaceImage = async (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("_id", user._id);
//     formData.append("action", "replace");
//     formData.append("index", index);
//    formData.append("profilePic", file); // instead of "image"


//     try {
//       const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/update`, formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       });
//       setUser(res.data);
//       localStorage.setItem("bloomUser", JSON.stringify(res.data));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Add new image
//   const addImage = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("_id", user._id);
//     formData.append("action", "add");
//     formData.append("profilePic", file); 

//     try {
//       const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/update`, formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       });
//       setUser(res.data);
//       setCurrentIndex(res.data.profilePics.length - 1);
//       localStorage.setItem("bloomUser", JSON.stringify(res.data));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="">
//       {/* Profile Header */}
//       <div className="flex flex-col items-center mb-6 relative w-full bg-black">
//     <div className="relative w-full h-[60vh] md:h-[120vh] rounded-lg overflow-hidden">
//   {user.profilePics?.length > 0 ? (
//     <>
//       <img
//         src={user.profilePics[currentIndex]}
//         alt="Profile"
//         className="w-full h-full object-cover cursor-pointer"
//         onClick={() => {
//           // Move to next image, or loop back to the first
//           setCurrentIndex((prev) =>
//             prev < user.profilePics.length - 1 ? prev + 1 : 0
//           );
//         }}
//       />
//              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
//   {user.profilePics.map((_, idx) => (
//     <span
//       key={idx}
//       onClick={() => setCurrentIndex(idx)}
//       className={`w-3 h-3 rounded-full cursor-pointer ${
//         idx === currentIndex ? "bg-red-600" : "bg-gray-300"
//       }`}
//     />
//   ))}
// </div>


//               {/* Delete */}
//               <button
//                 className="absolute top-2 right-2 bg-red-500 text-white  py-1 rounded"
//                 onClick={() => deleteImage(currentIndex)}
//               >
//                 Delete
//               </button>

//               {/* Replace */}
//               <label className="absolute top-2 right-14 bg-purple-600 text-white px-2 py-1 rounded cursor-pointer">
//                 Replace
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => replaceImage(e, currentIndex)}
//                 />
//               </label>
//             </>
//           ) : (
//             <p className="text-center mt-10 text-gray-500">No profile images</p>
//           )}

//           {/* Add new image */}
//           {(!user.profilePics || user.profilePics.length < 5) && (
//             <label className="absolute bottom-2 right-2 bg-purple-600 text-white px-3 py-1 rounded cursor-pointer">
//             <span>+</span>
//   <span className="text-xs">upload 5 image</span>
//               <input type="file" accept="image/*" className="hidden" onChange={addImage} />
//             </label>
//           )}

//           {/* Name and username */}
          
//           <div className="absolute left-4 bottom-4 text-white">
//             <h2 className="text-2xl font-bold shadow-lg">{user.name}</h2>
//             <p className="text-sm text-gray-200">@{user.username}</p>
//           </div>
//         </div>

//       </div>

      
//         {/* Bio */}
//         {user.bio && <p className="text-center text-gray-600 mt-2">{user.bio}</p>}

//         {/* Pronouns */}
//         {user.pronouns && <p className="text-gray-500 mt-1">{user.pronouns}</p>}

//         {/* Music */}
//         {user.music && <p className="text-gray-500 mt-1">🎵 {user.music}</p>}

//         {/* Country */}
//         {user.country && <p className="text-gray-500 mt-1">🌍 {user.country}</p>}

//         {/* Social Links */}
//         <div className="flex gap-4 mt-1">
//           {user.socials?.instagram && (
//             <a
//               href={`https://instagram.com/${user.socials.instagram}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline"
//             >
//               Instagram
//             </a>
//           )}
//           {user.socials?.twitter && (
//             <a
//               href={`https://twitter.com/${user.socials.twitter}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline"
//             >
//               Twitter
//             </a>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-2 mt-2">
//           <button
//             className="px-4 py-1 rounded bg-purple-600 text-white"
//             onClick={() => setShowEdit(true)}
//           >
//             Edit Profile
//           </button>

//           <button
//             className="px-4 py-1 rounded bg-green-600 text-white"
//             onClick={() => navigate("/chat")}
//           >
//             Message
//           </button>
//         </div>

//       {/* Tabs */}
//       <div className="flex justify-around mb-6 border-b border-gray-300">
//         {[ "image", "video"].map((t) => (
//           <button
//             key={t}
//             className={`flex-1 text-center py-3 font-semibold text-lg rounded-t-lg transition-colors duration-200 ${
//               tab === t ? "border-b-4 border-purple-600 text-purple-600" : "text-gray-500 hover:text-gray-700"
//             }`}
//             onClick={() => setTab(t)}
//           >
//             {t.charAt(0).toUpperCase() + t.slice(1)}
//           </button>
//         ))}
//       </div>

//      {/* Posts */}
// <div className="grid grid-cols-3 gap-2 mb-6">

    
// {filteredPosts.map(post =>
//   (post.files || [])
//     .filter(f => tab === "all" || f.type === tab) // filter files by type
//     .map((f, idx) => (
//       <div
//         key={post._id + idx}
//         className="relative cursor-pointer"
//         onClick={() => setSelectedPost(post)}
//       >
//         {f.type === "image" ? (
//           <img src={f.url} className="w-full h-24 object-cover" />
//         ) : (
//           <video src={f.url} className="w-full h-24 object-cover" controls />
//         )}
//       </div>
//     ))
// )}


// {selectedPost && (
//   <div className="fixed inset-0 bg-gray-600 bg-opacity-70 flex justify-center items-center z-50">
//     <div className=" p-6 rounded-lg w-11/12 md:w-2/3 max-h-[90vh] overflow-y-auto relative">
//       {/* Close button */}
//       <button
//         onClick={() => setSelectedPost(null)}
//         className="absolute top-2 right-2 text-black text-xl font-bold"
//       >
//         ×
//       </button>

//       {/* Post media */}
//       {selectedPost.files.map((f, idx) => (
//         f.type === "image" ? (
//           <img key={idx} src={f.url} className="w-full mb-4 rounded" />
//         ) : (
//           <video key={idx} src={f.url} className="w-full mb-4 rounded" controls />
//         )
//       ))}

//       {/* Caption */}
//       {selectedPost.caption && (
//         <p className="text-black text-lg mt-2">{selectedPost.caption}</p>
//       )}
//     </div>
//   </div>
// )}

//   {/* Add new post button */}
//   <div
//     onClick={() => setShowAddPost(true)}
//     className="flex justify-center items-center border border-gray-300 cursor-pointer h-24 text-gray-500 font-bold"
//   >
//     +
//   </div>
// </div>


//       {/* Modals */}
//    {/* Modals */}
// {showEdit && (
//   <EditProfileModal
//     user={user}
//     setUser={handleProfileUpdate}
//     onClose={() => setShowEdit(false)}
//   />
// )}
// {/* {showAddPost && (
//   <AddPostModal
//     userId={user._id}
//     onClose={() => setShowAddPost(false)}
//     onPostAdded={(newPost) => {
//       // Add post instantly
//       handlePostAddedOptimistic(newPost);

//       // Optional: fetch full updated user from backend for sync
//       axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users/${user._id}`)
//         .then(res => handleProfileUpdate(res.data))
//         .catch(err => console.error(err));
//     }}
//   />
// )} */}

// {showAddPost && (
//   <AddPostModal
//     userId={user._id}
//     onClose={() => setShowAddPost(false)}
//     onPostAdded={(newPost) => {
//       setUser((prev) => {
//         const updatedUser = {
//           ...prev,
//           posts: [newPost, ...(prev.posts || [])],
//         };
//         localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//         return updatedUser;
//       });
//     }}
//   />
// )}



//     </div>
//   );
// }




































































// // src/pages/ProfilePage.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import EditProfileModal from "../components/EditProfileModal";
// import AddPostModal from "../components/AddPostModal";

// export default function ProfilePage() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [showEdit, setShowEdit] = useState(false);
//   const [showAddPost, setShowAddPost] = useState(false);
//   const [tab, setTab] = useState("all"); // "all", "image", "video"
//   const [currentIndex, setCurrentIndex] = useState(0);
// const [selectedPost, setSelectedPost] = useState(null);

// const [postToDelete, setPostToDelete] = useState(null);



//  useEffect(() => {
//   const storedUser = localStorage.getItem("bloomUser");
//   if (storedUser && storedUser !== "undefined") {
//     try {
//       setUser(JSON.parse(storedUser));
//     } catch (err) {
//       console.error("Failed to parse stored user:", err);
//       localStorage.removeItem("bloomUser"); // clear invalid data
//       navigate("/login");
//     }
//   } else {
//     navigate("/login");
//   }
// }, []);


//   if (!user) return <p className="text-center mt-20">Loading profile...</p>;

// const filteredPosts = user.posts || [];


//  // update user state immediately
// const handleProfileUpdate = (updatedUser) => {
//   if (!updatedUser) return;
//   setUser(updatedUser); // React re-renders instantly
//   localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
// };

// // Optimistic post addition
// const handlePostAddedOptimistic = (newPost) => {
//   setUser((prev) => ({
//     ...prev,
//     posts: [newPost, ...(prev.posts || [])],
//   }));
// };

//   // Delete current image
//   const deleteImage = async (index) => {
//     try {
//       const formData = new FormData();
//       formData.append("_id", user._id);
//       formData.append("action", "delete");
//       formData.append("index", index);

//       const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/update`, formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       });
//       setUser(res.data);
//       setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
//       localStorage.setItem("bloomUser", JSON.stringify(res.data));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Replace current image
//   const replaceImage = async (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("_id", user._id);
//     formData.append("action", "replace");
//     formData.append("index", index);
//    formData.append("profilePic", file); // instead of "image"


//     try {
//       const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/update`, formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       });
//       setUser(res.data);
//       localStorage.setItem("bloomUser", JSON.stringify(res.data));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Add new image
//   const addImage = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("_id", user._id);
//     formData.append("action", "add");
//     formData.append("profilePic", file); 

//     try {
//       const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/update`, formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       });
//       setUser(res.data);
//       setCurrentIndex(res.data.profilePics.length - 1);
//       localStorage.setItem("bloomUser", JSON.stringify(res.data));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="">
//       {/* Profile Header */}
//       <div className="flex flex-col items-center mb-6 relative w-full bg-black">
//     <div className="relative w-full h-[60vh] md:h-[120vh] rounded-lg overflow-hidden">
//   {user.profilePics?.length > 0 ? (
//     <>
//       <img
//         src={user.profilePics[currentIndex]}
//         alt="Profile"
//         className="w-full h-full object-cover cursor-pointer"
//         onClick={() => {
//           // Move to next image, or loop back to the first
//           setCurrentIndex((prev) =>
//             prev < user.profilePics.length - 1 ? prev + 1 : 0
//           );
//         }}
//       />
//              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
//   {user.profilePics.map((_, idx) => (
//     <span
//       key={idx}
//       onClick={() => setCurrentIndex(idx)}
//       className={`w-3 h-3 rounded-full cursor-pointer ${
//         idx === currentIndex ? "bg-red-600" : "bg-gray-300"
//       }`}
//     />
//   ))}
// </div>


//               {/* Delete */}
//               <button
//                 className="absolute top-2 right-2 bg-red-500 text-white  py-1 rounded"
//                 onClick={() => deleteImage(currentIndex)}
//               >
//                 Delete
//               </button>

//               {/* Replace */}
//               <label className="absolute top-2 right-14 bg-purple-600 text-white px-2 py-1 rounded cursor-pointer">
//                 Replace
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => replaceImage(e, currentIndex)}
//                 />
//               </label>
//             </>
//           ) : (
//             <p className="text-center mt-10 text-gray-500">No profile images</p>
//           )}

//           {/* Add new image */}
//           {(!user.profilePics || user.profilePics.length < 5) && (
//             <label className="absolute bottom-2 right-2 bg-purple-600 text-white px-3 py-1 rounded cursor-pointer">
//             <span>+</span>
//   <span className="text-xs">upload 5 image</span>
//               <input type="file" accept="image/*" className="hidden" onChange={addImage} />
//             </label>
//           )}

//           {/* Name and username */}
          
//           <div className="absolute left-4 bottom-4 text-white">
//             <h2 className="text-2xl font-bold shadow-lg">{user.name}</h2>
//             <p className="text-sm text-gray-200">@{user.username}</p>
//           </div>
//         </div>

//       </div>

      
//         {/* Bio */}
//         {user.bio && <p className="text-center text-gray-600 mt-2">{user.bio}</p>}

//         {/* Pronouns */}
//         {user.pronouns && <p className="text-gray-500 mt-1">{user.pronouns}</p>}

//         {/* Music */}
//         {user.music && <p className="text-gray-500 mt-1">🎵 {user.music}</p>}

//         {/* Country */}
//         {user.country && <p className="text-gray-500 mt-1">🌍 {user.country}</p>}

//         {/* Social Links */}
//         <div className="flex gap-4 mt-1">
//           {user.socials?.instagram && (
//             <a
//               href={`https://instagram.com/${user.socials.instagram}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline"
//             >
//               Instagram
//             </a>
//           )}
//           {user.socials?.twitter && (
//             <a
//               href={`https://twitter.com/${user.socials.twitter}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 hover:underline"
//             >
//               Twitter
//             </a>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-2 mt-2">
//           <button
//             className="px-4 py-1 rounded bg-purple-600 text-white"
//             onClick={() => setShowEdit(true)}
//           >
//             Edit Profile
//           </button>

//           <button
//             className="px-4 py-1 rounded bg-green-600 text-white"
//             onClick={() => navigate("/chat")}
//           >
//             Message
//           </button>
//         </div>

//       {/* Tabs */}
//       <div className="flex justify-around mb-6 border-b border-gray-300">
//         {[ "image", "video"].map((t) => (
//           <button
//             key={t}
//             className={`flex-1 text-center py-3 font-semibold text-lg rounded-t-lg transition-colors duration-200 ${
//               tab === t ? "border-b-4 border-purple-600 text-purple-600" : "text-gray-500 hover:text-gray-700"
//             }`}
//             onClick={() => setTab(t)}
//           >
//             {t.charAt(0).toUpperCase() + t.slice(1)}
//           </button>
//         ))}
//       </div>

//      {/* Posts */}{/* Posts Grid */}
// <div className="grid grid-cols-3 gap-2 mb-6">
//   {filteredPosts
//     .filter(post => post.files?.some(f => tab === "all" || f.type === tab)) // only posts with matching files
//     .map((post) => {
//       // pick the first file matching the tab to show as thumbnail
//       const firstFile = post.files.find(f => tab === "all" || f.type === tab);

//       return (
//         <div
//           key={post._id}
//           className="relative cursor-pointer"
//           onClick={() => setSelectedPost(post)}
//         >
//           {firstFile.type === "image" ? (
//             <img src={firstFile.url} className="w-full h-24 object-cover" />
//           ) : (
//             <video src={firstFile.url} className="w-full h-24 object-cover" controls />
//           )}

//           {/* Delete icon */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation(); // prevent opening modal
//               setUser((prev) => ({
//                 ...prev,
//                 posts: prev.posts.filter(p => p._id !== post._id)
//               }));
//             }}
//             className="absolute top-1 right-1 text-white bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs"
//           >
//             ×
//           </button>
//         </div>
//       );
//     })}

//   {/* Add new post button */}
//   <div
//     onClick={() => setShowAddPost(true)}
//     className="flex justify-center items-center border border-gray-300 cursor-pointer h-24 text-gray-500 font-bold"
//   >
//     +
//   </div>
// </div>

// {/* Modal for viewing post */}
// {selectedPost && (
//   <div className="fixed inset-0 bg-gray-600 bg-opacity-70 flex justify-center items-center z-50">
//     <div className="p-6 rounded-lg w-11/12 md:w-2/3 max-h-[90vh] overflow-y-auto relative bg-white">
//       {/* Close button */}
//       <button
//         onClick={() => setSelectedPost(null)}
//         className="absolute top-2 right-2 text-black text-xl font-bold"
//       >
//         ×
//       </button>

//       {/* Post media */}
//       {selectedPost.files.map((f, idx) =>
//         f.type === "image" ? (
//           <img key={idx} src={f.url} className="w-full mb-4 rounded" />
//         ) : (
//           <video key={idx} src={f.url} className="w-full mb-4 rounded" controls />
//         )
//       )}

//       {/* Caption */}
//       {selectedPost.caption && (
//         <p className="text-black text-lg mt-2">{selectedPost.caption}</p>
//       )}

//       {/* Optional: Delete post from modal */}
//       <button
//         onClick={() => {
//           setUser((prev) => ({
//             ...prev,
//             posts: prev.posts.filter(p => p._id !== selectedPost._id)
//           }));
//           setSelectedPost(null);
//         }}
//         className="absolute top-2 left-2 text-red-600 font-bold px-2 py-1 rounded border border-red-600"
//       >
//         Delete
//       </button>
//     </div>
//   </div>
// )}




//       {/* Modals */}
//    {/* Modals */}
// {showEdit && (
//   <EditProfileModal
//     user={user}
//     setUser={handleProfileUpdate}
//     onClose={() => setShowEdit(false)}
//   />
// )}
// {/* {showAddPost && (
//   <AddPostModal
//     userId={user._id}
//     onClose={() => setShowAddPost(false)}
//     onPostAdded={(newPost) => {
//       // Add post instantly
//       handlePostAddedOptimistic(newPost);

//       // Optional: fetch full updated user from backend for sync
//       axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users/${user._id}`)
//         .then(res => handleProfileUpdate(res.data))
//         .catch(err => console.error(err));
//     }}
//   />
// )} */}

// {showAddPost && (
//   <AddPostModal
//     userId={user._id}
//     onClose={() => setShowAddPost(false)}
//     onPostAdded={(newPost) => {
//       setUser((prev) => {
//         const updatedUser = {
//           ...prev,
//           posts: [newPost, ...(prev.posts || [])],
//         };
//         localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//         return updatedUser;
//       });
//     }}
//   />
// )}



//     </div>
//   );
// }


























// // src/pages/ProfilePage.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import EditProfileModal from "../components/EditProfileModal";
// import AddPostModal from "../components/AddPostModal";
// import ConfirmModal from "../components/ConfirmModal";
// import DiscoverCardModal from "../components/DiscoverCardModal";



// export default function ProfilePage() {
//   const navigate = useNavigate();
//   const { id } = useParams(); 
//   const [user, setUser] = useState(null);
//   const [showEdit, setShowEdit] = useState(false);
//   const [showAddPost, setShowAddPost] = useState(false);
//   const [tab, setTab] = useState("all"); // "all", "image", "video"
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [postToDelete, setPostToDelete] = useState(null);
//   const [showDiscover, setShowDiscover] = useState(false);

  

//   useEffect(() => {
//     const storedUser = localStorage.getItem("bloomUser");
//     if (storedUser && storedUser !== "undefined") {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch (err) {
//         console.error("Failed to parse stored user:", err);
//         localStorage.removeItem("bloomUser");
//         navigate("/login");
//       }
//     } else {
//       navigate("/login");
//     }
//   }, []);




  
//   useEffect(() => {
//   const fetchUserPosts = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_SERVER_URL}/api/posts/user/${user._id}`,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//         }
//       );
//       setUser(prev => ({ ...prev, posts: res.data }));
//     } catch (err) {
//       console.error("Failed to fetch posts:", err);
//     }
//   };

//   if (user) fetchUserPosts();
// }, [user?._id]);


//   if (!user) return <p className="text-center mt-20">Loading profile...</p>;

//   const filteredPosts = user.posts || [];

//   // update user state immediately
//   const handleProfileUpdate = (updatedUser) => {
//     if (!updatedUser) return;
//     setUser(updatedUser);
//     localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//   };

//   // Optimistic post addition
//   const handlePostAddedOptimistic = (newPost) => {
//     setUser((prev) => ({
//       ...prev,
//       posts: [newPost, ...(prev.posts || [])],
//     }));
//   };

//   // Delete current image (from profilePics)
// const deleteImage = async (index) => {
//   try {
//     const formData = new FormData();
//     formData.append("_id", user._id);
//     formData.append("action", "delete");
//     formData.append("index", index);

//     const res = await axios.put(
//       `${import.meta.env.VITE_SERVER_URL}/api/users/update`,
//       formData,
//       {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       }
//     );

//     // Merge posts to prevent overwriting them
//     const updatedUser = { ...res.data, posts: user.posts };
//     setUser(updatedUser);
//     setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
//     localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//   } catch (err) {
//     console.error(err);
//   }
// };


//   // Replace current image
//   const replaceImage = async (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("_id", user._id);
//     formData.append("action", "replace");
//     formData.append("index", index);
//     formData.append("profilePic", file);

//     try {
//       const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/update`, formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       });
//       setUser(res.data);
//       localStorage.setItem("bloomUser", JSON.stringify(res.data));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Add new image
//   const addImage = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("_id", user._id);
//     formData.append("action", "add");
//     formData.append("profilePic", file);

//     try {
//       const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/update`, formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       });
//       setUser(res.data);
//       setCurrentIndex(res.data.profilePics.length - 1);
//       localStorage.setItem("bloomUser", JSON.stringify(res.data));
//     } catch (err) {
//       console.error(err);
//     }
//   };

  
// // Unified delete handler
// // Delete a post and update only the posts array
// const handleDeleteConfirm = async () => {
//   if (!postToDelete) return;

//   try {
//     if (postToDelete.type === "post") {
//       const res = await axios.delete(
//         `${import.meta.env.VITE_SERVER_URL}/api/posts/${postToDelete.postId}`,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//         }
//       );

//       // Only update posts array, keep everything else intact
//       setUser(prev => {
//         const updatedUser = {
//           ...prev,
//           posts: prev.posts.filter(p => p._id !== postToDelete.postId),
//         };
//         localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//         return updatedUser;
//       });

//       setPostToDelete(null);
//       return;
//     }

//     if (postToDelete.type === "profilePic") {
//       await deleteImage(postToDelete.index);
//       setPostToDelete(null);
//       return;
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };





    

//   return (
//     <div>
//       {/* Profile Header */}
//       <div className="flex flex-col items-center mb-6 relative w-full bg-black">
//         <div className="relative w-full h-[60vh] md:h-[120vh] rounded-lg overflow-hidden">
//           {user.profilePics?.length > 0 ? (
//             <>
//               <img
//                 src={user.profilePics[currentIndex]}
//                 alt="Profile"
//                 className="w-full h-full object-cover cursor-pointer"
//                 onClick={() =>
//                   setCurrentIndex((prev) =>
//                     prev < user.profilePics.length - 1 ? prev + 1 : 0
//                   )
//                 }
//               />
//               <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
//                 {user.profilePics.map((_, idx) => (
//                   <span
//                     key={idx}
//                     onClick={() => setCurrentIndex(idx)}
//                     className={`w-3 h-3 rounded-full cursor-pointer ${
//                       idx === currentIndex ? "bg-red-600" : "bg-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>

//               {/* Delete */}
//               <button
//                 className="absolute top-2 right-2 bg-red-500 text-white py-1 rounded"
//                 onClick={() => setPostToDelete({ type: "profilePic", index: currentIndex })}
//               >
//                 Delete
//               </button>

//               {/* Replace */}
//               <label className="absolute top-2 right-14 bg-purple-600 text-white px-2 py-1 rounded cursor-pointer">
//                 Replace
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => replaceImage(e, currentIndex)}
//                 />
//               </label>
//             </>
//           ) : (
//             <p className="text-center mt-10 text-gray-500">No profile images</p>
//           )}

//           {/* Add new image */}
//           {(!user.profilePics || user.profilePics.length < 5) && (
//             <label className="absolute bottom-2 right-2 bg-purple-600 text-white px-3 py-1 rounded cursor-pointer">
//               <span>+</span>
//               <span className="text-xs">upload 5 image</span>
//               <input type="file" accept="image/*" className="hidden" onChange={addImage} />
//             </label>
//           )}

//           {/* Name and username */}
//           <div className="absolute left-4 bottom-4 text-white">
//             <h2 className="text-2xl font-bold shadow-lg">{user.name}</h2>
//             <p className="text-sm text-gray-200">@{user.username}</p>
//           </div>
//         </div>
//       </div>

//       {/* Bio, Pronouns, Music, Country */}
//       {user.bio && <p className="text-center text-gray-600 mt-2">{user.bio}</p>}
//       {user.pronouns && <p className="text-gray-500 mt-1">{user.pronouns}</p>}
//       {user.music && <p className="text-gray-500 mt-1">🎵 {user.music}</p>}
//       {user.country && <p className="text-gray-500 mt-1">🌍 {user.country}</p>}

//       {/* Social Links */}
//       <div className="flex gap-4 mt-1">
//         {user.socials?.instagram && (
//           <a
//             href={`https://instagram.com/${user.socials.instagram}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 hover:underline"
//           >
//             Instagram
//           </a>
//         )}
//         {user.socials?.twitter && (
//           <a
//             href={`https://twitter.com/${user.socials.twitter}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 hover:underline"
//           >
//             Twitter
//           </a>
//         )}
//       </div>

//       {/* Buttons */}
//       <div className="flex gap-2 mt-2">
//         <button className="px-4 py-1 rounded bg-purple-600 text-white" onClick={() => setShowEdit(true)}>
//           Edit Profile
//         </button>
//         <button
//   className="px-4 py-2 rounded bg-pink-600 text-white hover:bg-pink-700"
//   onClick={() => setShowDiscover(true)}
// >
//   Let people discover you
// </button>

//         {/* <button className="px-4 py-1 rounded bg-green-600 text-white" onClick={() => navigate("/chat")}>
//           Message
//         </button> */}
//       </div>

//       {/* Tabs */}
//     {/* Tabs */}
// <div className="flex justify-around mb-6 border-b border-gray-300">
//   {["all", "image", "video"].map((t) => (
//     <button
//       key={t}
//       className={`flex-1 text-center py-3 font-semibold text-lg rounded-t-lg transition-colors duration-200 ${
//         tab === t ? "border-b-4 border-purple-600 text-purple-600" : "text-gray-500 hover:text-gray-700"
//       }`}
//       onClick={() => setTab(t)}
//     >
//       {t.charAt(0).toUpperCase() + t.slice(1)}
//     </button>
//   ))}
// </div>

// {/* Posts Grid */}
// {/* Posts Grid */}
// {/* Posts Grid */}
// <div className="grid grid-cols-3 gap-2 mb-6">
//   {(user.posts || [])
//     .filter(post => tab === "all" || (post.files || []).some(f => f.type === tab))
//     .flatMap(post =>
//       (post.files || [])
//         .filter(f => tab === "all" || f.type === tab)
//         .map((file, idx) => (
//           <div
//             key={`${post._id}-${idx}`} // unique key per file
//             className="relative cursor-pointer"
//             onClick={() => setSelectedPost(post)}
//           >
//             {file.type === "image" ? (
//               <img src={file.url} className="w-full h-24 object-cover" />
//             ) : (
//               <video src={file.url} className="w-full h-24 object-cover" controls />
//             )}

//             {/* Delete icon */}
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setPostToDelete({ type: "post", postId: post._id }); // only postId
//               }}
//               className="absolute top-1 right-1 text-white bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs"
//             >
//               ×
//             </button>
//           </div>
//         ))
//     )}

//   {/* Add new post button */}
//   <div
//     key="add-post-btn"
//     onClick={() => setShowAddPost(true)}
//     className="flex justify-center items-center border border-gray-300 cursor-pointer h-24 text-gray-500 font-bold"
//   >
//     +
//   </div>
// </div>



//       {/* Modal for viewing post */}
//       {selectedPost && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-70 flex justify-center items-center z-50">
//           <div className="p-6 rounded-lg w-11/12 md:w-2/3 max-h-[90vh] overflow-y-auto relative ">
//             <button
//               onClick={() => setSelectedPost(null)}
//               className="absolute top-2 right-2 text-black text-xl font-bold"
//             >
//               ×
//             </button>

//             {selectedPost.files.map((f, idx) =>
//               f.type === "image" ? (
//                 <img key={idx} src={f.url} className="w-full mb-4 rounded" />
//               ) : (
//                 <video key={idx} src={f.url} className="w-full mb-4 rounded" controls />
//               )
//             )}

//             {selectedPost.caption && <p className="text-black text-lg mt-2">{selectedPost.caption}</p>}

          
//           </div>
//         </div>
//       )}

//       {/* Confirm delete modal */}
//  {postToDelete && (
//   <ConfirmModal
//     message="Are you sure you want to delete?"
//     onConfirm={handleDeleteConfirm}
//     onCancel={() => setPostToDelete(null)}
//   />
// )}


// {showDiscover && (
//   <DiscoverCardModal
//     user={user}
//     onClose={() => setShowDiscover(false)}
//     onSave={(updatedUser) => setUser(updatedUser)}
//   />
// )}

//       {/* Modals */}
//       {showEdit && <EditProfileModal user={user} setUser={handleProfileUpdate} onClose={() => setShowEdit(false)} />}
//       {showAddPost && (
//         <AddPostModal
//           userId={user._id}
//           onClose={() => setShowAddPost(false)}
//           onPostAdded={(newPost) => {
//             setUser((prev) => {
//               const updatedUser = {
//                 ...prev,
//                 posts: [newPost, ...(prev.posts || [])],
//               };
//               localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//               return updatedUser;
//             });
//           }}
//         />
//       )}
//     </div>
//   );
// }
 















// // src/pages/ProfilePage.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import EditProfileModal from "../components/EditProfileModal";
// import AddPostModal from "../components/AddPostModal";
// import ConfirmModal from "../components/ConfirmModal";
// import DiscoverCardModal from "../components/DiscoverCardModal";
// import FriendButton from "../components/FriendButton";




// export default function ProfilePage() {
//   const navigate = useNavigate();
//   const { id } = useParams(); 
//   const [user, setUser] = useState(null);
//   const [showEdit, setShowEdit] = useState(false);
//   const [showAddPost, setShowAddPost] = useState(false);
//   const [tab, setTab] = useState("all"); // "all", "image", "video"
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [postToDelete, setPostToDelete] = useState(null);
//   const [showDiscover, setShowDiscover] = useState(false);
  
  

//   //  // Fetch profile (own or other user's)
//   // useEffect(() => {
//   //   const fetchProfile = async () => {
//   //     const storedUser = localStorage.getItem("bloomUser");
//   //     let loggedInUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

//   //     try {
//   //       if (id && loggedInUser?._id === id) {
//   //         setUser(loggedInUser);
//   //       } else {
//   //         const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users/${id}`, {
//   //           headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//   //         });
//   //         setUser(res.data);
//   //       }
//   //     } catch (err) {
//   //       console.error("Failed to fetch user:", err);
//   //       navigate("/login");
//   //     }
//   //   };

//   //   fetchProfile();
//   // }, [id, navigate]);



//   // Fetch profile (own or other user's)
// useEffect(() => {
//   const fetchProfile = async () => {
//     try {
//       // Always fetch from backend, even for logged-in user
//       const res = await axios.get(
//         id
//           ? `${import.meta.env.VITE_SERVER_URL}/api/users/${id}`
//           : `${import.meta.env.VITE_SERVER_URL}/api/users/me`, // optional /me route
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//         }
//       );

//       setUser(res.data);

//       // update localStorage if it's the current user
//       const storedUser = localStorage.getItem("bloomUser");
//       const loggedInUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
//       if (loggedInUser?._id === res.data._id) {
//         localStorage.setItem("bloomUser", JSON.stringify(res.data));
//       }
//     } catch (err) {
//       console.error("Failed to fetch user:", err);
//       navigate("/login");
//     }
//   };

//   fetchProfile();
// }, [id, navigate]);



// useEffect(() => {
//   const fetchUserPosts = async () => {
//     if (!user?._id) return;
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_SERVER_URL}/api/posts/user/${user._id}`,
//         { headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` } }
//       );
//       setUser(prev => ({ ...prev, posts: res.data }));
//     } catch (err) {
//       console.error("Failed to fetch posts:", err);
//     }
//   };

//   fetchUserPosts();
// }, [user?._id]);


//   if (!user) return <p className="text-center mt-20">Loading profile...</p>;

//   const filteredPosts = user.posts || [];

//   // update user state immediately
//   const handleProfileUpdate = (updatedUser) => {
//     if (!updatedUser) return;
//     setUser(updatedUser);
//     localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//   };

//   // Optimistic post addition
//   const handlePostAddedOptimistic = (newPost) => {
//     setUser((prev) => ({
//       ...prev,
//       posts: [newPost, ...(prev.posts || [])],
//     }));
//   };

//   // Delete current image (from profilePics)
// const deleteImage = async (index) => {
//   try {
//     const formData = new FormData();
//     formData.append("_id", user._id);
//     formData.append("action", "delete");
//     formData.append("index", index);

//     const res = await axios.put(
//       `${import.meta.env.VITE_SERVER_URL}/api/users/update`,
//       formData,
//       {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       }
//     );

//     // Merge posts to prevent overwriting them
//     const updatedUser = { ...res.data, posts: user.posts };
//     setUser(updatedUser);
//     setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
//     localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//   } catch (err) {
//     console.error(err);
//   }
// };


//   // Replace current image
//   const replaceImage = async (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("_id", user._id);
//     formData.append("action", "replace");
//     formData.append("index", index);
//     formData.append("profilePic", file);

//     try {
//       const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/update`, formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       });
//       setUser(res.data);
//       localStorage.setItem("bloomUser", JSON.stringify(res.data));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Add new image
//   const addImage = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("_id", user._id);
//     formData.append("action", "add");
//     formData.append("profilePic", file);

//     try {
//       const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/update`, formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       });
//       setUser(res.data);
//       setCurrentIndex(res.data.profilePics.length - 1);
//       localStorage.setItem("bloomUser", JSON.stringify(res.data));
//     } catch (err) {
//       console.error(err);
//     }
//   };

  
// // Unified delete handler
// // Delete a post and update only the posts array
// const handleDeleteConfirm = async () => {
//   if (!postToDelete) return;

//   try {
//     if (postToDelete.type === "post") {
//       const res = await axios.delete(
//         `${import.meta.env.VITE_SERVER_URL}/api/posts/${postToDelete.postId}`,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//         }
//       );

//       // Only update posts array, keep everything else intact
//       setUser(prev => {
//         const updatedUser = {
//           ...prev,
//           posts: prev.posts.filter(p => p._id !== postToDelete.postId),
//         };
//         localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//         return updatedUser;
//       });

//       setPostToDelete(null);
//       return;
//     }

//     if (postToDelete.type === "profilePic") {
//       await deleteImage(postToDelete.index);
//       setPostToDelete(null);
//       return;
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };


// if (!user) return <p className="text-center mt-20">Loading profile...</p>;

// const storedUser = localStorage.getItem("bloomUser");
// const currentUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
// const isOwner = currentUser?._id === user?._id;



    

//   return (
//     <div>
//       {/* Profile Header */}
//       <div className="flex flex-col items-center mb-6 relative w-full bg-black">
//         <div className="relative w-full h-[60vh] md:h-[120vh] rounded-lg overflow-hidden">
//           {user.profilePics?.length > 0 ? (
//             <>
//               <img
//                 src={user.profilePics[currentIndex]}
//                 alt="Profile"
//                 className="w-full h-full object-cover cursor-pointer"
//                 onClick={() =>
//                   setCurrentIndex((prev) =>
//                     prev < user.profilePics.length - 1 ? prev + 1 : 0
//                   )
//                 }
//               />
//               <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
//                 {user.profilePics.map((_, idx) => (
//                   <span
//                     key={idx}
//                     onClick={() => setCurrentIndex(idx)}
//                     className={`w-3 h-3 rounded-full cursor-pointer ${
//                       idx === currentIndex ? "bg-red-600" : "bg-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>

//               {/* Delete */}
           
//     {/* Delete & Replace — only owner can see */}
//     {isOwner && (
//       <>
//         <button
//           className="absolute top-2 right-2 bg-red-500 text-white py-1 rounded"
//           onClick={() => setPostToDelete({ type: "profilePic", index: currentIndex })}
//         >
//           Delete
//         </button>

//         <label className="absolute top-2 right-14 bg-purple-600 text-white px-2 py-1 rounded cursor-pointer">
//           Replace
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={(e) => replaceImage(e, currentIndex)}
//           />
//         </label>
//       </>
//     )}
//             </>
//           ) : (
//             <p className="text-center mt-10 text-gray-500">No profile images</p>
//           )}

//           {/* Add new image */}
//          {isOwner && (!user.profilePics || user.profilePics.length < 5) && (
//   <label className="absolute bottom-2 right-2 bg-purple-600 text-white px-3 py-1 rounded cursor-pointer">
//     <span>+</span>
//     <span className="text-xs">upload 5 image</span>
//     <input type="file" accept="image/*" className="hidden" onChange={addImage} />
//   </label>
// )}


//           {/* Name and username */}
//           <div className="absolute left-4 bottom-4 text-white">
//             <h2 className="text-2xl font-bold shadow-lg">{user.name}</h2>
//             <p className="text-sm text-gray-200">@{user.username}</p>
//           </div>
//         </div>
//       </div>

//       {/* Bio, Pronouns, Music, Country */}
//       {user.bio && <p className="text-center text-gray-600 mt-2">{user.bio}</p>}
//       {user.pronouns && <p className="text-gray-500 mt-1">{user.pronouns}</p>}
//       {user.music && <p className="text-gray-500 mt-1">🎵 {user.music}</p>}
//       {user.country && <p className="text-gray-500 mt-1">🌍 {user.country}</p>}

//       {/* Social Links */}
//       <div className="flex gap-4 mt-1">
//         {user.socials?.instagram && (
//           <a
//             href={`https://instagram.com/${user.socials.instagram}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 hover:underline"
//           >
//             Instagram
//           </a>
//         )}
//         {user.socials?.twitter && (
//           <a
//             href={`https://twitter.com/${user.socials.twitter}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 hover:underline"
//           >
//             Twitter
//           </a>
//         )}
//       </div>



//       {/* Buttons */}
//       <div className="flex gap-2 mt-2">
//        {isOwner && (
//   <button
//     className="px-4 py-1 rounded bg-purple-600 text-white"
//     onClick={() => setShowEdit(true)}
//   >
//     Edit Profile
//   </button>
// )}
// {isOwner && (
//   <button
//     onClick={() => setShowDiscover(true)}
//     className="px-4 py-2 rounded bg-pink-600 text-white hover:bg-pink-700"
//   >
//     Let people discover you
//   </button>
// )}


// {/* Friend Button */}
// {!isOwner && (
//   <FriendButton
//     profileUserId={user._id}
//     currentUserId={currentUser?._id}
//     initialFriendCount={user.friends?.length || 0}
//     initialIsFriend={user.friends?.includes(currentUser?._id)}
//     onFriendChange={(newCount, isFriend) => {
//         setUser(prev => ({
//             ...prev,
//             friendsCount: newCount,
//             isFriend: isFriend
//         }));
//     }}
//   />
// )}

// {/* Friend count for owner */}
// {isOwner && (
//   <p className="text-red-700 font-medium mt-2">
//     {(user.friendsCount ?? user.friends?.length) || 0} {(user.friendsCount ?? user.friends?.length) === 1 ? "Friend" : "Friends"}
//   </p>
// )}


    

//         {/* <button className="px-4 py-1 rounded bg-green-600 text-white" onClick={() => navigate("/chat")}>
//           Message
//         </button> */}
//       </div>

//       {/* Tabs */}
//     {/* Tabs */}
// <div className="flex justify-around mb-6 border-b border-gray-300">
//   {["all", "image", "video"].map((t) => (
//     <button
//       key={t}
//       className={`flex-1 text-center py-3 font-semibold text-lg rounded-t-lg transition-colors duration-200 ${
//         tab === t ? "border-b-4 border-purple-600 text-purple-600" : "text-gray-500 hover:text-gray-700"
//       }`}
//       onClick={() => setTab(t)}
//     >
//       {t.charAt(0).toUpperCase() + t.slice(1)}
//     </button>
//   ))}
// </div>


// {/* Posts Grid */}
// <div className="grid grid-cols-3 gap-2 mb-6">
//   {(user.posts || [])
//     .filter(post => tab === "all" || (post.files || []).some(f => f.type === tab))
//     .flatMap(post =>
//       (post.files || [])
//         .filter(f => tab === "all" || f.type === tab)
//         .map((file, idx) => (
//           <div
//             key={`${post._id}-${idx}`} // unique key per file
//             className="relative cursor-pointer"
//             onClick={() => setSelectedPost(post)}
//           >
//             {file.type === "image" ? (
//               <img src={file.url} className="w-full h-24 object-cover" />
//             ) : (
//               <video src={file.url} className="w-full h-24 object-cover" controls />
//             )}

//             {/* Delete icon */}
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setPostToDelete({ type: "post", postId: post._id }); // only postId
//               }}
//               className="absolute top-1 right-1 text-white bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs"
//             >
//               ×
//             </button>
//           </div>
//         ))
//     )}

//   {/* Add new post button */}
//  {isOwner && (
//   <div
//     key="add-post-btn"
//     onClick={() => setShowAddPost(true)}
//     className="flex justify-center items-center border border-gray-300 cursor-pointer h-24 text-red-500 font-bold"
//   >
//     +
//   </div>
// )}

// </div>



//       {/* Modal for viewing post */}
//       {selectedPost && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-70 flex justify-center items-center z-50">
//           <div className="p-6 rounded-lg w-11/12 md:w-2/3 max-h-[90vh] overflow-y-auto relative ">
//             <button
//               onClick={() => setSelectedPost(null)}
//               className="absolute top-2 right-2 text-black text-xl font-bold"
//             >
//               ×
//             </button>

            

//             {selectedPost.files.map((f, idx) =>
//               f.type === "image" ? (
//                 <img key={idx} src={f.url} className="w-full mb-4 rounded" />
//               ) : (
//                 <video key={idx} src={f.url} className="w-full mb-4 rounded" controls />
//               )
//             )}

            

//             {selectedPost.caption && <p className="text-black text-lg mt-2">{selectedPost.caption}</p>}

          
//           </div>
//         </div>
//       )}

//       {/* Confirm delete modal */}
//  {postToDelete && (
//   <ConfirmModal
//     message="Are you sure you want to delete?"
//     onConfirm={handleDeleteConfirm}
//     onCancel={() => setPostToDelete(null)}
//   />
// )}




// {showDiscover && (
//   <DiscoverCardModal
//     user={user}
//     isOwner={isOwner} // pass the boolean
//     onClose={() => setShowDiscover(false)}
//     onSave={(updatedUser) => setUser(updatedUser)}
//   />
// )}


//       {/* Modals */}
//       {showEdit && <EditProfileModal user={user} setUser={handleProfileUpdate} onClose={() => setShowEdit(false)} />}
//       {showAddPost && (
//         <AddPostModal
//           userId={user._id}
//           onClose={() => setShowAddPost(false)}
//           onPostAdded={(newPost) => {
//             setUser((prev) => {
//               const updatedUser = {
//                 ...prev,
//                 posts: [newPost, ...(prev.posts || [])],
//               };
//               localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//               return updatedUser;
//             });
//           }}
//         />
//       )}
//     </div>
//   );
// }
 


































// // src/pages/ProfilePage.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import EditProfileModal from "../components/EditProfileModal";
// import AddPostModal from "../components/AddPostModal";
// import ConfirmModal from "../components/ConfirmModal";
// import DiscoverCardModal from "../components/DiscoverCardModal";
// import FriendButton from "../components/FriendButton";




// export default function ProfilePage() {
//   const navigate = useNavigate();
//   const { id } = useParams(); 
//   const [user, setUser] = useState(null);
//   const [showEdit, setShowEdit] = useState(false);
//   const [showAddPost, setShowAddPost] = useState(false);
//   const [tab, setTab] = useState("all"); // "all", "image", "video"
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [postToDelete, setPostToDelete] = useState(null);
//   const [showDiscover, setShowDiscover] = useState(false);
  
  

//   //  // Fetch profile (own or other user's)
//   // useEffect(() => {
//   //   const fetchProfile = async () => {
//   //     const storedUser = localStorage.getItem("bloomUser");
//   //     let loggedInUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

//   //     try {
//   //       if (id && loggedInUser?._id === id) {
//   //         setUser(loggedInUser);
//   //       } else {
//   //         const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users/${id}`, {
//   //           headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//   //         });
//   //         setUser(res.data);
//   //       }
//   //     } catch (err) {
//   //       console.error("Failed to fetch user:", err);
//   //       navigate("/login");
//   //     }
//   //   };

//   //   fetchProfile();
//   // }, [id, navigate]);



//   // Fetch profile (own or other user's)
// useEffect(() => {
//   const fetchProfile = async () => {
//     try {
//       // Always fetch from backend, even for logged-in user
//       const res = await axios.get(
//         id
//           ? `${import.meta.env.VITE_SERVER_URL}/api/users/${id}`
//           : `${import.meta.env.VITE_SERVER_URL}/api/users/me`, // optional /me route
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//         }
//       );

//       setUser(res.data);

//       // update localStorage if it's the current user
//       const storedUser = localStorage.getItem("bloomUser");
//       const loggedInUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
//       if (loggedInUser?._id === res.data._id) {
//         localStorage.setItem("bloomUser", JSON.stringify(res.data));
//       }
//     } catch (err) {
//       console.error("Failed to fetch user:", err);
//       navigate("/login");
//     }
//   };

//   fetchProfile();
// }, [id, navigate]);



// useEffect(() => {
//   const fetchUserPosts = async () => {
//     if (!user?._id) return;
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_SERVER_URL}/api/posts/user/${user._id}`,
//         { headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` } }
//       );
//       setUser(prev => ({ ...prev, posts: res.data }));
//     } catch (err) {
//       console.error("Failed to fetch posts:", err);
//     }
//   };

//   fetchUserPosts();
// }, [user?._id]);


//   if (!user) return <p className="text-center mt-20">Loading profile...</p>;

//   const filteredPosts = user.posts || [];

//   // update user state immediately
//   const handleProfileUpdate = (updatedUser) => {
//     if (!updatedUser) return;
//     setUser(updatedUser);
//     localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//   };


  
//   // Optimistic post addition
//   const handlePostAddedOptimistic = (newPost) => {
//     setUser((prev) => ({
//       ...prev,
//       posts: [newPost, ...(prev.posts || [])],
//     }));
//   };

//   // Delete current image (from profilePics)
// const deleteImage = async (index) => {
//   try {
//     const formData = new FormData();
//     formData.append("_id", user._id);
//     formData.append("action", "delete");
//     formData.append("index", index);

//     const res = await axios.put(
//       `${import.meta.env.VITE_SERVER_URL}/api/users/update`,
//       formData,
//       {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       }
//     );

//     // Merge posts to prevent overwriting them
//     const updatedUser = { ...res.data, posts: user.posts };
//     setUser(updatedUser);
//     setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
//     localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//   } catch (err) {
//     console.error(err);
//   }
// };


//   // Replace current image
//   const replaceImage = async (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("_id", user._id);
//     formData.append("action", "replace");
//     formData.append("index", index);
//     formData.append("profilePic", file);

//     try {
//       const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/update`, formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       });
//       setUser(res.data);
//       localStorage.setItem("bloomUser", JSON.stringify(res.data));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Add new image
//   const addImage = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("_id", user._id);
//     formData.append("action", "add");
//     formData.append("profilePic", file);

//     try {
//       const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/update`, formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       });
//       setUser(res.data);
//       setCurrentIndex(res.data.profilePics.length - 1);
//       localStorage.setItem("bloomUser", JSON.stringify(res.data));
//     } catch (err) {
//       console.error(err);
//     }
//   };

  
// // Unified delete handler
// // Delete a post and update only the posts array
// const handleDeleteConfirm = async () => {
//   if (!postToDelete) return;

//   try {
//     if (postToDelete.type === "post") {
//       const res = await axios.delete(
//         `${import.meta.env.VITE_SERVER_URL}/api/posts/${postToDelete.postId}`,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//         }
//       );

//       // Only update posts array, keep everything else intact
//       setUser(prev => {
//         const updatedUser = {
//           ...prev,
//           posts: prev.posts.filter(p => p._id !== postToDelete.postId),
//         };
//         localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//         return updatedUser;
//       });

//       setPostToDelete(null);
//       return;
//     }

//     if (postToDelete.type === "profilePic") {
//       await deleteImage(postToDelete.index);
//       setPostToDelete(null);
//       return;
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };


// if (!user) return <p className="text-center mt-20">Loading profile...</p>;

// const storedUser = localStorage.getItem("bloomUser");
// const currentUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
// const isOwner = currentUser?._id === user?._id;



    

//   return (
//     <div>
//       {/* Profile Header */}
//       <div className="flex flex-col items-center mb-6 relative w-full bg-black">
//         <div className="relative w-full h-[60vh] md:h-[120vh] rounded-lg overflow-hidden">
//           {user.profilePics?.length > 0 ? (
//             <>
//               <img
//                 src={user.profilePics[currentIndex]}
//                 alt="Profile"
//                 className="w-full h-full object-cover cursor-pointer"
//                 onClick={() =>
//                   setCurrentIndex((prev) =>
//                     prev < user.profilePics.length - 1 ? prev + 1 : 0
//                   )
//                 }
//               />
//               <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
//                 {user.profilePics.map((_, idx) => (
//                   <span
//                     key={idx}
//                     onClick={() => setCurrentIndex(idx)}
//                     className={`w-3 h-3 rounded-full cursor-pointer ${
//                       idx === currentIndex ? "bg-red-600" : "bg-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>

//               {/* Delete */}
           
//     {/* Delete & Replace — only owner can see */}
//     {isOwner && (
//       <>
//         <button
//           className="absolute top-2 right-2 bg-red-500 text-white py-1 rounded"
//           onClick={() => setPostToDelete({ type: "profilePic", index: currentIndex })}
//         >
//           Delete
//         </button>

//         <label className="absolute top-2 right-14 bg-purple-600 text-white px-2 py-1 rounded cursor-pointer">
//           Replace
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={(e) => replaceImage(e, currentIndex)}
//           />
//         </label>
//       </>
//     )}
//             </>
//           ) : (
//             <p className="text-center mt-10 text-gray-500">No profile images</p>
//           )}

//           {/* Add new image */}
//          {isOwner && (!user.profilePics || user.profilePics.length < 5) && (
//   <label className="absolute bottom-2 right-2 bg-purple-600 text-white px-3 py-1 rounded cursor-pointer">
//     <span>+</span>
//     <span className="text-xs">upload 5 image</span>
//     <input type="file" accept="image/*" className="hidden" onChange={addImage} />
//   </label>
// )}


//           {/* Name and username */}
//           <div className="absolute left-4 bottom-4 text-white">
//             <h2 className="text-2xl font-bold shadow-lg">{user.name}</h2>
//             <p className="text-sm text-gray-200">@{user.username}</p>
//           </div>
//         </div>
//       </div>

//       {/* Bio, Pronouns, Music, Country */}
//       {user.bio && <p className="text-center text-gray-600 mt-2">{user.bio}</p>}
//       {user.pronouns && <p className="text-gray-500 mt-1">{user.pronouns}</p>}
//       {user.music && <p className="text-gray-500 mt-1">🎵 {user.music}</p>}
//       {user.country && <p className="text-gray-500 mt-1">🌍 {user.country}</p>}

//       {/* Social Links */}
//       <div className="flex gap-4 mt-1">
//         {user.socials?.instagram && (
//           <a
//             href={`https://instagram.com/${user.socials.instagram}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 hover:underline"
//           >
//             Instagram
//           </a>
//         )}
//         {user.socials?.twitter && (
//           <a
//             href={`https://twitter.com/${user.socials.twitter}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 hover:underline"
//           >
//             Twitter
//           </a>
//         )}
//       </div>



//    {/* Buttons + Friend Count Row */}
// <div className="flex items-center gap-3 mt-2">

//   {/* Left Side Buttons */}
//   <div className="flex gap-2">
//     {isOwner && (
//       <button
//         className="px-4 py-1 rounded bg-purple-600 text-white"
//         onClick={() => setShowEdit(true)}
//       >
//         Edit Profile
//       </button>
//     )}

//     {isOwner && (
//       <button
//         onClick={() => setShowDiscover(true)}
//         className="px-4 py-2 rounded bg-pink-600 text-white hover:bg-pink-700"
//       >
//         Let people discover you
//       </button>
//     )}

//     {/* Friend Button */}
//     <FriendButton
//       profileUserId={user._id}
//       currentUserId={currentUser?._id}
//       initialFriendCount={user.friends?.length || 0}
//       initialIsFriend={user.friends?.includes(currentUser?._id)}
//       onFriendChange={(newCount, isFriend) => {
//         setUser(prev => {
//           let updatedFriends;
//           if (isFriend) {
//             updatedFriends = prev.friends
//               ? [...prev.friends, currentUser._id]
//               : [currentUser._id];
//           } else {
//             updatedFriends =
//               prev.friends?.filter(f => f !== currentUser._id) || [];
//           }

//           return {
//             ...prev,
//             friendsCount: newCount,
//             friends: updatedFriends,
//             isFriend,
//           };
//         });
//       }}
//     />
//   </div>

//   {/* RIGHT SIDE FRIEND COUNT */}
//  {isOwner && (
//   <div className="ml-auto px-3 py-1 bg-red-100 border border-red-300 rounded-lg shadow-sm">
//     <p className="text-red-700 font-semibold text-sm">
//       {(user.friendsCount ?? user.friends?.length) || 0}{" "}
//       {(user.friendsCount ?? user.friends?.length) === 1
//         ? "Friend"
//         : "Friends"}
//     </p>
//   </div>
// )}
// </div>

//       {/* Tabs */}
//     {/* Tabs */}
// <div className="flex justify-around mb-6 border-b border-gray-300">
//   {["all", "image", "video"].map((t) => (
//     <button
//       key={t}
//       className={`flex-1 text-center py-3 font-semibold text-lg rounded-t-lg transition-colors duration-200 ${
//         tab === t ? "border-b-4 border-purple-600 text-purple-600" : "text-gray-500 hover:text-gray-700"
//       }`}
//       onClick={() => setTab(t)}
//     >
//       {t.charAt(0).toUpperCase() + t.slice(1)}
//     </button>
//   ))}
// </div>


// {/* Posts Grid */}
// <div className="grid grid-cols-3 gap-2 mb-6">
//   {(user.posts || [])
//     .filter(post => tab === "all" || (post.files || []).some(f => f.type === tab))
//     .flatMap(post =>
//       (post.files || [])
//         .filter(f => tab === "all" || f.type === tab)
//         .map((file, idx) => (
//           <div
//             key={`${post._id}-${idx}`} // unique key per file
//             className="relative cursor-pointer"
//             onClick={() => setSelectedPost(post)}
//           >
//             {file.type === "image" ? (
//               <img src={file.url} className="w-full h-24 object-cover" />
//             ) : (
//               <video src={file.url} className="w-full h-24 object-cover" controls />
//             )}

//             {/* Delete icon */}
//          {post.userId === currentUser._id && (
//   <button
//     onClick={(e) => {
//       e.stopPropagation();
//       setPostToDelete({ type: "post", postId: post._id });
//     }}
//     className="absolute top-1 right-1 text-white bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs"
//   >
//     ×
//   </button>
// )}

//           </div>
//         ))
//     )}

//   {/* Add new post button */}
//  {isOwner && (
//   <div
//     key="add-post-btn"
//     onClick={() => setShowAddPost(true)}
//     className="flex justify-center items-center border border-gray-300 cursor-pointer h-24 text-red-500 font-bold"
//   >
//     +
//   </div>
// )}

// </div>



//       {/* Modal for viewing post */}
//       {selectedPost && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-70 flex justify-center items-center z-50">
//           <div className="p-6 rounded-lg w-11/12 md:w-2/3 max-h-[90vh] overflow-y-auto relative ">
//             <button
//               onClick={() => setSelectedPost(null)}
//               className="absolute top-2 right-2 text-black text-xl font-bold"
//             >
//               ×
//             </button>

            

//             {selectedPost.files.map((f, idx) =>
//               f.type === "image" ? (
//                 <img key={idx} src={f.url} className="w-full mb-4 rounded" />
//               ) : (
//                 <video key={idx} src={f.url} className="w-full mb-4 rounded" controls />
//               )
//             )}

            

//             {selectedPost.caption && <p className="text-black text-lg mt-2">{selectedPost.caption}</p>}

          
//           </div>
//         </div>
//       )}

//       {/* Confirm delete modal */}
//  {postToDelete && (
//   <ConfirmModal
//     message="Are you sure you want to delete?"
//     onConfirm={handleDeleteConfirm}
//     onCancel={() => setPostToDelete(null)}
//   />
// )}




// {showDiscover && (
//   <DiscoverCardModal
//     user={user}
//     isOwner={isOwner} // pass the boolean
//     onClose={() => setShowDiscover(false)}
//     onSave={(updatedUser) => setUser(updatedUser)}
//   />
// )}


//       {/* Modals */}
//       {showEdit && <EditProfileModal user={user} setUser={handleProfileUpdate} onClose={() => setShowEdit(false)} />}
//       {showAddPost && (
//         <AddPostModal
//           userId={user._id}
//           onClose={() => setShowAddPost(false)}
//           onPostAdded={(newPost) => {
//             setUser((prev) => {
//               const updatedUser = {
//                 ...prev,
//                 posts: [newPost, ...(prev.posts || [])],
//               };
//               localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//               return updatedUser;
//             });
//           }}
//         />
//       )}
//     </div>
//   );
// }
 























// // src/pages/ProfilePage.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import EditProfileModal from "../components/EditProfileModal";
// import AddPostModal from "../components/AddPostModal";
// import ConfirmModal from "../components/ConfirmModal";
// import DiscoverCardModal from "../components/DiscoverCardModal";
// import FriendButton from "../components/FriendButton";




// export default function ProfilePage() {
//   const navigate = useNavigate();
//   const { id } = useParams(); 
//   const [user, setUser] = useState(null);
//   const [showEdit, setShowEdit] = useState(false);
//   const [showAddPost, setShowAddPost] = useState(false);
//   const [tab, setTab] = useState("all"); // "all", "image", "video"
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [postToDelete, setPostToDelete] = useState(null);
//   const [showDiscover, setShowDiscover] = useState(false);
  
  
//   // Fetch profile (own or other user's)
// useEffect(() => {
//   const fetchProfile = async () => {
//     try {
//       // Always fetch from backend, even for logged-in user
//       const res = await axios.get(
//         id
//           ? `${import.meta.env.VITE_SERVER_URL}/api/users/${id}`
//           : `${import.meta.env.VITE_SERVER_URL}/api/users/me`, // optional /me route
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//         }
//       );

//       setUser(res.data);

//       // update localStorage if it's the current user
//       const storedUser = localStorage.getItem("bloomUser");
//       const loggedInUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
//       if (loggedInUser?._id === res.data._id) {
//         localStorage.setItem("bloomUser", JSON.stringify(res.data));
//       }
//     } catch (err) {
//       console.error("Failed to fetch user:", err);
      
//     }
//   };

//   fetchProfile();
// }, [id, navigate]);



// useEffect(() => {
//   const fetchUserPosts = async () => {
//     if (!user?._id) return;
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_SERVER_URL}/api/posts/user/${user._id}`,
//         { headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` } }
//       );
//       setUser(prev => ({ ...prev, posts: res.data }));
//     } catch (err) {
//       console.error("Failed to fetch posts:", err);
//     }
//   };

//   fetchUserPosts();
// }, [user?._id]);


//   if (!user) return <p className="text-center mt-20">Loading profile...</p>;

//   const filteredPosts = user.posts || [];

//   // update user state immediately
//   const handleProfileUpdate = (updatedUser) => {
//     if (!updatedUser) return;
//     setUser(updatedUser);
//     localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//   };


//   // =========================
// // REFRESH WHOLE PROFILE
// // =========================
// const handleRefreshProfile = async () => {
//   try {
//     const res = await axios.get(
//       `${import.meta.env.VITE_SERVER_URL}/api/users/${id}`,
//       {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       }
//     );

//     setUser(prev => ({
//       ...prev,
//       ...res.data,
//     }));

//     // if owner -> update localStorage
//     const stored = localStorage.getItem("bloomUser");
//     const loggedInUser =
//       stored && stored !== "undefined" ? JSON.parse(stored) : null;

//     if (loggedInUser?._id === res.data._id) {
//       localStorage.setItem("bloomUser", JSON.stringify(res.data));
//     }
//   } catch (err) {
//     console.error("Failed to refresh profile:", err);
//   }
// };

//   // Optimistic post addition
//   const handlePostAddedOptimistic = (newPost) => {
//     setUser((prev) => ({
//       ...prev,
//       posts: [newPost, ...(prev.posts || [])],
//     }));
//   };

//   // Delete current image (from profilePics)
// const deleteImage = async (index) => {
//   try {
//     const formData = new FormData();
//     formData.append("_id", user._id);
//     formData.append("action", "delete");
//     formData.append("index", index);

//     const res = await axios.put(
//       `${import.meta.env.VITE_SERVER_URL}/api/users/update`,
//       formData,
//       {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       }
//     );

//     // Merge posts to prevent overwriting them
//     const updatedUser = { ...res.data, posts: user.posts };
//     setUser(updatedUser);
//     setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
//     localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//   } catch (err) {
//     console.error(err);
//   }
// };


//   // Replace current image
//   const replaceImage = async (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("_id", user._id);
//     formData.append("action", "replace");
//     formData.append("index", index);
//     formData.append("profilePic", file);

//     try {
//       const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/update`, formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       });
//       setUser(res.data);
//       localStorage.setItem("bloomUser", JSON.stringify(res.data));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Add new image
//   const addImage = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("_id", user._id);
//     formData.append("action", "add");
//     formData.append("profilePic", file);

//     try {
//       const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/update`, formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       });
//       setUser(res.data);
//       setCurrentIndex(res.data.profilePics.length - 1);
//       localStorage.setItem("bloomUser", JSON.stringify(res.data));
//     } catch (err) {
//       console.error(err);
//     }
//   };

  
// // Unified delete handler
// // Delete a post and update only the posts array
// const handleDeleteConfirm = async () => {
//   if (!postToDelete) return;

//   try {
//     if (postToDelete.type === "post") {
//       const res = await axios.delete(
//         `${import.meta.env.VITE_SERVER_URL}/api/posts/${postToDelete.postId}`,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//         }
//       );

//       // Only update posts array, keep everything else intact
//       setUser(prev => {
//         const updatedUser = {
//           ...prev,
//           posts: prev.posts.filter(p => p._id !== postToDelete.postId),
//         };
//         localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//         return updatedUser;
//       });

//       setPostToDelete(null);
//       return;
//     }

//     if (postToDelete.type === "profilePic") {
//       await deleteImage(postToDelete.index);
//       setPostToDelete(null);
//       return;
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };



// const storedUser = localStorage.getItem("bloomUser");
// const currentUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
// const isOwner = currentUser?._id === user?._id;



    

//   return (
//     <div>
//       {/* Profile Header */}
//       <div className="flex flex-col items-center mb-6 relative w-full bg-black">
//         <div className="relative w-full h-[60vh] md:h-[120vh] rounded-lg overflow-hidden">
//           {user.profilePics?.length > 0 ? (
//             <>
//               <img
//                 src={user.profilePics[currentIndex]}
//                 alt="Profile"
//                 className="w-full h-full object-cover cursor-pointer"
//                 onClick={() =>
//                   setCurrentIndex((prev) =>
//                     prev < user.profilePics.length - 1 ? prev + 1 : 0
//                   )
//                 }
//               />
//               <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
//                 {user.profilePics.map((_, idx) => (
//                   <span
//                     key={idx}
//                     onClick={() => setCurrentIndex(idx)}
//                     className={`w-3 h-3 rounded-full cursor-pointer ${
//                       idx === currentIndex ? "bg-red-600" : "bg-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>

//               {/* Delete */}
           
//     {/* Delete & Replace — only owner can see */}
//     {isOwner && (
//       <>
//         <button
//           className="absolute top-2 right-2 bg-red-500 text-white py-1 rounded"
//           onClick={() => setPostToDelete({ type: "profilePic", index: currentIndex })}
//         >
//           Delete
//         </button>

//         <label className="absolute top-2 right-14 bg-purple-600 text-white px-2 py-1 rounded cursor-pointer">
//           Replace
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={(e) => replaceImage(e, currentIndex)}
//           />
//         </label>
//       </>
//     )}
//             </>
//           ) : (
//             <p className="text-center mt-10 text-gray-500">No profile images</p>
//           )}

//           {/* Add new image */}
//          {isOwner && (!user.profilePics || user.profilePics.length < 5) && (
//   <label className="absolute bottom-2 right-2 bg-purple-600 text-white px-3 py-1 rounded cursor-pointer">
//     <span>+</span>
//     <span className="text-xs">Upload (max 5)
// </span>
//     <input type="file" accept="image/*" className="hidden" onChange={addImage} />
//   </label>
// )}


//           {/* Name and username */}
//           <div className="absolute left-4 bottom-4 text-white">
//             <h2 className="text-2xl font-bold shadow-lg">{user.name}</h2>
//             <p className="text-sm text-gray-200">@{user.username}</p>
//           </div>
//         </div>
//       </div>

//       {/* Bio, Pronouns, Music, Country */}
//       {user.bio && <p className="text-center text-gray-600 mt-2">{user.bio}</p>}
//       {user.pronouns && <p className="text-gray-500 mt-1">{user.pronouns}</p>}
//       {user.music && <p className="text-gray-500 mt-1">🎵 {user.music}</p>}
//       {user.country && <p className="text-gray-500 mt-1">🌍 {user.country}</p>}

//       {/* Social Links */}
//       <div className="flex gap-4 mt-1">
//         {user.socials?.instagram && (
//           <a
//             href={`https://instagram.com/${user.socials.instagram}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 hover:underline"
//           >
//             Instagram
//           </a>
//         )}
//         {user.socials?.twitter && (
//           <a
//             href={`https://twitter.com/${user.socials.twitter}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 hover:underline"
//           >
//             Twitter
//           </a>
//         )}
//       </div>



//    {/* Buttons + Friend Count Row */}
// <div className="flex items-center gap-3 mt-2">

//   {/* Left Side Buttons */}
//   <div className="flex gap-2">
//     {isOwner && (
//       <button
//         className="px-4 py-1 rounded bg-purple-600 text-white"
//         onClick={() => setShowEdit(true)}
//       >
//         Edit Profile
//       </button>
//     )}

//     {isOwner && (
//       <button
//         onClick={() => setShowDiscover(true)}
//         className="px-4 py-2 rounded bg-pink-600 text-white hover:bg-pink-700"
//       >
//         Let people discover you
//       </button>
//     )}

// <FriendButton
//   profileUserId={user._id}
//   currentUserId={currentUser?._id}
//   initialFriendCount={user.friends?.length || 0}
//   initialIsFriend={user.friends?.includes(currentUser?._id)}
//   onFriendChange={async (newCount, isFriend) => {
//     setUser(prev => ({
//       ...prev,
//       friendsCount: newCount,
//       isFriend
//     }));
//   }}
// />


//   </div>

//   {/* RIGHT SIDE FRIEND COUNT */}
//  {isOwner && (
//   <div className="ml-auto px-3 py-1 bg-red-100 border border-red-300 rounded-lg shadow-sm">
//     <p className="text-red-700 font-semibold text-sm">
//       {(user.friendsCount ?? user.friends?.length) || 0}{" "}
//       {(user.friendsCount ?? user.friends?.length) === 1
//         ? "Friend"
//         : "Friends"}
//     </p>
//   </div>
// )}
// </div>

//       {/* Tabs */}
//     {/* Tabs */}
// <div className="flex justify-around mb-6 border-b border-gray-300">
//   {["all", "image", "video"].map((t) => (
//     <button
//       key={t}
//       className={`flex-1 text-center py-3 font-semibold text-lg rounded-t-lg transition-colors duration-200 ${
//         tab === t ? "border-b-4 border-purple-600 text-purple-600" : "text-gray-500 hover:text-gray-700"
//       }`}
//       onClick={() => setTab(t)}
//     >
//       {t.charAt(0).toUpperCase() + t.slice(1)}
//     </button>
//   ))}
// </div>


// {/* Posts Grid */}
// <div className="grid grid-cols-3 gap-2 mb-6">
//   {(user.posts || [])
//     .filter(post => tab === "all" || (post.files || []).some(f => f.type === tab))
//     .flatMap(post =>
//       (post.files || [])
//         .filter(f => tab === "all" || f.type === tab)
//         .map((file, idx) => (
//           <div
//             key={`${post._id}-${idx}`} // unique key per file
//             className="relative cursor-pointer"
//             onClick={() => setSelectedPost(post)}
//           >
//             {file.type === "image" ? (
//               <img src={file.url} className="w-full h-24 object-cover" />
//             ) : (
//               <video src={file.url} className="w-full h-24 object-cover" controls />
//             )}

//             {/* Delete icon */}
//          {post.userId === currentUser._id && (
//   <button
//     onClick={(e) => {
//       e.stopPropagation();
//       setPostToDelete({ type: "post", postId: post._id });
//     }}
//     className="absolute top-1 right-1 text-white bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs"
//   >
//     ×
//   </button>
// )}

//           </div>
//         ))
//     )}

//   {/* Add new post button */}
//  {isOwner && (
//   <div
//     key="add-post-btn"
//     onClick={() => setShowAddPost(true)}
//     className="flex justify-center items-center border border-gray-300 cursor-pointer h-24 text-red-500 font-bold"
//   >
//     +
//   </div>
// )}

// </div>



//       {/* Modal for viewing post */}
//       {selectedPost && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-70 flex justify-center items-center z-50">
//           <div className="p-6 rounded-lg w-11/12 md:w-2/3 max-h-[90vh] overflow-y-auto relative ">
//             <button
//               onClick={() => setSelectedPost(null)}
//               className="absolute top-2 right-2 text-black text-xl font-bold"
//             >
//               ×
//             </button>

            

//             {selectedPost.files.map((f, idx) =>
//               f.type === "image" ? (
//                 <img key={idx} src={f.url} className="w-full mb-4 rounded" />
//               ) : (
//                 <video key={idx} src={f.url} className="w-full mb-4 rounded" controls />
//               )
//             )}

            

//             {selectedPost.caption && <p className="text-black text-lg mt-2">{selectedPost.caption}</p>}

          
//           </div>
//         </div>
//       )}

//       {/* Confirm delete modal */}
//  {postToDelete && (
//   <ConfirmModal
//     message="Are you sure you want to delete?"
//     onConfirm={handleDeleteConfirm}
//     onCancel={() => setPostToDelete(null)}
//   />
// )}




// {showDiscover && (
//   <DiscoverCardModal
//     user={user}
//     isOwner={isOwner} // pass the boolean
//     onClose={() => setShowDiscover(false)}
//     onSave={(updatedUser) => setUser(updatedUser)}
//   />
// )}


//       {/* Modals */}
//       {showEdit && <EditProfileModal user={user} setUser={handleProfileUpdate} onClose={() => setShowEdit(false)} />}
//       {showAddPost && (
//         <AddPostModal
//           userId={user._id}
//           onClose={() => setShowAddPost(false)}
//           onPostAdded={(newPost) => {
//             setUser((prev) => {
//               const updatedUser = {
//                 ...prev,
//                 posts: [newPost, ...(prev.posts || [])],
//               };
//               localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//               return updatedUser;
//             });
//           }}
//         />
//       )}
//     </div>
//   );
// }
 




































// // src/pages/ProfilePage.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import EditProfileModal from "../components/EditProfileModal";
// import AddPostModal from "../components/AddPostModal";
// import ConfirmModal from "../components/ConfirmModal";
// import DiscoverCardModal from "../components/DiscoverCardModal";
// import FriendButton from "../components/FriendButton";




// export default function ProfilePage() {
//   const navigate = useNavigate();
//   const { id } = useParams(); 
//   const [user, setUser] = useState(null);
//   const [showEdit, setShowEdit] = useState(false);
//   const [showAddPost, setShowAddPost] = useState(false);
//   const [tab, setTab] = useState("all"); // "all", "image", "video"
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [postToDelete, setPostToDelete] = useState(null);
//   const [showDiscover, setShowDiscover] = useState(false);
  
  
//   // Fetch profile (own or other user's)
// useEffect(() => {
//   const fetchProfile = async () => {
//     try {
//       // Always fetch from backend, even for logged-in user
//       const res = await axios.get(
//         id
//           ? `${import.meta.env.VITE_SERVER_URL}/api/users/${id}`
//           : `${import.meta.env.VITE_SERVER_URL}/api/users/me`, // optional /me route
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//         }
//       );

//       setUser(res.data);

//       // update localStorage if it's the current user
//       const storedUser = localStorage.getItem("bloomUser");
//       const loggedInUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
//       if (loggedInUser?._id === res.data._id) {
//         localStorage.setItem("bloomUser", JSON.stringify(res.data));
//       }
//     } catch (err) {
//       console.error("Failed to fetch user:", err);
      
//     }
//   };

//   fetchProfile();
// }, [id, navigate]);



// useEffect(() => {
//   const fetchUserPosts = async () => {
//     if (!user?._id) return;
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_SERVER_URL}/api/posts/user/${user._id}`,
//         { headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` } }
//       );
//       setUser(prev => ({ ...prev, posts: res.data }));
//     } catch (err) {
//       console.error("Failed to fetch posts:", err);
//     }
//   };

//   fetchUserPosts();
// }, [user?._id]);


//   if (!user) return <p className="text-center mt-20">Loading profile...</p>;

//   const filteredPosts = user.posts || [];

//   // update user state immediately
//   const handleProfileUpdate = (updatedUser) => {
//     if (!updatedUser) return;
//     setUser(updatedUser);
//     localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//   };


//   // =========================
// // REFRESH WHOLE PROFILE
// // =========================
// const handleRefreshProfile = async () => {
//   try {
//     const res = await axios.get(
//       `${import.meta.env.VITE_SERVER_URL}/api/users/${id}`,
//       {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       }
//     );

//     setUser(prev => ({
//       ...prev,
//       ...res.data,
//     }));

//     // if owner -> update localStorage
//     const stored = localStorage.getItem("bloomUser");
//     const loggedInUser =
//       stored && stored !== "undefined" ? JSON.parse(stored) : null;

//     if (loggedInUser?._id === res.data._id) {
//       localStorage.setItem("bloomUser", JSON.stringify(res.data));
//     }
//   } catch (err) {
//     console.error("Failed to refresh profile:", err);
//   }
// };

//   // Optimistic post addition
//   const handlePostAddedOptimistic = (newPost) => {
//     setUser((prev) => ({
//       ...prev,
//       posts: [newPost, ...(prev.posts || [])],
//     }));
//   };

//   // Delete current image (from profilePics)
// const deleteImage = async (index) => {
//   try {
//     const formData = new FormData();
//     formData.append("_id", user._id);
//     formData.append("action", "delete");
//     formData.append("index", index);

//     const res = await axios.put(
//       `${import.meta.env.VITE_SERVER_URL}/api/users/update`,
//       formData,
//       {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       }
//     );

//     // Merge posts to prevent overwriting them
//     const updatedUser = { ...res.data, posts: user.posts };
//     setUser(updatedUser);
//     setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
//     localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//   } catch (err) {
//     console.error(err);
//   }
// };


//   // Replace current image
//   const replaceImage = async (e, index) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("_id", user._id);
//     formData.append("action", "replace");
//     formData.append("index", index);
//     formData.append("profilePic", file);

//     try {
//       const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/update`, formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       });


//      setUser(prev => ({
//       ...prev,
//       ...res.data,
//       posts: prev.posts, // preserve posts
//     }));
   
//     localStorage.setItem("bloomUser", JSON.stringify({
//       ...user,
//       ...res.data,
//       posts: user.posts,
//     }));
//   } catch (err) {
//     console.error(err);
//   }
// };

//   // Add new image
//   const addImage = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("_id", user._id);
//     formData.append("action", "add");
//     formData.append("profilePic", file);

//     try {
//       const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/update`, formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//       });


//      setUser(prev => ({
//       ...prev,
//       ...res.data,
//       posts: prev.posts, // preserve posts
//     }));
//     setCurrentIndex(prev => (res.data.profilePics?.length ? res.data.profilePics.length - 1 : prev));
//     localStorage.setItem("bloomUser", JSON.stringify({
//       ...user,
//       ...res.data,
//       posts: user.posts,
//     }));
//   } catch (err) {
//     console.error(err);
//   }
// };
  
// // Unified delete handler
// // Delete a post and update only the posts array
// const handleDeleteConfirm = async () => {
//   if (!postToDelete) return;

//   try {
//     if (postToDelete.type === "post") {
//       const res = await axios.delete(
//         `${import.meta.env.VITE_SERVER_URL}/api/posts/${postToDelete.postId}`,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
//         }
//       );

//       // Only update posts array, keep everything else intact
//       setUser(prev => {
//         const updatedUser = {
//           ...prev,
//           posts: prev.posts.filter(p => p._id !== postToDelete.postId),
//         };
//         localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//         return updatedUser;
//       });

//       setPostToDelete(null);
//       return;
//     }

//     if (postToDelete.type === "profilePic") {
//       await deleteImage(postToDelete.index);
//       setPostToDelete(null);
//       return;
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };



// const storedUser = localStorage.getItem("bloomUser");
// const currentUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
// const isOwner = currentUser?._id === user?._id;



    

//   return (
//     <div>
//       {/* Profile Header */}
//       <div className="flex flex-col items-center mb-6 relative w-full bg-black">
//         <div className="relative w-full h-[60vh] md:h-[120vh] rounded-lg overflow-hidden">
//           {user.profilePics?.length > 0 ? (
//             <>
//               <img
//                 src={user.profilePics[currentIndex]}
//                 alt="Profile"
//                 className="w-full h-full object-cover cursor-pointer"
//                 onClick={() =>
//                   setCurrentIndex((prev) =>
//                     prev < user.profilePics.length - 1 ? prev + 1 : 0
//                   )
//                 }
//               />
//               <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
//                 {user.profilePics.map((_, idx) => (
//                   <span
//                     key={idx}
//                     onClick={() => setCurrentIndex(idx)}
//                     className={`w-3 h-3 rounded-full cursor-pointer ${
//                       idx === currentIndex ? "bg-red-600" : "bg-gray-300"
//                     }`}
//                   />
//                 ))}
//               </div>

//               {/* Delete */}
           
//     {/* Delete & Replace — only owner can see */}
//     {isOwner && (
//       <>
//         <button
//           className="absolute top-2 right-2 bg-red-500 text-white py-1 rounded"
//           onClick={() => setPostToDelete({ type: "profilePic", index: currentIndex })}
//         >
//           Delete
//         </button>

//         <label className="absolute top-2 right-14 bg-purple-600 text-white px-2 py-1 rounded cursor-pointer">
//           Replace
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={(e) => replaceImage(e, currentIndex)}
//           />
//         </label>
//       </>
//     )}
//             </>
//           ) : (
//             <p className="text-center mt-10 text-gray-500">No profile images</p>
//           )}

//           {/* Add new image */}
//          {isOwner && (!user.profilePics || user.profilePics.length < 5) && (
//   <label className="absolute bottom-2 right-2 bg-purple-600 text-white px-3 py-1 rounded cursor-pointer">
//     <span>+</span>
//     <span className="text-xs">Upload (max 5)
// </span>
//     <input type="file" accept="image/*" className="hidden" onChange={addImage} />
//   </label>
// )}


//           {/* Name and username */}
//           <div className="absolute left-4 bottom-4 text-white">
//             <h2 className="text-2xl font-bold shadow-lg">{user.name}</h2>
//             <p className="text-sm text-gray-200">@{user.username}</p>
//           </div>
//         </div>
//       </div>

//       {/* Bio, Pronouns, Music, Country */}
//       {user.bio && <p className="text-center text-gray-600 mt-2">{user.bio}</p>}
//       {user.pronouns && <p className="text-gray-500 mt-1">{user.pronouns}</p>}
//       {user.music && <p className="text-gray-500 mt-1">🎵 {user.music}</p>}
//       {user.country && <p className="text-gray-500 mt-1">🌍 {user.country}</p>}

//       {/* Social Links */}
//       <div className="flex gap-4 mt-1">
//         {user.socials?.instagram && (
//           <a
//             href={`https://instagram.com/${user.socials.instagram}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 hover:underline"
//           >
//             Instagram
//           </a>
//         )}
//         {user.socials?.twitter && (
//           <a
//             href={`https://twitter.com/${user.socials.twitter}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 hover:underline"
//           >
//             Twitter
//           </a>
//         )}
//       </div>



//    {/* Buttons + Friend Count Row */}
// <div className="flex items-center gap-3 mt-2">

//   {/* Left Side Buttons */}
//   <div className="flex gap-2">
//     {isOwner && (
//       <button
//         className="px-4 py-1 rounded bg-purple-600 text-white"
//         onClick={() => setShowEdit(true)}
//       >
//         Edit Profile
//       </button>
//     )}

//     {isOwner && (
//       <button
//         onClick={() => setShowDiscover(true)}
//         className="px-4 py-2 rounded bg-pink-600 text-white hover:bg-pink-700"
//       >
//         Let people discover you
//       </button>
//     )}

// <FriendButton
//   profileUserId={user._id}
//   currentUserId={currentUser?._id}
//   initialFriendCount={user.friends?.length || 0}
//   initialIsFriend={user.friends?.includes(currentUser?._id)}
//   onFriendChange={async (newCount, isFriend) => {
//     setUser(prev => ({
//       ...prev,
//       friendsCount: newCount,
//       isFriend
//     }));
//   }}
// />


//   </div>

//   {/* RIGHT SIDE FRIEND COUNT */}
//  {isOwner && (
//   <div className="ml-auto px-3 py-1 bg-red-100 border border-red-300 rounded-lg shadow-sm">
//     <p className="text-red-700 font-semibold text-sm">
//       {(user.friendsCount ?? user.friends?.length) || 0}{" "}
//       {(user.friendsCount ?? user.friends?.length) === 1
//         ? "Friend"
//         : "Friends"}
//     </p>
//   </div>
// )}
// </div>

//       {/* Tabs */}
//     {/* Tabs */}
// <div className="flex justify-around mb-6 border-b border-gray-300">
//   {["all", "image", "video"].map((t) => (
//     <button
//       key={t}
//       className={`flex-1 text-center py-3 font-semibold text-lg rounded-t-lg transition-colors duration-200 ${
//         tab === t ? "border-b-4 border-purple-600 text-purple-600" : "text-gray-500 hover:text-gray-700"
//       }`}
//       onClick={() => setTab(t)}
//     >
//       {t.charAt(0).toUpperCase() + t.slice(1)}
//     </button>
//   ))}
// </div>


// {/* Posts Grid */}
// <div className="grid grid-cols-3 gap-2 mb-6">
//   {(user.posts || [])
//     .filter(post => tab === "all" || (post.files || []).some(f => f.type === tab))
//     .flatMap(post =>
//       (post.files || [])
//         .filter(f => tab === "all" || f.type === tab)
//         .map((file, idx) => (
//           <div
//             key={`${post._id}-${idx}`} // unique key per file
//             className="relative cursor-pointer"
//             onClick={() => setSelectedPost(post)}
//           >
//             {file.type === "image" ? (
//               <img src={file.url} className="w-full h-24 object-cover" />
//             ) : (
//               <video src={file.url} className="w-full h-24 object-cover" controls />
//             )}

//             {/* Delete icon */}
//          {post.userId === currentUser._id && (
//   <button
//     onClick={(e) => {
//       e.stopPropagation();
//       setPostToDelete({ type: "post", postId: post._id });
//     }}
//     className="absolute top-1 right-1 text-white bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs"
//   >
//     ×
//   </button>
// )}

//           </div>
//         ))
//     )}

//   {/* Add new post button */}
//  {isOwner && (
//   <div
//     key="add-post-btn"
//     onClick={() => setShowAddPost(true)}
//     className="flex justify-center items-center border border-gray-300 cursor-pointer h-24 text-red-500 font-bold"
//   >
//     +
//   </div>
// )}

// </div>



//       {/* Modal for viewing post */}
//       {selectedPost && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-70 flex justify-center items-center z-50">
//           <div className="p-6 rounded-lg w-11/12 md:w-2/3 max-h-[90vh] overflow-y-auto relative ">
//             <button
//               onClick={() => setSelectedPost(null)}
//               className="absolute top-2 right-2 text-black text-xl font-bold"
//             >
//               ×
//             </button>

            

//             {selectedPost.files.map((f, idx) =>
//               f.type === "image" ? (
//                 <img key={idx} src={f.url} className="w-full mb-4 rounded" />
//               ) : (
//                 <video key={idx} src={f.url} className="w-full mb-4 rounded" controls />
//               )
//             )}

            

//             {selectedPost.caption && <p className="text-black text-lg mt-2">{selectedPost.caption}</p>}

          
//           </div>
//         </div>
//       )}

//       {/* Confirm delete modal */}
//  {postToDelete && (
//   <ConfirmModal
//     message="Are you sure you want to delete?"
//     onConfirm={handleDeleteConfirm}
//     onCancel={() => setPostToDelete(null)}
//   />
// )}




// {showDiscover && (
//   <DiscoverCardModal
//     user={user}
//     isOwner={isOwner}
//     onClose={() => setShowDiscover(false)}
//     onSave={(updatedUser) => {
//       setUser(prev => ({
//         ...prev,
//         ...updatedUser,
//         posts: prev.posts, // preserve posts
//       }));
//     }}
//   />
// )}


//       {/* Modals */}
//       {showEdit && <EditProfileModal user={user} setUser={handleProfileUpdate} onClose={() => setShowEdit(false)} />}
//       {showAddPost && (
//         <AddPostModal
//           userId={user._id}
//           onClose={() => setShowAddPost(false)}
//           onPostAdded={(newPost) => {
//             setUser((prev) => {
//               const updatedUser = {
//                 ...prev,
//                 posts: [newPost, ...(prev.posts || [])],
//               };
//               localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
//               return updatedUser;
//             });
//           }}
//         />
//       )}
//     </div>
//   );
// }
 

















// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EditProfileModal from "../components/EditProfileModal";
import AddPostModal from "../components/AddPostModal";
import ConfirmModal from "../components/ConfirmModal";
import DiscoverCardModal from "../components/DiscoverCardModal";
import FriendButton from "../components/FriendButton";




export default function ProfilePage() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showAddPost, setShowAddPost] = useState(false);
  const [tab, setTab] = useState("all"); // "all", "image", "video"
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);
  const [showDiscover, setShowDiscover] = useState(false);

const friendCount = (user?.friends || []).length;


  
  
  // Fetch profile (own or other user's)
useEffect(() => {
  const fetchProfile = async () => {
    try {
      // Always fetch from backend, even for logged-in user
      const res = await axios.get(
        id
          ? `${import.meta.env.VITE_SERVER_URL}/api/users/${id}`
          : `${import.meta.env.VITE_SERVER_URL}/api/users/me`, // optional /me route
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
        }
      );

      setUser(res.data);

      // update localStorage if it's the current user
      const storedUser = localStorage.getItem("bloomUser");
      const loggedInUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
      if (loggedInUser?._id === res.data._id) {
        localStorage.setItem("bloomUser", JSON.stringify(res.data));
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
      
    }
  };

  fetchProfile();
}, [id, navigate]);



useEffect(() => {
  const fetchUserPosts = async () => {
    if (!user?._id) return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/posts/user/${user._id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` } }
      );
      setUser(prev => ({ ...prev, posts: res.data }));
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  fetchUserPosts();
}, [user?._id]);


  if (!user) return <p className="text-center mt-20">Loading profile...</p>;

  const filteredPosts = user.posts || [];

  // update user state immediately
  const handleProfileUpdate = (updatedUser) => {
    if (!updatedUser) return;
    setUser(updatedUser);
    localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
  };


  // =========================
// REFRESH WHOLE PROFILE
// =========================
const handleRefreshProfile = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/users/${id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
      }
    );

    setUser(prev => ({
      ...prev,
      ...res.data,
    }));

    // if owner -> update localStorage
    const stored = localStorage.getItem("bloomUser");
    const loggedInUser =
      stored && stored !== "undefined" ? JSON.parse(stored) : null;

    if (loggedInUser?._id === res.data._id) {
      localStorage.setItem("bloomUser", JSON.stringify(res.data));
    }
  } catch (err) {
    console.error("Failed to refresh profile:", err);
  }
};

  // Optimistic post addition
  const handlePostAddedOptimistic = (newPost) => {
    setUser((prev) => ({
      ...prev,
      posts: [newPost, ...(prev.posts || [])],
    }));
  };

  // Delete current image (from profilePics)
const deleteImage = async (index) => {
  try {
    const formData = new FormData();
    formData.append("_id", user._id);
    formData.append("action", "delete");
    formData.append("index", index);

    const res = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/users/update`,
      formData,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
      }
    );

    // Merge posts to prevent overwriting them
    const updatedUser = { ...res.data, posts: user.posts };
    setUser(updatedUser);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
    localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
  } catch (err) {
    console.error(err);
  }
};


  // Replace current image
  const replaceImage = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("_id", user._id);
    formData.append("action", "replace");
    formData.append("index", index);
    formData.append("profilePic", file);

    try {
      const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/update`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
      });


     setUser(prev => ({
      ...prev,
      ...res.data,
      posts: prev.posts, // preserve posts
    }));
   
    localStorage.setItem("bloomUser", JSON.stringify({
      ...user,
      ...res.data,
      posts: user.posts,
    }));
  } catch (err) {
    console.error(err);
  }
};

  // Add new image
  const addImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("_id", user._id);
    formData.append("action", "add");
    formData.append("profilePic", file);

    try {
      const res = await axios.put(`${import.meta.env.VITE_SERVER_URL}/api/users/update`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
      });


     setUser(prev => ({
      ...prev,
      ...res.data,
      posts: prev.posts, // preserve posts
    }));
    setCurrentIndex(prev => (res.data.profilePics?.length ? res.data.profilePics.length - 1 : prev));
    localStorage.setItem("bloomUser", JSON.stringify({
      ...user,
      ...res.data,
      posts: user.posts,
    }));
  } catch (err) {
    console.error(err);
  }
};
  
// Unified delete handler
// Delete a post and update only the posts array
const handleDeleteConfirm = async () => {
  if (!postToDelete) return;

  try {
    if (postToDelete.type === "post") {
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/posts/${postToDelete.postId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("bloomToken")}` },
        }
      );

      // Only update posts array, keep everything else intact
      setUser(prev => {
        const updatedUser = {
          ...prev,
          posts: prev.posts.filter(p => p._id !== postToDelete.postId),
        };
        localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
        return updatedUser;
      });

      setPostToDelete(null);
      return;
    }

    if (postToDelete.type === "profilePic") {
      await deleteImage(postToDelete.index);
      setPostToDelete(null);
      return;
    }
  } catch (err) {
    console.error(err);
  }
};



const storedUser = localStorage.getItem("bloomUser");
const currentUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
const isOwner = currentUser?._id === user?._id;



    

  return (
    <div>
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-6 relative w-full bg-black">
        <div className="relative w-full h-[60vh] md:h-[120vh] rounded-lg overflow-hidden">
          {user.profilePics?.length > 0 ? (
            <>
              <img
                src={user.profilePics[currentIndex]}
                alt="Profile"
                className="w-full h-full object-cover cursor-pointer"
                onClick={() =>
                  setCurrentIndex((prev) =>
                    prev < user.profilePics.length - 1 ? prev + 1 : 0
                  )
                }
              />
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                {user.profilePics.map((_, idx) => (
                  <span
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3 h-3 rounded-full cursor-pointer ${
                      idx === currentIndex ? "bg-red-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Delete */}
           
    {/* Delete & Replace — only owner can see */}
    {isOwner && (
      <>
        <button
          className="absolute top-2 right-2 bg-red-500 text-white py-1 rounded"
          onClick={() => setPostToDelete({ type: "profilePic", index: currentIndex })}
        >
          Delete
        </button>

        <label className="absolute top-2 right-14 bg-purple-600 text-white px-2 py-1 rounded cursor-pointer">
          Replace
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => replaceImage(e, currentIndex)}
          />
        </label>
      </>
    )}
            </>
          ) : (
            <p className="text-center mt-10 text-gray-500">No profile images</p>
          )}

          {/* Add new image */}
         {isOwner && (!user.profilePics || user.profilePics.length < 5) && (
  <label className="absolute bottom-2 right-2 bg-purple-600 text-white px-3 py-1 rounded cursor-pointer">
    <span>+</span>
    <span className="text-xs">Upload (max 5)
</span>
    <input type="file" accept="image/*" className="hidden" onChange={addImage} />
  </label>
)}


          {/* Name and username */}
          <div className="absolute left-4 bottom-4 text-white">
            <h2 className="text-2xl font-bold shadow-lg">{user.name}</h2>
            <p className="text-sm text-gray-200">@{user.username}</p>
          </div>
        </div>
      </div>

      {/* Bio, Pronouns, Music, Country */}
      {user.bio && <p className="text-center text-gray-600 mt-2">{user.bio}</p>}
      {user.pronouns && <p className="text-gray-500 mt-1">{user.pronouns}</p>}
      {user.music && <p className="text-gray-500 mt-1">🎵 {user.music}</p>}
      {user.country && <p className="text-gray-500 mt-1">🌍 {user.country}</p>}

      {/* Social Links */}
      <div className="flex gap-4 mt-1">
        {user.socials?.instagram && (
          <a
            href={`https://instagram.com/${user.socials.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Instagram
          </a>
        )}
        {user.socials?.twitter && (
          <a
            href={`https://twitter.com/${user.socials.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Twitter
          </a>
        )}
      </div>



   {/* Buttons + Friend Count Row */}
<div className="flex items-center gap-3 mt-2">

  {/* Left Side Buttons */}
  <div className="flex gap-2">
    {isOwner && (
      <button
        className="px-4 py-1 rounded bg-purple-600 text-white"
        onClick={() => setShowEdit(true)}
      >
        Edit Profile
      </button>
    )}

    {isOwner && (
      <button
        onClick={() => setShowDiscover(true)}
        className="px-4 py-2 rounded bg-pink-600 text-white hover:bg-pink-700"
      >
        Let people discover you
      </button>
    )}


<FriendButton
  profileUserId={user._id}
  currentUserId={currentUser?._id}
  initialFriendCount={friendCount}
  initialIsFriend={(user.friends || []).includes(currentUser?._id)}
  onFriendChange={(newCount, isFriend, updatedFriendsArray) => {
    setUser(prev => ({
      ...prev,
      friendsCount: newCount,
      isFriend,
      friends: updatedFriendsArray,
    }));
  }}
/>

  </div>

  {/* RIGHT SIDE FRIEND COUNT */}
 {isOwner && (
  <div className="ml-auto px-3 py-1 bg-red-100 border border-red-300 rounded-lg shadow-sm">
    <p className="text-red-700 font-semibold text-sm">
      {friendCount} {friendCount === 1 ? "Friend" : "Friends"}
    </p>
  </div>
)}
</div>

      {/* Tabs */}
    {/* Tabs */}
<div className="flex justify-around mb-6 border-b border-gray-300">
  {["all", "image", "video"].map((t) => (
    <button
      key={t}
      className={`flex-1 text-center py-3 font-semibold text-lg rounded-t-lg transition-colors duration-200 ${
        tab === t ? "border-b-4 border-purple-600 text-purple-600" : "text-gray-500 hover:text-gray-700"
      }`}
      onClick={() => setTab(t)}
    >
      {t.charAt(0).toUpperCase() + t.slice(1)}
    </button>
  ))}
</div>


 {/* Add new post button */}
 {isOwner && (
  <div
    key="add-post-btn"
    onClick={() => setShowAddPost(true)}
    className="flex justify-center items-center border border-gray-300 cursor-pointer h-24 text-red-500 font-bold"
  >
    +
  </div>
)}

{/* Posts Grid */}
<div className="flex flex-col gap-6 mb-20 px-2">

  {(user.posts || [])
    .filter(post => tab === "all" || (post.files || []).some(f => f.type === tab))
    .flatMap(post =>
      (post.files || [])
        .filter(f => tab === "all" || f.type === tab)
        .map((file, idx) => (
          <div
            key={`${post._id}-${idx}`} // unique key per file
            className="relative cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            {file.type === "image" ? (
              <img src={file.url} className="w-full aspect-square object-cover"
 />
            ) : (
              <video src={file.url} className="w-full aspect-square object-cover" controls />
            )}

            {/* Delete icon */}

             {String(post.user) === currentUser._id && (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setPostToDelete({ type: "post", postId: post._id });
      }}
      className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 rounded shadow hover:bg-red-700 text-xs"
    >
      Delete
    </button>
  )}
         {post.userId === currentUser._id && (
  <button
    onClick={(e) => {
      e.stopPropagation();
      setPostToDelete({ type: "post", postId: post._id });
    }}
    className="absolute top-1 right-1 text-white bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs"
  >
    ×
  </button>
)} 

          </div>
        ))
    )}

 

</div>


      {/* Modal for viewing post */}
      {selectedPost && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-70 flex justify-center items-center z-50">
          <div className="p-6 rounded-lg w-11/12 md:w-2/3 max-h-[90vh] overflow-y-auto relative ">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-2 right-2 text-black text-xl font-bold"
            >
              ×
            </button>

            

            {selectedPost.files.map((f, idx) =>
              f.type === "image" ? (
                <img key={idx} src={f.url} className="w-full mb-4 rounded" />
              ) : (
                <video key={idx} src={f.url} className="w-full mb-4 rounded" controls />
              )
            )}

            

            {selectedPost.caption && <p className="text-black text-lg mt-2">{selectedPost.caption}</p>}

          
          </div>
        </div>
      )}

      {/* Confirm delete modal */}
 {postToDelete && (
  <ConfirmModal
    message="Are you sure you want to delete?"
    onConfirm={handleDeleteConfirm}
    onCancel={() => setPostToDelete(null)}
  />
)}




{showDiscover && (
  <DiscoverCardModal
    user={user}
    isOwner={isOwner}
    onClose={() => setShowDiscover(false)}
    onSave={(updatedUser) => {
      setUser(prev => ({
        ...prev,
        ...updatedUser,
        posts: prev.posts, // preserve posts
      }));
    }}
  />
)}


      {/* Modals */}
      {showEdit && <EditProfileModal user={user} setUser={handleProfileUpdate} onClose={() => setShowEdit(false)} />}
      {showAddPost && (
        <AddPostModal
          userId={user._id}
          onClose={() => setShowAddPost(false)}
          onPostAdded={(newPost) => {
            setUser((prev) => {
              const updatedUser = {
                ...prev,
                posts: [newPost, ...(prev.posts || [])],
              };
              localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
              return updatedUser;
            });
          }}
        />
      )}
    </div>
  );
}
 










