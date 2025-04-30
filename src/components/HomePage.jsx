import { useNavigate } from "react-router";

import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

import AppBar from "./AppBar.jsx";
import PresentationList from "./PresentationList";

import usePresentations from "../hooks/use-presentations.js";

export default function PresentationPage() {
  const navigate = useNavigate();
  const { createPresentation } = usePresentations();

  const handleAddPresentation = () => {
    const newPresentation = createPresentation();
    navigate(`/${newPresentation.id}`);
  };

  return (
    <>
      <AppBar pageTitle="Presentations">
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="add presentation"
          onClick={handleAddPresentation}
          sx={{ ml: "auto" }}
        >
          <AddIcon />
        </IconButton>
      </AppBar>
      <PresentationList />
    </>
  );
}
