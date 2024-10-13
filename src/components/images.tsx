import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Dialog, DialogTitle } from "@mui/material";
import cam from "../images/camera.svg";
import "../App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RetrivedImages } from "./retreiveImages";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#321115",
      dark: "#847072",
    },
  },
});

const apiUrl = process.env.REACT_APP_API_IMAGES || "https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/images";

export const Images: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [comment, setComment] = useState("");
  const [galleryKey, setGalleryKey] = useState(0);
  const [open, setOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      console.log("File selected:", selectedFile);
      setFile(selectedFile);
    }
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    console.log("Form submitted!");

    if (!file) {
      alert("Please select an image.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        console.log("File loaded and ready to upload.");
        const base64File = reader.result?.toString().split(",")[1];
        if (!base64File) {
          throw new Error("File conversion failed");
        }

        const payload = {
          fileName: file.name,
          fileContent: base64File,
          firstName,
          lastName,
          comment,
          dateUpload: new Date().toISOString(),
        };

        const response = await fetch("https://eqlh2tuls9.execute-api.us-east-1.amazonaws.com/PROD/images", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          console.log("Upload successful!");
          setFile(null);
          setFirstName("");
          setLastName("");
          setComment("");
          setOpen(true);
          setTimeout(() => setOpen(false), 3000);
          setGalleryKey((prevKey) => prevKey + 1);
        } else {
          console.error("Upload failed:", await response.text());
          alert("An error occurred while uploading the image.");
        }
      };
    } catch (error) {
      console.error("Error during upload:", error);
      alert("An error occurred while uploading the image.");
    }
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <div style={{ padding: 30, height: "100%" }}>
      <ThemeProvider theme={defaultTheme}>
        <Container
          sx={{
            border: 1,
            borderColor: "lightgray",
            boxShadow: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="imageShare"
          component="main"
          maxWidth="sm"
        >
          <CssBaseline />

          <Typography id="reccs" component="h2" variant="h5">
            Making Memories Together
          </Typography>
          <Typography sx={{ mt: 1, fontSize: 15 }} className="rsvp">
            Share your wedding pictures with us!
          </Typography>

          <Box component="form" onSubmit={handleUpload} noValidate sx={{ mt: 1, textAlign: "center" }}>
            <label htmlFor="upload-button">
              <input
                type="file"
                accept="image/*"
                id="upload-button"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <span
                className="upload-button"
                style={{
                  display: "inline-block",
                  cursor: "pointer",
                  padding: "25px",
                  border: "1px dashed lightgray",
                  borderRadius: "4px",
                  textAlign: "center",
                  margin: 10,
                }}
              >
                <img
                  src={cam}
                  alt="Upload"
                  style={{
                    width: "24px",
                    height: "24px",
                    marginRight: "8px",
                    verticalAlign: "middle",
                  }}
                />
                {file ? file.name : "Upload Image"}
              </span>
            </label>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="none"
                  size="small"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="none"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  size="small"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="none"
                  fullWidth
                  id="questionsComments"
                  label="Leave a Note"
                  size="small"
                  multiline
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Grid>
            </Grid>
            <Typography sx={{ mt: 0, fontSize: 15, color: "grey", textAlign: "left" }} className="rsvp">
              *required
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 0, mb: 2 }}
              color="primary"
            >
              Upload Image
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Thank you</DialogTitle>
            </Dialog>
          </Box>
        </Container>
        <Container maxWidth="xl" style={{ height: "100%", width: "100%" }}>
          <RetrivedImages key={galleryKey} />
        </Container>
      </ThemeProvider>
    </div>
  );
};
