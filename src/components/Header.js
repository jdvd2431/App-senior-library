import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Person, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = ({ responseAuth }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="profile" onClick={handleProfileMenuOpen}>
          <Person />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
        >
          <MenuItem onClick={() => navigate('/statistics')}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </MenuItem>
          {/* You can add more options here */}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
