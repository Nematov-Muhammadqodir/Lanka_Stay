import "@/src/scss/app.scss";
import "../scss/pc/main.scss";
import "leaflet/dist/leaflet.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { useEffect, useMemo, useState } from "react";
import { dark, light } from "../scss/MaterialTheme";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useApollo } from "@/apollo/client";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { store } from "@/store";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("themeMode") as "light" | "dark" | null;
    if (saved) setMode(saved);
  }, []);

  const toggleMode = () => {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    localStorage.setItem("themeMode", next);
  };

  const theme = useMemo(
    () => createTheme(mode === "light" ? light : dark),
    [mode]
  );
  const client = useApollo(pageProps.initialApolloState);
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <button
            style={{
              position: "fixed",
              top: 30,
              right: 16,
              zIndex: 1000,
              background: "none",
              color: theme.palette.text.primary,
              padding: "8px 12px",
              cursor: "pointer",
              border: "none",
            }}
            onClick={toggleMode}
          >
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </button>

          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default appWithTranslation(App);
