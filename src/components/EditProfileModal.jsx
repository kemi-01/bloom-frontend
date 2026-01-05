





// component editprofilemodel

import React, { useState } from "react";
import axios from "axios";
import Picker from "emoji-picker-react";

export default function EditProfileModal({ user, setUser, onClose }) {
  // Initialize socials if undefined
  const [form, setForm] = useState({ ...user, socials: user.socials || {} });
  const [file, setFile] = useState(null); // actual file object
  const [showMenu, setShowMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const API_URL = import.meta.env.VITE_SERVER_URL;

  // Generic field change handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Socials field change handler
  const handleSocialChange = (e) => {
    setForm({
      ...form,
      socials: { ...form.socials, [e.target.name]: e.target.value },
    });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setForm({ ...form, profilePic: URL.createObjectURL(selectedFile) }); // preview
  };

  const removeImage = () => {
    setFile(null);
    setForm({ ...form, profilePic: "" });
    setShowMenu(false);
  };

  const onEmojiClick = (emojiData) => {
    setForm(prev => ({ ...prev, bio: (prev.bio || "") + emojiData.emoji }));
  };
const handleSave = async () => {
  try {
    const payload = new FormData();
    payload.append("_id", user._id);

    // Only editable fields
    ["name", "bio", "pronouns", "music", "country"].forEach((key) =>
      payload.append(key, form[key] || "")
    );

    payload.append("socials", JSON.stringify(form.socials || {}));

    // Append file if selected
    if (file) payload.append("profilePic", file);

    const res = await axios.put(`${API_URL}/api/users/update`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("bloomToken")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // Merge posts from previous state to prevent overwriting
    const updatedUser = { ...res.data, posts: user.posts };

    setUser(updatedUser);
    localStorage.setItem("bloomUser", JSON.stringify(updatedUser));
    onClose();
  } catch (err) {
    console.error("Update error:", err.response?.data || err.message);
    alert(
      "Update failed: " + (err.response?.data?.message || "Check console")
    );
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="w-full max-w-md bg-[#111] p-6 rounded-2xl shadow-xl relative border border-gray-800 max-h-[90vh] overflow-y-auto">
        {/* Profile Picture */}
        <div className="flex justify-center relative mb-6">
          <div className="relative">
            <img
              src={form.profilePic || "/default-avatar.png"}
              className="w-28 h-28 rounded-full object-cover border-2 border-gray-700 shadow"
              alt="profile"
            />
            <div
              className="absolute left-0 top-0 cursor-pointer flex flex-col gap-1"
              onClick={() => setShowMenu(!showMenu)}
            >
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
            </div>

            {showMenu && (
              <div className="absolute left-0 top-28 bg-[#222] border border-gray-700 rounded-md shadow-lg p-2 text-sm space-y-1 w-32">
                <label className="block cursor-pointer text-gray-300 hover:text-white">
                  Change Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
                <button
                  className="text-red-400 hover:text-red-600 w-full text-left"
                  onClick={removeImage}
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>
        </div>

        <h2 className="text-xl font-bold mb-4 text-center text-white">
          Edit Profile
        </h2>

        {/* Main fields */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-300">Username (locked)</label>
          <input
            name="username"
            value={form.username || ""}
            readOnly
            className="w-full p-2 bg-[#1a1a1a] text-gray-400 border border-gray-700 rounded mt-1 cursor-not-allowed"
          />
        </div>

        {["name", "pronouns", "music", "country"].map((key) => (
          <div key={key} className="mb-4">
            <label className="text-sm font-semibold text-gray-300">{key}</label>
            <input
              name={key}
              value={form[key] || ""}
              onChange={handleChange}
              className="w-full p-2 bg-[#1a1a1a] text-white border border-gray-700 rounded mt-1 focus:ring focus:ring-purple-600"
              placeholder={key}
            />
          </div>
        ))}

        {/* Bio with emoji */}
        <div className="relative mb-4">
          <label className="text-sm font-semibold text-gray-300">Bio</label>
          <textarea
            name="bio"
            value={form.bio || ""}
            onChange={handleChange}
            className="w-full p-2 bg-[#1a1a1a] text-white border border-gray-700 rounded mt-1 resize-none"
            placeholder="Add bio..."
          />
          <button
            type="button"
            onClick={() => setShowEmojiPicker(prev => !prev)}
            className="absolute right-2 bottom-2 text-xl"
          >
            😊
          </button>
          {showEmojiPicker && (
            <div className="absolute bottom-[40px] right-0 z-50 shadow-lg rounded">
              <Picker onEmojiClick={onEmojiClick} lazyLoadEmojis height={350} width={350} />
            </div>
          )}
        </div>

        {/* Socials */}
       {/* Socials */}
{/* Instagram */}
<div className="mb-4">
  <label className="text-sm font-semibold text-gray-300">Instagram</label>
  <input
    name="instagram"
    value={form.socials?.instagram || ""}
    onChange={handleSocialChange}
    className="w-full p-2 bg-[#1a1a1a] text-white border border-gray-700 rounded mt-1 focus:ring focus:ring-purple-600"
    placeholder="Instagram username"
  />
  {form.socials?.instagram && (
    <a
      href={`https://instagram.com/${form.socials.instagram}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 text-sm mt-1 inline-block hover:underline"
    >
      Visit Instagram
    </a>
  )}
</div>

{/* Twitter */}
<div className="mb-4">
  <label className="text-sm font-semibold text-gray-300">Twitter</label>
  <input
    name="twitter"
    value={form.socials?.twitter || ""}
    onChange={handleSocialChange}
    className="w-full p-2 bg-[#1a1a1a] text-white border border-gray-700 rounded mt-1 focus:ring focus:ring-purple-600"
    placeholder="Twitter username"
  />
  {form.socials?.twitter && (
    <a
      href={`https://twitter.com/${form.socials.twitter}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 text-sm mt-1 inline-block hover:underline"
    >
      Visit Twitter
    </a>
  )}
</div>

{/* TikTok */}
<div className="mb-4">
  <label className="text-sm font-semibold text-gray-300">TikTok</label>
  <input
    name="tiktok"
    value={form.socials?.tiktok || ""}
    onChange={handleSocialChange}
    className="w-full p-2 bg-[#1a1a1a] text-white border border-gray-700 rounded mt-1 focus:ring focus:ring-purple-600"
    placeholder="TikTok username"
  />
  {form.socials?.tiktok && (
    <a
      href={`https://www.tiktok.com/@${form.socials.tiktok}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 text-sm mt-1 inline-block hover:underline"
    >
      Visit TikTok
    </a>
  )}
</div>



        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
