// use srtyled components from MUI
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import MinutePicker from "./MinutePicker";

// create a styled ul fro the lsit
const StyledList = styled("ul")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  margin: 0,
  padding: 0,
}));

const StyledListItem = styled("li")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
}));

const SectionNumber = styled("span")(({ theme }) => ({
  fontSize: ".8em",
  fontWeight: 700,
  // color: "#fff",
  color: theme.palette.text.primary,
  boxShadow: `inset 0 0 0 2px ${theme.palette.text.primary}`,

  // backgroundColor: theme.palette.text.primary,
  height: "1.8em",
  minWidth: "1.8em",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export default function SectionList({ sections }) {
  return (
    <StyledList>
      {sections.map((section, index) => (
        <StyledListItem key={section.name}>
          <SectionNumber>{index + 1}</SectionNumber>

          <Typography>{section.name}</Typography>

          <MinutePicker />
        </StyledListItem>
      ))}
    </StyledList>
  );
}
