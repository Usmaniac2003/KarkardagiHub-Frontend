import React, { createContext, useContext, useState } from "react";
import api from "../services/apiservice";  // Ensure api service is correctly set up
import { useAuth } from "./Auth";

const UserManagementContext = createContext();

export const UserManagementProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Fetch users with filter
  const fetchUsers = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await api.get("admin/users", { params: filters });
      const fetchedUsers = response.users; // Assume response contains a `users` field

      // Exclude the current user from the list
      const filteredUsers = fetchedUsers.filter((fetchedUser) => fetchedUser._id !== user?._id);

      setUsers(filteredUsers); // Set the filtered list of users
    } catch (err) {
      console.error("Error fetching users:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new user
  const addUser = async (userData) => {
    try {
      const response = await api.post("admin/add-user", userData);
      setUsers((prevUsers) => [...prevUsers, response.user]); // Add new user to state
    } catch (err) {
      console.error("Error adding user:", err.message);
      setError(err.message);
      throw err;
    }
  };

  // Update an existing user
  const updateUser = async (userId, updatedData) => {
    try {
      const response = await api.put(`admin/update-user/${userId}`, updatedData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? response.user : user))
      ); // Replace updated user in state
    } catch (err) {
      console.error("Error updating user:", err.message);
      setError(err.message);
      throw err;
    }
  };

  // Delete a user
  const deleteUser = async (userId) => {
    try {
      await api.remove(`admin/delete-user/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId)); // Remove user from state
    } catch (err) {
      console.error("Error deleting user:", err.message);
      setError(err.message);
      throw err;
    }
  };

  return (
    <UserManagementContext.Provider
      value={{
        users,
        loading,
        error,
        fetchUsers,
        addUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserManagementContext.Provider>
  );
};

export const useUserManagement = () => {
  return useContext(UserManagementContext);
};
