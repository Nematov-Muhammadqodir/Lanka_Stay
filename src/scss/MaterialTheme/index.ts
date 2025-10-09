import { common } from "@mui/material/colors";
import { ThemeOptions } from "@mui/material";

/**
 * LIGHT THEME (DEFAULT)
 */
export const light: ThemeOptions = {
  palette: {
    background: {
      default: "#ffffff", // main background
      paper: "#ffffff",
    },
    primary: {
      main: "#2f52df",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#E9F1FF",
    },
    text: {
      primary: "#212121",
      secondary: "#616161",
      disabled: "#B0B0B0",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          letterSpacing: "0",
        },
      },
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          subtitle1: "p",
          subtitle2: "p",
          body1: "p",
          body2: "p",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#212121",
          minWidth: "auto",
          lineHeight: 1.2,
          boxShadow: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "48px",
          width: "100%",
          backgroundColor: "#ffffff",
        },
        notchedOutline: {
          padding: "8px",
          top: "-9px",
          border: "1px solid #eee",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: { height: "100%" },
        body: { background: "#ffffff", height: "100%", minHeight: "100%" },
        p: { margin: 0 },
      },
    },
  },
};

export const dark: ThemeOptions = {
  palette: {
    background: {
      default: "#121212", // main dark background
      paper: "#1E1E1E", // slightly lighter for cards/papers
    },
    primary: {
      main: "#2f52df", // keep brand color
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#2a3d5f", // darker version of light secondary
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
      disabled: "#555555",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          letterSpacing: "0",
        },
      },
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          subtitle1: "p",
          subtitle2: "p",
          body1: "p",
          body2: "p",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          minWidth: "auto",
          lineHeight: 1.2,
          boxShadow: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "48px",
          width: "100%",
          backgroundColor: "#1E1E1E",
        },
        notchedOutline: {
          padding: "8px",
          top: "-9px",
          border: "1px solid #333",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: { height: "100%" },
        body: { background: "#121212", height: "100%", minHeight: "100%" },
        p: { margin: 0 },
      },
    },
  },
};
