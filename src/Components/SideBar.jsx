import { useState } from "react";
import { Home, Users, Settings, LogOut, Menu } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SideBar = () => {
  const [open, setOpen] = useState(true);

  const menus = [
    { name: "Dashboard", icon: <Home size={20} />, link: "/Dashboard" },
    { name: "Users", icon: <Users size={20} />, link: "/users" },
    { name: "Settings", icon: <Settings size={20} />, link: "/settings" },
  ];


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
         {/* Toggle button */}
{/* <button
  className="absolute -right-3 top-9 w-6 h-6 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow
             hidden md:flex" // 👈 hide on small screens, show on md+
  onClick={() => setOpen(!open)}
>
  <Menu size={16} />
</button> */}

<h1
  className={`text-xl font-bold mb-6 ${
    !open && "scale-0"
  } duration-200 hidden md:block`} // 👈 hide on small screens, show on md+
>
  Swiftsub
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
    </>
  );
};

export default SideBar;
