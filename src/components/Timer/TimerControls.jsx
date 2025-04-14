import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import StopIcon from "@mui/icons-material/Stop";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

// import { useTimerContext } from "../../contexts/TimerContext";

export default function TimerControls({ onNext, onPrevious, onStop }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <ButtonGroup variant="contained" aria-label="Presentation controls">
        <Button onClick={onPrevious} disabled={true}>
          <SkipPreviousIcon />
        </Button>
        <Button onClick={onStop}>
          <StopIcon />
        </Button>
        <Button onClick={onNext}>
          <SkipNextIcon />
        </Button>
      </ButtonGroup>
    </Box>
  );
}
