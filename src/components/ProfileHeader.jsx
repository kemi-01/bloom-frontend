

import React from "react";

export default function ProfileHeader({ user, onEdit }) {
  return (
    <div className="flex items-center gap-4">
      <img src={user.profilePic || "/default-avatar.png"} alt="Profile" className="w-20 h-20 rounded-full" />
      <div>
        <h2 className="text-xl font-bold">{user.firstName} {user.surname}</h2>
        <p className="text-gray-500">@{user.username}</p>
      </div>
      <button onClick={onEdit} className="ml-auto px-3 py-1 bg-gray-200 rounded">Edit</button>
    </div>
  );
}
