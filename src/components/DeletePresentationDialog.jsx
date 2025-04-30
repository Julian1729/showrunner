import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

export default function DeletePresentationDialog({
  open,
  setOpen,
  presentation,
  onDelete,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    presentation && (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Presentation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete "{presentation.name}"? This action
            cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onDelete} variant="contained" type="submit">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
}
