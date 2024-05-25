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
    <Box sx={{ padding: '24px', width: '95%' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'left' }}>
        Patient Observation
      </Typography>
      <Box
        sx={{
          height: 2,
          backgroundColor: 'black',
          width: '100%',
          marginY: '20px'
        }}
      />
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'left', paddingTop: '20px' }}>
        Patient Basic Information
      </Typography>
      <Paper sx={{ padding: '16px', marginTop: '20px' }}>
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
        sx={{ marginTop: '16px', backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
      >
        Back
      </Button>
    </Box>
  );
};

export default ViewPatient;
