import React, { useState } from "react";
// your existing navbar component
import { DollarSign, Users, AlertTriangle, TrendingUp } from "lucide-react";
import NavbarTabs from "../Components/NavbarTabs";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import { Menu, X } from "lucide-react";
import { UserGroupIcon, ChartBarIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

const Overview = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

        <NavBar title="" />
        <div className="min-h-screen bg-white text-gray-900 px-6">
          {/* Navbar Component */}
          <NavbarTabs />

          {/* Overview Section */}
         {/* Overview Section */}
<div className="space-y-6 mt-6">
  {/* Top Stats */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="border border-gray-300 rounded-xl p-4"> {/* This one has the border */}
      <div className="flex items-start gap-2 text-green-600">
        <DollarSign size={16} />{" "}
        <span className="text-sm font-medium text-gray-500">Total Revenue</span>
      </div>
      <p className="text-2xl font-bold mt-2">$77,600</p>
      <p className="text-sm text-gray-500">+15.2% from last month</p>
    </div>

    <div className="border border-gray-300 rounded-xl p-4"> {/* This one has the border */}
      <div className="flex items-center gap-2 text-sky-600">
        <Users size={16} />{" "}
        <span className="text-sm font-medium text-gray-500">Active Providers</span>
      </div>
      <p className="text-2xl font-bold mt-2">1</p>
      <p className="text-sm text-gray-500">+3 this month</p>
    </div>

    <div className="border border-gray-300 rounded-xl p-4"> {/* This one has the border */}
      <div className="flex items-center gap-2 text-yellow-600">
        <AlertTriangle size={16} />{" "}
        <span className="text-sm font-medium text-gray-500">Pending Reviews</span>
      </div>
      <p className="text-2xl font-bold mt-2">2</p>
      <p className="text-sm text-gray-500">Requires attention</p>
    </div>

    <div className="border border-gray-300 rounded-xl p-4"> {/* This one has the border */}
      <div className="flex items-center gap-2 text-gray-700">
        <TrendingUp size={16} />{" "}
        <span className="text-sm font-medium text-gray-500">Growth Rate</span>
      </div>
      <p className="text-2xl font-bold mt-2">24.5%</p>
      <p className="text-sm text-gray-500">Monthly growth</p>
    </div>
  </div>

            {/* Recent Activity */}
            <div className="border border-gray-300 rounded-xl p-5">
              <h2 className="text-lg font-normal mb-4">Recent Activity</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></span>
                  <div>
                    <p className="text-sm font-normal">
                      New provider application submitted
                    </p>
                    <p className="text-xs text-gray-500">
                      TechFlow Solutions · 2 hours ago
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-yellow-400"></span>
                  <div>
                    <p className="text-sm font-normal">
                      Provider subscription upgraded
                    </p>
                    <p className="text-xs text-gray-500">
                      Analytics Pro · 5 hours ago
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gray-800"></span>
                  <div>
                    <p className="text-sm font-normal">
                      Monthly revenue report generated
                    </p>
                    <p className="text-xs text-gray-500">System · 1 day ago</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="border border-gray-300 rounded-xl p-5 bg-white">
  <h2 className="text-lg font-normal mb-4">Quick Actions</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Review Applications */}
    <div className="border border-gray-300 rounded-xl px-4 text-center flex flex-col items-center gap-2 hover:bg-gray-300">
      <UserGroupIcon className="h-6 w-6 text-gray-500" />
      <p className="font-normal">Review Applications</p>
      <span className="bg-yellow-400 text-xs px-3 py-1 text-black rounded-lg font-semibold">2</span>
    </div>

    {/* Generate Report */}
    <div className="border  border-gray-300 rounded-xl px-4 text-center flex flex-col items-center gap-2 hover:bg-gray-300">
      <ChartBarIcon className="h-6 w-6 text-gray-500" />
      <p className="font-normal">Generate Report</p>
    
    </div>

    {/* Platform Settings */}
    <div className="border border-gray-300 rounded-xl px-4 text-center flex flex-col items-center gap-2 hover:bg-gray-300">
      <Cog6ToothIcon className="h-6 w-6 text-gray-500" />
      <p className="font-normal">Platform Settings</p>
     
    </div>
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
