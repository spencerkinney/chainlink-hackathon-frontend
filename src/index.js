import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, withDefaultColorScheme } from "@chakra-ui/react";
import App from "./App";
import { extendTheme } from "@chakra-ui/react";
import { enforceHTTPS } from "./https";

const theme = extendTheme({
  config: { initialColorMode: "dark", useSystemColorMode: false },
});

const customTheme = extendTheme(
  theme,
  withDefaultColorScheme({ colorScheme: "gray" })
);

enforceHTTPS();

const root = createRoot(document.getElementById("root"));

root.render(
  <ChakraProvider theme={customTheme}>
    <App />
  </ChakraProvider>
);