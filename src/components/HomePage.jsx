import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import PresentationList from "./PresentationList";
import PresentationDialog from "./PresentationDialog";

export default function PresentationPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  // const { presentations, createPresentation } = usePresentations();

  return (
    <>
      <PresentationList />
      <PresentationDialog open={dialogOpen} setOpen={setDialogOpen} />
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setDialogOpen(true)}
        sx={{ position: "fixed", bottom: 16, right: 16 }} // Add this line
      >
        <AddIcon />
      </Fab>
    </>
  );
}
