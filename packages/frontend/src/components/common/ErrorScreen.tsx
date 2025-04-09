import React from 'react';
import { Box, Typography } from '@mui/material';

interface ErrorScreenProps {
  error: string;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ error }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h5" color="error" gutterBottom>
        Error
      </Typography>
      <Typography color="text.secondary">{error}</Typography>
    </Box>
  );
};

export default ErrorScreen; 