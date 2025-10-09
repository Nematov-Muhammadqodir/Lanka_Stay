import "@/src/scss/app.scss";
import {
  createTheme,
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import type { AppProps } from "next/app";
import { useMemo, useState } from "react";
import { dark, light } from "../scss/MaterialTheme";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = useMemo(
    () => createTheme(mode === "light" ? light : dark),
    [mode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <button
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 1000,
          background: "none",
          border: "1px solid gray",
          color: theme.palette.text.primary,
          padding: "8px 12px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        onClick={() => setMode(mode === "light" ? "dark" : "light")}
      >
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </button>

      <Component {...pageProps} />
    </ThemeProvider>
  );
}
