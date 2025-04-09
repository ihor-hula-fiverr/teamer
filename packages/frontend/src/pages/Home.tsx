import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Teamer
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Find football teams, book fields, and organize games in your city
      </Typography>
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
        <Grid item>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/teams')}
          >
            Find Teams
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/fields')}
          >
            Book Fields
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home; 