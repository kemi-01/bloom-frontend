





import React, { useState, useEffect } from "react";
import axios from "axios";

const TAGS = ["Feminine", "Sporty", "Soft Girl", "Music Lover"];

export default function DiscoverCardModal({ user, isOwner, onClose, onSave }) {
const [images, setImages] = useState([]); // { file?, url? }
const [writeUp, setWriteUp] = useState("");
const [selectedTags, setSelectedTags] = useState([]);
const [country, setCountry] = useState("");
const [pronouns, setPronouns] = useState("");
const [uploading, setUploading] = useState(false);
const [deleteFiles, setDeleteFiles] = useState([]);


const API_URL = import.meta.env.VITE_SERVER_URL;

// Load existing discover info
useEffect(() => {
if (user.discover) {
const existingImages = (user.discover.images || []).map((url) => ({ url }));
setImages(existingImages);
setWriteUp(user.discover.writeUp || "");
setSelectedTags(user.discover.tags || []);
setCountry(user.discover.country || "");
setPronouns(user.discover.pronouns || "");
}
}, [user]);

// Handle new file uploads
const handleFileChange = (e) => {
const files = Array.from(e.target.files);
if (images.length + files.length > 3) {
alert("You can upload up to 3 images");
return;
}
setImages((prev) => [...prev, ...files.map((f) => ({ file: f }))]);
};

// Remove image
const removeImage = (index) => {
setImages((prev) => {
const imgToRemove = prev[index];
if (imgToRemove.url) {
setDeleteFiles((d) => [...d, imgToRemove.url]);
}
return prev.filter((_, idx) => idx !== index);
});
};

// Toggle tag
const toggleTag = (tag) => {
setSelectedTags((prev) =>
prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
);
};

// Save Discover info
const handleDiscover = async () => {
if (!writeUp.trim()) {
alert("Write a short description about yourself");
return;
}


if (images.length === 0) {
  alert("Upload at least one image");
  return;
}

setUploading(true);

try {
  const formData = new FormData();
  formData.append("_id", user._id);
  formData.append("writeUp", writeUp);
  formData.append("tags", JSON.stringify(selectedTags));
  formData.append("country", country);
  formData.append("pronouns", pronouns);

  // Append only new files
  images.forEach((img) => {
    if (img.file) formData.append("images", img.file);
  });

  // Append deleted images
  if (deleteFiles.length > 0) {
    formData.append("deleteImages", JSON.stringify(deleteFiles));
  }

  const res = await axios.put(`${API_URL}/api/users/discover`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("bloomToken")}`,
      "Content-Type": "multipart/form-data",
    },
  });

  onSave(res.data);
  onClose();
} catch (err) {
  console.error("Discover save error:", err.response?.data || err.message);
  alert("Failed to save discover info");
} finally {
  setUploading(false);
}


};

return ( <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"> <div className="bg-[#111] rounded-2xl p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto shadow-lg animate-slide-up"> <h2 className="text-white text-xl font-bold mb-4 text-center">
Let People Discover You </h2>

```
    {isOwner && (
      <p className="text-center text-sm text-gray-400 mb-4 italic">
        This is your profile
      </p>
    )}

    {/* Images */}
    <div className="mb-4">
      <label className="block text-gray-300 mb-1">Upload up to 3 images</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-2"
      />
      <div className="flex gap-2 mt-2">
        {images.map((img, idx) => (
          <div key={idx} className="relative">
            <img
              src={img.url || URL.createObjectURL(img.file)}
              alt="preview"
              className="w-20 h-20 object-cover rounded"
            />
            <button
              onClick={() => removeImage(idx)}
              className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* Write-up */}
    <div className="mb-4">
      <label className="block text-gray-300 mb-1">Short Write-Up</label>
      <textarea
        value={writeUp}
        onChange={(e) => setWriteUp(e.target.value)}
        placeholder="Write something about yourself..."
        className="w-full p-2 rounded border border-gray-700 bg-[#1a1a1a] text-white resize-none"
      />
    </div>

    {/* Tags */}
    <div className="mb-4">
      <label className="block text-gray-300 mb-1">Tags</label>
      <div className="flex flex-wrap gap-2">
        {TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded-full border ${
              selectedTags.includes(tag)
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-[#222] text-gray-300 border-gray-700"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>

    {/* Country & Pronouns */}
    <div className="mb-4">
      <label className="block text-gray-300 mb-1">Country</label>
      <input
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="w-full p-2 rounded border border-gray-700 bg-[#1a1a1a] text-white"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-300 mb-1">Pronouns</label>
      <input
        value={pronouns}
        onChange={(e) => setPronouns(e.target.value)}
        className="w-full p-2 rounded border border-gray-700 bg-[#1a1a1a] text-white"
      />
    </div>

    {/* Buttons */}
    <div className="flex justify-end gap-3 mt-4">
      <button
        onClick={onClose}
        className="px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600"
        disabled={uploading}
      >
        Cancel
      </button>
      <button
        onClick={handleDiscover}
        className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
        disabled={uploading}
      >
        {uploading ? "Saving..." : "Discover"}
      </button>
    </div>
  </div>
</div>


);
}
