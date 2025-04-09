import React from 'react';
import { Box, styled } from '@mui/material';

interface ShowcaseItemProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  delay: number;
  top: string;
  left: string;
  rotation?: number;
}

const ShowcaseItem = styled(Box)<{ delay: number; rotation?: number }>(({ theme, delay, rotation }) => ({
  position: 'absolute',
  animation: `float 6s ease-in-out infinite`,
  animationDelay: `${delay}s`,
  transform: `translateY(0px) rotate(${rotation || 0}deg)`,
  transition: 'all 0.3s ease',
  '& img': {
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
  },
  '@keyframes float': {
    '0%': {
      transform: `translateY(0px) rotate(${rotation || 0}deg)`,
    },
    '50%': {
      transform: `translateY(-20px) rotate(${(rotation || 0) + 10}deg)`,
    },
    '100%': {
      transform: `translateY(0px) rotate(${rotation || 0}deg)`,
    },
  },
}));

const ShowcaseAnimation: React.FC = () => {
  const showcaseItems = [
    {
      src: 'https://cdn-icons-png.flaticon.com/512/53/53283.png', // Football
      alt: 'Football',
      width: 120,
      height: 120,
      delay: 0,
      top: '10%',
      left: '20%',
      rotation: 15,
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/512/53/53283.png', // Football
      alt: 'Football',
      width: 80,
      height: 80,
      delay: 1.5,
      top: '40%',
      left: '60%',
      rotation: -10,
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/512/53/53283.png', // Football
      alt: 'Football',
      width: 100,
      height: 100,
      delay: 2.5,
      top: '70%',
      left: '30%',
      rotation: 20,
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/512/53/53283.png', // Football
      alt: 'Football',
      width: 60,
      height: 60,
      delay: 3,
      top: '25%',
      left: '75%',
      rotation: -15,
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/512/53/53283.png', // Football
      alt: 'Football',
      width: 90,
      height: 90,
      delay: 1,
      top: '60%',
      left: '45%',
      rotation: 10,
    },
  ];

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '600px',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, rgba(29, 191, 115, 0.1) 0%, transparent 70%)',
          zIndex: 0,
        },
      }}
    >
      {showcaseItems.map((item, index) => (
        <ShowcaseItem
          key={index}
          delay={item.delay}
          rotation={item.rotation}
          sx={{
            top: item.top,
            left: item.left,
            zIndex: 1,
          }}
        >
          <img
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </ShowcaseItem>
      ))}
    </Box>
  );
};

export default ShowcaseAnimation; 