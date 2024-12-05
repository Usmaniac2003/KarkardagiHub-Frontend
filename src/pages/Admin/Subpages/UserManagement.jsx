import React, { useEffect, useState } from "react";
import { useUserManagement } from "../../../context/UserManagement";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";

function UserManagement() {
  const { users, fetchUsers, addUser, deleteUser, loading, error } = useUserManagement();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "", role: "user" });

  useEffect(() => {
    fetchUsers({ search, role: roleFilter });
  }, [search, roleFilter]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await addUser(newUser);
      setNewUser({ username: "", email: "", password: "", role: "user" });
    } catch (err) {
      console.error("Error adding user:", err.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">User Management</h1>

      {/* Filters */}
      <div className="flex justify-between items-center mb-6">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2"
        />
        <FormControl className="w-1/4">
          <InputLabel>Role</InputLabel>
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            label="Role"
          >
            <MenuItem value="">All Roles</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Add User Form */}
      <div className="mb-6 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
        <form className="flex flex-col gap-4" onSubmit={handleAddUser}>
          <TextField
            label="Username"
            variant="outlined"
            size="small"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            size="small"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            size="small"
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
          />
          <FormControl>
            <InputLabel>Role</InputLabel>
            <Select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="staff">Staff</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Add User
          </Button>
        </form>
      </div>

      {/* User List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">User List</h2>
        {loading ? (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}

export default UserManagement;
