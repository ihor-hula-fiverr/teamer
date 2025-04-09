import React from 'react';
import { Container, Typography } from '@mui/material';

const ProfilePage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Profile
      </Typography>
      <Typography variant="body1">
        Profile details coming soon...
      </Typography>
    </Container>
  );
};

export default ProfilePage; 