import React from "react";
import "../App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import hou from "../images/htx2.jpg";
import iah from "../images/iah.jpg";
import sal from '../images/syp.jpeg'; 
import seafood from '../images/goodseafood.jpg';
import amalfi from '../images/alma2.jpg'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';



export const Travel: React.FC = () => {
  return (
    <>
      <>
        <div className="header-htx"></div>
        <div style={{ width: "100%", marginTop: 25 }}>
          {/*         <img src={hou} alt="Header Image" style={{ width: '100%', height: '100%', objectFit: 'cover',  backgroundPosition: 'center top' }} />
           */}
          <Container maxWidth={false} style={{ height: "100%", width: "70%" }} sx={{ border: 1, borderColor: "lightgray", boxShadow: 4 }}>
            <Typography
              gutterBottom
              id="htx-title"
              component="div"
              align="center"
            >
              Welcome to Houston, Texas
              <p style={{ fontSize: 15, marginTop: 0}}><em>"The Fourth Largest City in the USA"</em></p>
            </Typography>
            <p style={{ fontSize: 20, marginTop: 0 }}>
              Houston, the Space City, has set the stage for our special day,
              and we couldn't be more excited to have you here. Together, let's
              immerse ourselves in the city's Southern charm, vibrant energy,
              and heartfelt moments as we celebrate love, friendship, and the
              beginning of our forever.
            </p>

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
            <Typography id="reccs" component="h2" variant="h5"
            sx={{
              width: "100%",
              display: "flex",
              justifyContent:"center",
              alignItems:"center",
            }}>
               Our Top Recommendations for You: 
            </Typography>
            <Typography id="" component="h5" variant="h5"   
            sx={{
                width: "100%",
                marginTop: 0, 
                display: "flex",
                justifyContent:"left",
                alignItems:"left",
              }}>
               Food: 
            </Typography>
            <Box
              sx={{
                width: "100%",
                marginTop: 0, 
                display: "grid",
                justifyContent:"center",
                alignItems:"center",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 250px), 1fr))",
                gap: 2,
              }}
            >
              <Card sx={{ maxWidth: 345, border: 1, borderColor: "lightgray", boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  alt="sal y pimienta"
                  height="140"
                  image={sal}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                   Sal y Pimienta Kitchen
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  South American restaurant featuring modern spins on classic dishes in rustic-chic surrounds.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button href="https://www.salypimientakitchen.com/" size="small">View...</Button>
                </CardActions>
              </Card>
              <Card sx={{ maxWidth: 345, border: 1, borderColor: "lightgray", boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={seafood}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  Goode Company Seafood
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Fresh Seafood from the Texas Gulf Coast! Daily Catches and more. 
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button href="https://goodecompanyseafood.com/" size="small">View...</Button>
                </CardActions>
              </Card>
              <Card sx={{ maxWidth: 345, border: 1, borderColor: "lightgray", boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={amalfi}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  Amalfi Houston
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Amalfi Houston is an Italian restaurant that emphasizes in authentic Italian cuisine.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button href="https://www.amalfihouston.com/" size="small">View...</Button>
                </CardActions>
              </Card>
            </Box>
            <Typography id="" component="h5" variant="h5"   
            sx={{
                width: "100%",
                marginTop: 8, 
                display: "flex",
                justifyContent:"left",
                alignItems:"left",
              }}>
               Sights and Attractions: 
            </Typography>
            <Box
              sx={{
                width: "100%",
                marginTop: 0, 
                display: "grid",
                justifyContent:"center",
                alignItems:"center",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 250px), 1fr))",
                gap: 2,
              }}
            >
              <Card sx={{ maxWidth: 345, border: 1, borderColor: "lightgray", boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  alt="sal y pimienta"
                  height="140"
                  image={sal}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                   Sal y Pimienta Kitchen
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  South American restaurant featuring modern spins on classic dishes in rustic-chic surrounds.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button href="https://www.salypimientakitchen.com/" size="small">View...</Button>
                </CardActions>
              </Card>
              <Card sx={{ maxWidth: 345, border: 1, borderColor: "lightgray", boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={seafood}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  Goode Company Seafood
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Fresh Seafood from the Texas Gulf Coast! Daily Catches and more. 
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button href="https://goodecompanyseafood.com/" size="small">View...</Button>
                </CardActions>
              </Card>
              <Card sx={{ maxWidth: 345, border: 1, borderColor: "lightgray", boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={amalfi}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  Amalfi Houston
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Amalfi Houston is an Italian restaurant that emphasizes in authentic Italian cuisine.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button href="https://www.amalfihouston.com/" size="small">View...</Button>
                </CardActions>
              </Card>
            </Box>
          </Container>
        </div>
      </>
    </>
  );
};
