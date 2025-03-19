import Box from "@mui/material/Box";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import useSectionTimer from "../hooks/use-section-timer";

// import PresentationTimer from "./PresentationTimer";
import { TimerProvider } from "../contexts/TimerContext";
import { usePresentationsContext } from "../contexts/presentations-context";

import TimerDisplay from "./Timer/TimerDisplay";
import TimerControls from "./Timer/TimerControls";
import SectionTimer from "./SectionTimer";

import { getExpiryTimestamp } from "../utils/time";

export default function PresentPage() {
  const { id } = useParams();
  const [currentSection, setCurrentSection] = useState(0);
  const [sectionExpiryTimestamp, setSectionExpiryTimestamp] = useState(null);

  const { presentations, editPresentation } = usePresentationsContext();

  const nextSection = () => {
    setCurrentSection((prev) => prev + 1);
  };

  const { restart, ...sectionTimerProps } = useSectionTimer({
    expiryTimestamp: sectionExpiryTimestamp,
    onExpire: nextSection,
  });

  const presentation = presentations.find(
    (presentation) => presentation.id === id
  );

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

  const presentationExpiryTimestamp = useMemo(
    () => getExpiryTimestamp(totalDuration),
    [totalDuration]
  );

  useEffect(() => {
    if (!presentation) return;
    const section = presentation.sections[currentSection];
    console.log("section", section.name);
    setSectionExpiryTimestamp(getExpiryTimestamp(section.duration));
  }, [currentSection, presentation]);

  // const getSectionExpiryTimestamp = () => {
  //   const section = presentation.sections[currentSection];
  //   return getExpiryTimestamp(section.duration);
  // };

  // console.log("sectionExpiryTimestamp", sectionExpiryTimestamp);

  if (!presentation) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
          Presentation not found
        </Typography>
      </Box>
    );
  }

  return (
    <TimerProvider expiryTimestamp={presentationExpiryTimestamp}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ mb: 2, textAlign: "center" }}>
          <Typography variant="h4" component="h2">
            {presentation.name}
          </Typography>
          <Typography variant="caption">{totalDuration} minutes</Typography>
        </Box>

        <Paper elevation={3} sx={{ textAlign: "center", mb: 2 }}>
          <TimerDisplay />
        </Paper>

        <Paper elevation={3} sx={{ textAlign: "center" }}>
          <Typography variant="caption">
            {currentSection + 1} of {presentation.sections.length}
          </Typography>
          <Typography variant="h5" component="h2">
            {presentation.sections[currentSection].name}
          </Typography>

          <SectionTimer {...sectionTimerProps} />
        </Paper>

        <Box sx={{ mt: 2 }}>
          <TimerControls />
        </Box>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          {presentation.sections[currentSection + 1] ? (
            <>
              <Typography variant="h6" component="h2">
                Next up
              </Typography>
              <Typography variant="body1">
                {presentation.sections[currentSection + 1].name}
              </Typography>
              <Typography variant="caption">
                {`${
                  presentation.sections[currentSection + 1].duration
                } minutes`}
              </Typography>
            </>
          ) : (
            <Typography variant="h5" component="h2">
              End of presentation
            </Typography>
          )}
        </Box>
      </Box>
    </TimerProvider>
  );
}
