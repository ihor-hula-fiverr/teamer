import React from 'react';
import { Box, Container } from '@mui/material';
import LoginForm from '../components/LoginForm';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(3),
  background: 'linear-gradient(45deg, #f8f9fa 30%, #ffffff 90%)',
}));

const LoginPage: React.FC = () => {
  return (
    <StyledContainer maxWidth={false}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/logo.svg"
          alt="Teamer Logo"
          sx={{
            width: 200,
            height: 'auto',
            mb: 4,
          }}
        />
        <LoginForm />
      </Box>
    </StyledContainer>
  );
};

export default LoginPage; 