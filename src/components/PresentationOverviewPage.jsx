import { useMemo, useState, useCallback, useEffect } from "react";
import { NavLink } from "react-router";
import moment from "moment";
import { useParams } from "react-router";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import StartIcon from "@mui/icons-material/Start";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { usePresentationsContext } from "../contexts/presentations-context";

import MinutePicker from "./MinutePicker";
import SectionDialog from "./SectionDialog";

export default function PresentationOverviewPage() {
  const { id } = useParams();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [unassignedMinutes, setUnassignedMinutes] = useState(0);

  const { presentations, editPresentation } = usePresentationsContext();
  const presentation = presentations.find(
    (presentation) => presentation.id === id
  );

  const addSection = ({ name, duration = 0 }) =>
    editPresentation(presentation.id, {
      sections: [
        ...(presentation.sections || []),
        {
          name,
          duration,
        },
      ],
    });

  const deleteSection = (sectionName) => {
    editPresentation(presentation.id, {
      sections: presentation.sections.filter(
        (section) => section.name !== sectionName
      ),
    });
  };

  const totalDuration = useMemo(() => {
    if (!presentation) return null;

    if (presentation.mode === "fixed") {
      return presentation.duration;
    }

    // get duration from start and end time using moment
    const start = moment(presentation.startTime);
    const end = moment(presentation.endTime);
    return end.diff(start, "minutes");
  });

  useEffect(() => {
    if (!presentation || !presentation.sections) return;
    const assignedMinutes = presentation.sections.reduce(
      (acc, section) => acc + section.duration,
      0
    );
    setUnassignedMinutes(totalDuration - assignedMinutes);
  });

  console.log("totalDuration", totalDuration);
  console.log("unassignedMinutes", unassignedMinutes);

  if (!presentation) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
          Presentation not found
        </Typography>
      </Box>
    );
  }

  const handleNewSectionSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    addSection(formJson);
    setDialogOpen(false);
  };

  const handleDurationChange = (sectionName, newValue) => {
    if (newValue === "") return;

    editPresentation(presentation.id, {
      sections: presentation.sections.map((section) =>
        section.name === sectionName
          ? {
              ...section,
              duration: newValue,
            }
          : section
      ),
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 2, textAlign: "center" }}>
        <Typography variant="h4" component="h1">
          {presentation.name}
        </Typography>
        <Typography variant="caption">{totalDuration} minutes</Typography>
      </Box>
      <Box>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Toolbar
            sx={[
              {
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
              },
            ]}
          >
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Sections
            </Typography>

            <Tooltip title="Filter list" onClick={() => setDialogOpen(true)}>
              <IconButton>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Minutes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {presentation?.sections?.length ? (
                  presentation.sections.map((section) => (
                    <TableRow
                      key={section.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {section.name}
                      </TableCell>
                      <TableCell align="right">
                        <MinutePicker
                          sx={{ marginLeft: "auto" }}
                          value={section.duration}
                          min={0}
                          max={unassignedMinutes + section.duration}
                          onChange={(newValue) =>
                            handleDurationChange(section.name, newValue)
                          }
                          onDelete={() => deleteSection(section.name)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      No sections yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <SectionDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        onSubmit={handleNewSectionSubmit}
      />
      <Fab
        color="primary"
        aria-label="start"
        title="Start Presentation"
        variant="extended"
        component={NavLink}
        to={`present`}
        sx={{ position: "fixed", bottom: 16, right: 16 }} // Add this line
      >
        Start
        <StartIcon sx={{ marginLeft: "5px" }} />
      </Fab>
    </Box>
  );
}
