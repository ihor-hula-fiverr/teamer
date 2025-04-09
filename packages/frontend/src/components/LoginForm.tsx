import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Alert,
} from '@mui/material';
import { Google as GoogleIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(0.75),
  textTransform: 'none',
  fontSize: '1rem',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(0.75),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiInputBase-input': {
    color: 'white',
  },
}));

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: 'white', mb: 3 }}>
        Sign In to Teamer
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <StyledButton
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={handleGoogleSignIn}
        sx={{
          color: 'white',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.4)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
        }}
      >
        Continue with Google
      </StyledButton>
      <Box sx={{ my: 3, display: 'flex', alignItems: 'center' }}>
        <Divider sx={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        <Typography variant="body2" sx={{ mx: 2, color: 'rgba(255, 255, 255, 0.5)' }}>
          OR
        </Typography>
        <Divider sx={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
      </Box>
      <form onSubmit={handleSubmit}>
        <StyledTextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <StyledTextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <StyledButton
          type="submit"
          variant="contained"
          fullWidth
          color="primary"
          sx={{
            backgroundColor: '#1dbf73',
            '&:hover': {
              backgroundColor: '#19a463',
            },
          }}
        >
          Sign In
        </StyledButton>
      </form>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Don't have an account?{' '}
          <Link 
            href="/register" 
            underline="hover"
            sx={{ 
              color: '#1dbf73',
              '&:hover': {
                color: '#19a463',
              },
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm; 