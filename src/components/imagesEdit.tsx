import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Typography, Box, Card, CardMedia, Dialog, DialogContent, DialogActions, Button,
} from '@mui/material';
import axios from 'axios';  // Import axios
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

  // Fetch the images from the API using axios
  const getPosts = async () => {
    try {
      const response = await axios.get('https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/images');
      setPostList(response.data.images);  // Set the images from the response
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

  // Function to hide the image by sending a PUT request using axios with enhanced error handling
  const handleHideImage = async (imageId: string) => {
    try {
      // Find the selected post to get the lastName
      const selectedPost = postsList.find(post => post.imageId === imageId);
      const lastName = selectedPost ? selectedPost.lastName : '';

      if (!lastName) {
        console.error("Last name is missing for this image.");
        alert('Last name is required to hide the image.');
        return;
      }

      console.log('Sending PUT request with imageId:', imageId, 'and lastName:', lastName);

      // Send the PUT request using axios with the updated format
      await axios.put(
        'https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/images', 
        { 
          imageId,  // Send imageId in the request body
          lastName  // Include the lastName in the request body
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,  // Ensure proper authorization
            'Content-Type': 'application/json', // Include the content type for JSON
          },
        }
      );

      console.log('Image hidden successfully');
      setOpen(false);  // Close the dialog after hiding the image
      getPosts();  // Refresh the posts list to reflect changes
    } catch (error) {
      // Handle errors during the PUT request
      if (axios.isAxiosError(error)) {
        // Axios-specific error handling
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error('Server responded with error:', error.response.status, error.response.data);
          alert(`Failed to hide the image. Server responded with status: ${error.response.status}`);
        } else if (error.request) {
          // Request was made but no response received
          console.error('No response received from server:', error.request);
          alert('Failed to hide the image. No response received from server.');
        } else {
          // Other errors like request setup
          console.error('Error setting up the request:', error.message);
          alert(`Error setting up the request: ${error.message}`);
        }
      } else {
        // Non-Axios error handling
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred while hiding the image.');
      }
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
