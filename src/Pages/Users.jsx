import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../Components/SideBar";
import NavBar from "../Components/NavBar";
import { toast } from "react-toastify";
import { Trash2, X, Edit2 , Menu} from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [editUserId, setEditUserId] = useState(null); // For Edit modal
  const [editUserData, setEditUserData] = useState({ firstName: "", lastName: "" });
  const [updating, setUpdating] = useState(false);

  const token = localStorage.getItem("accessToken"); // Make token accessible globally

  const [sidebarOpen, setSidebarOpen] = useState(false); // 👈 NEW STATE
  
  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let response;

      if (searchQuery.trim()) {
        response = await axios.get(
          `https://swiftsub-psi.vercel.app/v1/Admin/searchUser?query=${searchQuery}`,
          config
        );
      } else {
        response = await axios.get(
          "https://swiftsub-psi.vercel.app/v1/Admin/getUserList?page=1&limit=3000000&sortBy=createdAt:desc",
          config
        );
      }

      console.log("response of the user list", response.data);

      // ✅ Extraction logic updated for new API response
      let data = [];
      if (response.data?.UserList?.results) {
        // getUserList API
        data = response.data.UserList.results;
      } else if (Array.isArray(response.data?.data)) {
        // searchUser API
        data = response.data.data;
      } else {
        data = [];
      }

      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      const apiMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong while fetching users.";
      setUsers([]);
      setError(apiMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers();
    }, 500);
    return () => clearTimeout(delay);
  }, [searchQuery]);

  // Delete user
  const confirmDeleteUser = (id) => setDeleteConfirmId(id);

  const handleDeleteUser = async () => {
    if (!deleteConfirmId) return;
    setDeleting(true);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(
        `https://swiftsub-psi.vercel.app/v1/admin/deleteProfile?id=${deleteConfirmId}`,
        config
      );
      toast.success("User deleted successfully!");
      setDeleteConfirmId(null);
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user.");
    } finally {
      setDeleting(false);
    }
  };

  // Edit user
  const openEditModal = (user) => {
    setEditUserId(user._id || user.id);
    setEditUserData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
    });
  };

  const handleUpdateUser = async () => {
    if (!editUserId) return;
    setUpdating(true);

    try {
      await axios.put(
        `https://swiftsub-psi.vercel.app/v1/admin/updateUserProfile?userId=${editUserId}`,
        editUserData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User updated successfully!");
      setEditUserId(null);
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user.");
    } finally {
      setUpdating(false);
    }
  };

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
        <h1 className="text-xl font-semibold">Users</h1>
      </div>

      {/* Existing Navbar for larger screens */}
      <div className="hidden md:block">
        <NavBar title="Users" />
      </div>
        {/* Search bar - fixed */}
        <div className="p-6 bg-white z-10 flex justify-between items-center border-b border-gray-200">
          <input
            type="text"
            placeholder="Search user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 border-blue-400 px-4 py-2 rounded-lg w-1/3 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Users Table - scrollable */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          {loading ? (
            <p className="text-gray-500">Loading users...</p>
          ) : error ? (
            <p className="text-red-500 text-lg font-medium">{error}</p>
          ) : users.length === 0 ? (
            <p className="text-gray-500">No users found.</p>
          ) : (
            <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100 text-gray-700 sticky top-0 z-20">
                  <tr>
                    <th className="py-3 px-4 border-b text-left">Sr. No.</th>
                    <th className="py-3 px-4 border-b text-left">First Name</th>
                    <th className="py-3 px-4 border-b text-left">Last Name</th>
                    <th className="py-3 px-4 border-b text-left">Email</th>
                    <th className="py-3 px-4 border-b text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user._id || user.id || index}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4 border-b">{index + 1}</td>
                      <td className="py-3 px-4 border-b">{user.firstName || "N/A"}</td>
                      <td className="py-3 px-4 border-b">{user.lastName || "N/A"}</td>
                      <td className="py-3 px-4 border-b">{user.email}</td>
                      <td className="py-3 px-4 border-b text-center flex justify-center gap-3">
                        <button
                          title="Edit"
                          onClick={() => openEditModal(user)}
                          className="text-blue-500 hover:text-blue-700 transition"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => confirmDeleteUser(user._id || user.id)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        {/* Delete Modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-7 rounded-3xl shadow-2xl w-96 text-center relative border border-gray-200">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              >
                <X size={22} />
              </button>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Are you sure you want to delete this user?
              </h2>
              <div className="flex justify-center gap-4 mt-10">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-5 py-2 bg-gray-400 text-black rounded-lg hover:bg-gray-500 transition font-medium active:scale-95 duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteUser}
                  disabled={deleting}
                  className={`px-5 py-2 rounded-lg text-white font-medium active:scale-95 duration-300 ${
                    deleting
                      ? "bg-red-300 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 transition"
                  }`}
                >
                  {deleting ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editUserId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 text-left relative border border-gray-200">
              <button
                onClick={() => setEditUserId(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              >
                <X size={22} />
              </button>

              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Edit User
              </h2>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  value={editUserData.firstName}
                  onChange={(e) =>
                    setEditUserData({ ...editUserData, firstName: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={editUserData.lastName}
                  onChange={(e) =>
                    setEditUserData({ ...editUserData, lastName: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
                />
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setEditUserId(null)}
                  className="px-5 py-2 bg-gray-400 text-black rounded-lg hover:bg-gray-500 transition font-medium active:scale-95 duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateUser}
                  disabled={updating}
                  className={`px-5 py-2 rounded-lg text-white font-medium active:scale-95 duration-300 ${
                    updating
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 transition"
                  }`}
                >
                  {updating ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Users;
