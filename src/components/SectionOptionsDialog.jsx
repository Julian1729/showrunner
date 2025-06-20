import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";

export default function SectionOptionsDialog({
  open,
  section,
  onClose,
  onRenameSection,
  onDeleteSection,
}) {
  if (!section) return null;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle sx={{ pb: 0 }}>Section Options</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ fontStyle: "italic" }}>
          {section.name}
        </Typography>
      </DialogContent>

      <List sx={{ pt: 0 }}>
        <ListItem disablePadding>
          <ListItemButton onClick={onRenameSection}>
            <ListItemAvatar>
              <Avatar>
                <EditIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Rename" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={onDeleteSection}>
            <ListItemAvatar>
              <Avatar>
                <DeleteIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}
