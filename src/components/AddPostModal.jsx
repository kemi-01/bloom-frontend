


import React, { useState } from "react";
import axios from "axios";
import Picker from "emoji-picker-react";

export default function AddPostModal({ userId, onClose, onPostAdded }) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const API_URL = import.meta.env.VITE_SERVER_URL;

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setPreviews(selectedFiles.map(f => URL.createObjectURL(f)));
  };

    const onEmojiClick = (emojiData, event) => {
    setCaption(prev => prev + emojiData.emoji); // 👈 append emoji
  };

  const handleUpload = async () => {
    if (!files.length) return alert("Select at least one file");
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("caption", caption);
      files.forEach(file => formData.append("files", file));

      const res = await axios.post(`${API_URL}/api/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("bloomToken")}`
        }
      });

      // Only send back the newly created post
      onPostAdded(res.data.post);

      onClose();
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#111] p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl text-white font-bold mb-4">Add Post</h2>

        <label className="w-24 h-24 flex justify-center items-center border-2 border-dashed border-gray-500 text-gray-500 text-3xl cursor-pointer rounded">
          +
          <input type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleFileChange} />
        </label>

        <div className="flex flex-wrap gap-2 mb-4">
          {previews.map((url, idx) =>
            files[idx].type.startsWith("video") ? (
              <video key={idx} src={url} className="w-24 h-24 object-cover rounded" controls />
            ) : (
              <img key={idx} src={url} className="w-100 h-44 object-cover rounded" />
            )
          )}
        </div>

{/* Caption + Emoji Picker */}
<div className="relative mb-4 overflow-visible">
  <textarea
    placeholder="Add a caption..."
    value={caption}
    onChange={e => setCaption(e.target.value)}
    className="w-full p-2 bg-[#222] text-white rounded border border-gray-700 resize-none"
  />
  
  {/* Emoji toggle button */}
  <button
    type="button"
    onClick={() => setShowEmojiPicker(prev => !prev)}
    className="absolute right-2 bottom-2 text-xl"
  >
    😊
  </button>

  {/* Emoji picker */}
  {showEmojiPicker && (
    <div className="absolute bottom-[50px] right-0 z-50 shadow-lg rounded overflow-visible">
      <Picker
        onEmojiClick={(emojiData) => setCaption(prev => prev + emojiData.emoji)} // append emoji
        lazyLoadEmojis
         height={350}   // bigger height to see all categories
        width={300}
      />
    </div>
  )}
</div>



        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">Cancel</button>
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className={`px-4 py-2 text-white rounded ${isUploading ? "bg-gray-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
