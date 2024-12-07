import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useUserManagement } from "../../context/UserManagement"; // Import context for managing users

const EditEmployee = () => {
  const { users, fetchUsers, updateUser, loading, error } = useUserManagement(); // Get functions and data from context
  const [editUser, setEditUser] = useState(null);
  const [roleFilter, setRoleFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Using useCallback to memoize fetchData and avoid unnecessary API calls
  const fetchData = useCallback(() => {
    setLoadingUsers(true);
    fetchUsers({ search, role: roleFilter })
      .finally(() => {
        setLoadingUsers(false);
      });
  }, [search, roleFilter, fetchUsers]); // Only re-run when search or roleFilter changes

  // Trigger the fetchData function when search or roleFilter changes
  useEffect(() => {
    fetchData();
  }, []);

  // Handle edit button click
  const handleEditClick = (user) => {
    setEditUser({ ...user }); // Create a copy of the user for editing
  };

  // Handle changes in the edit form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle saving the updated user information
  const handleSave = async () => {
    if (!editUser) return;

    try {
      await updateUser(editUser._id, editUser); // Update the user in the system
      setEditUser(null); // Reset the edit state after saving
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  return (
    <div className="p-8 bg-[#DBEBFF]  rounded-md">
      <h1 className="text-3xl font-bold text-center mb-6">Edit Employee</h1>

      {/* Filters */}
      <div className="flex justify-between items-center mb-6">
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update search term
          className="w-1/2"
        />
        <FormControl className="w-1/4">
          <InputLabel>Role</InputLabel>
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)} // Update role filter
            label="Role"
          >
            <MenuItem value="">All Roles</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </FormControl>
      </div>

      {loadingUsers ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <TableContainer className="mb-6" component="div">
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
                  <TableCell>
                    {editUser && editUser._id === user._id ? (
                      <TextField
                        value={editUser.username}
                        name="username"
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      user.username
                    )}
                  </TableCell>
                  <TableCell>
                    {editUser && editUser._id === user._id ? (
                      <TextField
                        value={editUser.email}
                        name="email"
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      user.email
                    )}
                  </TableCell>
                  <TableCell>
                    {editUser && editUser._id === user._id ? (
                      <FormControl variant="outlined" size="small">
                        <InputLabel>Role</InputLabel>
                        <Select
                          value={editUser.role}
                          name="role"
                          onChange={handleChange}
                          label="Role"
                        >
                          <MenuItem value="user">User</MenuItem>
                          <MenuItem value="staff">Staff</MenuItem>
                          <MenuItem value="manager">Manager</MenuItem>
                          <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      user.role
                    )}
                  </TableCell>
                  <TableCell>
                    {editUser && editUser._id === user._id ? (
                      <Button onClick={handleSave} variant="contained" style={{background:"#256CC2"}}>
                        Save
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleEditClick(user)}
                        variant="contained"
                        style={{background:"#256CC2"}}
                      >
                        Edit
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default EditEmployee;
