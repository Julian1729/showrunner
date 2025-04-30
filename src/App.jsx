import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router";
import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import theme from "./theme";
import { PresentationsProvider } from "./contexts/presentations-context";

import HomePage from "./components/HomePage.jsx";
import PresentationOverviewPage from "./components/PresentationOverviewPage";
import PresentPage from "./components/PresentPage";

// FONTS
import "@fontsource-variable/inter";
import "@fontsource-variable/noto-sans";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PresentationsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/:id/present" element={<PresentPage />} />
              <Route path="/:id" element={<PresentationOverviewPage />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </BrowserRouter>
        </PresentationsProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
