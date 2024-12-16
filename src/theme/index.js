import { createTheme } from '@mui/material/styles';

const baseTheme = {
  palette: {
    primary: {
      light: '#588157',
      main: '#2c5530',
      dark: '#1b4332',
    },
    secondary: {
      light: '#a3b899',
      main: '#88a878',
      dark: '#6b8864',
    },
    background: {
      default: '#fafafa',
      paper: 'rgba(255, 255, 255, 0.9)',
    },
    text: {
      primary: '#2c5530',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: "'Noto Serif SC', serif",
    h1: {
      fontWeight: 500,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontWeight: 500,
      letterSpacing: '-0.00833em',
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.8,
      letterSpacing: '0.00938em',
    },
    body2: {
      lineHeight: 1.6,
      letterSpacing: '0.00714em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  transitions: {
    easing: {
      sharp: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
};

export const theme = createTheme({
  ...baseTheme,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            borderRadius: '3px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
  },
});
