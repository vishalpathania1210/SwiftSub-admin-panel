// src/pages/AdminProfile.jsx
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import { useState } from "react";

const Profile = () => {
  const [formData] = useState({
    name: "Admin User",
    email: "admin@example.com",
    role: "Super Admin",
    phone: "+91 9876543210",
  });

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <NavBar title="Admin Profile" />

        {/* Profile Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">My Profile</h1>

          <div className="bg-white shadow rounded-lg p-6 max-w-2xl space-y-6">
            {/* Name */}
            <div>
              <p className="text-sm font-medium text-gray-500">Full Name</p>
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {formData.name}
              </p>
            </div>

            {/* Email */}
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {formData.email}
              </p>
            </div>

            {/* Phone */}
            <div>
              <p className="text-sm font-medium text-gray-500">Phone Number</p>
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {formData.phone}
              </p>
            </div>

            {/* Role */}
            <div>
              <p className="text-sm font-medium text-gray-500">Role</p>
              <p className="mt-1 text-lg font-semibold text-indigo-600">
                {formData.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
