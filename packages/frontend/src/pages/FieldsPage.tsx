import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip, CircularProgress, CardMedia } from '@mui/material';
import { Field } from '@teamer/shared';
import { fieldApi } from '../services/api';

const FieldsPage: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const data = await fieldApi.getAll();
        setFields(data);
      } catch (error) {
        console.error('Error fetching fields:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Football Fields
      </Typography>
      <Grid container spacing={3}>
        {fields.map((field, index) => {
          // Use modulo to cycle through available images (1-10)
          const imageNumber = (index % 10) + 1;
          return (
            <Grid item xs={12} sm={6} md={4} key={field.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={`/assets/images/${imageNumber}.jpg`}
                  alt={field.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {field.name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {field.location}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={`Capacity: ${field.capacity} players`}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    {field.pricePerHour && (
                      <Chip
                        label={`${field.pricePerHour} UAH/hour`}
                        size="small"
                        color="primary"
                      />
                    )}
                  </Box>
                  {field.description && (
                    <Typography variant="body2" color="textSecondary">
                      {field.description}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default FieldsPage; 