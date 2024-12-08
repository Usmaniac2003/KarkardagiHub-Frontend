import React, { useState, useEffect } from "react";
import { Box, TextField, Button, CircularProgress, Typography, Grid } from "@mui/material";
import { useUserManagement } from "../../context/UserManagement"; // Assuming you're using context for managing users

const ViewPage = () => {
  const { users, loading, error, fetchUsers } = useUserManagement();
  
  // State to manage filter inputs
  const [filters, setFilters] = useState({
    search: "",
    role: "",
  });
  

  // Effect to fetch users based on filters (dependency is on filters)
  useEffect(() => {
    fetchUsers(filters); // Fetch users whenever filters change
  }, [filters]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        View Employees
      </Typography>
      
    
      {/* Users List */}
      <Box bgcolor={"#DBEBFF"} p={2} borderRadius={3}>
        {users.length > 0 ? (
          users.map((user) => (
            <Box
              key={user._id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #ddd",
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <strong>{user.username}</strong>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
              </Box>
            </Box>
          ))
        ) : (
          <Typography>No users found matching the criteria</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ViewPage;
