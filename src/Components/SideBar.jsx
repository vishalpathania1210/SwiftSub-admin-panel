import { useState } from "react";
import { Home, Users, Settings, LogOut, Menu } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ FIX: Added loading state
  const navigate = useNavigate();

  const menus = [
    { name: "Dashboard", icon: <Home size={20} />, link: "/Dashboard" },
    { name: "Users", icon: <Users size={20} />, link: "/users" },
    { name: "Settings", icon: <Settings size={20} />, link: "/settings" },
    { name: "Logout", icon: <LogOut size={20} /> },
  ];

  const handleConfirmLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("authToken"); // clear token
      setLoading(false);
      navigate("/login");
      toast.success('You are logged out')
    }, 800); // simulate async logout
  };

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${
            open ? "w-64" : "w-16"
          } bg-indigo-600 text-white h-screen p-4 pt-8 relative duration-300`}
        >
          {/* Toggle button */}
          <button
            className="absolute -right-3 top-9 w-6 h-6 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow"
            onClick={() => setOpen(!open)}
          >
            <Menu size={16} />
          </button>

          <h1
            className={`text-xl font-bold mb-6 ${
              !open && "scale-0"
            } duration-200`}
          >
            ADMIN
          </h1>

          <ul className="space-y-4">
            {menus.map((menu, i) => (
              <li key={i}>
                {menu.name === "Logout" ? (
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="flex items-center gap-3 p-2 rounded-md w-full text-left cursor-pointer hover:bg-indigo-500 duration-200"
                  >
                    {menu.icon}
                    <span className={`${!open && "hidden"} duration-200`}>
                      {menu.name}
                    </span>
                  </button>
                ) : (
                  <NavLink
                    to={menu.link}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-2 rounded-md cursor-pointer 
                       hover:bg-indigo-500 duration-200 
                       ${isActive ? "bg-indigo-700" : ""}`
                    }
                  >
                    {menu.icon}
                    <span className={`${!open && "hidden"} duration-200`}>
                      {menu.name}
                    </span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
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
    </>
  );
};

export default SideBar;
