import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { EditProfileModal } from "./modals/EditProfileModal";

const UserProfile = () => {
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <div className="max-w-5xl mx-auto bg-(--color-background) rounded-2xl shadow-xl p-10 space-y-8">
        <h2 className="text-2xl font-semibold text-(--color-primary)">
          User Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-(--color-primary)/10">
            <p className="text-sm text-(--color-primary)/70 mb-1">Name</p>
            <p className="text-lg font-medium ">
              {user.fullName}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-(--color-primary)/10">
            <p className="text-sm text-(--color-primary)/70 mb-1">Email</p>
            <p className="text-lg font-medium break-all">
              {user.email}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-(--color-primary)/10">
            <p className="text-sm text-(--color-primary)/70 mb-1">Phone</p>
            <p className="text-lg font-medium">
              {user.mobileNumber}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setIsEditProfileModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-(--color-secondary) text-white font-medium hover:opacity-90 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {isEditProfileModalOpen && (
        <EditProfileModal onClose={() => setIsEditProfileModalOpen(false)} />
      )}
    </>
  );
};

export default UserProfile;
