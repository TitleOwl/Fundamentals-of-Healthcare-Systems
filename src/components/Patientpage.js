import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PatientPage = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8080/fhir/Patient');
        setPatients(response.data.entry || []);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleEditClick = (patient) => {
    navigate('/update-patient', { state: { patient } });
  };

  const handleViewClick = (patient) => {
    navigate('/view-patient', { state: { patient } });
  };

  const handleJsonClick = (patient) => {
    navigate('/view-json', { state: { patient } });
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/fhir/Patient/${id}`);
      setPatients(patients.filter(patient => patient.resource.id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'rgba(0, 0, 0, 0.85)', minHeight: '100vh', color: '#ffffff' }}>
      <AppBar position="static" sx={{ bgcolor: 'rgba(0, 0, 0, 0.85)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}>
        <Toolbar>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              color: '#00e676',
              border: '1px solid #00e676',
              borderRadius: 2,
              padding: '8px 16px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#00e676',
                color: '#000',
                transform: 'scale(1.05)',
              },
            }}
          >
            Back
          </Button>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', color: '#00e676' }}>
            Patient Management
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/create-patient"
            sx={{
              ml: 'auto',
              color: '#00e676',
              border: '1px solid #00e676',
              borderRadius: 2,
              padding: '8px 16px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#00e676',
                color: '#000',
                transform: 'scale(1.05)',
              },
            }}
          >
            Create Patient
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4, bgcolor: 'rgba(0, 0, 0, 0.7)', borderRadius: 2, p: 4, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(10px)', border: '1px solid #00e676' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#00e676' }}>
          All Patients
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: '#ffffff' }}>
          Use the navigation bar to create, update, or delete.
        </Typography>
        <List>
          {patients.map((entry) => (
            entry.resource && entry.resource.name && entry.resource.name[0] && (
              <div key={entry.resource.id}>
                <ListItem sx={{ bgcolor: 'rgba(0, 0, 0, 0.6)', borderRadius: 2, mb: 2 }}>
                  <ListItemText
                    primary={`${entry.resource.name[0].family}, ${entry.resource.name[0].given.join(' ')}`}
                    secondary={`ID: ${entry.resource.id}`}
                    primaryTypographyProps={{ color: '#ffffff' }}
                    secondaryTypographyProps={{ color: '#aaaaaa' }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#00e676',
                      color: '#000',
                      mr: 2,
                      '&:hover': { bgcolor: '#00c764' },
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                      transition: 'all 0.3s ease',
                      fontWeight: 'bold',
                      borderRadius: 2,
                      textTransform: 'none'
                    }}
                    onClick={() => handleViewClick(entry.resource)}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#1976d2',
                      color: '#fff',
                      mr: 2,
                      '&:hover': { bgcolor: '#1565c0' },
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                      transition: 'all 0.3s ease',
                      fontWeight: 'bold',
                      borderRadius: 2,
                      textTransform: 'none'
                    }}
                    onClick={() => handleEditClick(entry.resource)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#d32f2f',
                      color: '#fff',
                      mr: 2,
                      '&:hover': { bgcolor: '#c62828' },
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                      transition: 'all 0.3s ease',
                      fontWeight: 'bold',
                      borderRadius: 2,
                      textTransform: 'none'
                    }}
                    onClick={() => handleDeleteClick(entry.resource.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#ffb74d',
                      color: '#000',
                      '&:hover': { bgcolor: '#ff9800' },
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                      transition: 'all 0.3s ease',
                      fontWeight: 'bold',
                      borderRadius: 2,
                      textTransform: 'none'
                    }}
                    onClick={() => handleJsonClick(entry.resource)}
                  >
                    JSON
                  </Button>
                </ListItem>
                <Divider sx={{ bgcolor: '#00e676' }} />
              </div>
            )
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default PatientPage;
