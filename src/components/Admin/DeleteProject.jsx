import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useProjects } from "../../context/ProjectContext"; // Import context for managing projects

const DeleteProject = () => {
  const { projects, fetchProjects, deleteProject, loading, error } = useProjects(); // Get functions and data from context
  const [search, setSearch] = useState(""); // Optional search functionality for filtering projects
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null); // Project to be deleted
  const [openDialog, setOpenDialog] = useState(false); // Open/close confirmation dialog

  // Fetch projects on mount and whenever the search term changes
  useEffect(() => {
    setLoadingProjects(true);
    fetchProjects({ search })
      .finally(() => setLoadingProjects(false));
  }, []);

  // Handle delete button click
  const handleDeleteClick = (project) => {
    setSelectedProject(project); // Set the project to be deleted
    setOpenDialog(true); // Open the confirmation dialog
  };

  // Handle confirming deletion
  const handleConfirmDelete = async () => {
    if (!selectedProject) return;

    try {
      await deleteProject(selectedProject._id); // Delete the selected project
      setOpenDialog(false); // Close the confirmation dialog
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  // Handle canceling deletion
  const handleCancelDelete = () => {
    setOpenDialog(false); // Close the confirmation dialog without deleting
  };

  return (
    <div className="p-8 bg-[#DBEBFF] rounded-md">
      <h1 className="text-3xl font-bold text-center mb-6">Delete Project</h1>

      {/* Loading and Error Handling */}
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
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell>{project.project_name}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{project.status}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDeleteClick(project)}
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
          <p>Are you sure you want to delete this project?</p>
          <p>
            <strong>{selectedProject?.project_name}</strong> -{" "}
            {selectedProject?.description}
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

export default DeleteProject;
