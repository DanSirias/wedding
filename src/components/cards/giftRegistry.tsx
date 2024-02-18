import React from "react";

import "../../App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import post from '../images/post.jpg';
import amazon from '../../images/AMZ.jpg';
import WS from '../../images/WS.jpg';
import venmo from '../../images/VM.jpg';
import paypal from '../../images/Pay.jpg';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider} from "@mui/material/styles";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  width: 200, // Adjusted width to 200px
  height: 250, // Adjusted width to 200px
  margin: '3px', // Margin set to 3 pixels
  img: {
    width: 150, // Adjusted width to 200px
    height: 150, // Adjusted width to 200px
  }
}));

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#321115",
      dark: "#847072"
    }
  }, 
});

export const GiftRegistryCards: React.FC = () => {


  const registryItems = [
    { id: 1, logo: amazon, title: '', storeLink: 'https://www.amazon.com/wedding/registry/2XTOVT67D2JK3?ref=wr_search_page_result_1' },
    { id: 2, logo: WS, title: '', storeLink: 'https://www.williams-sonoma.com/registry/p9prlfd9k6/registry-list.html' },
/*     { id: 3, logo: paypal, title: '', storeLink: 'https://www.bedbathandbeyond.com/' },
    { id: 4, logo: venmo, title: '', storeLink: 'https://www.crateandbarrel.com/' }, */
  ];

  return (

<ThemeProvider theme={defaultTheme}>
  <Grid
    container
    spacing={2}
    justifyContent="center"
    alignItems="center"
  >
    {registryItems.map((item) => (
      <Grid item key={item.id}>
        <Item className="gift-card">
          <CardMedia
            component="img"
            alt={item.title}
            src={item.logo}
            className="gift-logo"
          />
          <CardContent>
            <Typography variant="h5" className="gift-title">
              {item.title}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className="gift-store-button"
              href={item.storeLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit
            </Button>
          </CardContent>
        </Item>
      </Grid>
    ))}
  </Grid>
</ThemeProvider>
  );
};
