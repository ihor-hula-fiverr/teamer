import React, { useState } from 'react';
import { 
  AppBar as MuiAppBar, 
  Toolbar, 
  Box, 
  Button, 
  IconButton, 
  useTheme, 
  Typography, 
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Person as PersonIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  SportsSoccer as SportsSoccerIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../common';
import { useAuth } from '../../context/AuthContext';

interface AppBarProps {
  onMenuClick?: () => void;
}

export const AppBar: React.FC<AppBarProps> = ({ onMenuClick }) => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

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
          <Logo size={32} />
          <Typography 
            variant="h6" 
            sx={{ 
              ml: 1, 
              color: 'white',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            teamer
          </Typography>
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={handleMenuClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={anchorEl ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={anchorEl ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.secondary.main }}>
                <PersonIcon />
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem component={Link} to="/profile">
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              {user?.role === 'field_manager' ? (
                <MenuItem component={Link} to="/managers/fields">
                  <ListItemIcon>
                    <SportsSoccerIcon fontSize="small" />
                  </ListItemIcon>
                  My Fields
                </MenuItem>
              ) : (
                <MenuItem component={Link} to="/managers">
                  <ListItemIcon>
                    <SportsSoccerIcon fontSize="small" />
                  </ListItemIcon>
                  Become a Field Manager
                </MenuItem>
              )}
              <MenuItem component={Link} to="/settings">
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem component={Link} to="/help">
                <ListItemIcon>
                  <HelpIcon fontSize="small" />
                </ListItemIcon>
                Help
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </MuiAppBar>
  );
}; 