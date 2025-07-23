// src/theme.js
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6', // A nice blue
    },
    background: {
      default: '#111827', // Very dark blue
      paper: '#1f2937', // Dark blue-gray
    },
    text: {
      primary: '#f3f4f6', // Light gray
      secondary: '#9ca3af', // Medium gray
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h5: {
      fontWeight: 700,
    },
  },
});