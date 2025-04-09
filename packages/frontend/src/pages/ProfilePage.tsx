import React from 'react';
import { Box, Typography, Paper, Avatar, Container } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          Please log in to view your profile
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: 'secondary.main',
                mb: 2,
              }}
            >
              <PersonIcon sx={{ fontSize: 50 }} />
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfilePage; 