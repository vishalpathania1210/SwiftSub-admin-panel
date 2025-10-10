import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../Components/SideBar";
import NavBar from "../Components/NavBar";
import { toast } from "react-toastify";
import { Trash2, X, Edit2 } from "lucide-react";
import { useSelector } from "react-redux";

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
  const token = useSelector((state)=> state.user.accessToken)
  // Fetch users
  const fetchUsers = async () => {
    if (!token) {
      console.error("No token found");
      return;
    }
    setLoading(true);
    try {
      let response;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      if (searchQuery.trim()) {
        response = await axios.get(
          `https://swift-sub-woad.vercel.app/v1/admin/searchUser?query=${searchQuery}`,
          config
        )
      } else {
        response = await axios.get(
          "https://swift-sub-woad.vercel.app/v1/admin/getUserList",
          config
        );
      }

      let data = response.data.users || response.data.data || response.data || [];
      console.log("users fetching ",data)
      if (!Array.isArray(data)) data = [data];

      setUsers(data);
    } catch (err) {
      console.error(err);
      setError(err);
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
        `https://swift-sub-woad.vercel.app/v1/admin/deleteProfile?id=${deleteConfirmId}`,
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
        `https://swift-sub-woad.vercel.app/v1/admin/updateUserProfile?userId=${editUserId}`,
        editUserData,
        {  headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }, }
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
    <div className="flex">
      <SideBar />
      <div className="flex-1 p-6">
        <NavBar title="Users List" />

        {/* Search Input */}
        <div className="flex justify-between items-center my-4">
          <input
            type="text"
            placeholder="Search user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 border-blue-400 px-4 py-2 rounded-lg w-1/3 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-gray-500">Loading users...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error.message}</p>
        ) : users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 text-gray-700">
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
                  <tr key={user._id || user.id || index} className="hover:bg-gray-50 transition">
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
      {/* Close Button */}
      <button
        onClick={() => setEditUserId(null)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
      >
        <X size={22} />
      </button>

      {/* Modal Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Edit User
      </h2>

      {/* First Name */}
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

      {/* Last Name */}
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

      {/* Action Buttons */}
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
  );
};

export default Users;
