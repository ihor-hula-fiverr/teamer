import React from 'react';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShowcaseAnimation from '../components/showcase/ShowcaseAnimation';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      title: 'Find Teams',
      description: 'Discover local football teams and join the one that matches your skill level and schedule.',
      icon: '👥',
    },
    {
      title: 'Book Fields',
      description: 'Easily find and book football fields in your area with our simple booking system.',
      icon: '⚽',
    },
    {
      title: 'Organize Games',
      description: 'Create and manage games, invite players, and keep track of your team\'s schedule.',
      icon: '📅',
    },
    {
      title: 'Track Progress',
      description: 'Monitor your team\'s performance and celebrate victories.',
      icon: '📊',
    },
  ];

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        bgcolor: '#011627', // Dark blue background like Fiverr's
        color: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',          
          position: 'relative',
          pt: { xs: 8, md: 0 },
          pl: { xs: 3, sm: 4, md: 6 }, // Reduced left padding
          pr: { xs: 3, sm: 4 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(1, 22, 39, 0) 0%, #011627 70%)',
            zIndex: 1,
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <Grid container spacing={4} sx={{ margin: 0, width: '100%' }}>
            <Grid item xs={12} md={6} sx={{ pl: '0 !important' }}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#1dbf73',
                    mb: 2,
                    fontWeight: 500,
                  }}
                >
                  Teamer
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                    fontWeight: 700,
                    mb: 3,
                    lineHeight: 1.2,
                  }}
                >
                  Join a football team
                  <br />
                  in a few clicks
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    color: '#94A3B8',
                    maxWidth: 500,
                    fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' },
                  }}
                >
                  Find local teams, book fields, and organize games all in one place
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/teams')}
                    sx={{
                      bgcolor: '#1dbf73',
                      color: 'white',
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1.2, sm: 1.5 },
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      textTransform: 'none',
                      borderRadius: '4px',
                      '&:hover': {
                        bgcolor: '#18a164',
                      },
                    }}
                  >
                    Find Your Team
                  </Button>
                </Box>
                <Box 
                  sx={{ 
                    mt: 6, 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 1,
                    color: '#94A3B8',
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    ★★★★★ 4.8/5
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    from 120+ teams
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ pl: '0 !important' }}>
              <ShowcaseAnimation />
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Features Section */}
      <Box
        id="features"
        sx={{
          py: { xs: 8, md: 12 },
          px: { xs: 4, sm: 6, md: 8, lg: 12 },
          bgcolor: '#011627',
        }}
      >
        <Typography
          variant="h2"
          align="center"
          sx={{
            mb: 2,
            fontWeight: 700,
            color: 'white',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          }}
        >
          Why use Teamer
        </Typography>
        <Typography
          variant="h5"
          align="center"
          sx={{
            mb: 8,
            mx: 'auto',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
            maxWidth: { xs: '100%', md: '800px' },
          }}
        >
          Teamer is the easiest, fastest, and most reliable way to find a team or book a field. Here's why:
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    mb: 2,
                    fontSize: '2.5rem',
                    color: 'white',
                  }}
                >
                  {feature.icon}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: 'white',
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage; 