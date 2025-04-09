import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { Game } from '@teamer/shared';

const Games: React.FC = () => {
  const games: Game[] = [
    {
      id: '1',
      date: new Date(),
      fieldId: 'field1',
      teamAId: 'team1',
      teamBId: 'team2',
      startTime: new Date(),
      endTime: new Date(),
      status: 'scheduled',
      score: { teamA: 0, teamB: 0 }
    },
    {
      id: '2',
      date: new Date(),
      fieldId: 'field2',
      teamAId: 'team3',
      teamBId: 'team4',
      startTime: new Date(),
      endTime: new Date(),
      status: 'scheduled',
      score: { teamA: 0, teamB: 0 }
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Games
      </Typography>
      <Grid container spacing={3}>
        {games.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Game {game.id}
                </Typography>
                <Typography variant="body1">
                  Date: {game.date.toLocaleDateString()}
                </Typography>
                <Typography variant="body1">
                  Time: {game.startTime?.toLocaleTimeString()} - {game.endTime?.toLocaleTimeString()}
                </Typography>
                <Typography variant="body1">
                  Status: {game.status}
                </Typography>
                <Typography variant="body1">
                  Score: {game.score?.teamA} - {game.score?.teamB}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Games; 