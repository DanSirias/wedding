import React from "react";
import "../App.css";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import marriott from '../images/marriott.jpg'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Golf  from "../images/topgolf.jpg";
import Rehersal  from "../images/postino.jpg";
import Bell from "../images/thebell.jpg";
import Waterfall from "../images/cocktail.jpg";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
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
    title: "Welcome Party",
    date: "April 10, 2024",
    time: "6:30PM-8:30PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    address: "123 Event Street, City, Country",
    image: Golf,
  },
  {
    title: "Rehersal Cocktail Hour",
    date: "April 15, 2024",
    time: "6:30PM-8:30PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    address: "456 Event Avenue, City, Country",
    image: Rehersal,
  },
  {
    title: "Wedding Ceremony",
    date: "April 20, 2024",
    time: "6:30PM-8:30PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    address: "901 W. 34th Houston, TX 77018",
    image: Bell,
  },
  {
    title: "Cocktail Hour",
    date: "April 20, 2024",
    time: "6:30PM-8:30PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    address: "Main Water Wall Courtyard and Garden",
    image: Waterfall,
  },
  {
    title: "Reception",
    date: "April 20, 2024",
    time: "7:00PM-11:00PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    address: "Carillon Ballroom",
    image: Bell,
  },
];


export const Schedule: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <div className="header-htx"></div>
        <div style={{ marginTop: 0}}>
        <Container maxWidth={false} style={{ height: "100%"}} 
          sx={{
              pt: { xs: 4, sm: 6, md:2 },
              pb: { xs: 8, sm:8,  md:2 },
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: { xs: 2, sm: 1 },
              border: 0, borderColor: "lightgray", boxShadow: 4,
              /* backgroundImage: `url(${hou})`, */
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
              <p style={{ fontSize: 20, marginTop: 0}}>
                Houston, the Space City, has set the stage for our special day,
                and we couldn't be more excited to have you here. Together, let's
                immerse ourselves in the city's Southern charm, vibrant energy,
                and heartfelt moments as we celebrate love, friendship, and the
                beginning of our forever.         
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
                  <Grid item xs={12} md={12} lg={12} key={index} sx={{
                    width: { sm: '100%', md: '60%' },
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: 0,
                    marginRight: 0,
                    marginTop: 0,
                    justifyContent: "center",
                    alignItems: "center", // Center children horizontally
                  }}>
                    <Card sx={{ maxWidth: "100%", border: 1, borderColor: "lightgray", boxShadow: 4 }}>
                      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                        <CardMedia
                          component="img"
                          sx={{
                            width: { xs: 350, sm: 450 }, // Set width to 'auto' for mobile and 250 for other screen sizes
                            height: 'auto',
                            display: 'block', // Always show image
                            marginBottom: { xs: 2, sm: 0 }, // Add margin bottom in mobile view
                          }}
                          image={event.image}
                          alt={event.title}
                        />
                        <CardContent sx={{ flex: 1 }}>
                          <Typography component="h2" variant="h5">
                            {event.title}
                          </Typography>
                          <Typography variant="subtitle1" color="text.secondary" paragraph>
                            {event.date} | {event.time}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            {event.description}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Address: {event.address}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Card>
                  </Grid>
                ))}
              </Grid>

          </Container>
      </ThemeProvider>
    </>
  );
};



/* 

            <Grid item xs={12} md={6} lg={8}>
            <Card sx={{ maxWidth: "100%", border: 1, borderColor: "lightgray", boxShadow: 4 }}>
              <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h2" variant="h5">
                  Getting To and Around Houston
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" paragraph>
                  We have two primary airports in the city: George Bush Intercontinental (IAH) and William P. Hobby (HOU). 
                  Our wedding venue and chosen hotel are conveniently located just a 10-minute drive away from IAH. However, the choice of airport and airline is entirely up to you and your preferences.
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    <Button href="https://fly2houston.com/iah/airlines" size="small">View IAH...</Button>
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 250, display: { xs: 'none', sm: 'block' } }}
                  image={iah}
                  alt="TEST"
                />
              </Card>
            </Card>
            </Grid>
*/