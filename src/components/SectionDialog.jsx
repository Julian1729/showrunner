import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
export default function PresentationDialog({ open, setOpen, onSubmit }) {
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
          onSubmit,
        },
      }}
    >
      <DialogTitle>New Section</DialogTitle>
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
