import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import {
  SportsScore,
  Group,
  Place,
  CalendarMonth,
  Search,
  EmojiEvents,
} from '@mui/icons-material';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
      <Box sx={{ color: 'primary.main', mb: 2 }}>
        {React.cloneElement(icon as React.ReactElement, { sx: { fontSize: 40 } })}
      </Box>
      <Typography variant="h6" component="h3" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const HomePage: React.FC = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <Search />,
      title: 'Find Teams',
      description: 'Discover local football teams that match your skill level and schedule.',
    },
    {
      icon: <Group />,
      title: 'Join Teams',
      description: 'Connect with teams and players in your area and start playing.',
    },
    {
      icon: <Place />,
      title: 'Book Fields',
      description: 'Find and book available football fields for your games and practice.',
    },
    {
      icon: <SportsScore />,
      title: 'Organize Games',
      description: 'Create and manage games, invite players, and track scores.',
    },
    {
      icon: <CalendarMonth />,
      title: 'Schedule Matches',
      description: 'Plan your games and keep track of upcoming matches.',
    },
    {
      icon: <EmojiEvents />,
      title: 'Track Progress',
      description: "Monitor your team's performance and celebrate victories.",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          pt: { xs: 8, sm: 12 },
          pb: { xs: 8, sm: 12 },
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Find Your Perfect Football Team
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                }}
              >
                Connect with local teams, book fields, and organize games all in one place.
              </Typography>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                  mr: 2,
                }}
              >
                Get Started
              </Button>
              <Button
                component={RouterLink}
                to="/teams"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'grey.100',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Browse Teams
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/hero-image.svg"
                alt="Football players"
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  height: 'auto',
                  display: 'block',
                  margin: '0 auto',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          sx={{ mb: 6, fontWeight: 700 }}
        >
          Everything You Need
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Paper
            sx={{
              p: { xs: 3, md: 6 },
              textAlign: 'center',
              bgcolor: 'white',
              borderRadius: 4,
            }}
          >
            <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 700 }}>
              Ready to Join?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary' }}>
              Start your journey with Teamer today
            </Typography>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              size="large"
              sx={{ minWidth: 200 }}
            >
              Sign Up Now
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 