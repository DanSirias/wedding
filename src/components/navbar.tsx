import React from 'react';
import "../App.css"
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Link } from '@mui/material';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Wedding Website
        </Typography>
        <Link component={RouterLink} to="/" color="inherit" underline="none" sx={{ mx: 2 }}>
          Home
        </Link>
        <Link component={RouterLink} to="/rsvp" color="inherit" underline="none" sx={{ mx: 2 }}>
          RSVP
        </Link>
        <Link component={RouterLink} to="/events" color="inherit" underline="none" sx={{ mx: 2 }}>
          Events
        </Link>
        <Link component={RouterLink} to="/wedding-party" color="inherit" underline="none" sx={{ mx: 2 }}>
          Wedding Party
        </Link>
        <Link component={RouterLink} to="/travel" color="inherit" underline="none" sx={{ mx: 2 }}>
          Travel
        </Link>
        <Link component={RouterLink} to="/gift-registry" color="inherit" underline="none" sx={{ mx: 2 }}>
          Gift Registry
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
