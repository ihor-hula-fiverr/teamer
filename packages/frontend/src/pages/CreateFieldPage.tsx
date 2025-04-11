import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  SelectChangeEvent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fieldApi } from '../services/api';

const CreateFieldPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    cover: 'no',
    numberOfSeats: '0',
    priceFrom: '1000',
    priceTo: '2000',
    description: '',
    googleMapsLink: '',
    maxPlayersCount: '10',
    lengthMeters: '40',
    widthMeters: '20',
    address: '',
    district: '',
    imageUrl: 'https://example.com/default-field-image.jpg'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!user?.id) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    try {
      const fieldData = {
        ...formData,
        numberOfSeats: parseInt(formData.numberOfSeats),
        priceFrom: parseFloat(formData.priceFrom),
        priceTo: parseFloat(formData.priceTo),
        maxPlayersCount: parseInt(formData.maxPlayersCount),
        lengthMeters: parseFloat(formData.lengthMeters),
        widthMeters: parseFloat(formData.widthMeters),
        latitude: 50.4501, // Default Kyiv coordinates
        longitude: 30.5234, // Default Kyiv coordinates
        managerId: user.id
      };

      await fieldApi.create(fieldData);
      navigate('/managers/fields');
    } catch (err) {
      setError('Failed to create field. Please try again.');
      console.error('Error creating field:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Add New Field
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Field Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Cover Type</InputLabel>
                  <Select
                    name="cover"
                    value={formData.cover}
                    onChange={handleSelectChange}
                    label="Cover Type"
                  >
                    <MenuItem value="no">Open Air</MenuItem>
                    <MenuItem value="yes">Covered</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Number of Seats"
                  name="numberOfSeats"
                  type="number"
                  value={formData.numberOfSeats}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price From (UAH/hour)"
                  name="priceFrom"
                  type="number"
                  value={formData.priceFrom}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price To (UAH/hour)"
                  name="priceTo"
                  type="number"
                  value={formData.priceTo}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Google Maps Link"
                  name="googleMapsLink"
                  value={formData.googleMapsLink}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Max Players Count"
                  name="maxPlayersCount"
                  type="number"
                  value={formData.maxPlayersCount}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Length (meters)"
                  name="lengthMeters"
                  type="number"
                  value={formData.lengthMeters}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Width (meters)"
                  name="widthMeters"
                  type="number"
                  value={formData.widthMeters}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="District"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={loading}
                  sx={{
                    bgcolor: '#1dbf73',
                    '&:hover': {
                      bgcolor: '#18a164',
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Create Field'
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateFieldPage; 