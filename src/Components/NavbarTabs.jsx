import React from "react";
// Import NavLink from react-router-dom
import { NavLink } from "react-router-dom"; 

const NavbarTabs = () => {
  // 1. Remove useState for activeTab, as NavLink handles the active state

  // Define the tabs with their corresponding route links
  // The link should match the path defined in your React Router setup (e.g., in App.jsx)
  const tabs = [
    { name: "Overview", link: "/Overview" },
    { name: "Providers", link: "/Providers" },
    { name: "Revenue", link: "/Revenue" },
    { name: "Moderation", link: "/Roderation" },
  ];

  return (
    <div className="w-full flex justify-start mt-4">
      <div className="flex bg-gray-100 rounded-full px-2 py-1 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          // 2. Use NavLink instead of a button
          <NavLink
            key={tab.name}
            to={tab.link} // Use the link from the tab object
            // 3. Use the className function with 'isActive' to apply styles
            className={({ isActive }) =>
              `px-14 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 rounded-full focus:outline-none 
               ${
                 isActive
                   ? "bg-white shadow-sm text-gray-900" // Active styles
                   : "text-gray-600 hover:text-gray-800" // Inactive styles
               }`
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default NavbarTabs;