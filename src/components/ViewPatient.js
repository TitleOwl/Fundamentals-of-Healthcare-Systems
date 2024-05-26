import React from 'react';
import { Typography, Box, Button, Grid, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';

const ViewPatient = () => {
  const location = useLocation();
  const { patient } = location.state || {};

  if (!patient) {
    return <Typography variant="h6">No patient data available</Typography>;
  }

  const { name, gender, birthDate, address, telecom, id } = patient;
  const fullName = name ? `${name[0].given.join(' ')} ${name[0].family}` : 'N/A';

  return (
    <Box
      sx={{
        padding: '24px',
        width: '100vw',
        height: '100vh',
        bgcolor: 'rgba(0, 0, 0, 0.85)',
        color: '#ffffff',
        borderRadius: 2,
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)',
        border: '1px solid #00e676',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'left', color: '#00e676', width: '100%', maxWidth: '1100px' }}>
        Patient Observation
      </Typography>
      <Box
        sx={{
          height: 2,
          backgroundColor: '#00e676',
          width: '100%',
          maxWidth: '1100px',
          marginY: '20px'
        }}
      />
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'left', paddingTop: '20px', color: '#00e676', width: '100%', maxWidth: '1100px' }}>
        Patient Basic Information
      </Typography>
      <Paper sx={{ padding: '24px', marginTop: '20px', bgcolor: 'rgba(0, 0, 0, 0.7)', borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', color: '#ffffff', width: '100%', maxWidth: '1100px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" gutterBottom>
              <strong>Name:</strong> {fullName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" gutterBottom>
              <strong>ID:</strong> {id}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" gutterBottom>
              <strong>Gender:</strong> {gender || 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" gutterBottom>
              <strong>Birth Date:</strong> {birthDate || 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" gutterBottom>
              <strong>Address:</strong> {address ? `${address[0].line[0]}, ${address[0].city}, ${address[0].state}, ${address[0].postalCode}, ${address[0].country}` : 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" gutterBottom>
              <strong>Phone:</strong> {telecom && telecom.find(t => t.system === 'phone') ? telecom.find(t => t.system === 'phone').value : 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {telecom && telecom.find(t => t.system === 'email') ? telecom.find(t => t.system === 'email').value : 'N/A'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Button
        variant="contained"
        onClick={() => window.history.back()}
        sx={{
          marginTop: '16px',
          backgroundColor: '#00e676',
          color: '#000',
          '&:hover': {
            backgroundColor: '#00c764',
            transform: 'scale(1.05)'
          },
          transition: 'all 0.3s ease',
          fontWeight: 'bold'
        }}
      >
        Back
      </Button>
    </Box>
  );
};

export default ViewPatient;
