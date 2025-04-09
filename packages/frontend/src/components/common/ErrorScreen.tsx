import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

interface ErrorScreenProps {
  error: string;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ error }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 400,
        }}
      >
        <ErrorIcon color="error" sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h6" color="error" gutterBottom>
          Error
        </Typography>
        <Typography color="text.secondary" align="center">
          {error}
        </Typography>
      </Paper>
    </Box>
  );
}; 