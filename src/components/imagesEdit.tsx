import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Typography, Box, Card, CardMedia, Dialog, DialogContent, DialogActions, Button,
} from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#555",
      dark: "#500000"
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

export const EditImages: React.FC = () =>  {
  const [postsList, setPostList] = useState<imagePost[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);  // State for selected image ID

  // Fetch the images from the API
  const getPosts = async () => {
    try {
      const response = await fetch('https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/images');
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();

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
    getPosts();
  }, []);

  // Open dialog and set selected image and its ID
  const handleImageClick = (imageURL: string, imageId: string) => {
    setSelectedImage(imageURL);
    setSelectedImageId(imageId);  // Set the selected image ID when clicking the image
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Function to hide the image by updating its hidden attribute in the database
// Function to hide the image by updating its hidden attribute in the database
const handleHideImage = async (imageId: string) => {
  try {
    const response = await fetch(`https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/images/${imageId}`, {
      method: 'PUT',  // Using PUT as per your API
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageId }),  // Ensure imageId is included in the request body
    });

    if (response.ok) {
      console.log('Image hidden successfully');
      setOpen(false);  // Close the dialog after hiding the image
      getPosts();  // Refresh the posts list to hide the image in the UI
    } else {
      // Handle error response
      const errorData = await response.json();
      console.error('Failed to hide the image:', errorData);

      // Check if imageId is missing and show an appropriate error message
      if (errorData.message === 'imageId is required') {
        alert(`Error: Missing imageId. Received body: ${JSON.stringify(errorData.received_body)}`);
      } else {
        alert('Failed to hide the image. Please try again.');
      }
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error('Error hiding the image:', error);
    alert('An error occurred while hiding the image.');
  }
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
                  <Card sx={{ maxWidth: 345, border: 1, borderColor: "#fff8e4", boxShadow: 2 }} onClick={() => handleImageClick(post.imageUrl, post.imageId)}>
                    <CardMedia
                      component="img"
                      alt={post.imageFileName}
                      height="240"
                      image={post.imageUrl}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* Updated Dialog */}
          <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={selectedImage}
                alt="Selected"
                style={{ maxHeight: '70vh', objectFit: 'contain' }} // Responsiveness: image scales to dialog size
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#500000", color: "white", '&:hover': { backgroundColor: "#D3D3D3" } }} 
                onClick={() => {
                  if (selectedImageId) {
                    handleHideImage(selectedImageId);  // Hide the image when clicked
                  }
                }}
              >
                Hide Image
              </Button>
              <Button onClick={handleClose} sx={{ backgroundColor: "#D3D3D3", color: "white", '&:hover': { backgroundColor: "#D3D3D3" } }} >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </ThemeProvider>
    </div>
  );
};
