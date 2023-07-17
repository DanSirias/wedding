import React, { SyntheticEvent, ChangeEvent, FormEvent, ChangeEventHandler } from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import * as yup from "yup";
import { auth, googleProvider } from "../backend/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,UploadTask, UploadTaskSnapshot
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { shadows } from '@mui/system';
import Logo from '../images/RDlogo_sage.svg'; 
import LetterLogo from '../images/names.svg';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from "@mui/material/FormControl";
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material';
import date from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore"; //this is how you add a document back to the database
import { db } from "../backend/firebase-config";
import { storage } from "../backend/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { serverTimestamp } from 'firebase/firestore'; 
import { uuid } from 'uuidv4';
import Dropzone from "react-dropzone";
import {RetrivedImages} from './retreiveImages'

const createdOn_timestamp = serverTimestamp(); 

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#321115",
      dark: "#847072"
    }
  }, 
});

export const Images = () => {
  const [file, setFile] = useState<File | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [comment, setComment] = useState("");
  const [percent, setPercent] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      alert("Please select an image.");
      return;
    }
    try {
      const imageRef = ref(storage, `eventImages/${file.name}`);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      const imageData = {
        firstName,
        lastName,
        comment,
        imageName: file.name,
        dateUpload: new Date().toISOString(),
        imageURL: downloadURL,
      };
      await addDoc(collection(db, "images"), imageData);
      // Reset form
      setFile(null);
      setFirstName("");
      setLastName("");
      setComment("");
      setPercent(0);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while uploading the image.");
    }
  };


// Define your custom theme if needed
const theme = createTheme();

return (
  <div className="" style={{ padding: 30, height: "100%" }}>
    <ThemeProvider theme={defaultTheme}>
      <Container
        sx={{ border: 1, borderColor: "lightgray", boxShadow: 4 }}
        className="imageShare"
        component="main"
        maxWidth="md"
      >
        <CssBaseline />

        <Box sx={{ marginTop: 2, alignItems: "center" }}>
          <Typography id="reccs" component="h2" variant="h5"
            sx={{
              width: "100%",
              display: "flex",
              justifyContent:"center",
              alignItems:"center",
            }}>
               Making Memories Together
            </Typography>
          <Typography sx={{ mt: 1, fontSize: 15 }} className="rsvp">
            Share your wedding pictures with us!
          </Typography>
          {/* Add your logo component here */}
          <Box component="form" onSubmit={handleUpload} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {/* <p>{percent}% done</p> */}
                <TextField
                  margin="normal"
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
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="questionsComments"
                  label="Questions or Comments?"
                  multiline
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Grid>
            </Grid>
            <Typography sx={{ mt: 1, fontSize: 15, color: "grey" }} className="rsvp">
              *required
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="primary"
            >
              Upload Image
            </Button>
          </Box>
        </Box>
      </Container>
      <Container>
      <RetrivedImages />
      </Container>
    </ThemeProvider>
  </div>
);
};
/* 
  
          <Container style={{ maxWidth: "500px" }} fluid>
        <Form className="mt-4">
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="email" />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="password" />
          </Form.Group>
          <Form.Row>
            <Col xs={6}>
              <Button type="button" block>
                Sign Up
              </Button>
            </Col>
            <Col xs={6}>
              <Button type="button" variant="secondary" block>
                Sign In
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Container>
  */
