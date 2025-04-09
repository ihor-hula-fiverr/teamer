import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <Alert severity="error" onClose={onClose}>
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  );
}; 