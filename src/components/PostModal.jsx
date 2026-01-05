// src/components/PostModal.jsx

import React from "react";

export default function PostModal({ post, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-lg w-full">
        {post.type === "image" ? <img src={post.url} alt="Post" className="w-full h-auto rounded" /> : <video src={post.url} controls className="w-full h-auto rounded" />}
        <button onClick={onClose} className="mt-2 px-4 py-2 bg-gray-200 rounded">Close</button>
      </div>
    </div>
  );
}










