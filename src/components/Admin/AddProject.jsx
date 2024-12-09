import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useProjects } from "../../context/ProjectContext"; // Import context to access addProject
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const AddProject = () => {
  const { addProject, loading, error } = useProjects(); // Get addProject, loading and error from context
  const [newProject, setNewProject] = useState({
    project_name: "",
    description: "",
    start_date: "",
    end_date: "",
    assigned_manager: "",
    priority: "Medium",
    points: 0,
    team_members: [],
    status: "Active",
  });

  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    // Basic validation: check if all required fields are filled
    if (!newProject.project_name || !newProject.start_date || !newProject.assigned_manager) {
      setFormError("Please fill in all required fields.");
      toast.error("Please fill in all required fields."); // Show error toast
      return;
    }

    try {
      await addProject(newProject); // Call addProject from context
      setNewProject({
        project_name: "",
        description: "",
        start_date: "",
        end_date: "",
        assigned_manager: "",
        priority: "Medium",
        points: 0,
        team_members: [],
        status: "Active",
      }); // Clear form
      toast.success("Project added successfully!"); // Show success toast
    } catch (err) {
      setFormError("Error adding project. Please try again.");
      toast.error("Error adding project. Please try again."); // Show error toast on failure
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#DBEBFF",
        padding: "2rem",
        borderRadius: "10px",
        maxWidth: "600px",
        margin: "8vh auto",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "600",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Add New Project
      </h2>

      {/* Display Errors */}
      {formError && (
        <p style={{ color: "red", marginBottom: "15px", textAlign: "center" }}>
          {formError}
        </p>
      )}
      {error && (
        <p style={{ color: "red", marginBottom: "15px", textAlign: "center" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Project Name"
          variant="outlined"
          size="small"
          fullWidth
          name="project_name"
          value={newProject.project_name}
          onChange={handleChange}
          sx={{
            backgroundColor: "#ECECEC",
            marginBottom: "16px",
            borderRadius: "5px",
          }}
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          size="small"
          fullWidth
          name="description"
          value={newProject.description}
          onChange={handleChange}
          sx={{
            backgroundColor: "#ECECEC",
            marginBottom: "16px",
            borderRadius: "5px",
          }}
        />
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          type="date"
          name="start_date"
          value={newProject.start_date}
          onChange={handleChange}
          sx={{
            backgroundColor: "#ECECEC",
            marginBottom: "16px",
            borderRadius: "5px",
          }}
          required
        />
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          type="date"
          name="end_date"
          value={newProject.end_date}
          onChange={handleChange}
          sx={{
            backgroundColor: "#ECECEC",
            marginBottom: "16px",
            borderRadius: "5px",
          }}
        />
        <TextField
          label="Assigned Manager"
          variant="outlined"
          size="small"
          fullWidth
          name="assigned_manager"
          value={newProject.assigned_manager}
          onChange={handleChange}
          sx={{
            backgroundColor: "#ECECEC",
            marginBottom: "16px",
            borderRadius: "5px",
          }}
          required
        />
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: "16px" }}>
          <InputLabel>Priority</InputLabel>
          <Select
            name="priority"
            value={newProject.priority}
            onChange={handleChange}
            label="Priority"
            sx={{
              backgroundColor: "#ECECEC",
              borderRadius: "5px",
            }}
            required
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Points"
          variant="outlined"
          size="small"
          fullWidth
          type="number"
          name="points"
          value={newProject.points}
          onChange={handleChange}
          sx={{
            backgroundColor: "#ECECEC",
            marginBottom: "16px",
            borderRadius: "5px",
          }}
        />
        
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: "16px" }}>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={newProject.status}
            onChange={handleChange}
            label="Status"
            sx={{
              backgroundColor: "#ECECEC",
              borderRadius: "5px",
            }}
            required
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="On Hold">On Hold</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            backgroundColor: "#256CC2",
            padding: "10px",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#1a5297",
            },
          }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Add Project"
          )}
        </Button>
      </form>
    </div>
  );
};

export default AddProject;
