import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Divider
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { LocationOn, AccessTime, Group } from '@mui/icons-material';

interface Game {
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

const FindTeamPage: React.FC = () => {
  const [city, setCity] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city || !date) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/games/search?city=${encodeURIComponent(city)}&date=${date.toISOString()}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error('Search error:', error);
      // You might want to show an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container>
        <Box sx={{ mt: 4, mb: 6 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: 'primary.main' }}>
            Find Your Team
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
            Search for games happening in your city
          </Typography>

          <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: 'background.paper' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter your city"
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <DatePicker
                  label="Date"
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSearch}
                  disabled={loading || !city || !date}
                  sx={{ height: '56px' }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Results Section */}
        <Box sx={{ mb: 4 }}>
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
                        {game.startTime ? format(new Date(game.startTime), 'HH:mm') : 'Time TBD'}
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
                      Join Game
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default FindTeamPage; 