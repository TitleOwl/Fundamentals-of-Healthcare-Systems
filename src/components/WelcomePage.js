import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundImage: 'url(https://img5.pic.in.th/file/secure-sv1/31bd2b3e2075947b7e5522abc5338241.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        m: 0,
        p: 0,
      }}
    >
      <AppBar position="static" sx={{ bgcolor: 'rgba(0, 0, 0, 0.85)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', width: '100%' }}>
        <Toolbar sx={{ minHeight: 80 }}>
          <Box component="img" src="https://img5.pic.in.th/file/secure-sv1/logo-removebg-previewccdeb62443628e2b.png" alt="FormFeiw Hospital 2 Logo" sx={{ height: 60, mr: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 2, color: '#00e676', animation: 'fadeIn 2s' }}>
            FormFeiw Hospital 1
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            color="inherit"
            component={Link}
            to="/patients"
            sx={{
              fontWeight: 'bold',
              color: '#00e676',
              border: '1px solid #00e676',
              borderRadius: 2,
              padding: '8px 16px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#00e676',
                color: '#000',
                transform: 'scale(1.1)',
              },
            }}
          >
            Patients
          </Button>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          mt: 4,
          bgcolor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: 2,
          p: 4,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
          maxWidth: '1100px',
          textAlign: 'center',
          color: '#00e676',
          backdropFilter: 'blur(10px)',
          border: '1px solid #00e676',
          animation: 'slideIn 1.5s',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              component="img"
              src="https://img5.pic.in.th/file/secure-sv1/Doctorrr.png"
              alt="Doctor"
              sx={{
                width: '80%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                transform: 'scale(1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom sx={{ animation: 'fadeInUp 1.5s' }}>
              Welcome to the FormFeiw Hospital 1
            </Typography>
            <Typography variant="body1" sx={{ animation: 'fadeInUp 2s' }}>
              Use the navigation bar to manage patients.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ color: '#00e676' }}>Contact Information</Typography>
              <Typography variant="body1">Phone: 0981-123-1234</Typography>
              <Typography variant="body1">Email: GrayPasin@Hospital.com</Typography>
              <Typography variant="body1">Address: 123 Hospital St, Health City</Typography>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ color: '#00e676' }}>Operating Hours</Typography>
              <Typography variant="body1">Monday - Friday: 8:00 AM - 9:00 AM</Typography>
              <Typography variant="body1">Saturday: 9:00 AM - 10:00 AM</Typography>
              <Typography variant="body1">Sunday: Closed</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
};

export default WelcomePage;
