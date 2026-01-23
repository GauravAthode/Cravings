import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../config/Api";
import toast from "react-hot-toast";

export const EditProfileModal = ({ onClose }) => {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    mobileNumber: user.mobileNumber,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/user/update", formData);
      sessionStorage.setItem("CravingUser", JSON.stringify(res.data.data));
      setUser(res.data.data);
      toast.success("Profile updated successfully");
      onClose();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl">

        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-xl font-semibold">Edit Profile</h3>
          <button onClick={onClose} className="text-2xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="w-full px-4 py-3 border rounded-xl"
          />

          <input
            value={formData.email}
            disabled
            className="w-full px-4 py-3 border rounded-xl bg-gray-100"
          />

          <input
            value={formData.mobileNumber}
            onChange={(e) =>
              setFormData({ ...formData, mobileNumber: e.target.value })
            }
            className="w-full px-4 py-3 border rounded-xl"
          />

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-(--color-secondary) text-white rounded-xl"
            >
              Save Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
