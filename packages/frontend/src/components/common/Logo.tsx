import React from 'react';
import { Box } from '@mui/material';

interface LogoProps {
  size?: number;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 40, showText = true }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        component="img"
        src="/images/logo.svg"
        alt="Teamer Logo"
        sx={{
          width: size,
          height: size,
        }}
      />
    </Box>
  );
}; 