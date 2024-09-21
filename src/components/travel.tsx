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
import rooftop from '../images/zon23.jpg'
import nasa from '../images/nasa.jpg'
import marriott from '../images/marriott.jpg'
import marriott2 from '../images/marriott2.jpg'
import post from '../images/post.jpg'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider } from '@mui/material';
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

              display: "flex",
              justifyContent:"center",
              alignItems:"center",
            }}>
              Welcome to Houston, Texas
            </Typography>

            <Typography
              gutterBottom
              id="htx-title"
              component="div"
              align="center"
            >
              <p style={{ fontSize: 15, marginTop: 0}}><em>"The Largest City in Texas"</em></p>
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
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              href="https://www.visithoustontexas.com/"
            >
              Explore
            </Button>
            </Box>
          </Container>
        </div>
        <div style={{marginTop: 2,  }}>
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
          <Grid item xs={12} md={4} lg={8} sx={{
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
                  sx={{
                    width: { xs: 350, sm: 450  }, // Set width to 'auto' for mobile and 250 for other screen sizes
                    height: 'auto',
                    display: 'block', // Always show image
                    marginBottom: { xs: 2, sm: 0 }, // Add margin bottom in mobile view
                  }}
                  image={iah}
                  alt="TEST"
                />
              </Card>
            </Card>
          </Grid>
          
          <Divider
              sx={{
                margin: "20px 0",
                backgroundImage: "linear-gradient(to right, transparent, red, transparent)",
                backgroundSize: "100% 2px",
                backgroundRepeat: "no-repeat",
              }}
            />

          <Typography id="reccs" component="h2" variant="h5"
            sx={{

              display: "flex",
              justifyContent:"center",
              alignItems:"center",
            }}>
               Hotel Information:
            </Typography>

            <Grid item xs={12} md={4} lg={8} sx={{
              width: { sm: '100%', md: '60%' },
              display: 'flex',
              flexDirection: 'column',
              marginLeft: 0,
              marginRight: 0,
              marginTop: 5,
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
                    image={marriott}
                    alt="TEST"
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                      Our Primary Hotel
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" paragraph>
                      We have room blocks for our guests at the Houston Marriott West Loop by The Galleria. Feel free to reserve one of the blocked rooms under the wedding name in your invitation or find accommodations nearby.
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      <Button href="https://www.marriott.com/events/start.mi?id=1717168646997&key=GRP" size="small">View Hotel...</Button>
                    </Typography>
                  </CardContent>
                </Card>
              </Card>
            </Grid>

            <Grid item xs={12} md={4} lg={8} sx={{
              width: { sm: '100%', md: '60%' },
              display: 'flex',
              flexDirection: 'column',
              marginLeft: 0,
              marginRight: 0,
              marginTop: 5,
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
                    image={marriott2}
                    alt="TEST"
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                      Family Accommodations
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" paragraph>
                      In addition to, a few studio style rooms are blocked for our guests who prefer a larger suite for families at the 
                      Residence Inn Houston by The Galleria
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      <Button href="https://www.marriott.com/en-us/hotels/hougl-residence-inn-houston-by-the-galleria/overview/" size="small">View Hotel...</Button>
                    </Typography>
                  </CardContent>
                </Card>
              </Card>
            </Grid>

            <Divider
              sx={{
                margin: "20px 0",
                backgroundImage: "linear-gradient(to right, transparent, red, transparent)",
                backgroundSize: "100% 2px",
                backgroundRepeat: "no-repeat",
              }}
            />

            <Typography id="reccs" component="h2" variant="h5"
            sx={{

              display: "flex",
              justifyContent:"center",
              alignItems:"center",
            }}>
               Our Top Recommendations for You: 
            </Typography>

            <Box sx={{
                width: { sm: '100%', md: '60%' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: "left", // Center children horizontally
            }}>
            <Typography id="" component="h5" variant="h5"   
            sx={{
              marginTop: 4, 
              justifyContent:"left",
              alignItems:"left",
              fontWeight: "bold", 
              }}>
               Food: 
            </Typography>
            </Box>


            <Box sx={{
                width: { sm: '100%', md: '60%' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center", // Center children horizontally
            }}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: "auto" }}>
              <Grid item xs={12}  md={6} lg={'auto'}>
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
              <Grid item xs={12}  md={6} lg={'auto'}>
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
              <Grid item xs={12} md={6} lg={'auto'}>
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
              <Grid item xs={12} md={6} lg={'auto'}>
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
              <Grid item xs={12} md={6} lg={'auto'}>
                <Card sx={{ maxWidth: 345, border: 1, borderColor: "lightgray", boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  alt="rooftop"
                  height="140"
                  image={rooftop}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  Z on 23 Rooftop
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                   Visit Houston’s highest open-air rooftop bar in Downtown.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button href="https://www.zon23rooftop.com/" size="small">View...</Button>
                </CardActions>
              </Card>
              </Grid>
            </Grid>
            </Box>

            <Box sx={{
                width: { sm: '100%', md: '60%' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: "left", // Center children horizontally
            }}>
            <Typography id="" component="h5" variant="h5"   
            sx={{
                marginTop: 8, 
                display: "flex",
                justifyContent:"left",
                alignItems:"left",
                fontWeight: "bold",
              }}>
               Sights and Attractions: 
            </Typography>
            </Box>
            <Box sx={{
                width: { sm: '100%', md: '60%' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center", // Center children horizontally
            }}>
           <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: "auto" }}>
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
                   Museum of Natural Science
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
                  NASA Space Center
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                   Houston, We Have a Wedding... Visit NASA, where it all happened! 
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button href="https://spacecenter.org/" size="small">View...</Button>
                </CardActions>
              </Card>
              </Grid>
              <Grid item xs={12} md={4} lg={'auto'}>
                <Card sx={{ maxWidth: 345, border: 1, borderColor: "lightgray", boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  alt="waterfall"
                  height="140"
                  image={waterfall}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  Waterwall Park
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                   Located a short walk from the hotel, visit one of Houston's most iconic landmark! 
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button href="https://www.visithoustontexas.com/listings/water-wall/20713/" size="small">View...</Button>
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