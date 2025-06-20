import { useMemo, useState, useCallback, useEffect } from "react";
import moment from "moment";
import { useParams, useNavigate, useSearchParams } from "react-router";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";
import HelpIcon from "@mui/icons-material/Help";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import LockClockIcon from "@mui/icons-material/LockClock";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { styled } from "@mui/material/styles";
import SvgIcon from "@mui/material/SvgIcon";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Snackbar from "@mui/material/Snackbar";
import Collapse from "@mui/material/Collapse";

import usePresentations from "../hooks/use-presentations";

import AppBar from "./AppBar";

import SectionDialog from "./SectionDialog";
import SectionList from "./SectionList";

const ExpandMore = styled(({ expand, ...other }) => {
  return <ExpandMoreIcon {...other} />;
})(({ theme }) => ({
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

const TimingModeOptionButton = styled(FormControlLabel)(({ theme }) => ({
  border: "1px solid #D1DBE8",
  borderRadius: theme.shape.borderRadius,
  paddingRight: 9,
  margin: 0,
  paddingTop: 6,
  paddingBottom: 6,
}));

const AddSectionButton = styled("button")(({ theme }) => ({
  appearance: "none",
  display: "flex",
  alignItems: "center",
  backgroundColor: "transparent",
  border: "none",
  fontWeight: 800,
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: theme.spacing(5),
  padding: theme.spacing(1, 2),
  cursor: "pointer",

  "&:hover": {
    backgroundColor: "#E8EDF2",
    borderRadius: theme.shape.borderRadius,
  },
}));

const timingTooltipText = `The "Fixed" mode allows you to set a specific duration for your presentation. The "Dynamic" mode calculates the duration based on the start and end times you set.`;

export default function PresentationOverviewPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const [nameSectionDialogOpen, setNameSectionDialogOpen] = useState(false);
  const [unassignedMinutes, setUnassignedMinutes] = useState(0);
  const [selectedSection, setSelectedSection] = useState(null);
  const [settingsExpanded, setSettingsExpanded] = useState(false);
  const [presentationTitle, setPresentationTitle] = useState("");
  const [isMinuteSnackbarOpen, setIsMinuteSnackbarOpen] = useState(false);
  const [showedMinuteSnackbar, setShowedMinuteSnackbar] = useState(false);
  // const [timerMode, setTimerMode] = useState(null);
  // const [startTime, setStartTime] = useState(null);
  // const [endTime, setEndTime] = useState(null);

  const { presentations, editPresentation } = usePresentations();

  const presentation = presentations.find(
    (presentation) => presentation.id === id
  );

  const handleStartPresentation = useCallback(() => {
    if (unassignedMinutes !== 0) {
      return setIsMinuteSnackbarOpen(true);
    }

    navigate(`/${presentation.id}/present`);
  }, [navigate, presentation?.id, unassignedMinutes]);

  console.log("presentation", presentation);

  const handleMinuteSnackbarClose = (e, reason) => {
    setIsMinuteSnackbarOpen(false);
  };

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

    if (presentation.startTime && presentation.endTime) {
      // get duration from start and end time using moment
      const start = moment(presentation.startTime);
      const end = moment(presentation.endTime);
      return end.diff(start, "minutes");
    }

    return 0;
  }, [presentation]);

  // FIXME: there is a bug where this annoyingly shows when the user is adjusting the duration
  useEffect(() => {
    if (!presentation || !presentation.sections) return;
    const assignedMinutes = presentation.sections.reduce(
      (acc, section) => acc + section.duration,
      0
    );
    setUnassignedMinutes(totalDuration - assignedMinutes);
    setPresentationTitle(presentation.name);
  }, [presentation]);

  useEffect(() => {
    // NOTE: "suma" = show unassigned minute alert
    if (
      searchParams.has("suma") &&
      unassignedMinutes !== 0 &&
      !showedMinuteSnackbar
    ) {
      setIsMinuteSnackbarOpen(true);
      setShowedMinuteSnackbar(true);
    } else {
      setIsMinuteSnackbarOpen(false);
    }
  }, [searchParams, unassignedMinutes]);

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
    setNameSectionDialogOpen(false);
  };

  const handlePresentationTitleChange = (e) => {
    editPresentation(presentation.id, {
      name: e.target.value,
    });
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

  const handleTimerModeChange = (e) => {
    const newMode = e.target.value;
    editPresentation(presentation.id, {
      mode: newMode,
    });
    setTimerMode(newMode);
  };

  const handleChangeStartTime = (newValue) => {
    // setStartTime(newValue);
    editPresentation(presentation.id, {
      startTime: newValue,
    });
  };

  const handleChangeEndTime = (newValue) => {
    // setEndTime(newValue);
    editPresentation(presentation.id, {
      endTime: newValue,
    });
  };

  return (
    <>
      <AppBar
        pageTitle={presentation.name || "New Presentation"}
        onBack={() => navigate("/")}
      >
        <Tooltip
          title="Start Presentation"
          placement="left-start"
          enterDelay={500}
        >
          <IconButton
            size="small"
            color="inherit"
            aria-label="start"
            onClick={handleStartPresentation}
            sx={{ ml: "auto" }}
          >
            <PlayCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </AppBar>

      <Stack spacing={1} sx={{ p: 2, pt: 0 }}>
        <Stack sx={{ borderBottom: "1px solid rgba(0,0,0, 0.2)" }} spacing={1}>
          <Typography
            variant="h6"
            component="h2"
            onClick={() => setSettingsExpanded(!settingsExpanded)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            Settings
            <ExpandMore
              aria-expanded={settingsExpanded}
              aria-label="show more"
              expand={settingsExpanded}
            />
          </Typography>
          <Collapse in={settingsExpanded} timeout="auto">
            <Stack spacing={2} sx={{ mb: 2 }}>
              <TextField
                label="Title"
                variant="filled"
                fullWidth
                onChange={(e) => setPresentationTitle(e.target.value)}
                onBlur={handlePresentationTitleChange}
                value={presentationTitle}
              />

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
                  onChange={handleTimerModeChange}
                  value={presentation.mode}
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
                    value="relative"
                    control={<Radio />}
                    label="Relative"
                  />
                </RadioGroup>
              </FormControl>

              {presentation.mode === "relative" && (
                <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
                  <TimePicker
                    name="startTime"
                    value={moment(presentation.startTime) || null}
                    onChange={handleChangeStartTime}
                    label="Start Time"
                  />
                  <TimePicker
                    name="endTime"
                    value={moment(presentation.endTime) || null}
                    onChange={handleChangeEndTime}
                    label="End Time"
                  />
                </Box>
              )}

              <TextField
                label="Duration"
                variant="filled"
                type="number"
                fullWidth
                disabled={presentation.mode === "relative"}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (isNaN(value)) return;

                  editPresentation(presentation.id, {
                    duration: totalDuration,
                  });
                }}
                value={totalDuration}
                slotProps={{
                  input: {
                    ...(presentation.mode === "relative" && {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockClockIcon
                            sx={{
                              color: "#4F7396",
                              fontSize: "1.2em",
                              marginRight: 1,
                            }}
                          />
                        </InputAdornment>
                      ),
                    }),
                    endAdornment: (
                      <InputAdornment position="start">minutes</InputAdornment>
                    ),
                  },
                }}
              />
            </Stack>
          </Collapse>
        </Stack>

        {/* SECTIONS */}
        <Box>
          <Typography variant="h6" component="h2">
            Sections
          </Typography>
          <Typography
            variant="caption"
            component="p"
            sx={{
              mb: 1,
              color: `${unassignedMinutes ? "error.main" : ""}`,
              fontWeight: 500,
            }}
          >
            Unassigned Minutes: {unassignedMinutes}
          </Typography>

          <SectionList
            sections={presentation.sections}
            setSelectedSection={setSelectedSection}
            selectedSection={selectedSection}
            setNameSectionDialogOpen={setNameSectionDialogOpen}
            onDeleteSection={deleteSection}
            unassignedMinutes={unassignedMinutes}
            handleDurationChange={handleDurationChange}
          />

          <AddSectionButton onClick={() => setNameSectionDialogOpen(true)}>
            <SvgIcon
              sx={{
                color: "#4F7396",
                fontSize: "1.5em",
                marginRight: 1,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9 0.875C4.51269 0.875 0.875 4.51269 0.875 9C0.875 13.4873 4.51269 17.125 9 17.125C13.4873 17.125 17.125 13.4873 17.125 9C17.1203 4.51465 13.4854 0.879737 9 0.875V0.875ZM9 15.875C5.20304 15.875 2.125 12.797 2.125 9C2.125 5.20304 5.20304 2.125 9 2.125C12.797 2.125 15.875 5.20304 15.875 9C15.8707 12.7952 12.7952 15.8707 9 15.875V15.875ZM12.75 9C12.75 9.34518 12.4702 9.625 12.125 9.625H9.625V12.125C9.625 12.4702 9.34518 12.75 9 12.75C8.65482 12.75 8.375 12.4702 8.375 12.125V9.625H5.875C5.52982 9.625 5.25 9.34518 5.25 9C5.25 8.65482 5.52982 8.375 5.875 8.375H8.375V5.875C8.375 5.52982 8.65482 5.25 9 5.25C9.34518 5.25 9.625 5.52982 9.625 5.875V8.375H12.125C12.4702 8.375 12.75 8.65482 12.75 9V9Z"
                  fill="#0D141C"
                />
              </svg>
            </SvgIcon>
            <Typography
              variant="body1"
              component="span"
              sx={{
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              Add Section
            </Typography>
          </AddSectionButton>
        </Box>
      </Stack>

      <SectionDialog
        open={nameSectionDialogOpen}
        setOpen={setNameSectionDialogOpen}
        onSubmit={handleNewSectionSubmit}
      />

      <Snackbar
        open={isMinuteSnackbarOpen}
        autoHideDuration={4000}
        onClose={handleMinuteSnackbarClose}
      >
        <Alert
          onClose={handleMinuteSnackbarClose}
          severity="warning"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Check unassigned minutes
        </Alert>
      </Snackbar>
    </>
  );
}
