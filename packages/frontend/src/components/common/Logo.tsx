import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface LogoProps extends BoxProps {
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ size = 40, ...props }) => {
  return (
    <Box
      component="img"
      src="/logo.png"
      alt="Teamer Logo"
      sx={{
        width: size,
        height: size,
        objectFit: 'contain',
        ...props.sx
      }}
      {...props}
    />
  );
}; 