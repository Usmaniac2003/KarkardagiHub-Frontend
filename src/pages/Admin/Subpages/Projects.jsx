import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import EmployeeAnalytics from "../../../components/Admin/EmployeeAnalytics";
import AddProject from "../../../components/Admin/AddProject";
import EditProject from "../../../components/Admin/EditProject";
import ViewProjects from "../../../components/Admin/ViewProjects";
import DeleteProject from "../../../components/Admin/DeleteProject";

const Projects = () => {
  const [selectedPage, setSelectedPage] = useState("ADD");

  // Sidebar options and corresponding components
  const pages = {
    ADD: { label: "Add Project", component: <AddProject /> },
    EDIT: { label: "Edit Project",  component: <EditProject /> },
    DELETE: { label: "Remove Project",  component: <DeleteProject /> },
    VIEW: { label: "View Project",  component: <ViewProjects /> },
    ANALYTICS: { label: "Project Analytics",  component: <EmployeeAnalytics /> },
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

export default Projects;
