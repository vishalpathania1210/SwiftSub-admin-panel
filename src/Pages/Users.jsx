import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../Components/SideBar";
import NavBar from "../Components/NavBar";
import { toast } from "react-toastify";
import { PlusCircle, Trash2 } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://swift-sub-woad.vercel.app/v1/admin/getUserList"
      );
      console.log("API Response:", response.data);

      // Adjust this line based on API structure
      setUsers(response.data.users || response.data.data || response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user function
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(
         `https://swift-sub-woad.vercel.app/v1/admin/deleteProfile?id=${id}`
      );
      toast.success("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="flex">
      <SideBar />

      <div className="flex-1 p-6">
        <NavBar title="Users List" />

        {/* Table Section */}
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
                  <tr
                    key={user.id || index}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 border-b">{index + 1}</td>
                    <td className="py-3 px-4 border-b">
                      {user.firstName || "N/A"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {user.lastName || "N/A"}
                    </td>
                    <td className="py-3 px-4 border-b">{user.email}</td>
                    <td className="py-3 px-4 border-b text-center">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
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
      </div>
    </div>
  );
};

export default Users;
