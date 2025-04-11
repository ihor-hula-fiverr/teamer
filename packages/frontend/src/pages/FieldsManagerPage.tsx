import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Chip, 
  CircularProgress, 
  CardMedia,
  Button,
  Container
} from '@mui/material';
import { Field } from '@teamer/shared';
import { fieldApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const FieldsManagerPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFields = async () => {
      if (!user?.id) return;
      
      try {
        const response = await fetch(`http://localhost:8080/api/fields/manager/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch fields');
        }
        const data = await response.json();
        // Add imageUrl to each field
        const fieldsWithImages = data.map((field: Field, index: number) => ({
          ...field,
          imageUrl: `/assets/images/${(index % 57) + 1}.jpg` // Use modulo to cycle through available images (1-57)
        }));
        setFields(fieldsWithImages);
      } catch (error) {
        console.error('Error fetching fields:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, [user?.id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" color="primary">
            Your Football Fields
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate('/managers/fields/new')}
            sx={{
              bgcolor: '#1dbf73',
              '&:hover': {
                bgcolor: '#18a164',
              },
            }}
          >
            Add New Field
          </Button>
        </Box>

        <Grid container spacing={3}>
          {fields.map((field) => (
            <Grid item xs={12} sm={6} md={4} key={field.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={field.imageUrl}
                  alt={field.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {field.name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {field.district}, {field.address}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={`Up to ${field.maxPlayersCount} players`}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={`${field.priceFrom}-${field.priceTo} UAH/hour`}
                      size="small"
                      color="primary"
                    />
                  </Box>
                  {field.description && (
                    <Typography variant="body2" color="textSecondary">
                      {field.description}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default FieldsManagerPage; 