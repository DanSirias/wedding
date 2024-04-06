import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Link } from '@mui/material';
import "../App.css"; 
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AdbIcon from '@mui/icons-material/Adb';
import Logo from '../images/RDlogo_light.svg'
import { useNavigate } from "react-router-dom";
import { auth } from '../backend/firebase-config'; 
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import LoginIcon from '@mui/icons-material/Login';
import Daniel from '../images/daniel.jpg'; 
import Rebecca from '../images/rebecca.jpg'; 
import { Home, ConfirmationNumber, People, Flight, PhotoLibrary, CardGiftcard } from '@mui/icons-material';


const pages = [
  { text: 'Home', href: '/', icon: Home },
  { text: 'RSVP', href: '/rsvp', icon: ConfirmationNumber },
  { text: 'Wedding Party', href: '/weddingparty', icon: People },
  { text: 'Travel', href: '/travel', icon: Flight },
  { text: 'Schedule', href: '/schedule', icon: CalendarTodayIcon},
  { text: 'Memories', href: '/images', icon: PhotoLibrary },
  { text: 'Gift Registry', href: '/gift', icon: CardGiftcard },
];
    
const iconMapping = {
  home: Home,
  rsvp: ConfirmationNumber,
  wedding_party: People,
  travel: Flight,
  schedule: CalendarTodayIcon, 
  memories: PhotoLibrary,
  gift: CardGiftcard,
};
  const settings = ['Profile', 'Account', 'Dashboard', 'Log Out'];
    
    
function Navbar() {

  const navigate = useNavigate(); 
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth); 
    navigate('/login'); 
  };

  const onClickFunctions = [
    () => {
      // onClick function for 'Profile'
      console.log('Clicked Profile');
    },
    () => {
      // onClick function for 'Account'
      console.log('Clicked Account');
    },
    () => {
      // onClick function for 'Dashboard'
      console.log('Clicked Dashboard');
    },
    () => {
      // onClick function for 'LogOut'
      logout (); 
      console.log('Clicked LogOut');
    }
  ];

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
    try {
      await signOut(auth);

    } catch (err) {
      console.error(err);
    }
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
                      to={`${page.href}`}
                      style={{ textDecoration: "None", color: "#321115", fontSize: 16 }}
                      color="inherit"
                      underline="none"
                      sx={{ mx: 2 }}
                    >
                      <page.icon sx={{ marginRight: 1, fontSize: 16 }} /> {/* Render the icon */}
                      {page.text}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* LOGO */}
          {/*           <Avatar    sx={{
                display: { xs: 'block', md: 'none' },
                ml: 0,
          }} alt="Default Avatar" src={Logo} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              //mr: 2,
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
              alignItems: "center", // Align items vertically centered
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.text}
                onClick={handleCloseNavMenu}
                sx={{ my: 1, color: "#321115", display: "block", textAlign: "left" }} // Align text to the left
              >
                <Link
                  component={RouterLink}
                  to={page.href}
                  style={{ textDecoration: "none", color: "#321115", display: "flex", alignItems: "center", fontSize:11 }} // Align items horizontally centered
                  color="inherit"
                  underline="none"
                  sx={{ mx: 2 }}
                >
                  <page.icon sx={{ marginRight: 1, fontSize:16 }} /> {/* Render the icon */}
                  {page.text}
                </Link>{" "}
              </Button>
            ))}
          </Box>

          {!user ? (
            <Box sx={{ flexGrow: 0, display: { xs: "block", md: "flex" } }}>
              <Typography display="flex" alignItems="center" textAlign="center">
                <LoginIcon sx={{ marginRight: "0px" }} />
                <Link
                  component={RouterLink}
                  to="/login"
                  style={{ textDecoration: "None", color: "#321115" }}
                  color="inherit"
                  underline="none"
                  sx={{ mx: 2 }}
                >
                  Log In
                </Link>
              </Typography>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                {user.email === "danielsirias.88@gmail.com" ? (
                  <Typography display="flex" alignItems="center">
                    <span style={{ paddingRight: "8px" }}>Howdy, Daniel</span>
                    <Avatar
                      alt="Daniel Sirias"
                      src={Daniel}
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                    />
                  </Typography>
                ) : user.email === "rbenne88@gmail.com" ? (
                  <Typography display="flex" alignItems="center">
                    <span style={{ paddingRight: "8px" }}>Howdy, Rebecca</span>
                    <Avatar
                      alt="Rebecca Sirias"
                      src={Rebecca}
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                    />
                  </Typography>
                ) : (
                  <Avatar
                    alt="Default Avatar"
                    src="/static/images/avatar/default.jpg"
                  />
                )}
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={onClickFunctions[index]}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;



{/* <Link component={RouterLink} to="/" color="inherit" underline="none" sx={{ mx: 2 }}>
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
</Link> */}