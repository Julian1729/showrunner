import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router";

import Box from "@mui/material/Box";
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
import TimeDifferenceDisplay from "./TimeDifferenceDisplay";

export default function PresentPage() {
  const { id } = useParams();
  const [currentSection, setCurrentSection] = useState(0);
  const [sectionExpiryTimestamp, setSectionExpiryTimestamp] = useState(null);
  const [timeDifference, setTimeDifference] = useState(0); // used to store time saved or time lost
  const navigate = useNavigate();

  const { presentations, editPresentation } = usePresentationsContext();

  const stopTimer = () => {
    // go back to previous page
    navigate(`/${id}`);
  };

  const nextSection = () => {
    const nextSectionIndex = currentSection + 1;
    if (nextSectionIndex >= presentations.length) {
      // stop timer
      stopTimer();
    }
    setCurrentSection(nextSectionIndex);
  };

  const { restart, ...sectionTimerProps } = useSectionTimer({
    expiryTimestamp: sectionExpiryTimestamp,
    // TODO: autoPlay should be defined in the presention options instead of hardocded to false
    autoPlay: false,
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

  const handleNextSection = () => {
    // get difference between current time and section expiry timestamp
    const now = new Date();
    const secondsLeft = Math.floor(
      (sectionExpiryTimestamp.getTime() - now.getTime()) / 1000
    );

    setTimeDifference((prev) => prev + secondsLeft);
    nextSection();
  };

  useEffect(() => {
    if (!presentation) return;

    const section = presentation.sections[currentSection];

    setSectionExpiryTimestamp(getExpiryTimestamp(section.duration));
  }, [currentSection, presentation]);

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
          <Typography variant="caption">
            <TimeDifferenceDisplay secondsDifference={timeDifference} />
          </Typography>
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
          <TimerControls
            onNext={handleNextSection}
            onPrevious={() => {
              console.log("previous");
            }}
            onStop={stopTimer}
          />
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
