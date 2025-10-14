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
import { Users, UserPlus, TrendingUp, TrendingDown } from "lucide-react";

export default function Dashboard() {
  // Dummy data for Users graph
  const data = [
    { name: "Jan", Users: 120 },
    { name: "Feb", Users: 210 },
    { name: "Mar", Users: 150 },
    { name: "Apr", Users: 300 },
    { name: "May", Users: 250 },
    { name: "Jun", Users: 400 },
    { name: "Jul", Users: 350 },
  ];

  // Dummy data for Activity Status pie chart
  const activityData = [
    { name: "Active", value: 65 },
    { name: "Inactive", value: 25 },
    { name: "Pending", value: 10 },
  ];

  const COLORS = ["#F2632D", "#16A34A", "#FDBA74"];

  // Dummy stats
  const totalUsers = 3245;
  const newSignups = 128;
  const newSignupChange = -3.2;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="hidden md:block w-64 bg-white shadow-md fixed left-0 top-0 bottom-0 z-20">
        <SideBar />
      </div>

      {/* Main Content (Scrollable) */}
      <div className="flex-1 md:ml-64 flex flex-col bg-gray-50 min-h-screen overflow-y-auto">
        <NavBar title="Dashboard" />

        <div className="p-4 sm:p-6 lg:p-8 w-full">
          <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800">
            Welcome to Admin Dashboard
          </h1>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Users */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#F2632D] to-orange-500 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-sm font-medium opacity-90">Total Users</h2>
                  <p className="text-3xl font-bold mt-2">{totalUsers}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Users size={30} />
                </div>
              </div>
            </div>

            {/* New Signups */}
            <div className="relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-sm font-medium opacity-90">New Signups</h2>
                  <p className="text-3xl font-bold mt-2">{newSignups}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <UserPlus size={30} />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 text-sm">
                {newSignupChange >= 0 ? (
                  <>
                    <TrendingUp size={18} className="text-green-200" />
                    <span className="text-green-100">
                      +{newSignupChange}% this week
                    </span>
                  </>
                ) : (
                  <>
                    <TrendingDown size={18} className="text-red-200" />
                    <span className="text-red-100">
                      {newSignupChange}% this week
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Users Growth Graph */}
            <div className="p-6 bg-white shadow-md rounded-2xl h-[350px] sm:h-[400px]">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Users Growth Graph
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

            {/* Activity Status Pie Chart */}
            <div className="p-6 bg-white shadow-md rounded-2xl h-[350px] sm:h-[400px] flex flex-col items-center justify-center">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
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
