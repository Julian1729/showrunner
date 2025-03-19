import { NavLink } from "react-router";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import LockClockIcon from "@mui/icons-material/LockClock";
import { usePresentationsContext } from "../contexts/presentations-context";

export default function PresentationList() {
  const { presentations } = usePresentationsContext();

  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {presentations.length ? (
          presentations.map((presentation) => (
            <ListItemButton
              component={NavLink}
              to={`/${presentation.id}`}
              key={presentation.id}
              onClick={() => console.log(presentation)}
            >
              <ListItemAvatar>
                <Avatar>
                  {presentation.mode === "fixed" ? (
                    <LockClockIcon />
                  ) : (
                    <AccessTimeIcon />
                  )}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={presentation.name}
                secondary={`${presentation.duration} minutes`}
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
    </>
  );
}
