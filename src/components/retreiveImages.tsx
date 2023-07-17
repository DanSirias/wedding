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
import { getDocs, collection, Timestamp, Index } from "firebase/firestore";//this is how you add a document back to the database
import { db } from "../backend/firebase-config";
import { storage } from "../backend/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { serverTimestamp } from 'firebase/firestore'; 
import { uuid } from 'uuidv4';
import Dropzone from "react-dropzone";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#321115",
      dark: "#847072"
    }
  }, 
});

export interface imagePost {
  id: string, 
  imageURL: string; 
  imageName: string;
  firstName: string; 
  lastName: string; 
  comment: string; 
  dateUpload: Timestamp; 
}


export const RetrivedImages = () => {
 
  const postsRef = collection(db, "images"); //this is your database and the NOSQL docs
  const [postsList, setPostList] = useState< imagePost [] | null>(null); //Array of post make sure the [] is included
  let [color, setColor] = useState("#ffffff");


  const getPosts = async () => {
    const data = await getDocs(postsRef); 
    //console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as imagePost []); 
  }

    //Called when rendered 
    useEffect(() => {
      console.log("Rendering"); 
      getPosts(); //calls the function and renders the data
    }, []); 

    const getFormattedDate = (dateUpload: any): string => {
      if (dateUpload instanceof Date) {
        return dateUpload.toLocaleDateString();
      } else if (dateUpload && dateUpload.toDate instanceof Function) {
        return dateUpload.toDate().toLocaleDateString();
      } else {
        return "Unknown Date";
      }
    };

return (
  <div className="" style={{ padding: 30, height: "100%" }}>
    <ThemeProvider theme={defaultTheme}>
    <Container id="cardHolder" maxWidth={false} style={{ height: "100%", width: "70%" }}>
            <Typography id="reccs" component="h2" variant="h5"
            sx={{
              width: "100%",
              display: "flex",
              justifyContent:"center",
              alignItems:"center",
            }}>
             A Journey of Forever
            </Typography>
            <Typography id="" component="h5" variant="h5"   
            sx={{
                width: "100%",
                marginTop: 0, 
                display: "flex",
                justifyContent:"left",
                alignItems:"left",
              }}>
            </Typography>

            <Box   sx={{
                width: "100%",
                marginTop: 0, 
                justifyContent:"center",
                alignItems:"center",
                align:"center"
              }}>
            <Grid container justifyContent="center" rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: "auto" }}>
              {postsList && postsList.map((post) => (
                <Grid item xs={12} md={4} lg={'auto'} key={post.id}>
                  <Card sx={{ maxWidth: 345, border: 1, borderColor: "lightgray", boxShadow: 2 }}>
                    <CardMedia
                      component="img"
                      alt={post.imageName}
                      height="140"
                      image={post.imageURL}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {post.firstName} {post.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {post.comment} {/* Assuming `dateUpload` is a Firebase Timestamp */}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button href={post.imageURL} size="small">View Image</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            </Box>
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
