import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4a148c', // Deep Purple
    },
    background: {
      default: '#f3e5f5', // Light lavender background
    },
  },
  typography: {
    fontFamily: 'Georgia, serif',
    h4: {
      color: '#4a148c',
    },
    body1: {
      color: '#000000',
    },
  },
});

const ViewJson = () => {
  const location = useLocation();
  const { patient } = location.state || {};

  if (!patient) {
    return <Typography variant="h6">No patient data available</Typography>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: '24px',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Typography variant="h4" gutterBottom>
          View Patient JSON
        </Typography>
        <Box
          sx={{
            whiteSpace: 'pre-wrap',
            backgroundColor: '#f5f5f5',
            padding: '16px',
            borderRadius: '4px',
            textAlign: 'left',
            width: '100%',
            maxWidth: '600px', // Limiting width for better readability
            overflow: 'auto', // Add scrollbar if content exceeds maxWidth
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#4a148c',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#380d6b',
            },
          }}
        >
          <Typography variant="body1">{JSON.stringify(patient, null, 2)}</Typography>
        </Box>
        <Button variant="contained" color="primary" onClick={() => window.history.back()} sx={{ mt: 2 }}>
          Back
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default ViewJson;
