import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <SportsSoccerIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Teamer
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/teams">
            Teams
          </Button>
          <Button color="inherit" component={RouterLink} to="/fields">
            Fields
          </Button>
          <Button color="inherit" component={RouterLink} to="/games">
            Games
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 