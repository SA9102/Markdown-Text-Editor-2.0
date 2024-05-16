import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.js';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

// Mantine
import '@mantine/core/styles.css';
import { MantineProvider, createTheme, virtualColor } from '@mantine/core';

axios.defaults.withCredentials = true;

const theme = createTheme({
  colors: {
    primary: virtualColor({
      name: 'primary',
      light: 'indigo',
      dark: 'orange',
    }),
  },
  defaultRadius: 'sm',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <MantineProvider defaultColorScheme="dark" theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MantineProvider>
  // </React.StrictMode>
);
