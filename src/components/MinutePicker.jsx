import React from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const MinutePicker = ({ value, min, max, onChange, onDelete, sx }) => {
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
    <Box alignItems="center" sx={sx}>
      <IconButton onClick={handleDecrement} disabled={value <= min}>
        <Remove />
      </IconButton>
      <TextField
        type="number"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{ width: 60, textAlign: "center" }}
      />
      <IconButton onClick={handleIncrement} disabled={value >= max}>
        <Add />
      </IconButton>
    </Box>
  );
};

export default MinutePicker;
