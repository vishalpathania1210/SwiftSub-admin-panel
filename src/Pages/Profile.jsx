// src/pages/AdminProfile.jsx
import { useSelector } from "react-redux";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem("User"));
  const  token = localStorage.getItem("accessToken")

  // State to store profile data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Super Admin", // Default role if not provided
    phone: "N/A",        // Default phone if not provided
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch admin profile
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://swiftsub-psi.vercel.app/v1/admin/adminProfile",
        {
          params: { userId: userData.id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = response.data.user;
      console.log("Admin profile API response:", user);

      // Update state with API response
      setFormData({
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: user.email || "",
        role: "Super Admin", // Keep default since API has no role
        phone: "N/A",        // Keep default since API has no phone
      });
    } catch (err) {
      console.error("Profile API error:", err);
      setError("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 p-6">
        <NavBar title="Admin Profile" />

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">My Profile</h1>

          {loading ? (
            <p className="text-gray-500">Loading profile...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="bg-white shadow rounded-lg p-6 max-w-2xl space-y-6">
              {/* Name */}
              <div>
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p className="mt-1 text-lg font-semibold text-gray-800">
                  {formData.name || "N/A"}
                </p>
              </div>

              {/* Email */}
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1 text-lg font-semibold text-gray-800">
                  {formData.email || "N/A"}
                </p>
              </div>

              {/* Phone */}
              {/* <div>
                <p className="text-sm font-medium text-gray-500">Phone Number</p>
                <p className="mt-1 text-lg font-semibold text-gray-800">
                  {formData.phone}
                </p>
              </div> */}

              {/* Role */}
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <p className="mt-1 text-lg font-semibold text-indigo-600">
                  {formData.role}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
