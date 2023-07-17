import React from "react";
import "../App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import hou from "../images/htx2.jpg";
import iah from "../images/iah.jpg";
import sal from '../images/syp.jpg'; 
import seafood from '../images/goodseafood.jpg';
import amalfi from '../images/alma2.jpg'
import whata from '../images/whata.jpg'
import galleria from '../images/galleria.jpg'
import natsci from '../images/natsci.jpg'
import waterfall from '../images/waterfall.jpg'
import nasa from '../images/nasa.jpg'
import post from '../images/post.jpg'
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
import { createTheme, ThemeProvider } from "@mui/material/styles";

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


export const Travel: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <div className="header-htx"></div>
        <div style={{ width: "100%", marginTop:0 }}>
          <Container maxWidth={false} style={{ height: "100%", width: "100%" }} 
          sx={{ border: 0, borderColor: "lightgray", boxShadow: 4,
                /* backgroundImage: `url(${hou})`, */
                backgroundColor: "#f2f2f2", 
                backgroundSize: 'cover',
                backgroundPosition: 'center',}}>
            <Typography
              gutterBottom
              id="htx-title"
              component="div"
              align="center"
            >
              Welcome to Houston, Texas
              <p style={{ fontSize: 15, marginTop: 0}}><em>"The Fourth Largest City in the USA"</em></p>
            </Typography>
            <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginLeft: 0, 
              marginRight: 0 
            }}
            >
            <Typography id="" component="h2" variant="h5"
              sx={{
                width: "100%",
                display: "flex",
                justifyContent:"center",
                alignItems:"center",
              }}>
              <p id="htx-header">
                Houston, the Space City, has set the stage for our special day,
                and we couldn't be more excited to have you here. Together, let's
                immerse ourselves in the city's Southern charm, vibrant energy,
                and heartfelt moments as we celebrate love, friendship, and the
                beginning of our forever.         
              </p>

            </Typography>                    
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 0, mb: 2 }}
              href="https://www.visithoustontexas.com/"
            >
              Explore
            </Button>
            </Box>
          </Container>
        </div>
        <div style={{ width: "100%", marginTop: 10 }}>
          <Container id="cardHolder" maxWidth={false} style={{ height: "100%", width: "70%" }}>
            <Grid className="cardsContainer" item xs={12} md={6} lg={8}>
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

            <Box   sx={{
                width: "100%",
                marginTop: 0, 
                justifyContent:"center",
                alignItems:"center",
                align:"center"
              }}>
            <Grid container justifyContent="center" rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3, lg:"auto"}}>
              <Grid item xs={12}  md={4} lg={'auto'}>
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
              </Grid>
              <Grid item xs={12}  md={4} lg={'auto'}>
              <Card sx={{ maxWidth: 345, border: 1, borderColor: "lightgray", boxShadow: 2 }}>
              <CardMedia
                  component="img"
                  alt="seafood option"
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
              </Grid>
              <Grid item xs={12} md={4} lg={'auto'}>
                <Card sx={{ maxWidth: 345, border: 1, borderColor: "lightgray", boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  alt="Amalfi Houston"
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
              </Grid>
              <Grid item xs={12} md={4} lg={'auto'}>
                <Card sx={{ maxWidth: 345, border: 1, borderColor: "lightgray", boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  alt="whataburger"
                  height="140"
                  image={whata}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  Whataburger
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                   Opened in 1950, this is a true Texas Tradition...get a fresh burger.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button href="https://whataburger.com/home" size="small">View...</Button>
                </CardActions>
              </Card>
              </Grid>
            </Grid>
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
            <Box   sx={{
                width: "100%",
                marginTop: 0, 
                justifyContent:"center",
                alignItems:"center",
                align:"center"
              }}>
            <Grid container justifyContent="center" rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3, lg:"auto"}}>
              <Grid item xs={12}  md={4} lg={'auto'}>
                <Card sx={{ maxWidth: 345, border: 1, borderColor: "lightgray", boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  alt="galleria"
                  height="140"
                  image={galleria}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                   The Houston Galleria
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Shop at the Galleria, with 400 stores, the Galleria is the largest mall in Texas!
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button href="https://www.simon.com/mall/the-galleria/map" size="small">View...</Button>
                </CardActions>
              </Card>
              </Grid>
              <Grid item xs={12}  md={4} lg={'auto'}>
              <Card sx={{ maxWidth: 345, border: 1, borderColor: "lightgray", boxShadow: 2 }}>
              <CardMedia
                  component="img"
                  alt="Post"
                  height="140"
                  image={post}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  Post Downtown
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Enjoy Houston's new rooftop entertainment in Downtown. 
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button href="https://www.posthtx.com/" size="small">View...</Button>
                </CardActions>
              </Card>
              </Grid>
              <Grid item xs={12} md={4} lg={'auto'}>
                <Card sx={{ maxWidth: 345, border: 1, borderColor: "lightgray", boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  alt="Natural History"
                  height="140"
                  image={natsci}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                   Houston Museum of Natural Science
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Discover Texas wildlife, dinosaurs, Planets, and more in the heart of Houston's Museum District.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button href="https://www.hmns.org/" size="small">View...</Button>
                </CardActions>
              </Card>
              </Grid>
              <Grid item xs={12} md={4} lg={'auto'}>
                <Card sx={{ maxWidth: 345, border: 1, borderColor: "lightgray", boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  alt="Nasa"
                  height="140"
                  image={nasa}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  NASA Space Center Houston
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                   Houston, We Have a Problem... Visit NASA, where it all happened! 
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button href="https://spacecenter.org/" size="small">View...</Button>
                </CardActions>
              </Card>
              </Grid>
            </Grid>
            </Box>
          </Container>
        </div>
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