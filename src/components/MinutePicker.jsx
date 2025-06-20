import React from "react";
import { Add, Remove } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const NumberInput = styled("input")(({ theme }) => ({
  border: "none",
  color: theme.palette.text.primary,
  fontSize: "1em",
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
  minWidth: "2.5em",
  maxWidth: "2.5em",
  textAlign: "center",
  backgroundColor: "#E8EDF2",
  borderRadius: theme.shape.borderRadius,
  // hide number input arrows
  "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
}));

const Container = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  gap: "10px",
  alignItems: "center",
}));

const ChangeButton = styled("button")(({ theme }) => ({
  fontSize: ".7em",
  height: "2em",
  minWidth: "2em",
  boxShadow: `inset 0 0 0 2px ${theme.palette.text.primary}`,
  backgroundColor: "transparent",
  appearance: "none",
  border: "none",
  borderRadius: "50%",
  lineHeight: ".5em",
  cursor: "pointer",
  transition: "background-color 0.15s ease, color 0.15s ease",
  color: theme.palette.text.primary,

  "&:hover": {
    backgroundColor: theme.palette.text.primary,
    color: "#fff",
  },

  // disabled state
  "&:disabled": {
    backgroundColor: "#E8EDF2",
    color: "#4F7396",
    cursor: "not-allowed",
  },
}));

const MinutePicker = ({ value = 0, min, max, onChange, onDelete }) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;

    // Allow the input to be cleared
    if (inputValue === "") {
      onChange("");
      return;
    }

    let newValue = parseInt(inputValue, 10);

    if (!isNaN(newValue)) {
      // Enforce min and max constraints
      if (newValue >= min && newValue <= max) {
        onChange(newValue);
      }
    }
  };

  const handleBlur = () => {
    if (value === 0 && onDelete) {
      onDelete();
    }
  };

  return (
    <Container>
      <ChangeButton onClick={handleDecrement} disabled={value <= min}>
        <Remove fontSize="inherit" />
      </ChangeButton>
      <NumberInput
        type="number"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <ChangeButton onClick={handleIncrement} disabled={value >= max}>
        <Add fontSize="inherit" />
      </ChangeButton>
    </Container>
  );
};

export default MinutePicker;
