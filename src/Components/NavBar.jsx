// src/components/Navbar.jsx
import { Bell, User } from "lucide-react";

 const NavBar = ({title}) => {
  return (
    <nav className="w-full bg-white shadow px-4 py-3 flex justify-between items-center">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex items-center gap-4">
        <Bell className="cursor-pointer" />
        <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold cursor-pointer">
          V
        </div>
      </div>
    </nav>
  );
}
export default NavBar
