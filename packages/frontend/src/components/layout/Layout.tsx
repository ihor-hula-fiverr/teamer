import React, { useState } from 'react';
import { Box, Container, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { SportsSoccer, Group, Place, SportsScore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AppBar } from './AppBar';
import { useApp } from '../../context/AppContext';

const DRAWER_WIDTH = 240;

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItem[] = [
  { text: 'Teams', icon: <Group />, path: '/teams' },
  { text: 'Fields', icon: <Place />, path: '/fields' },
  { text: 'Games', icon: <SportsScore />, path: '/games' },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useApp();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar onMenuClick={handleDrawerToggle} />
      
      {user && (
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              top: ['48px', '56px', '64px'],
              height: 'auto',
              bottom: 0,
            },
          }}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => handleMenuItemClick(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: ['48px', '56px', '64px'],
          pb: 3,
          width: '100%',
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 3 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}; 