import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1A80E5",
    },
    secondary: {
      main: "#4F7396",
      // add lighter color for secondary
      light: "#D1DBE8",
    },
    // set color for text
    text: {
      primary: "#0D141C",
      light: "#4F7396",
      secondary: "#4F7396",
    },
  },
  typography: {
    fontFamily: '"Inter Variable", "Helvetica", "Arial", sans-serif',
    // set font family for all headings
    h1: {
      fontFamily: '"Noto Sans Variable", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Noto Sans Variable", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Noto Sans Variable", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: '"Noto Sans Variable", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: '"Noto Sans Variable", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
    },
    h6: {
      fontFamily: '"Noto Sans Variable", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
      fontSize: "1.1em",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          boxShadow: "none",
          color: "#0e141b",
        },
        colorPrimary: {
          backgroundColor: "#fff",
        },
      },
    },
    // set color for all buttons
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
        text: {
          color: "#4F7396",
        },
        containedPrimary: {
          backgroundColor: "#4F7396",
        },
      },
    },

    // style filled text fields
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#E8EDF2",
          color: "text.primary",
          borderRadius: "8px",
          "&::before": {
            content: "none",
          },
          "&::after": {
            content: "none",
          },
          "&.Mui-focused": {
            backgroundColor: "#F5F5F5",
            borderColor: "#4F7396",
          },
          // ".MuiInputAdornment-root": {
          //   marginTop: "0 !important",
          // },
        },
      },
    },
  },

  // set border radius for theme
  shape: {
    borderRadius: 12,
  },

  // radio button root change color
  MuiRadio: {
    styleOverrides: {
      root: {
        color: "#D1DBE8",
      },
    },
  },
});

export default theme;
