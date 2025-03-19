import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import StopIcon from "@mui/icons-material/Stop";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

import { useTimerContext } from "../../contexts/TimerContext";

export default function TimerControls({ onNext, onPrevious, onStop }) {
  const { pause, resume } = useTimerContext();

  const handleNextSection = () => {
    console.log("next section");
  };

  const handlePreviousSection = () => {
    console.log("previous section");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <ButtonGroup variant="contained" aria-label="Presentation controls">
        <Button onClick={handlePreviousSection}>
          <SkipPreviousIcon />
        </Button>
        <Button onClick={pause}>
          <StopIcon />
        </Button>
        <Button onClick={handleNextSection}>
          <SkipNextIcon />
        </Button>
      </ButtonGroup>
    </Box>
  );
}
