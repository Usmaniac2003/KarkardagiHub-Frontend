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
import { useProjects } from "../../context/ProjectContext"; // Import context for managing projects

const EditProject = () => {
  const { projects, fetchProjects, updateProject, loading, error } = useProjects(); // Get functions and data from context
  const [editProject, setEditProject] = useState(null);
  const [search, setSearch] = useState("");
  const [loadingProjects, setLoadingProjects] = useState(false);

  // Using useCallback to memoize fetchData and avoid unnecessary API calls
  const fetchData = useCallback(() => {
    setLoadingProjects(true);
    fetchProjects({ search })
      .finally(() => {
        setLoadingProjects(false);
      });
  }, [search, fetchProjects]); // Only re-run when search changes

  // Trigger the fetchData function when search changes
  useEffect(() => {
    fetchData();
  }, [search]);

  // Handle edit button click
  const handleEditClick = (project) => {
    setEditProject({ ...project }); // Create a copy of the project for editing
  };

  // Handle changes in the edit form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  // Handle saving the updated project information
  const handleSave = async () => {
    if (!editProject) return;

    try {
      await updateProject(editProject._id, editProject); // Update the project in the system
      setEditProject(null); // Reset the edit state after saving
    } catch (err) {
      console.error("Error saving project:", err);
    }
  };

  return (
    <div className="p-8 bg-[#DBEBFF] rounded-md">
      <h1 className="text-3xl font-bold text-center mb-6">Edit Project</h1>

      {/* Loading and Error States */}
      {loadingProjects ? (
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
                <TableCell>Project Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Assigned Manager</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell>
                    {editProject && editProject._id === project._id ? (
                      <TextField
                        value={editProject.project_name}
                        name="project_name"
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      project.project_name
                    )}
                  </TableCell>
                  <TableCell>
                    {editProject && editProject._id === project._id ? (
                      <TextField
                        value={editProject.description}
                        name="description"
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      project.description
                    )}
                  </TableCell>
                  <TableCell>
                    {editProject && editProject._id === project._id ? (
                      <TextField
                        value={editProject.start_date}
                        name="start_date"
                        type="date"
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      project.start_date
                    )}
                  </TableCell>
                  <TableCell>
                    {editProject && editProject._id === project._id ? (
                      <TextField
                        value={editProject.assigned_manager}
                        name="assigned_manager"
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      project.assigned_manager
                    )}
                  </TableCell>
                  <TableCell>
                    {editProject && editProject._id === project._id ? (
                      <FormControl variant="outlined" size="small">
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={editProject.status}
                          name="status"
                          onChange={handleChange}
                          label="Status"
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="On Hold">On Hold</MenuItem>
                          <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      project.status
                    )}
                  </TableCell>
                  <TableCell>
                    {editProject && editProject._id === project._id ? (
                      <Button onClick={handleSave} variant="contained" style={{ background: "#256CC2" }}>
                        Save
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleEditClick(project)}
                        variant="contained"
                        style={{ background: "#256CC2" }}
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

export default EditProject;
