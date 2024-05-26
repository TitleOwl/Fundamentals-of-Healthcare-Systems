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
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#f5f5f5', paddingY: 4 }}>
      <Box sx={{ padding: '24px', bgcolor: 'rgba(255, 255, 255, 0.9)', borderRadius: 2, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', backdropFilter: 'blur(10px)', border: '1px solid #00e676', color: '#000', maxWidth: '800px', width: '100%' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#00e676' }}>
          View Patient JSON
        </Typography>
        <Box sx={{ whiteSpace: 'pre-wrap', backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '4px', textAlign: 'left', border: '1px solid #00e676' }}>
          <Typography variant="body1">
            {JSON.stringify(patient, null, 2)}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.history.back()}
          sx={{
            mt: 2,
            bgcolor: '#00e676',
            color: '#000',
            '&:hover': { bgcolor: '#00c764' },
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
            transition: 'all 0.3s ease',
            fontWeight: 'bold',
            borderRadius: 2,
            textTransform: 'none',
            padding: '8px 16px',
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default ViewJson;
