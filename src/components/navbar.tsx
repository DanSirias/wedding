import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Link, Box, IconButton, Menu, Container, Avatar, Button,
  Tooltip, MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LoginIcon from '@mui/icons-material/Login';
import Daniel from '../images/daniel.jpg';
import Rebecca from '../images/rebecca.jpg';
import { Home, ConfirmationNumber, People, Flight, PhotoLibrary, CardGiftcard } from '@mui/icons-material';

const pages = [
  { text: 'Home', href: '/', icon: Home },
  { text: 'RSVP', href: '/rsvp', icon: ConfirmationNumber },
  { text: 'Wedding Party', href: '/weddingparty', icon: People },
  { text: 'Travel', href: '/travel', icon: Flight },
  { text: 'Schedule', href: '/schedule', icon: CalendarTodayIcon },
  { text: 'Memories', href: '/images', icon: PhotoLibrary },
  { text: 'Registry', href: '/gift', icon: CardGiftcard },
];

const settings = ['Profile', 'Account', 'Dashboard', 'Log Out'];

function Navbar() {
  const navigate = useNavigate();
  const idToken = sessionStorage.getItem('id_token');

  const [anchorElNav, setAnchorElNav] = React.useState<HTMLElement | null>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = async () => {
    // Clear the session storage and redirect to the sign-out URL
    sessionStorage.removeItem('id_token');
    navigate('/signout');
  };

  return (
    <AppBar position="sticky" className="navbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            R & D | 11.10.24
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, alignItems: "center" }}>
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      component={RouterLink}
                      to={page.href}
                      style={{ textDecoration: "none", color: "#321115", fontSize: 20 }}
                      color="inherit"
                      underline="none"
                      sx={{ mx: 2 }}
                    >
                      <page.icon sx={{ marginRight: 1, fontSize: 16 }} />
                      {page.text}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              marginLeft: 0,
            }}
          ></Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.text}
                onClick={handleCloseNavMenu}
                sx={{ my: 1, color: "#321115", display: "block", textAlign: "left" }}
              >
                <Link
                  component={RouterLink}
                  to={page.href}
                  style={{ textDecoration: "none", color: "#321115", display: "flex", alignItems: "center", fontSize: 14}}
                  color="inherit"
                  underline="none"
                  sx={{ mx: 0 }}
                >
                  <page.icon sx={{ marginRight: 1, fontSize: 18 }} />
                  {page.text}
                </Link>
              </Button>
            ))}
          </Box>

          {idToken ? (
            <Box sx={{ flexGrow: 0 }}>
              <Button onClick={logout} sx={{ color: "#321115" }}>
                Sign Out
              </Button>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, display: { xs: "block", md: "flex" } }}>
              <Typography display="flex" alignItems="center" textAlign="center">
                <LoginIcon sx={{ marginRight: "0px" }} />
                <Link
                  component={RouterLink}
                  to="https://siriaswedding.auth.us-east-1.amazoncognito.com/login?client_id=5bfvpm9fvjgbh5c2s32oiv9d6h&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fwww.siriaswedding.com%2Fdashboard"
                  style={{ textDecoration: "None", color: "#321115" }}
                  color="inherit"
                  underline="none"
                  sx={{ mx: 2 }}
                >
                  Log In
                </Link>
              </Typography>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
