import React, { useState, useEffect } from "react";
import { Box, TextField, Button, CircularProgress, Typography, Grid } from "@mui/material";
import { useActivityLogs } from "../../context/ActivityLogContext"; // Assuming you'll create this context

const ViewActivityLogs = () => {
  const { activityLogs, loading, error, fetchActivityLogs } = useActivityLogs();

  const [filters, setFilters] = useState({
    search: "",
    activity_type: "",
  });

  useEffect(() => {
    fetchActivityLogs(filters);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleSearch = () => {
    fetchActivityLogs(filters);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        View Activity Logs
      </Typography>

      <Box sx={{ mb: 2 }}>
    
      </Box>

      <Box bgcolor={"#DBEBFF"} p={2} borderRadius={3}>
        {activityLogs.length > 0 ? (
          activityLogs.map((log) => (
            <Box
              key={log._id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #ddd",
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <strong>{log.activity_type}</strong>
                <p>Details: {log.activity_details}</p>
                <p>Task ID: {log.task_id}</p>
                <p>Hours Spent: {log.hours_spent}</p>
                <p>Timestamp: {new Date(log.timestamp).toLocaleString()}</p>
              </Box>
            </Box>
          ))
        ) : (
          <Typography>No activity logs found matching the criteria</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ViewActivityLogs;

