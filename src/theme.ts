import { createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#286CE0",
            },
            background: {
              default: "#D5E2E2",
              paper: "#ffffff",
            },
          }
        : {
            primary: {
              main: "#28A6E0",
            },
            background: {
              default: "#1D1D1D",
              paper: "#232A2A",
            },
            text: {
              primary: "#ffffff",
              secondary: "#b0bec5",
            },
          }),
    },
  });
