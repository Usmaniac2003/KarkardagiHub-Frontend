import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import Example from "../../../components/Admin/Example";
import AddEmployee from "../../../components/Admin/AddEmployee";
import EditEmployee from "../../../components/Admin/EditEmployee";
import DeleteEmployee from "../../../components/Admin/DeleteEmployee";
import EmployeeAnalytics from "../../../components/Admin/EmployeeAnalytics";
import ViewPage from "../../../components/Admin/ViewEmployee";

const UserManagement = () => {
  const [selectedPage, setSelectedPage] = useState("Home");

  // Sidebar options and corresponding components
  const pages = {
    Home: { label: "Add Employee", component: <AddEmployee /> },
    UserManagement: { label: "Edit Employee",  component: <EditEmployee /> },
    Tasks: { label: "Remove Employee",  component: <DeleteEmployee /> },
    View: { label: "View Employees",  component: <ViewPage /> },
    Projects: { label: "Employee Analytics",  component: <EmployeeAnalytics /> },
    };
  

  return (
    <>
    <Box display="flex" height="100vh" bgcolor={"#DBEBFF"}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          backgroundColor: "#DBEBFF",
          color: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        px={2}
        py={16}
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
      </Box>

      {/* Main Content */}
      <Box flex="1" p={4} bgcolor="#FEFFFF" mt={2} style={{borderRadius:"10px",border:"2px solid #C6DFFF"}}>
        {pages[selectedPage].component}
      </Box>
    </Box>
    </>
  );
};

export default UserManagement;
