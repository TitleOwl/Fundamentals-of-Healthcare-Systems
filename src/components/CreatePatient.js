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
      onPatientAdded(); // เรียก callback เพื่ออัปเดตรายการผู้ป่วย
      setStatus('Patient created successfully.');
      navigate('/patients');
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#f5f5f5', paddingY: 4 }}>
      <Box sx={{ padding: '24px', bgcolor: 'rgba(255, 255, 255, 0.9)', borderRadius: 2, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', backdropFilter: 'blur(10px)', border: '1px solid #00e676', color: '#000', maxWidth: '800px', width: '100%' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#00e676' }}>
          เพิ่มผู้ป่วยใหม่
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="นามสกุล"
            value={family}
            onChange={(e) => setFamily(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="ชื่อ"
            value={given}
            onChange={(e) => setGiven(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>เพศ</InputLabel>
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label="เพศ"
            >
              <MenuItem value="male">ชาย</MenuItem>
              <MenuItem value="female">หญิง</MenuItem>
              <MenuItem value="other">อื่นๆ</MenuItem>
              <MenuItem value="unknown">ไม่ทราบ</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="วันเกิด"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="ที่อยู่"
            value={line}
            onChange={(e) => setLine(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="เมือง"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="รัฐ/จังหวัด"
            value={state}
            onChange={(e) => setState(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="รหัสไปรษณีย์"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="ประเทศ"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="โทรศัพท์"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="อีเมล"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
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
            สร้างผู้ป่วย
          </Button>
          {status && <Typography variant="body1" color={status.includes('successfully') ? 'green' : 'red'}>{status}</Typography>}
        </form>
      </Box>
    </Box>
  );
};

export default CreatePatient;
