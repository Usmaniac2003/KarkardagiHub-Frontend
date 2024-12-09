import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import AddActivityLog from "../../../components/Staff/AddActivityLog";
import EditActivityLog from "../../../components/Staff/EditActivityLog";
import ViewActivityLogs from "../../../components/Staff/ViewActivityLog";
import DeleteActivityLog from "../../../components/Staff/DeleteActivityLog";

const ActivityLogs = () => {
  const [selectedPage, setSelectedPage] = useState("ADD");

  const pages = {
    ADD: { label: "Add Activity Log", component: <AddActivityLog /> },
    EDIT: { label: "Edit Activity Log",  component: <EditActivityLog /> },
    DELETE: { label: "Remove Activity Log",  component: <DeleteActivityLog /> },
    VIEW: { label: "View Activity Logs",  component: <ViewActivityLogs /> },
  };

  return (
    <>
    <Box display="flex" height="100vh" bgcolor={"#DBEBFF"}>
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
                }}
              >
                <ListItemText
                  primary={pages[key].label}
                  sx={{
                    color: selectedPage === key ? "#256CC2" : "black",
                    fontWeight: selectedPage === key ? "bold" : "normal",
                    textAlign: "center",
                    fontSize: "0.85rem",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      <Box flex="1" p={4} bgcolor="#FEFFFF" mt={2} style={{borderRadius:"10px",border:"2px solid #C6DFFF"}}>
        {pages[selectedPage].component}
      </Box>
    </Box>
    </>
  );
};

export default ActivityLogs;

