import MUIAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function AppBar({ pageTitle, children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <MUIAppBar
        component="nav"
        position="sticky"
        sx={{ backroundColor: "#fff" }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography
            variant="h6"
            component="h1"
            sx={{ textAlign: "center", fontWeight: "700" }}
          >
            Presentations
          </Typography>
          {children}
        </Toolbar>
      </MUIAppBar>
    </Box>
  );
}

export default AppBar;
