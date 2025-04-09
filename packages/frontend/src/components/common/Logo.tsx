import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface LogoProps extends BoxProps {
  size?: number;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 24, showText = true, ...props }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        ...props.sx
      }}
      {...props}
    >
      <Box
        component="img"
        src="/images/logo.svg"
        alt="Teamer Logo"
        sx={{
          width: size,
          height: size,
          objectFit: 'contain'
        }}
      />
      {showText && (
        <Box
          component="span"
          sx={{
            color: 'white',
            fontSize: size * 0.8,
            fontWeight: 'bold',
            letterSpacing: '0.5px'
          }}
        >
          teamer
        </Box>
      )}
    </Box>
  );
}; 