// src/components/Navbar.jsx
import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const NavBar = ({ title }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [tokenn, setTokenn] = useState(null)
  const [accessToken, setAccessToken] = useState(null)


  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("User from localStorage:", parsedUser);
        const token = localStorage.getItem("refreshToken");
        setTokenn(token)
        const secondToken = localStorage.getItem("accessToken")
        console.log("checking access token",secondToken)
        setAccessToken(accessToken)
      } catch (error) {
        console.error("Failed to parse user:", error);
      }
    }
  }, []);
  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleConfirmLogout = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "https://swiftsub-psi.vercel.app/v1/auth/logout",
        {
          email: user?.email,
          refreshToken: tokenn
          // you can also fetch from user state
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Logout response:", response.data);

      // clear token and redirect
      localStorage.clear();
      toast.success("You are logged out");
      navigate("/login");
    } catch (error) {
      console.error("Logout API error:", error);
      toast.error("Logout failed");
    } finally {
      setLoading(false);
      setShowLogoutModal(false);
    }
  };

  return (
    <nav className="w-full bg-white shadow px-4 py-3 flex justify-between items-center relative">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex items-center gap-4">
        <Bell className="cursor-pointer" />

        {/* Avatar button */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold cursor-pointer select-none transition active:scale-95 duration-300"
          >
            V
          </button>

          {/* Dropdown menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50">
              <button
                type="button"
                onClick={() => navigate("/Profile")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 transition active:scale-95 duration-300"
              >
                Profile
              </button>
              <button
                type="button"
                onClick={() => navigate("/ForgotPassword")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 transition active:scale-95 duration-300 "
              >
                Forgot Password
              </button>
              <button
                type="button"
                onClick={() => setShowLogoutModal(true)}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition active:scale-95 duration-300"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white text-black w-full max-w-sm sm:max-w-md rounded-xl shadow-xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-center text-red-500">
              Confirm Logout
            </h2>
            <p className="text-center text-black">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center gap-4 pt-2 flex-wrap">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-5 py-2 bg-gray-400 hover:bg-gray-500 rounded-md active:scale-95 transition shadow-md duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                disabled={loading}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 rounded-md active:scale-95 transition shadow-md duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
