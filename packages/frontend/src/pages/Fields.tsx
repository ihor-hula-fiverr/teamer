import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { Field } from '@teamer/shared';

const Fields: React.FC = () => {
  const fields: Field[] = [
    {
      id: '1',
      name: 'Central Park Field',
      location: 'Central Park, New York',
      capacity: 20,
      description: 'A well-maintained field in the heart of the city',
      pricePerHour: 50
    },
    {
      id: '2',
      name: 'Riverside Stadium',
      location: 'Riverside Drive, New York',
      capacity: 30,
      description: 'Professional-grade field with excellent facilities',
      pricePerHour: 75
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Fields
      </Typography>
      <Grid container spacing={3}>
        {fields.map((field) => (
          <Grid item xs={12} sm={6} md={4} key={field.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {field.name}
                </Typography>
                <Typography variant="body1">
                  Location: {field.location}
                </Typography>
                <Typography variant="body1">
                  Capacity: {field.capacity} players
                </Typography>
                {field.description && (
                  <Typography variant="body1">
                    Description: {field.description}
                  </Typography>
                )}
                {field.pricePerHour && (
                  <Typography variant="body1">
                    Price per hour: ${field.pricePerHour}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Fields; 