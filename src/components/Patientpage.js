import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CodeIcon from '@mui/icons-material/Code';
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
    success: {
      main: '#2e7d32', // Green
    },
    error: {
      main: '#d32f2f', // Red
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default', p: 3 }}>
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              Back
            </Button>
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
              Patient Management
            </Typography>
            <Button color="inherit" component={Link} to="/create-patient" sx={{ ml: 'auto' }}>
              Create Patient
            </Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            All Patients
          </Typography>
          <Typography variant="body1" gutterBottom>
            Use the navigation bar to create, update, or delete.
          </Typography>
          <List>
            {patients.map((entry) => (
              <div key={entry.resource.id}>
                <ListItem>
                  {entry.resource.name && entry.resource.name[0] && // เพิ่มเงื่อนไขนี้เพื่อตรวจสอบว่ามีข้อมูลในอาเรย์หรือไม่
                    <ListItemText
                      primary={`${entry.resource.name[0].family}, ${entry.resource.name[0].given.join(' ')}`}
                      secondary={`ID: ${entry.resource.id}`}
                    />
                  }
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<VisibilityIcon />}
                    sx={{ mr: 2 }}
                    onClick={() => handleViewClick(entry.resource)}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    sx={{ mr: 2 }}
                    onClick={() => handleEditClick(entry.resource)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    sx={{ mr: 2 }}
                    onClick={() => handleDeleteClick(entry.resource.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<CodeIcon />}
                    onClick={() => handleJsonClick(entry.resource)}
                  >
                    JSON
                  </Button>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default PatientPage;
