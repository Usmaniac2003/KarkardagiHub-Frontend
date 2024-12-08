import React, { useState, useEffect } from "react";
import { Box, TextField, Button, CircularProgress, Typography, Grid } from "@mui/material";
import { useProjects } from "../../context/ProjectContext"; // Assuming you're using context for managing projects

const ViewProjects = () => {
  const { projects, loading, error, fetchProjects } = useProjects(); // Get data and functions from context

  // State to manage filter inputs
  const [filters, setFilters] = useState({
    search: "",
    status: "", // Assuming projects have a status (active, completed, etc.)
  });

  // Effect to fetch projects based on filters
  useEffect(() => {
    fetchProjects(filters); // Fetch projects whenever filters change
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        View Projects
      </Typography>


      {/* Projects List */}
      <Box bgcolor={"#DBEBFF"} p={2} borderRadius={3}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <Box
              key={project._id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #ddd",
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <strong>{project.project_name}</strong>
                <p>Description: {project.description}</p>
                <p>Status: {project.status}</p>
              </Box>
            </Box>
          ))
        ) : (
          <Typography>No projects found matching the criteria</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ViewProjects;
