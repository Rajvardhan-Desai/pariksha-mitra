
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

// Import Plus Jakarta Sans font with desired weights
import '@fontsource/plus-jakarta-sans/300.css'; // Light
import '@fontsource/plus-jakarta-sans/400.css'; // Regular
import '@fontsource/plus-jakarta-sans/500.css'; // Medium
import '@fontsource/plus-jakarta-sans/700.css'; // Bold

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
