import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import { FaUsers, FaHome,FaProjectDiagram,FaChartLine,FaCog,FaSignOutAlt, FaBell, FaSpeakerDeck, FaBullhorn } from "react-icons/fa";
import { useAuth } from "../../context/Auth";
import UserManagement from "../Admin/Subpages/UserManagement";
import Navbar from "../../components/General/Navbar";
import Home from "./Subpages/Home";
import Settings from "./Subpages/Settings";
import Notifications from "./Subpages/Notifications";
import Projects from "./Subpages/Projects";
import AI from "../../components/Admin/AI";
const AdminPanel = () => {
  const {logout } = useAuth();
  const [selectedPage, setSelectedPage] = useState("Home");

  // Sidebar options and corresponding components
  const pages = {
    Home: { label: "Home", icon: <FaHome />, component: <Home /> },
    UserManagement: { label: "User", icon: <FaUsers />, component: <UserManagement /> },
    Projects: { label: "Projects", icon: <FaProjectDiagram />, component: <Projects /> },
    Annoucments: { label: "Annoucments", icon: <FaBullhorn />, component: <AI></AI> },
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
