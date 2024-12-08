import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery
} from "@mui/material";
import AddTaskSubmission from "../SubPages/AddTaskSubmission";
import EditTaskSubmission from "../SubPages/EditTaskSubmission";
import ViewAllTasks from "../SubPages/ViewAllTasks";

const TaskManagement = () => {
  const [selectedPage, setSelectedPage] = useState("TaskSubmission");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Sidebar options and corresponding components
  const pages = {
    TaskSubmission: { label: "Task Submission", component: <AddTaskSubmission /> },
    EditSubmission: { label: "Edit Submission",  component: <EditTaskSubmission /> },
    AllTasks: { label: "View Tasks",  component: <ViewAllTasks /> },
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
      <Box 
        flex="1" 
        p={isMobile ? 2 : 4} 
        bgcolor="#FEFFFF" 
        mt={2} 
        style={{
          borderRadius: "10px",
          border: "2px solid #C6DFFF",
          overflowX: "auto",
          minHeight: isMobile ? "calc(100vh - 64px)" : "auto"
        }}
      >
        {pages[selectedPage].component}
      </Box>
    </Box>
    </>
  );
};

export default TaskManagement;

