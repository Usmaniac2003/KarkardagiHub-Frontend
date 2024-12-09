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
import {
  FaUsers,
  FaUserEdit,
  FaHome,
  FaTasks,
  FaProjectDiagram,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaPaw,
  FaFileAlt,
  FaRegBell,
} from "react-icons/fa";
import { useAuth } from "../../context/Auth";
import Navbar from "../../components/General/Navbar";
import Achievements from "./SubPages/Achievements";
import Home from "./SubPages/Home";
import TaskManagement from "../Staff/SubPages/TaskManagement";
import ActivityLog from "../Staff/SubPages/ActivityLog";
import Notification from "../../pages/Staff/SubPages/Notifications";

const StaffPanel = () => {
  const { logout } = useAuth();
  const [selectedPage, setSelectedPage] = useState("Home");

  // Sidebar options and corresponding components
  const pages = {
    Home: { label: "Home", icon: <FaHome />, component: <Home /> },
    ActivityLog: { label: "Activity Log", icon: <FaFileAlt />, component: <ActivityLog /> },
    Achievements: { label: "Achievements", icon: <FaUsers />, component: <Achievements /> },
    Tasks: { label: "Tasks", icon: <FaTasks />, component: <TaskManagement /> },
    Notifications: { label: "Notifications", icon: <FaRegBell />, component: <Notification/> },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: { xs: 70, sm: 100 },
            backgroundColor: "#DBEBFF",
            color: "black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRight: "1px solid #C6DFFF",
            overflow: "auto",
          }}
        >
          {/* Sidebar Content */}
          <Box>
            <List>
              {Object.keys(pages).map((key) => (
                <ListItem
                  button
                  key={key}
                  onClick={() => setSelectedPage(key)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    py: 2,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: selectedPage === key ? "#256CC2" : "black",
                      minWidth: "unset",
                      marginBottom: "4px",
                    }}
                  >
                    {pages[key].icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={pages[key].label}
                    sx={{
                      color: selectedPage === key ? "#256CC2" : "black",
                      fontWeight: selectedPage === key ? "bold" : "normal",
                      textAlign: "center",
                      "& .MuiTypography-root": {
                        fontSize: { xs: "0.7rem", sm: "0.85rem" },
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Logout Button */}
          <Box sx={{ p: 2 }}>
            <Divider sx={{ my: 2, backgroundColor: "black" }} />
            <Button
              variant="contained"
              color="error"
              onClick={logout}
              fullWidth
              startIcon={<FaSignOutAlt />}
              sx={{ py: 1 }}
            >
              Logout
            </Button>
          </Box>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "gray.100",
            overflow: "auto",
            p: 3,
          }}
        >
          {pages[selectedPage].component}
        </Box>
      </Box>
    </Box>
  );
};

export default StaffPanel;

