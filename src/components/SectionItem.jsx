import { styled } from "@mui/material/styles";

import { Typography } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import MinutePicker from "./MinutePicker";

const StyledListItem = styled("li")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  paddingTop: 3,
  paddingBottom: 3,
}));

const SectionNumber = styled("span")(({ theme }) => ({
  fontSize: ".8em",
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

const SectionOptionsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  paddingRight: theme.spacing(1),
  width: "1.4em",
  minWidth: "1.4em",
  borderRight: `2px solid ${theme.palette.text.primary}`,
  gap: theme.spacing(1.5),
}));

export default function SectionItem({
  name,
  order,
  duration,
  onDurationChange,
  unassignedMinutes,
  ...rest
}) {
  return (
    <StyledListItem key={name} {...rest}>
      <SectionOptionsContainer>
        <SectionNumber>{order}</SectionNumber>
        <DragIndicatorIcon
          sx={{
            color: "text.secondary",
            fontSize: "1em",
            marginLeft: "-3px",
          }}
        />
      </SectionOptionsContainer>

      <Typography
        sx={{ flexGrow: 1, mr: 2 }}
        variant="body1"
        lineHeight={1.3}
        fontSize={".9em"}
      >
        {name}
      </Typography>

      <MinutePicker
        value={duration}
        min={0}
        max={unassignedMinutes + duration}
        onChange={(value) => {
          onDurationChange(name, value);
        }}
      />
    </StyledListItem>
  );
}
