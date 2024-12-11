// src/theme.js

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Importing CSS for Plus Jakarta Sans is handled in main.jsx via @fontsource

// Create a base theme instance
let theme = createTheme({
  // **Palette Configuration**
  palette: {
    primary: {
      main: '#1976d2', // Customize your primary color
    },
    secondary: {
      main: '#dc004e', // Customize your secondary color
    },
    error: {
      main: red.A400, // Material UI's predefined red color for errors
    },
    background: {
      default: '#f5f5f5', // Light grey background
    },
    // Add more palette customizations as needed
  },

  // **Typography Configuration**
  typography: {
    // **Default Font Family**
    fontFamily: '"Plus Jakarta Sans", "Helvetica Neue", Arial, sans-serif',

    // **Font Sizes and Weights**
    h1: {
      fontWeight: 700, // Bold
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700, // Bold
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 500, // Medium
      fontSize: '1.75rem',
      lineHeight: 1.4,
      letterSpacing: '0em',
    },
    h4: {
      fontWeight: 500, // Medium
      fontSize: '1.5rem',
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    h5: {
      fontWeight: 400, // Regular
      fontSize: '1.25rem',
      lineHeight: 1.6,
      letterSpacing: '0.02em',
    },
    h6: {
      fontWeight: 400, // Regular
      fontSize: '1rem',
      lineHeight: 1.7,
      letterSpacing: '0.03em',
    },
    body1: {
      fontWeight: 400, // Regular
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.01em',
    },
    body2: {
      fontWeight: 400, // Regular
      fontSize: '0.875rem',
      lineHeight: 1.43,
      letterSpacing: '0.02em',
    },
    button: {
      fontWeight: 500, // Medium
      fontSize: '0.875rem',
      lineHeight: 1.75,
      letterSpacing: '0.1em',
      textTransform: 'uppercase', // You can set to 'none' if preferred
    },
    caption: {
      fontWeight: 400, // Regular
      fontSize: '0.75rem',
      lineHeight: 1.66,
      letterSpacing: '0.04em',
    },
    overline: {
      fontWeight: 400, // Regular
      fontSize: '0.75rem',
      lineHeight: 2.66,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    // Add more typography variants as needed
  },

  // **Component Overrides and Variants**
  components: {
    // **MuiButton Customization**
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded corners
          textTransform: 'none', // Disable uppercase transformation if desired
          padding: '8px 16px',
        },
        containedPrimary: {
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#115293',
          },
        },
        // Add more button variant customizations
      },
    },

    // **MuiTypography Customization**
    MuiTypography: {
      styleOverrides: {
        root: {
          // You can add global styles for Typography components here
        },
      },
    },

    // **MuiAppBar Customization**
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#1976d2',
        },
      },
    },

    // **Add more component customizations as needed**
  },

  // **Spacing Configuration**
  spacing: 8, // Default spacing is 8px, you can customize it

  // **Shape Configuration**
  shape: {
    borderRadius: 8, // Default border radius
  },

  // **Other Theme Customizations**
  // Add any other custom theme configurations here
});

// **Enable Responsive Typography**
theme = responsiveFontSizes(theme);

export default theme;
