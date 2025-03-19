import { useState } from "react";
import moment from "moment";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

import { usePresentationsContext } from "../contexts/presentations-context";

export default function PresentationDialog({ open, setOpen }) {
  const [timerMode, setTimerMode] = useState("fixed");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const { createPresentation } = usePresentationsContext();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());

            console.log(formJson);

            createPresentation(formJson);
            handleClose();
          },
        },
      }}
    >
      <DialogTitle>New Presentation</DialogTitle>
      <DialogContent>
        <FormControl>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="name"
            fullWidth
            variant="standard"
            sx={{ mb: 3 }}
          />

          <FormLabel id="presentation-type-radio">Timer Type</FormLabel>
          <RadioGroup
            row
            aria-labelledby="presentation-type-radio"
            name="mode"
            value={timerMode}
            onChange={(event) => setTimerMode(event.target.value)}
          >
            <FormControlLabel
              value="fixed"
              control={<Radio />}
              label="Fixed Duration"
            />
            <FormControlLabel
              value="relative"
              control={<Radio />}
              label="Timed Schedule"
            />
          </RadioGroup>
        </FormControl>

        {timerMode === "fixed" && (
          <TextField
            autoFocus
            required
            margin="dense"
            id="duration"
            name="duration"
            label="Duration"
            type="number"
            variant="standard"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">minutes</InputAdornment>
                ),
              },
            }}
          />
        )}

        {timerMode === "relative" && (
          <>
            <Box sx={{ mt: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
              <TimePicker
                name="startTime"
                value={startTime}
                onChange={setStartTime}
                label="Start"
              />
              <TimePicker
                name="endTime"
                value={endTime}
                onChange={setEndTime}
                label="End"
              />
            </Box>
            <Typography variant="caption" color="text.secondary">
              Duration:{" "}
              {startTime && endTime
                ? `${moment.duration(endTime.diff(startTime)).as("minutes")}m`
                : "-"}
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
