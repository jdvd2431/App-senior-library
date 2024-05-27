import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Box, Container, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, LibraryBooks, ExitToApp, ChevronLeft, Person, Settings, Equalizer } from '@mui/icons-material';

const MainLayout = ({ user }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            {drawerOpen ? <ChevronLeft /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AppSenior Library
          </Typography>
          {user && user.name && (
            <>
              <IconButton color="inherit" onClick={() => handleNavigation('/statistics')}>
                <Equalizer />
              </IconButton>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <Settings />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleNavigation('/profile')}>
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Perfil" />
                </MenuItem>
                <MenuItem onClick={() => handleNavigation('/category')}>
                  <ListItemIcon>
                    <Person fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Perfil" />
                </MenuItem>
                <MenuItem onClick={() => handleNavigation('/settings')}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Configuraciones" />
                </MenuItem>
              </Menu>
              <Typography variant="body1" color="inherit" sx={{ mr: 2 }}>
                Bienvenido, {user.name}
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle} sx={{ width: 240, flexShrink: 0 }}>
        <Box sx={{ width: 240 }} role="presentation">
          <List>
            <ListItem button onClick={() => handleNavigation('/statistics')}>
              <ListItemIcon>
                <LibraryBooks />
              </ListItemIcon>
              <ListItemText primary="Estadísticas" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => handleNavigation('/category')}>
              <ListItemIcon>
                <LibraryBooks />
              </ListItemIcon>
              <ListItemText primary="Categorias" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => handleNavigation('/login')}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => handleNavigation('/profile')}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Ajustes de Usuario" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Container sx={{ mt: 2 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
