import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Users, UserPlus, Bell, Activity, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [users, setUsers] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // 👈 NEW STATE

  const token = localStorage.getItem("accessToken");

  const fetchUsers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let response = await axios.get(
        `https://swiftsub-psi.vercel.app/v1/Admin/getUserList?page=1&limit=3000000&sortBy=createdAt:desc`,
        config
      );

      console.log("response of the user list", response.data);

      let data = [];
      if (response.data?.UserList?.totalResults) {
        data = response.data.UserList.totalResults;
      } else {
        data = [];
      }

      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const data = [
    { name: "Jan", Users: 120 },
    { name: "Feb", Users: 210 },
    { name: "Mar", Users: 150 },
    { name: "Apr", Users: 300 },
    { name: "May", Users: 250 },
    { name: "Jun", Users: 400 },
    { name: "Jul", Users: 350 },
  ];

  const activityData = [
    { name: "Active", value: 65 },
    { name: "Inactive", value: 25 },
    { name: "Pending", value: 10 },
  ];

  const COLORS = ["#F2632D", "#16A34A", "#FDBA74"];
  const totalUsers = 3245;
  const newSignups = 128;
  const notifications = 14;
  const activePercentage = 76;

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
        </div>

     
     
          <NavBar title="Dashboard" />
   

        {/* ====== DASHBOARD BODY ====== */}
        <div className="p-4 sm:p-6 lg:p-8 w-full">
          <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800">
            Welcome to Admin Dashboard
          </h1>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Users */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#F2632D] to-orange-500 text-white p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-all duration-300">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-sm font-serif opacity-90">Total Users</h2>
                  <p className="text-3xl font-bold mt-2">{users}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Users size={30} />
                </div>
              </div>
            </div>

            {/* New Signups */}
            <div className="relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-all duration-300">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-sm font-serif opacity-90">New Signups</h2>
                  <p className="text-3xl font-bold mt-2">{newSignups}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <UserPlus size={30} />
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-all duration-300">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-sm font-serif opacity-90">Notifications</h2>
                  <p className="text-3xl font-bold mt-2">{notifications}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Bell size={30} />
                </div>
              </div>
            </div>

            {/* Activity Status */}
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-violet-600 text-white p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-all duration-300">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-sm font-serif opacity-90">
                    Activity Status
                  </h2>
                  <p className="text-3xl font-bold mt-2">{activePercentage}%</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Activity size={30} />
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 bg-white shadow-md rounded-2xl h-[350px] sm:h-[400px]">
              <h2 className="text-xl font-serif mb-4 text-gray-800">
                New Sign Up
              </h2>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Users"
                    stroke="#F2632D"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="p-6 bg-white shadow-md rounded-2xl h-[350px] sm:h-[400px] flex flex-col items-center justify-center">
              <h2 className="text-xl font-serif  mb-4 text-gray-800">
                User Activity Status
              </h2>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={activityData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="70%"
                    label
                  >
                    {activityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
