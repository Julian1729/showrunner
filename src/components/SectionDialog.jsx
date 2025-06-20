import { useState, useEffect, useRef } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";

export default function PresentationDialog({ open, setOpen, onSubmit }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef(null); // Create a ref for the TextField

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name) {
      setError(true);
      return;
    }

    setError(false);
    onSubmit(name);
    setOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      if (open && inputRef.current) {
        inputRef.current.focus(); // Focus the TextField when the modal opens
      }
    }, 0);
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          component: "form",
          onSubmit: handleSubmit,
          noValidate: true,
        },
      }}
      sx={(theme) => ({
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: 500,
          padding: 1,
        },
      })}
    >
      <DialogTitle>New Section</DialogTitle>
      <DialogContent>
        <FormControl fullWidth focused={true}>
          <TextField
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="filled"
            sx={{ mb: 3 }}
            error={error}
            helperText={error ? "Please enter a name for this section" : ""}
            onChange={(e) => {
              setName(e.target.value);
              setError(!e.target.value);
            }}
            value={name}
            inputRef={inputRef} // Attach the ref to the TextField
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
