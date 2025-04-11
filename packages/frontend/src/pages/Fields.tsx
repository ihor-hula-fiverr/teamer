import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, CardMedia, Chip, Button } from '@mui/material';
import { Field } from '@teamer/shared';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupIcon from '@mui/icons-material/Group';
import StraightenIcon from '@mui/icons-material/Straighten';

const Fields: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/fields');
        if (!response.ok) {
          throw new Error('Failed to fetch fields');
        }
        const data = await response.json();
        setFields(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading fields...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Football Fields in Kyiv
      </Typography>
      <Grid container spacing={3}>
        {fields.map((field) => (
          <Grid item xs={12} sm={6} md={4} key={field.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={field.imageUrl || 'https://via.placeholder.com/400x200?text=No+Image'}
                alt={field.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {field.name}
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOnIcon sx={{ mr: 1 }} />
                    {field.district}, {field.address}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AttachMoneyIcon sx={{ mr: 1 }} />
                    {field.priceFrom} - {field.priceTo} UAH/hour
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <GroupIcon sx={{ mr: 1 }} />
                    Up to {field.maxPlayersCount} players
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <StraightenIcon sx={{ mr: 1 }} />
                    {field.lengthMeters}x{field.widthMeters}m
                  </Typography>

                  <Box sx={{ mt: 1 }}>
                    <Chip 
                      label={field.cover === 'yes' ? 'Covered' : 'Open Air'} 
                      color={field.cover === 'yes' ? 'success' : 'default'}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip 
                      label={`${field.numberOfSeats} seats`}
                      color="primary"
                      size="small"
                    />
                  </Box>
                </Box>

                <Button 
                  component={Link} 
                  to={`/fields/${field.id}`}
                  variant="contained" 
                  color="primary"
                  fullWidth
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Fields; 