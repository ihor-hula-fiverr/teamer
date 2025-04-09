import React from 'react';
import { Box, Container, Paper } from '@mui/material';
import LoginForm from '../components/LoginForm';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(3),
}));

const LoginPage: React.FC = () => {
  return (
    <StyledContainer maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4,
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <LoginForm />
          </Box>
        </Paper>
      </Box>
    </StyledContainer>
  );
};

export default LoginPage; 