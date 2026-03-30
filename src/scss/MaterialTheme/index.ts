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
      contrastText: "#FFFFFF",
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
    mode: "dark",
    background: {
      default: "#0B0F1A",
      paper: "#131825",
    },
    primary: {
      main: "#5B7BF8",
      light: "#8DA4FF",
      dark: "#3A56C7",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#1A2235",
      contrastText: "#C8D6FF",
    },
    text: {
      primary: "#E8ECF4",
      secondary: "#8B95A8",
      disabled: "#464F62",
    },
    divider: "rgba(91, 123, 248, 0.12)",
    error: {
      main: "#F87171",
    },
    warning: {
      main: "#FBBF24",
    },
    success: {
      main: "#34D399",
    },
    info: {
      main: "#60A5FA",
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
          color: "#E8ECF4",
          minWidth: "auto",
          lineHeight: 1.2,
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "rgba(91, 123, 248, 0.08)",
          },
        },
        contained: {
          background: "linear-gradient(135deg, #5B7BF8 0%, #3A56C7 100%)",
          color: "#ffffff",
          "&:hover": {
            background: "linear-gradient(135deg, #6D8AFF 0%, #4A66D7 100%)",
          },
        },
        outlined: {
          borderColor: "rgba(91, 123, 248, 0.4)",
          "&:hover": {
            borderColor: "#5B7BF8",
            backgroundColor: "rgba(91, 123, 248, 0.08)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "48px",
          width: "100%",
          backgroundColor: "#131825",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(91, 123, 248, 0.4)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#5B7BF8",
          },
        },
        notchedOutline: {
          padding: "8px",
          top: "-9px",
          border: "1px solid rgba(91, 123, 248, 0.15)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#131825",
          border: "1px solid rgba(91, 123, 248, 0.1)",
          backgroundImage: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#131825",
          borderColor: "rgba(91, 123, 248, 0.12)",
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        iconEmpty: {
          color: "#464F62",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(91, 123, 248, 0.12)",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: { height: "100%" },
        body: {
          background: "#0B0F1A",
          height: "100%",
          minHeight: "100%",
          colorScheme: "dark",
        },
        p: { margin: 0 },
        a: { color: "#8DA4FF" },
        "::-webkit-scrollbar": {
          width: "9px",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#2A3350",
          borderRadius: "10px",
        },
        "::-webkit-scrollbar-track": {
          background: "#0B0F1A",
        },
      },
    },
  },
};
