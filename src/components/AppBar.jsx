import MUIAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function AppBar({ pageTitle, onBack, children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <MUIAppBar
        component="nav"
        position="sticky"
        sx={{ backroundColor: "#fff" }}
      >
        <Toolbar component={Grid} container>
          <Grid size="2">
            {onBack && (
              <IconButton
                // size="small"
                edge="start"
                color="inherit"
                aria-label="back"
                onClick={onBack}
                // sx={{ mr: "auto" }}
              >
                <ArrowBackIcon />
              </IconButton>
            )}
          </Grid>

          <Grid size="8">
            <Typography
              variant="h6"
              component="h1"
              sx={{ textAlign: "center", fontWeight: "700", flexGrow: 1 }}
            >
              {pageTitle}
            </Typography>
          </Grid>

          {children}
        </Toolbar>
      </MUIAppBar>
    </Box>
  );
}

export default AppBar;
