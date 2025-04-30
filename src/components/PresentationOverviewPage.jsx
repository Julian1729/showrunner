import { useMemo, useState, useCallback, useEffect } from "react";
import { NavLink } from "react-router";
import moment from "moment";
import { useParams, useNavigate } from "react-router";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import usePresentations from "../hooks/use-presentations";

import AppBar from "./AppBar";

import MinutePicker from "./MinutePicker";
import SectionDialog from "./SectionDialog";
import SectionList from "./SectionList";

// create custom styled FormControlLabel
import { styled } from "@mui/material/styles";

const TimingModeOptionButton = styled(FormControlLabel)(({ theme }) => ({
  border: "1px solid #D1DBE8",
  borderRadius: theme.shape.borderRadius,
  paddingRight: 9,
  margin: 0,
  paddingTop: 4,
  paddingBottom: 4,
}));

const timingTooltipText = `The "Fixed" mode allows you to set a specific duration for your presentation. The "Dynamic" mode calculates the duration based on the start and end times you set.`;

export default function PresentationOverviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [unassignedMinutes, setUnassignedMinutes] = useState(0);
  const [timerMode, setTimerMode] = useState("fixed");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const { presentations, editPresentation } = usePresentations();
  const presentation = presentations.find(
    (presentation) => presentation.id === id
  );

  console.log("presentation found", presentation);

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
    <>
      <AppBar
        pageTitle="New Presentation"
        onBack={() => navigate("/")}
      ></AppBar>
      <Stack spacing={3} sx={{ p: 2 }}>
        <TextField label="Title" variant="filled" fullWidth />

        <FormControl fullWidth>
          <FormLabel
            id="timing-mode-radio-group"
            aria-label="timing mode"
            sx={{ mb: 1 }}
          >
            Timing Mode
            <Tooltip title={timingTooltipText} arrow>
              <HelpIcon
                sx={{
                  fontSize: "0.8em",
                  color: "#4F7396",
                  marginLeft: 1,
                }}
              />
            </Tooltip>
          </FormLabel>
          <RadioGroup
            aria-labelledby="timing-mode-radio-group"
            name="mode"
            onChange={(e) => setTimerMode(e.target.value)}
            value={timerMode}
            row
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 1,
            }}
          >
            <TimingModeOptionButton
              value="fixed"
              control={<Radio />}
              label="Fixed"
            />
            <TimingModeOptionButton
              value="dynamic"
              control={<Radio />}
              label="Dynamic"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          label="Duration"
          variant="filled"
          type="number"
          fullWidth
          defaultValue="0"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="start">minutes</InputAdornment>
              ),
            },
          }}
        />

        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <TimePicker
            name="startTime"
            value={startTime}
            onChange={setStartTime}
            label="Start Time"
          />
          <TimePicker
            name="endTime"
            value={endTime}
            onChange={setEndTime}
            label="End Time"
          />
        </Box>

        <Box>
          <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
            Sections
          </Typography>
          <SectionList sections={presentation.sections} />
        </Box>
      </Stack>
      <SectionDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        onSubmit={handleNewSectionSubmit}
      />
    </>
  );
}
