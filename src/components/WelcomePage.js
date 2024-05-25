import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, CssBaseline } from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4a148c', // Deep Purple for a luxurious look
    },
    secondary: {
      main: '#ffab00', // Gold accent
    },
    background: {
      default: '#f3e5f5', // Light lavender background
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontFamily: 'Georgia, serif',
      color: '#4a148c',
    },
    body1: {
      fontFamily: 'Georgia, serif',
      color: '#6a1b9a',
    },
    button: {
      fontFamily: 'Georgia, serif',
      color: '#ffffff',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#4a148c',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '20px',
          padding: '10px 20px',
          margin: '0 10px',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

const WelcomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              FormFeiw Hospital 1
            </Typography>
            <Button color="inherit" component={Link} to="/patients" variant="outlined">
              Patients
            </Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Welcome to FormFeiw Hospital 1
          </Typography>
          <Typography variant="body1">
            Use the navigation bar to manage patients.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default WelcomePage;
