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
import { useActivityLogs } from "../../context/ActivityLogContext"; // Assuming you'll create this context

const DeleteActivityLog = () => {
  const { activityLogs, fetchActivityLogs, deleteActivityLog, loading, error } = useActivityLogs();
  const [search, setSearch] = useState("");
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setLoadingLogs(true);
    fetchActivityLogs({ search })
      .finally(() => setLoadingLogs(false));
  }, []);

  const handleDeleteClick = (log) => {
    setSelectedLog(log);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedLog) return;

    try {
      await deleteActivityLog(selectedLog._id);
      setOpenDialog(false);
      fetchActivityLogs({ search });
    } catch (err) {
      console.error("Error deleting activity log:", err);
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  return (
    <div className="p-8 bg-[#DBEBFF] rounded-md">
      <h1 className="text-3xl font-bold text-center mb-6">Delete Activity Log</h1>

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
                  <TableCell>{log.activity_type}</TableCell>
                  <TableCell>{log.activity_details}</TableCell>
                  <TableCell>{log.task_id}</TableCell>
                  <TableCell>{log.hours_spent}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDeleteClick(log)}
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

      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this activity log?</p>
          <p>
            <strong>{selectedLog?.activity_type}</strong> -{" "}
            {selectedLog?.activity_details}
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

export default DeleteActivityLog;

