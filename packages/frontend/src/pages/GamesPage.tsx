import React from 'react';
import { Container, Typography } from '@mui/material';

const GamesPage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Games
      </Typography>
      <Typography variant="body1">
        Games list coming soon...
      </Typography>
    </Container>
  );
};

export default GamesPage; 