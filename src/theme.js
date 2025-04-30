import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2B50AA",
    },
    secondary: {
      main: "#4F7396",
    },
    // set color for text
    text: {
      primary: "#0D141C",
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
  },
});

export default theme;
