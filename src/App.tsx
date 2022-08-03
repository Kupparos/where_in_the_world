import React from "react";
import "./App.css";
import { useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { HeaderAction } from "./components/HeaderAction";
import Home from "./pages/Home";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <HeaderAction />
        <div className="app">
          <div className="container">
            <Home/>
          </div>
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
