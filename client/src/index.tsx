import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.js";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

// Mantine
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider, createTheme, virtualColor } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

axios.defaults.withCredentials = true;

const theme = createTheme({
  // colors: {
  //   primary: virtualColor({
  //     name: 'primary',
  //     light: 'indigo',
  //     dark: 'orange',
  //   }),
  // },
  defaultRadius: "md",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <MantineProvider defaultColorScheme="dark" theme={theme}>
    <BrowserRouter>
      <Notifications />
      <App />
    </BrowserRouter>
  </MantineProvider>
  // </React.StrictMode>
);
