import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Divider,
  Chip,
  TextField,
  InputAdornment,
  Avatar,
  Stack,
  Tooltip
} from '@mui/material';
import { Group, AccessTime, Search, SportsSoccer, EmojiEvents } from '@mui/icons-material';
import { format } from 'date-fns';
import { teamApi } from '../services/api';
import { Team } from '@teamer/shared';

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await teamApi.getAll();
        setTeams(teamsData);
      } catch (err) {
        setError('Failed to load teams. Please try again later.');
        console.error('Error fetching teams:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ color: 'primary.main' }}>
            Football Teams
          </Typography>
          <Button variant="contained" color="primary">
            Create New Team
          </Button>
        </Box>

        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 400 }}
          />
        </Box>

        <Grid container spacing={3}>
          {filteredTeams.map((team) => (
            <Grid item xs={12} sm={6} md={4} key={team.id}>
              <Card sx={{ 
                borderRadius: 2, 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}>
                <CardContent sx={{ flex: 1, p: 2, pb: '8px !important' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      sx={{ 
                        width: 56, 
                        height: 56, 
                        bgcolor: 'primary.main',
                        mr: 2
                      }}
                    >
                      <SportsSoccer />
                    </Avatar>
                    <Box>
                      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                        {team.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {team.members.length} members
                      </Typography>
                    </Box>
                  </Box>

                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {team.description || 'No description available'}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Tooltip title="Team Members">
                      <Chip
                        icon={<Group />}
                        label={`${team.members.length} members`}
                        size="small"
                        variant="outlined"
                      />
                    </Tooltip>
                    <Tooltip title="Created Date">
                      <Chip
                        icon={<AccessTime />}
                        label={format(new Date(team.createdAt), 'MMM d, yyyy')}
                        size="small"
                        variant="outlined"
                      />
                    </Tooltip>
                  </Stack>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Created by {team.createdBy}
                    </Typography>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ p: 1 }}>
                  <Button size="small" fullWidth variant="contained" color="primary">
                    Join Team
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

export default Teams; 