import { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useUserManagement } from "../../context/UserManagement"; // Import context to access addUser

const AddEmployee = () => {
  const { addUser, loading, error } = useUserManagement(); // Get addUser, loading and error from context
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    // Basic validation: check if all fields are filled
    if (!newUser.username || !newUser.email || !newUser.password || !newUser.role) {
      setFormError("Please fill in all fields.");
      return;
    }

    try {
      await addUser(newUser); // Call addUser from context
      setNewUser({ username: "", email: "", password: "", role: "user" }); // Clear form
    } catch (err) {
      setFormError("Error adding user. Please try again.");
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
        Add New Employee
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
          label="Username"
          variant="outlined"
          size="small"
          fullWidth
          name="username"
          value={newUser.username}
          onChange={handleChange}
          sx={{
            backgroundColor: "#ECECEC",
            marginBottom: "16px",
            borderRadius: "5px",
          }}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          size="small"
          fullWidth
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          sx={{
            backgroundColor: "#ECECEC",
            marginBottom: "16px",
            borderRadius: "5px",
          }}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          size="small"
          fullWidth
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
          sx={{
            backgroundColor: "#ECECEC",
            marginBottom: "16px",
            borderRadius: "5px",
          }}
          required
        />
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: "16px" }}>
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            value={newUser.role}
            onChange={handleChange}
            label="Role"
            sx={{
              backgroundColor: "#ECECEC",
              borderRadius: "5px",
            }}
            required
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
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
            "Add Employee"
          )}
        </Button>
      </form>
    </div>
  );
};

export default AddEmployee;
