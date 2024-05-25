import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';

const ViewPatient = () => {
  const location = useLocation();
  const { patient } = location.state || {};

  if (!patient) {
    return <Typography variant="h6">No patient data available</Typography>;
  }

  const { name, gender, birthDate, address, telecom, id } = patient;

  return (
    <Box sx={{ marginLeft: '240px', padding: '24px' }}>
      <Typography variant="h4" gutterBottom>
        View Patient
      </Typography>
      <Box>
        <Typography variant="body1" gutterBottom>
          First Name: {name ? name[0].given.join(' ') : 'N/A'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Last Name: {name ? name[0].family : 'N/A'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Gender: {gender || 'N/A'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Birth Date: {birthDate || 'N/A'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Address: {address ? `${address[0].line[0]}, ${address[0].city}, ${address[0].state}, ${address[0].postalCode}, ${address[0].country}` : 'N/A'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Phone: {telecom && telecom.find(t => t.system === 'phone') ? telecom.find(t => t.system === 'phone').value : 'N/A'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Email: {telecom && telecom.find(t => t.system === 'email') ? telecom.find(t => t.system === 'email').value : 'N/A'}
        </Typography>
        <Typography variant="body1" gutterBottom>
          ID: {id}
        </Typography>
      </Box>
      <Button variant="contained" color="primary" onClick={() => window.history.back()}>
        Back
      </Button>
    </Box>
  );
};

export default ViewPatient;
