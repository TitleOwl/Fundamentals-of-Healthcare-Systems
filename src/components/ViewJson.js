import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';

const ViewJson = () => {
  const location = useLocation();
  const { patient } = location.state || {};

  if (!patient) {
    return <Typography variant="h6">No patient data available</Typography>;
  }

  return (
    <Box sx={{ marginLeft: '240px', padding: '24px' }}>
      <Typography variant="h4" gutterBottom>
        View Patient JSON
      </Typography>
      <Box sx={{ whiteSpace: 'pre-wrap', backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '4px', textAlign:'left' }}>
        <Typography variant="body1">
          {JSON.stringify(patient, null, 2)}
        </Typography>
      </Box>
      <Button variant="contained" color="primary" onClick={() => window.history.back()} sx={{ mt: 2 }}>
        Back
      </Button>
    </Box>
  );
};

export default ViewJson;
