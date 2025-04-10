import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Divider
} from '@mui/material';
import { LocationOn, AccessTime, Group } from '@mui/icons-material';
import { format } from 'date-fns';
import { gameApi } from '../services/api';

interface GameResponse {
  id: string;
  field: {
    id: string;
    name: string;
    location: string;
    capacity: number;
    pricePerHour?: number;
    imageUrl?: string;
  };
  teamA: {
    id: string;
    name: string;
  };
  teamB: {
    id: string;
    name: string;
  };
  date: string;
  startTime?: string;
  endTime?: string;
  status: string;
}

const GamesPage: React.FC = () => {
  const [games, setGames] = useState<GameResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/games');
        if (!response.ok) {
          throw new Error('Failed to fetch games');
        }
        const gamesData = await response.json() as GameResponse[];
        setGames(gamesData);
      } catch (err) {
        setError('Failed to load games. Please try again later.');
        console.error('Error fetching games:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: 'primary.main' }}>
          Upcoming Games
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
          Browse all scheduled games
        </Typography>

        <Grid container spacing={3}>
          {games.map((game) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={game.id}>
              <Card sx={{ borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', maxWidth: 300, mx: 'auto' }}>
                <CardContent sx={{ flex: 1, p: 2, pb: '8px !important' }}>
                  <Box sx={{ position: 'relative', paddingTop: '100%', mb: 1.5 }}>
                    <Box
                      component="img"
                      src={game.field.imageUrl || `/assets/images/fields/${game.field.id}.jpg`}
                      alt="Football field"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/assets/images/default-field.jpg';
                        target.onerror = null;
                      }}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 1
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                        height: '50%',
                        borderRadius: 1
                      }}
                    />
                  </Box>
                  <Typography variant="subtitle1" gutterBottom noWrap sx={{ fontWeight: 'bold' }}>
                    {game.field.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOn sx={{ mr: 1, color: 'text.secondary', fontSize: '1rem' }} />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {game.field.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AccessTime sx={{ mr: 1, color: 'text.secondary', fontSize: '1rem' }} />
                    <Typography variant="body2" color="text.secondary">
                      {format(new Date(game.date), 'MMM d, yyyy')} • {game.startTime ? format(new Date(game.startTime), 'HH:mm') : 'Time TBD'}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" noWrap sx={{ flex: 1 }}>{game.teamA.name}</Typography>
                      <Typography variant="caption" sx={{ mx: 1, color: 'text.secondary' }}>vs</Typography>
                      <Typography variant="body2" noWrap sx={{ flex: 1 }}>{game.teamB.name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Group sx={{ mr: 0.5, color: 'text.secondary', fontSize: '0.875rem' }} />
                      <Typography variant="caption" color="text.secondary">
                        {game.field.capacity} players
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ p: 1 }}>
                  <Button size="small" fullWidth variant="contained" color="primary">
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default GamesPage; 