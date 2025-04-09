import React from 'react';
import { AppBar as MuiAppBar, Toolbar, Box, Button, IconButton, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Logo } from '../common';
import { useApp } from '../../context/AppContext';

interface AppBarProps {
  onMenuClick?: () => void;
}

export const AppBar: React.FC<AppBarProps> = ({ onMenuClick }) => {
  const theme = useTheme();
  const { user } = useApp();

  return (
    <MuiAppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {user && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onMenuClick}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <Logo size={32} sx={{ mr: 1 }} />
        </Link>

        <Box sx={{ flexGrow: 1 }} />

        {!user ? (
          <Box>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </Box>
        ) : (
          <Button color="inherit" component={Link} to="/profile">
            Profile
          </Button>
        )}
      </Toolbar>
    </MuiAppBar>
  );
}; 