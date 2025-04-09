import React from 'react';
import { Container, Typography } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Teamer
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Find and join football teams, book fields, and organize games
      </Typography>
    </Container>
  );
};

export default HomePage; 