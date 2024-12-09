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
import { useActivityLogs } from "../../context/ActivityLogContext"; // Assuming you'll create this context

const EditActivityLog = () => {
  const { activityLogs, fetchActivityLogs, updateActivityLog, loading, error } = useActivityLogs();
  const [editActivityLog, setEditActivityLog] = useState(null);
  const [search, setSearch] = useState("");
  const [loadingLogs, setLoadingLogs] = useState(false);

  const fetchData = useCallback(() => {
    setLoadingLogs(true);
    fetchActivityLogs({ search })
      .finally(() => {
        setLoadingLogs(false);
      });
  }, [search, fetchActivityLogs]);

  useEffect(() => {
    fetchData();
  }, [search]);

  const handleEditClick = (log) => {
    setEditActivityLog({ ...log });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditActivityLog((prevLog) => ({
      ...prevLog,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!editActivityLog) return;

    try {
      await updateActivityLog(editActivityLog._id, editActivityLog);
      setEditActivityLog(null);
    } catch (err) {
      console.error("Error saving activity log:", err);
    }
  };

  return (
    <div className="p-8 bg-[#DBEBFF] rounded-md">
      <h1 className="text-3xl font-bold text-center mb-6">Edit Activity Log</h1>

      {loadingLogs ? (
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
                <TableCell>Activity Type</TableCell>
                <TableCell>Activity Details</TableCell>
                <TableCell>Task ID</TableCell>
                <TableCell>Hours Spent</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activityLogs.map((log) => (
                <TableRow key={log._id}>
                  <TableCell>
                    {editActivityLog && editActivityLog._id === log._id ? (
                      <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel>Activity Type</InputLabel>
                        <Select
                          value={editActivityLog.activity_type}
                          name="activity_type"
                          onChange={handleChange}
                          label="Activity Type"
                        >
                          <MenuItem value="Task Assignment">Task Assignment</MenuItem>
                          <MenuItem value="Task Completion">Task Completion</MenuItem>
                          <MenuItem value="Review">Review</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      log.activity_type
                    )}
                  </TableCell>
                  <TableCell>
                    {editActivityLog && editActivityLog._id === log._id ? (
                      <TextField
                        value={editActivityLog.activity_details}
                        name="activity_details"
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        multiline
                        rows={2}
                      />
                    ) : (
                      log.activity_details
                    )}
                  </TableCell>
                  <TableCell>
                    {editActivityLog && editActivityLog._id === log._id ? (
                      <TextField
                        value={editActivityLog.task_id}
                        name="task_id"
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      log.task_id
                    )}
                  </TableCell>
                  <TableCell>
                    {editActivityLog && editActivityLog._id === log._id ? (
                      <TextField
                        value={editActivityLog.hours_spent}
                        name="hours_spent"
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                        type="number"
                      />
                    ) : (
                      log.hours_spent
                    )}
                  </TableCell>
                  <TableCell>
                    {editActivityLog && editActivityLog._id === log._id ? (
                      <Button onClick={handleSave} variant="contained" style={{ background: "#256CC2" }}>
                        Save
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleEditClick(log)}
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

export default EditActivityLog;

