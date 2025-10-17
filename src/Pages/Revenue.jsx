import React, { useState } from 'react'
import NavbarTabs from "../Components/NavbarTabs";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import { Menu, X, TrendingUp, DollarSign, User, ChartColumn } from "lucide-react";

const Revenue = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const revenueData = [
        { month: "Jan 2024", providerFees: "$15,600", userSubscriptions: "$23,400", totalRevenue: "$39,000", growth: "--" },
        { month: "Feb 2024", providerFees: "$18,200", userSubscriptions: "$28,100", totalRevenue: "$46,300", growth: "+18.7%" },
        { month: "Mar 2024", providerFees: "$21,800", userSubscriptions: "$32,600", totalRevenue: "$54,400", growth: "+17.5%" },
        { month: "Apr 2024", providerFees: "$24,500", userSubscriptions: "$38,200", totalRevenue: "$62,700", growth: "+15.3%" },
        { month: "May 2024", providerFees: "$27,300", userSubscriptions: "$42,800", totalRevenue: "$70,100", growth: "+11.8%" },
        { month: "Jun 2024", providerFees: "$30,100", userSubscriptions: "$47,500", totalRevenue: "$77,600", growth: "+10.7%" }
    ];

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

                    {/* Main Content */}
                    <div className="mt-6 pb-8">
                        {/* Stats Cards Section - No gap between cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {/* This Month Card */}
                            <div className="bg-white p-6 border border-gray-300 rounded-2xl">
  <div className="flex items-center gap-2">
    <DollarSign size={14} className=" text-[rgb(26,188,156)] " />
    <div className="text-[15px] text-gray-600">Provider Fees</div>
  </div>
  <div className="text-3xl font-semibold text-gray-900 mt-1">$30,100</div>
  <div className="text-[15px] text-gray-600 mt-[2px]">This month</div>
</div>
                            {/* User Subscriptions Card */}
                            <div className="bg-white p-6 border rounded-2xl border-gray-300">
  <div className="flex items-center gap-2">
    <TrendingUp size={16} className="text-[rgb(255,204,0)]" />
    <div className="text-[15px] text-gray-600">User Subscriptions</div>
  </div>
  <div className="text-3xl font-semibold text-gray-900 mt-1">$47,500</div>
  <div className="text-[13px] text-gray-500 mt-1">Commission revenue</div>
</div>


                            {/* Total Revenue Card */}
                            <div className="bg-white p-6 border rounded-2xl border-gray-300">
  <div className="flex items-center gap-2">
    <ChartColumn size={16} className="text-[rgb(51,51,51)]" />
    <div className="text-[15px] text-gray-600">Total Revenue</div>
  </div>
  <div className="text-3xl font-semibold text-gray-900 mt-1">$77,600</div>
  <div className="flex items-center gap-1 text-gray-500 text-[13px] mt-1">
    <span>+10.5% from last month</span>
  </div>
</div>

                        </div>

                        {/* Revenue History Section */}
                        <div className="bg-white border border-gray-300 rounded-2xl mt-7 p-4">
                            {/* Section Header */}
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-[18px] font-normal text-gray-800">Revenue History</h3>
                            </div>

                            {/* Table Container */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="text-left py-2 px-4 text-[13px] font-bold text-gray-600 border-b border-gray-300">Month</th>
                                            <th className="text-left py-2 px-4 text-[13px] font-bold text-gray-600 border-b border-gray-300">Provider Fees</th>
                                            <th className="text-left py-2 px-4 text-[13px] font-bold text-gray-600 border-b border-gray-300">User Subscriptions</th>
                                            <th className="text-left py-2 px-4 text-[13px] font-bold text-gray-600 border-b border-gray-300">Total Revenue</th>
                                            <th className="text-left py-2 px-4 text-[13px] font-bold text-gray-600 border-b border-gray-300">Growth</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {revenueData.map((row, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="py-2 px-6 text-[14px] text-gray-900 border-b font-medium border-gray-300">{row.month}</td>
                                                <td className="py-2 px-6 text-[14px] text-gray-900 border-b border-gray-300">{row.providerFees}</td>
                                                <td className="py-2 px-6 text-[14px] text-gray-900 border-b border-gray-300">{row.userSubscriptions}</td>
                                                <td className="py-2 px-6 font-bold text-[14px] text-gray-900 border-b border-gray-300">{row.totalRevenue}</td>
                                                <td className="py-2 px-6 text-[14px] text-green-600 border-b border-gray-300 flex items-center gap-1"><TrendingUp size={12} />{row.growth}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Revenue