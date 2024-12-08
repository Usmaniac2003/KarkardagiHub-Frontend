import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useUserManagement } from "../../context/UserManagement"; // Import context for managing users

const DeleteEmployee = () => {
  const { users, fetchUsers, deleteUser, loading, error } = useUserManagement(); // Get functions and data from context
  const [roleFilter, setRoleFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Use useEffect to fetch users based on search and roleFilter
  useEffect(() => {
    setLoadingUsers(true);
    fetchUsers()
      .finally(() => setLoadingUsers(false));
  }, []); // Only fetch when search or roleFilter changes

  // Handle delete button click
  const handleDeleteClick = (user) => {
    setSelectedUser(user); // Set the user to be deleted
    setOpenDialog(true); // Open confirmation dialog
  };

  // Handle confirmation of deletion
  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser._id); // Delete the selected user
      setOpenDialog(false); // Close the confirmation dialog
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // Handle canceling deletion
  const handleCancelDelete = () => {
    setOpenDialog(false); // Close the confirmation dialog without deleting
  };

  return (
    <div className="p-8 bg-[#DBEBFF]  rounded-md">
      <h1 className="text-3xl font-bold text-center mb-6">Delete Employee</h1>

      {/* Loading and Error Handling */}
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
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDeleteClick(user)}
                      variant="contained"
                      color="error"
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

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this user?</p>
          <p>
            <strong>{selectedUser?.username}</strong> - {selectedUser?.email}
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteEmployee;
