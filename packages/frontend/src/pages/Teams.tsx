import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardActions } from '@mui/material';
import { Team } from '@teamer/shared';

const Teams: React.FC = () => {
  // This would be replaced with actual data from the backend
  const teams: Team[] = [
    {
      id: '1',
      name: 'Local Legends',
      description: 'A friendly team looking for new members',
      members: [],
      createdBy: 'user1',
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Weekend Warriors',
      description: 'Casual football on weekends',
      members: [],
      createdBy: 'user2',
      createdAt: new Date(),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Football Teams
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 4 }}>
        Create New Team
      </Button>
      <Grid container spacing={3}>
        {teams.map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {team.name}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {team.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
                <Button size="small" color="primary">
                  Join Team
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Teams; 