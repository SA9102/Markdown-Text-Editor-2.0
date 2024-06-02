import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./components/App.js";
import App from "./App.js";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

// Mantine
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider, Tooltip, createTheme, virtualColor } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "./index.css";

axios.defaults.withCredentials = true;

const theme = createTheme({
  // colors: {
  //   primary: virtualColor({
  //     name: 'primary',
  //     light: 'indigo',
  //     dark: 'orange',
  //   }),
  // },
  components: {
    Tooltip: Tooltip.extend({
      defaultProps: {
        withArrow: true,
        openDelay: 600,
      },
    }),
  },
  defaultRadius: "md",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <MantineProvider defaultColorScheme="auto" theme={theme}>
    {/* <BrowserRouter> */}
    <Notifications />
    <App />
    {/* </BrowserRouter> */}
  </MantineProvider>
  // </React.StrictMode>
);
