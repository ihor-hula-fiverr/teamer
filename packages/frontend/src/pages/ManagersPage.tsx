import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types/UserRole';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

const ManagersPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          role: UserRole.FIELD_MANAGER,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      navigate('/fields-manager');
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Become a Field Manager
          </Typography>
          <Typography variant="body1" paragraph>
            Please provide your phone number to become a field manager.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
              sx={{ mt: 2 }}
            >
              {isLoading ? 'Processing...' : 'Submit'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default ManagersPage; 