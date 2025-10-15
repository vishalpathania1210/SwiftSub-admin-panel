// src/pages/AdminProfile.jsx
import { useSelector } from "react-redux";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Menu, X } from "lucide-react";

const Profile = () => {
  const userData = JSON.parse(localStorage.getItem("User"));
  const  token = localStorage.getItem("accessToken")
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="flex h-screen overflow-hidden">
    {/* ====== SIDEBAR ====== */}
    {/* Desktop Sidebar */}
    <div className="hidden md:block w-64 bg-white shadow-md fixed left-0 top-0 bottom-0 z-20">
      <SideBar />
    </div>

    {/* Mobile Sidebar (Slide-in) */}
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white shadow-md z-30 transform transition-transform duration-300 md:hidden ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 text-white pt- bg-indigo-600">
        <h2 className="text-lg font-bold">Swiftsub</h2>
        <button onClick={() => setSidebarOpen(false)}>
          <X size={24} />
        </button>
      </div>
      <SideBar />
    </div>

    {/* Overlay for mobile sidebar */}
    {sidebarOpen && (
      <div
        className="fixed inset-0 bg-black opacity-40 z-20 md:hidden"
        onClick={() => setSidebarOpen(false)}
      ></div>
    )}

    {/* ====== MAIN CONTENT ====== */}
    <div className="flex-1 md:ml-64 flex flex-col bg-gray-50 min-h-screen overflow-y-auto relative">
      {/* Mobile Navbar Toggle Button */}
      <div className="md:hidden p-4 flex justify-between items-center bg-white shadow-sm sticky top-0 z-10">
        <button onClick={() => setSidebarOpen(true)}>
          <Menu size={28} />
        </button>
        <h1 className="text-xl font-semibold">Admin Profile</h1>
      </div>

      {/* Existing Navbar for larger screens */}
      <div className="hidden md:block">
        <NavBar title="Admin Profile" />
      </div>

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
