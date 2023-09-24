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
import bench from '../images/bench.jpg';
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
import { useAuthState } from "react-firebase-hooks/auth";
import { serverTimestamp } from 'firebase/firestore'

const createdOn_timestamp = serverTimestamp(); 

interface GuestFormData {
  rsvpNum: number;
  firstName: string;
  lastName: string;
  guestsNum: number;
  streetAddress: string;
  city: string;
  state: string;
  zip: number;
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#321115",
      dark: "#847072"
    }
  }, 
});

export const Guests = () => {
const navigate = useNavigate();

const schema = yup.object().shape({
    rsvpNum: yup.number().required("You Must Enter a Num"), 
    firstName: yup.string().required("You Must Enter a Name"), 
    lastName: yup.string().required("You Must Enter a Name"), 
    guestsNum: yup.number().required("You Must Enter a Num"), 
    streetAddress: yup.string().required("You Must Enter an Address"), 
    city: yup.string().required("You Must Enter a City"), 
    state: yup.string().required("You Must Enter a State"), 
    zip: yup.number().required("You Must Enter a Zip")
}); 

const { register, handleSubmit, formState: {errors}, } = useForm<GuestFormData, any> ({
  resolver: yupResolver(schema), 
});

const postRef = collection(db, "guests");

const onCreateGuests = async (data: GuestFormData) => {
  await addDoc(postRef, {
    rsvpNum: data.rsvpNum,
    firstName: data.firstName, 
    lastName: data.lastName, 
    guestsNum: data.guestsNum, 
    streetAddress: data.streetAddress,
    city: data.city, 
    state: data.state, 
    zip: data.zip,
    createdOn: createdOn_timestamp,
  }); 
  console.log(data); 
  navigate("/"); 
};


  return (
      <div className="rsvpBack" style={{ padding: 30, height: "100%" }}>
        <ThemeProvider theme={defaultTheme}>
          <Container
            sx={{ border: 1, borderColor: "lightgray", boxShadow: 4 }}
            className="rsvp"
            component="main"
            maxWidth="md"
          >
            <CssBaseline />
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h3">
                Add New Guest Reservation
              </Typography>
              <Typography sx={{ mt: 1, fontSize: 15 }} className="rsvp">
                Kindly reply for each guest by October 1st
              </Typography>
              <img id="" className="namelogo" src={LetterLogo}/>
              <Box
                component="form"
                onSubmit={handleSubmit(onCreateGuests)}
                noValidate
                sx={{ mt: 1 }}
              >
                <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <TextField
                       margin="none"
                      size="small"
                      required
                      fullWidth
                      id="rsvpNum"
                      label="RSVP #"
                      className={errors.rsvpNum ? 'error' : ''}
                      {...register("rsvpNum")}
                    />{/* <p style={{color:"red", fontSize:25,}}>{errors.firstName?.style({borderColor:"red"})}</p> */}
                  </Grid>
                  <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row', lg: 'row' },
                        gap: 2,
                      }}
                  >
                  <Grid item xs={12} sm={6}>
                    <TextField
                       margin="none"
                      size="small"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      className={errors.firstName ? 'error' : ''}
                      {...register("firstName")}
                    />{/* <p style={{color:"red", fontSize:25,}}>{errors.firstName?.style({borderColor:"red"})}</p> */}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                  margin="none"
                  size="small"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      {...register("lastName")}
                    />
                    {/* <p style={{color:"red", fontSize:25,}}>{errors.lastName?.message}</p> */}
                  </Grid>
                  </Box>

                  <Grid item xs={12} sm={6}>
                    <TextField
                                        margin="none"
                  size="small"
                      required
                      fullWidth
                      id="street"
                      label="Street"
                      {...register("streetAddress")}
                    />
                    {/* <p style={{color:"red", fontSize:25,}}>{errors.email?.message}</p> */}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                  margin="none"
                  size="small"
                      required
                      fullWidth
                      id="City"
                      label="City"
                      {...register("city")}
                    />
                    {/* <p style={{color:"red", fontSize:25,}}>{errors.email?.message}</p> */}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField
                  margin="none"
                  size="small"
                      required
                      fullWidth
                      id="state"
                      label="State"
                      {...register("state")}
                    />
                    {/* <p style={{color:"red", fontSize:25,}}>{errors.email?.message}</p> */}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField
                  margin="none"
                  size="small"
                      required
                      fullWidth
                      id="zip"
                      label="Zip Code"
                      {...register("zip")}
                    />
                    {/* <p style={{color:"red", fontSize:25,}}>{errors.email?.message}</p> */}
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
                  Add New
                </Button>
              </Box>
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
