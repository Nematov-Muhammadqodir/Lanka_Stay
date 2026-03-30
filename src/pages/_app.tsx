import "@/src/scss/app.scss";
import "../scss/pc/main.scss";
import "leaflet/dist/leaflet.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { useMemo, useState } from "react";
import { dark, light } from "../scss/MaterialTheme";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useApollo } from "@/apollo/client";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<"light" | "dark">("light");
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
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
          >
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </button>

          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </Provider>
  );
}
