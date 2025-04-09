import React, { useEffect } from 'react';
import { Box, Typography, Paper, Avatar, Container, Grid, Divider } from '@mui/material';
import { Person as PersonIcon, Email as EmailIcon, CalendarToday as CalendarIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log('Current user data:', user); // Debug log
  }, [user]);

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          Please log in to view your profile
        </Typography>
      </Container>
    );
  }

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'Not available';
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          {/* Profile Header */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: 'primary.main',
                mb: 2,
              }}
            >
              {user.name ? (
                <Typography variant="h3" sx={{ color: 'white' }}>
                  {user.name.charAt(0).toUpperCase()}
                </Typography>
              ) : (
                <PersonIcon sx={{ fontSize: 60 }} />
              )}
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main' }}>
              {user.name || 'No name provided'}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* User Details */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon sx={{ mr: 2, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">
                    {user.email || 'No email provided'}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarIcon sx={{ mr: 2, color: 'text.secondary' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Member Since
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(user.createdAt)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfilePage; 