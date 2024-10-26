import React from 'react';

import "../App.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import { styled, Theme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Rehersal from "../images/postino.jpg";
import Bell from "../images/thebell.jpg";
import Bell2 from "../images/thebell2.jpg";
import Waterfall from "../images/cocktail.jpg";
import Rustic from "../images/rustic.jpg";

const Item = styled(Paper)<{ theme: Theme }>((props: any) => ({
  backgroundColor: props.theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...props.theme.typography.body2,
  padding: props.theme.spacing(1),
  color: props.theme.palette.text.secondary,
}));

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#321115",
      dark: "#847072"
    }
  }, 
});

const events = [
  {
    title: "Welcome Gathering",
    date: "November 8, 2024",
    location: "The Rustic",
    time: "6:30PM-8:30PM",
    description: "We invite everyone who will be in Houston on Friday evening to gather with us! Come join for some food and drinks as we welcome you to the Great State of Texas.",
    address: "1836 Polk St, Houston, TX 77003",
    addressUrl: "https://maps.app.goo.gl/chbkBVnG32a9u9UK8",
    image: Rustic,
    attire: "Western/Happy Hour",
    transport: "Self/Rideshare"

  },
  {
    title: "Rehearsal Cocktail Social",
    date: "November 9, 2024",
    location: "Postino Uptown Park",
    time: "6:00PM-8:00PM",
    description: "The rehearsal cocktail social will be an intimate gathering exclusively for the wedding party and the parents of the bride and groom.",
    address: "1151 Uptown Park Blvd Ste. 12, Houston, TX 77056",
    addressUrl: "https://maps.app.goo.gl/Y3FBR8HpJQPHauDm6",
    image: Rehersal,
    attire: "Dressy Casual/Cocktail",
    transport: "Self/Rideshare"
  },
  {
    title: "Wedding Ceremony",
    date: "November 10, 2024",
    location: "The Campanile Chapel",
    time: "6:00PM-11:00PM",
    description: "We are delighted to invite you to join us for a day of celebration and love as we exchange our vows at the stunning Bell Tower on 34th. Surrounded by the timeless elegance of this iconic venue, we will begin our new journey together amidst the grandeur of its beautiful gardens and classic architecture.",
    address: "901 W. 34th Houston, TX 77018",
    addressUrl: "https://maps.app.goo.gl/126eeE7g5ysRqM8MA",
    image: Bell,
    attire: "Formal, Black Tie Optional",
    transport: "The charter bus will depart from the Marriott lobby starting at 4:50PM and 5:20PM"
  },
  {
    title: "Cocktail Hour",
    date: "November 10, 2024",
    location: "The Waterwall",
    time: "6:30PM-7:00PM",
    description: "Please join us for a cocktail hour by The Waterwall, designed to evoke a sense of tranquility and elegance. As water gracefully flows down the large stone structure, the mesmerizing effect and soothing sound create a serene ambiance, enhancing the experience of this special evening.",
    address: "Main Water Wall Courtyard and Garden",
    addressUrl: "https://maps.app.goo.gl/126eeE7g5ysRqM8MA",
    image: Waterfall,
    attire: "Formal, Black Tie Optional",
    transport: "N/A"
  },
  {
    title: "Wedding Reception",
    date: "November 10, 2024",
    location: "The Carillon Ballroom",
    time: "7:00PM-11:00PM",
    description: "We warmly invite you to a formal reception at the distinguished Carillon Ballroom. The Carillon Ballroom offers an atmosphere of timeless elegance. The classic design, featuring intricate details and rich textures, creates the perfect setting for an evening of celebration and joy.",    
    address: "Carillon Ballroom",
    addressUrl: "https://maps.app.goo.gl/126eeE7g5ysRqM8MA",
    image: Bell2,
    attire: "Formal, Black Tie Optional",
    transport: "A shuttle service will be available to return guests to the Marriott Lobby after the reception."
  },
];

export const Schedule: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <div className="header-htx"></div>
        <div style={{ marginTop: 0 }}>
          <Container maxWidth={false} style={{ height: "100%"}} 
            sx={{
              pt: { xs: 4, sm: 6, md:2 },
              pb: { xs: 8, sm:8,  md:2 },
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: { xs: 2, sm: 1 },
              border: 0, 
              borderColor: "lightgray", 
              boxShadow: 4,
              backgroundColor: "#f2f2f2", 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
            <Typography id="reccs" component="h2" variant="h5"
              sx={{
                fontSize: 20,
                display: "flex",
                justifyContent:"center",
                alignItems:"center",
              }}>
              Schedule of Events
            </Typography>
            <Box
              sx={{
                width: { sm: '100%', md: '60%' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 0,
                marginLeft: 0, 
                marginRight: 0 
              }}
            >
              <Typography id="" component="h2" variant="h5"
                sx={{
                  display: "flex",
                  justifyContent:"center",
                  alignItems:"center",
                }}>
                <p style={{ fontSize: 20, marginTop: 0 }}>
                Join us for a weekend of celebration that blends Texas charm, Italian warmth, and timeless elegance. We’ll kick off with a Texan country-style welcome party under the open sky, 
                followed by an Italian-inspired rehearsal dinner where family and friends gather to toast to love and the journey ahead. Finally, we’ll celebrate in the classic beauty of 
                The Bell Tower on 34th, where heartfelt moments will set the stage for the beginning of our forever. We can’t wait to share these unforgettable experiences with you.       
                </p>
              </Typography>                    
            </Box>
          </Container>
        </div>

        <Container id="cardHolder" maxWidth={false}       
          sx={{
            pt: { xs: 4, sm: 12 },
            pb: { xs: 8, sm: 16 },
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Center children horizontally
          }}
        >
          <Grid container spacing={3}>
            {events.map((event, index) => (
              <Grid item xs={12} md={12} lg={8} key={index} sx={{
                width: '60%', // Set width to 60% of the page
                display: 'flex',
                flexDirection: 'column',
                marginLeft: 'auto', // Center horizontally
                marginRight: 'auto', // Center horizontally
                marginTop: 0,
                justifyContent: "center",
                alignItems: "center", // Center children horizontally
              }}>
                <Card className="card1" sx={{ maxWidth: "100%", border: 1, borderColor: "lightgray", boxShadow: 4 }}>
                  <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                    <CardMedia
                      component="img"
                      sx={{
                        width: { xs: 350, sm: 450 },
                        height: 'auto',
                        display: 'block',
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                      image={event.image}
                      alt={event.title}
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Typography id="reccs" component="h2" variant="h5">
                        {event.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" paragraph>
                        {event.location}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" paragraph>
                        {event.date} | {event.time}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {event.description}
                      </Typography>
                      <Typography variant="body2" gutterBottom color="textSecondary">
                      <strong>Attire:</strong> {event.attire}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                      <strong>Address:</strong> <a href={event.addressUrl} target="_blank" rel="noopener noreferrer">{event.address}</a>
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                      <strong>Transport:</strong> {event.transport}
                      </Typography>
                    </CardContent>
                  </Card>
                  <div className="go-corner">
                      <div className="go-arrow">
                        →
                      </div>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};
