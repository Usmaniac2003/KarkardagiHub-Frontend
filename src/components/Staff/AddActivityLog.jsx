import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useActivityLogs } from "../../context/ActivityLogContext";
import { useAuth } from '../../context/Auth';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddActivityLog = () => {
  const { addActivityLog, loading, error } = useActivityLogs();
  const { user } = useAuth();
  const [newActivityLog, setNewActivityLog] = useState({
    activity_type: "",
    activity_details: "",
    task_id: "",
    hours_spent: 0,
    file_details: [{
      file_name: "",
      file_url: ""
    }]
  });

  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (!user) {
      setFormError("User information is missing. Please log in again.");
    } else {
      setFormError(null);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewActivityLog((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileDetailsChange = (e) => {
    const { name, value } = e.target;
    setNewActivityLog((prevData) => ({
      ...prevData,
      file_details: [{
        ...prevData.file_details[0],
        [name]: value
      }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!newActivityLog.activity_type || !newActivityLog.activity_details) {
      setFormError("Please fill in all required fields.");
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!user || !user.id) {
      setFormError("User information is missing. Please log in again.");
      toast.error("User information is missing. Please log in again.");
      return;
    }

    try {
      const activityLogData = {
        ...newActivityLog,
        user_id: user.id,
        task_id: newActivityLog.task_id.trim() || null,
        hours_spent: Number(newActivityLog.hours_spent),
        file_details: newActivityLog.file_details[0].file_name && newActivityLog.file_details[0].file_url 
          ? newActivityLog.file_details 
          : []
      };

      await addActivityLog(activityLogData);
      
      setNewActivityLog({
        activity_type: "",
        activity_details: "",
        task_id: "",
        hours_spent: 0,
        file_details: [{
          file_name: "",
          file_url: ""
        }]
      });
      
      toast.success("Activity log added successfully!");
    } catch (err) {
      setFormError(err.message || "Error adding activity log. Please try again.");
      toast.error(err.message || "Error adding activity log. Please try again.");
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!user) {
    return <div>Please log in to add activity logs.</div>;
  }

  return (
    <div style={{ backgroundColor: "#DBEBFF", padding: "2rem", borderRadius: "10px", maxWidth: "600px", margin: "8vh auto", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "20px", textAlign: "center" }}>
        Add New Activity Log
      </h2>

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
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: "16px" }}>
          <InputLabel>Activity Type</InputLabel>
          <Select
            name="activity_type"
            value={newActivityLog.activity_type}
            onChange={handleChange}
            label="Activity Type"
            sx={{ backgroundColor: "#ECECEC", borderRadius: "5px" }}
            required
          >
            <MenuItem value="Task Assignment">Task Assignment</MenuItem>
            <MenuItem value="Task Completion">Task Completion</MenuItem>
            <MenuItem value="Review">Review</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Activity Details"
          variant="outlined"
          size="small"
          fullWidth
          multiline
          rows={4}
          name="activity_details"
          value={newActivityLog.activity_details}
          onChange={handleChange}
          sx={{ backgroundColor: "#ECECEC", marginBottom: "16px", borderRadius: "5px" }}
          required
        />

        <TextField
          label="Task ID (Optional)"
          variant="outlined"
          size="small"
          fullWidth
          name="task_id"
          value={newActivityLog.task_id}
          onChange={handleChange}
          sx={{ backgroundColor: "#ECECEC", marginBottom: "16px", borderRadius: "5px" }}
        />

        <TextField
          label="Hours Spent"
          variant="outlined"
          size="small"
          fullWidth
          type="number"
          name="hours_spent"
          value={newActivityLog.hours_spent}
          onChange={handleChange}
          sx={{ backgroundColor: "#ECECEC", marginBottom: "16px", borderRadius: "5px" }}
        />

        <TextField
          label="File Name"
          variant="outlined"
          size="small"
          fullWidth
          name="file_name"
          value={newActivityLog.file_details[0].file_name}
          onChange={handleFileDetailsChange}
          sx={{ backgroundColor: "#ECECEC", marginBottom: "16px", borderRadius: "5px" }}
        />

        <TextField
          label="File URL"
          variant="outlined"
          size="small"
          fullWidth
          name="file_url"
          value={newActivityLog.file_details[0].file_url}
          onChange={handleFileDetailsChange}
          sx={{ backgroundColor: "#ECECEC", marginBottom: "16px", borderRadius: "5px" }}
        />

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
          disabled={loading || !user}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Add Activity Log"}
        </Button>
      </form>
    </div>
  );
};

export default AddActivityLog;

