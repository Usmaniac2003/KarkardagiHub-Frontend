import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import { FaUsers, FaUserEdit, FaHome } from "react-icons/fa";
import { useAuth } from "../../context/Auth";

// Components for different pages
const Home = () => <Typography variant="h4">Home Component</Typography>;
const UserManagement = () => <Typography variant="h4">User Management Component</Typography>;
const Profile = () => <Typography variant="h4">Profile Component</Typography>;

const AdminPanel = () => {
  const { user,logout } = useAuth();
  const [selectedPage, setSelectedPage] = useState("Home");

  // Sidebar options and corresponding components
  const pages = {
    Home: { label: "Home", icon: <FaHome />, component: <Home /> },
    UserManagement: { label: "User Management", icon: <FaUsers />, component: <UserManagement /> },
    Profile: { label: "Profile", icon: <FaUserEdit />, component: <Profile /> },
  };

  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          backgroundColor: "black",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        p={2}
      >
        {/* Sidebar Header */}
        <Box>
          <Typography variant="h6" sx={{ mb: 4 }}>
            {user?.username}
          </Typography>
          <List>
            {Object.keys(pages).map((key) => (
              <ListItem
                button
                key={key}
                onClick={() => setSelectedPage(key)}
                sx={{
                  backgroundColor: selectedPage === key ? "gray" : "inherit",
                  "&:hover": { backgroundColor: "gray" },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{pages[key].icon}</ListItemIcon>
                <ListItemText primary={pages[key].label} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Logout Button */}
        <Divider sx={{ my: 2, backgroundColor: "gray" }} />
        <Button variant="contained" color="error" onClick={logout} fullWidth>
          Logout
        </Button>
      </Box>

      {/* Main Content */}
      <Box flex="1" p={4} bgcolor="gray.100">
        {pages[selectedPage].component}
      </Box>
    </Box>
  );
};

export default AdminPanel;
