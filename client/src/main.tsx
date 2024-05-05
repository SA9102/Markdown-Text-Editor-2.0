import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// Joy UI
import { CssVarsProvider, Sheet } from '@mui/joy';

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <CssVarsProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </CssVarsProvider>
    // </React.StrictMode>,
);
