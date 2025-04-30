import { useState } from "react";
import { NavLink } from "react-router";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LockClockIcon from "@mui/icons-material/LockClock";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useLongPress } from "use-long-press";

import DeletePresentationDialog from "./DeletePresentationDialog";
import usePresentations from "../hooks/use-presentations";

export default function PresentationList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [queuedForDeletion, setQueuedForDeletion] = useState(null);

  const { presentations, removePresentation } = usePresentations();

  const bindLongPress = useLongPress((e, { context: presentation }) => {
    e.stopPropagation();
    setQueuedForDeletion(presentation);
    setIsDialogOpen(true);
  });

  const handleDeletePresentation = () => {
    removePresentation(queuedForDeletion.id);
    setIsDialogOpen(false);
    setQueuedForDeletion(null);
  };

  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {presentations.length ? (
          presentations.map((presentation) => (
            <ListItemButton
              component={NavLink}
              to={`/${presentation.id}`}
              key={presentation.id}
              onClick={() => console.log(presentation)}
              {...bindLongPress(presentation)}
            >
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  sx={{
                    bgcolor: "#E8EDF2",
                    color: "#0D141C",
                    height: 48,
                    width: 48,
                    mr: 2,
                    borderRadius: 2,
                  }}
                >
                  {presentation.mode === "fixed" ? (
                    <LockClockIcon />
                  ) : (
                    <AccessTimeIcon />
                  )}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={presentation.name}
                secondary={`${presentation.sections.length} sections · ${presentation.duration} minutes`}
                sx={{
                  "& .MuiListItemText-primary": {
                    color: "text.primary",
                    fontWeight: 500,
                  },
                  "& .MuiListItemText-secondary": {
                    // fontSize: "0.8rem",
                    color: "text.secondary",
                  },
                }}
              />
              <ArrowForwardIcon
                sx={{
                  color: "text.main",
                  fontSize: "1.2rem",
                  ml: "auto",
                }}
              />
            </ListItemButton>
          ))
        ) : (
          <ListItemButton>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="No presentations" />
          </ListItemButton>
        )}
      </List>

      <DeletePresentationDialog
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        onDelete={handleDeletePresentation}
        presentation={queuedForDeletion}
      />
    </>
  );
}
