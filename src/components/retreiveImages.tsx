import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Typography, Box, Card, CardMedia, Dialog, DialogContent, CardContent,
} from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#321115",
      dark: "#847072"
    }
  },
});

export interface imagePost {
  imageId: string;
  imageUrl: string;
  imageFileName: string;
  firstName: string;
  lastName: string;
  comment: string | null;
  dateUploaded: string;
}

export const RetrivedImages = () => {
  const [postsList, setPostList] = useState<imagePost[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const getPosts = async () => {
    try {
      const response = await fetch('https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/images');
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();

      // Check if the response has an "images" property that is an array
      if (data && Array.isArray(data.images)) {
        setPostList(data.images as imagePost[]);
      } else {
        console.error("API did not return an array of images:", data);
        setPostList([]); // Fallback to an empty array
      }
    } catch (error) {
      console.error("Failed to fetch images:", error);
      setPostList([]); // Fallback to an empty array in case of error
    }
  };

  useEffect(() => {
    console.log("Rendering");
    getPosts();
  }, []);

  const handleImageClick = (imageURL: string) => {
    setSelectedImage(imageURL);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getFormattedDate = (dateUploaded: string): string => {
    const date = new Date(dateUploaded);
    return date.toLocaleDateString(); // Customize this to your preferred format
  };

  return (
    <div className="" style={{ padding: 0, height: "100%", width: "100%", backgroundColor: "#fff8e4", marginTop: 30 }}>
      <ThemeProvider theme={defaultTheme}>
        <Container id="cardHolder" maxWidth="xl" style={{ height: "100%", width: "100%" }}>
          <Typography id="reccs" component="h2" variant="h5"
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            A Journey of Forever
          </Typography>

          <Box sx={{
            width: "100%",
            marginTop: 2,
          }}>
            <Grid container justifyContent="center" rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: "auto" }}>
              {postsList.length > 0 && postsList.map((post) => (
                <Grid
                  className="fadein"
                  item
                  xs={12}
                  md={4}
                  lg={'auto'}
                  key={post.imageId}
                  style={{
                    animation: 'fadein 3s',
                    WebkitAnimation: 'fadein 3s',
                    MozAnimation: 'fadein 3s',
                    OAnimation: 'fadein 3s',
                  }}
                >
                  <Card sx={{ maxWidth: 345, border: 1, borderColor: "#fff8e4", boxShadow: 2 }} onClick={() => handleImageClick(post.imageUrl)}>
                    <CardMedia
                      component="img"
                      alt={post.imageFileName}
                      height="240"
                      image={post.imageUrl}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {post.comment ? post.comment : "No comments available"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Dialog open={open} onClose={handleClose} maxWidth="md">
            <DialogContent>
              <img src={selectedImage} alt="Large Image" style={{ width: '100%', height: 'auto' }} />
            </DialogContent>
          </Dialog>
        </Container>
      </ThemeProvider>
    </div>
  );
};
