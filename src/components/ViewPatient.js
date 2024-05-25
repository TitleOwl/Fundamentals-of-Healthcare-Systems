import React from 'react';
import { Typography, Box, Button, Grid, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4a148c', // Deep Purple
    },
    secondary: {
      main: '#ffab00', // Gold
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
      color: '#6a1b9a',
    },
    button: {
      color: '#ffffff',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '16px',
          marginTop: '20px',
          borderRadius: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
          backgroundColor: '#4a148c',
          '&:hover': {
            backgroundColor: '#380d6b',
          },
        },
      },
    },
  },
});

const ViewPatient = () => {
  const location = useLocation();
  const { patient } = location.state || {};

  if (!patient) {
    return <Typography variant="h6">No patient data available</Typography>;
  }

  const { name, gender, birthDate, address, telecom, id } = patient;
const fullName = name ? `${name[0].family} ${name[0].given.join(' ')}` : 'N/A';


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ padding: '24px', width: '95%', bgcolor: 'background.default' }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'left' }}>
          Patient Observation
        </Typography>
        <Box sx={{ height: 2, backgroundColor: 'black', width: '100%', marginY: '20px' }} />
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'left', paddingTop: '20px' }}>
          Patient Basic Information
        </Typography>
        <Paper>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body1" gutterBottom>
                <strong>Name:</strong> {fullName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body1" gutterBottom>
                <strong>ID:</strong> {id}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body1" gutterBottom>
                <strong>Gender:</strong> {gender || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body1" gutterBottom>
                <strong>Birth Date:</strong> {birthDate || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body1" gutterBottom>
                <strong>Address:</strong> {address ? `${address[0].line[0]}, ${address[0].city}, ${address[0].state}, ${address[0].postalCode}, ${address[0].country}` : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body1" gutterBottom>
                <strong>Phone:</strong> {telecom && telecom.find(t => t.system === 'phone') ? telecom.find(t => t.system === 'phone').value : 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {telecom && telecom.find(t => t.system === 'email') ? telecom.find(t => t.system === 'email').value : 'N/A'}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.history.back()}
          sx={{ marginTop: '16px' }}
        >
          Back
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default ViewPatient;
