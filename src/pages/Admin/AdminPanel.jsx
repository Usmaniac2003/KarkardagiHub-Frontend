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
import { FaUsers, FaUserEdit, FaHome,FaTasks,FaProjectDiagram,FaChartLine,FaCog,FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/Auth";
import UserManagement from "../Admin/Subpages/UserManagement";
import Navbar from "../../components/General/Navbar";
import Home from "./Subpages/Home";
import Profile from "./Subpages/Profile";
import Report from "./Subpages/Report";
import Settings from "./Subpages/Settings";
import Tasks from "./Subpages/Tasks";
import Projects from "./Subpages/Projects";
const AdminPanel = () => {
  const {logout } = useAuth();
  const [selectedPage, setSelectedPage] = useState("Home");

  // Sidebar options and corresponding components
  const pages = {
    Home: { label: "Home", icon: <FaHome />, component: <Home /> },
    UserManagement: { label: "User", icon: <FaUsers />, component: <UserManagement /> },
    Tasks: { label: "Tasks", icon: <FaTasks />, component: <Tasks /> },
    Projects: { label: "Projects", icon: <FaProjectDiagram />, component: <Projects /> },
    Report: { label: "Reports", icon: <FaChartLine />, component: <Report /> },
    Profile: { label: "Profile", icon: <FaUserEdit />, component: <Profile /> },
    Settings: { label: "Settings", icon: <FaCog />, component: <Settings /> },
  };
  

  return (
    <>
    <Navbar></Navbar>
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Box
        sx={{
          width: 100,
          backgroundColor: "#DBEBFF",
          color: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: "1px solid #C6DFFF"
        }}
        p={2}
      >
        {/* Sidebar Header */}
        <Box>
  <List>
    {Object.keys(pages).map((key) => (
      <ListItem
        button
        key={key}
        onClick={() => setSelectedPage(key)}
        sx={{
          display: "flex",
          flexDirection: "column", // Stack icon and text vertically
          alignItems: "center", // Center-align them
          justifyContent: "center", // Vertically align content
        }}
      >
        <ListItemIcon
          sx={{
            color: selectedPage === key ? "#256CC2":"black",
            minWidth: "unset", // Remove default spacing
            marginBottom: "4px", // Add spacing below the icon
          }}
        >
          {pages[key].icon}
        </ListItemIcon>
        <ListItemText
          primary={pages[key].label}
          sx={{
            color: selectedPage === key ? "#256CC2" : "black",
            fontWeight: selectedPage === key ? "bold" : "normal",
            textAlign: "center", // Center-align text
            fontSize: "0.85rem", // Make the text slightly smaller
          }}
        />
      </ListItem>
    ))}
  </List>
</Box>

        {/* Logout Button */}
        <Divider sx={{ my: 2, backgroundColor: "black" }} />
        <Button variant="contained" color="error" onClick={logout} fullWidth>
          <FaSignOutAlt/>
        </Button>
      </Box>

      {/* Main Content */}
      <Box flex="1"  bgcolor="gray.100">
        {pages[selectedPage].component}
      </Box>
    </Box>
    </>
  );
};

export default AdminPanel;
