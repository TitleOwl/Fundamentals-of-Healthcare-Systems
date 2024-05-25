import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
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

const CreatePatient = ({ onPatientAdded }) => {
  const navigate = useNavigate();
  const [family, setFamily] = useState('');
  const [given, setGiven] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [line, setLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientData = {
      resourceType: 'Patient',
      name: [
        {
          family,
          given: given.split(' '),
        },
      ],
      gender,
      birthDate,
      address: [
        {
          use: 'home',
          line: [line],
          city,
          state,
          postalCode,
          country,
        },
      ],
      telecom: [
        {
          system: 'phone',
          value: phone,
          use: 'home',
        },
        {
          system: 'email',
          value: email,
          use: 'home',
        },
      ],
    };

    try {
      const response = await axios.post('http://localhost:8080/fhir/Patient', patientData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Add Patient:', JSON.stringify(response.data, null, 2));
      onPatientAdded(); // Call callback to update patient list
      setStatus('Patient created successfully.');
      navigate('/patients');
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box
          sx={{
            height: 'fit-content',
            width: '80%',
            maxWidth: '800px',
            padding: '24px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ marginTop: '80px' }}>
            Add Patient
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Firstname"
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Lastname"
              value={given}
              onChange={(e) => setGiven(e.target.value)}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Gender</InputLabel>
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                label="Gender"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Birth Date"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Address"
              value={line}
              onChange={(e) => setLine(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Province"
              value={state}
              onChange={(e) => setState(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Postcode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '24px' }}>
              Create Patient
            </Button>
            {status && (
              <Typography variant="body1" color={status.includes('successfully') ? 'green' : 'red'} sx={{ marginTop: '16px' }}>
                {status}
              </Typography>
            )}
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CreatePatient;
