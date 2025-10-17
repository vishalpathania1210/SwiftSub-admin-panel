import React, { useState } from 'react'
import SideBar from '../Components/SideBar'
import NavbarTabs from '../Components/NavbarTabs'
import NavBar from '../Components/NavBar'
import { Menu, X, ChevronDown, Eye, Check, X as XIcon, AlertTriangle } from "lucide-react";
import { Ban } from "lucide-react";

const Providers = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Mock data for pending applications
    const pendingApplications = [
        {
            businessName: "TechFlow Solutions",
            contact: "contact@techflow.com",
            serviceType: "sas",
            applicationDate: "2024-09-20",
        },
        {
            businessName: "StreamVault",
            contact: "hello@streamvault.com",
            serviceType: "streaming",
            applicationDate: "2024-09-21",
        }
    ];

    // Mock data for active providers
    const activeProviders = [
        {
            businessName: "Analytics Pro",
            contact: "support@analyticspro.com",
            serviceType: "analytics",
            subscriptionPlan: "annual",
            verified: "verified"
        }
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
                    <div className="space-y-8 mt-6 pb-8">
                        {/* Pending Applications Section */}
                        <div className="bg-white overflow-hidden">
                            {/* Section Header */}
                            <div className="flex justify-between items-center p-6">
                                <h2 className="text-xl font-semibold text-gray-700">Provider Management</h2>
                            </div>
                            
                            {/* Pending Applications Subheader */}
                            <div className="px-6 py-4 bg-gray-50 border rounded-xl border-gray-300">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle size={18} className='text-[rgb(255,204,0)]' />
                                    <h3 className="text-base font-normal text-gray-800">Pending Applications (2)</h3>
                                </div>
                       

                            {/* Table Container */}
                            <div className="overflow-x-auto pt-6">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-700  border-b border-gray-300">Business Name</th>
                                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-700  border-b border-gray-300">Service Type</th>
                                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-700  border-b border-gray-300">Application Date</th>
                                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-700  border-b border-gray-300">Website</th>
                                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-700  border-b border-gray-300">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingApplications.map((app, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="py-4 px-6 border-b border-gray-300">
                                                    <div>
                                                        <div className="font-medium text-gray-700">{app.businessName}</div>
                                                        <div className="text-sm text-gray-500">{app.contact}</div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 border-b border-gray-300">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full border border-gray-300 text-xs font-medium capitalize">
                                                        {app.serviceType}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-900 border-b border-gray-300">{app.applicationDate}</td>
                                                <td className="py-4 px-6 border-b border-gray-300">
                                                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors ">
                                                        <span className="text-sm font-medium">View</span>
                                                        <Eye size={12} />
                                                    </button>
                                                </td>
                                                <td className="py-4 px-6 border-b border-gray-300">
                                                    <div className="flex items-center gap-2">
                                                        <button className="flex items-center gap-1.5 bg-teal-500 px-3 py-1.5 rounded-lg transition-colors border text-white">
                                                            <Check size={16} />
                                                            <span className="text-sm font-medium">Approve</span>
                                                        </button>
                                                        <button className="flex items-center gap-1.5 text-black hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors border border-red-200">
                                                            <XIcon size={16} />
                                                            <span className="text-sm font-normal">Reject</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        </div>

                        {/* Active Providers Section */}
                        <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
                            {/* Active Providers Subheader */}
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-300">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-normal text-gray-800">Active Providers (1)</h3>
                                </div>
                            

                            {/* Table Container */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600 border-b border-gray-300">Business Name</th>
                                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600 border-b border-gray-300">Service Type</th>
                                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600 border-b border-gray-300">Subscription Plan</th>
                                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600 border-b border-gray-300">Verified</th>
                                            <th className="text-left py-4 px-6 text-sm font-medium text-gray-600 border-b border-gray-300">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activeProviders.map((provider, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="py-4 px-6">
                                                    <div>
                                                        <div className="font-medium text-gray-900">{provider.businessName}</div>
                                                        <div className="text-sm text-gray-500">{provider.contact}</div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 border-b border-gray-200">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 capitalize">
                                                        {provider.serviceType}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-sm text-white"><span className='bg-teal-500 p-1 border rounded-lg'>{provider.subscriptionPlan}</span></td>
                                                <td className="py-4 px-6 border-b border-gray-200">
                                                    <div className="flex items-center gap-2 text-green-600">
                                                        <span className="text-sm font-medium border bg-cyan-500 p-1 rounded-lg text-white">{provider.verified}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 border-b border-gray-200">
    <div className="flex items-center gap-3">
        <button className="flex items-center gap-1 text-gray-600 border border-gray-300 rounded-lg p-2 hover:bg-gray-300 transition-colors">
            <Eye size={18} />
        </button>
        <button className="flex items-center gap-1 text-gray-600 border border-gray-300  rounded-lg p-2 hover:bg-gray-300 transition-colors">
            <Ban size={18} />
        </button>
    </div>
</td>
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
        </div>
    )
}

export default Providers