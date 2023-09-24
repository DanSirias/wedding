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
import Stack from '@mui/material/Stack';
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

interface RSVPFormData {
  firstName: string;
  lastName: string;
  email: string;
  attending: string;
  bringingGuest: string;
  guestFirstName: string | undefined;
  guestLastName: string | undefined;
  mealOption: string;
  foodRestrictions: string | undefined;
  questionsComments: string | undefined;
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#321115",
      dark: "#847072"
    }
  }, 
  components: {
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
});

export const RSVP = () => {
const navigate = useNavigate();
const [attending, setAttending] = useState<string | null>(null);
const [guestAttending, setguestAttending] = useState<string | null>(null);


const handleAttendingChange = (e: ChangeEvent<{ value: unknown }>) => {
  setAttending(e.target.value as string);
};

const schema = yup.object().shape({
    firstName: yup.string().required("You Must Enter a Name"), 
    lastName: yup.string().required("You Must Enter a Name"), 
    email: yup.string().required("You Must Enter an Email"), 
    attending: yup.string().required("Select an option"), 
    bringingGuest: yup.string().required("Select an option"), 
    guestFirstName: yup.string(), 
    guestLastName: yup.string(), 
    mealOption: yup.string().required("Select an option"), 
    foodRestrictions: yup.string(), 
    questionsComments: yup.string(), 
}); 

const { register, handleSubmit, formState: {errors}, } = useForm<RSVPFormData> ({
  resolver: yupResolver(schema), 
});

const postRef = collection(db, "rsvp");

const onCreateRSVP = async (data: RSVPFormData) => {
  await addDoc(postRef, {
    firstName: data.firstName, 
    lastName: data.lastName, 
    email: data.email, 
    attending: data.attending, 
    bringingGuest: data.bringingGuest, 
    guestFirstName: data.guestFirstName, 
    guestLastName: data.guestLastName,
    mealOption: data.mealOption, 
    foodRestrictions: data.foodRestrictions, 
    questionsComments: data.questionsComments,
    rsvpOn: createdOn_timestamp,
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
      R.S.V.P.
    </Typography>
    <Typography sx={{ mt: 1, fontSize: 15 }} className="rsvp">
      Kindly reply by October 1st 2024
    </Typography>
    <img id="" className="namelogo" src={LetterLogo} />

    <Box
      component="form"
      onSubmit={handleSubmit(onCreateRSVP)}
      noValidate
      sx={{ mt: 1, width: '100%' }}
    >
      <Stack    
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 4 }}>
      <TextField
        margin="none"
        size="small"
        required
        fullWidth
        id="firstName"
        label="First Name"
        className={errors.firstName ? 'error' : ''}
        {...register("firstName")}
      />
      <TextField
        margin="none"
        size="small"
        required
        fullWidth
        id="lastName"
        label="Last Name"
        {...register("lastName")}
      />
      </Stack>

      <Grid container sx={{ mt: 1, width: '100%' }}>
                        <TextField
                          margin="none"
                          size="small"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          {...register("email")}
                        />
      <FormControl fullWidth margin="none" size="small" required sx={{ mt: 1, width: '100%' }}>
        <InputLabel id="attending">Are you attending?</InputLabel>
        <Select
          required
          id="Attending"
          label="Attending"
          {...register("attending")}
          onChange={(e) => setAttending(e.target.value as string)}
        >
          <MenuItem value={"Yes"}>Yes, I will be there. </MenuItem>
          <MenuItem value={"No"}>No, I cannot make it. </MenuItem>
        </Select>
      </FormControl>

      </Grid>

      {attending === "Yes" && (
        <>
          <Grid container sx={{ mt: 1, width: '100%' }}>
            <FormControl fullWidth margin="none" size="small" required sx={{ mt: 1, width: '100%' }}>
              <InputLabel id="bringingGuest">Are you bringing a Guest?</InputLabel>
              <Select
                required
                id="bringingGuest"
                label="bringingGuest"
                {...register("bringingGuest")}
                onChange={(e) => setguestAttending(e.target.value as string)}
              >
                <MenuItem value={"Yes"}>Yes</MenuItem>
                <MenuItem value={"No"}>No</MenuItem>
              </Select>
            </FormControl>

            {guestAttending === "Yes" && (
                <>
              <Stack    
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 1, md: 4 }} sx={{ mt: 1, width: '100%' }}>
                                    <Grid item xs={12} sm={6}>
                                      <TextField
                                                          margin="none"
                                size="small"
                                        required
                                        fullWidth
                                        id="guestFirstName"
                                        label="Guest First Name"
                                        {...register("guestFirstName")}
                                      />
                                      {/* <p style={{color:"red", fontSize:25,}}>{errors.guestFirstName?.message}</p> */}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <TextField
                                        margin="none"
                                        size="small"
                                        required
                                        fullWidth
                                        id="guestLastName"
                                        label="Guest Last Name"
                                        {...register("guestLastName")}
                                      />
                                      {/* <p style={{color:"red"}}>{errors.guestLastName?.message}</p> */}
                                    </Grid>

              </Stack>
              </>
            )}

            <Stack    
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 1, md: 4 }} sx={{ mt: 1, width: '100%' }}>
            <Grid container item sx={{ mt: 1, width: '100%' }}>
              
              {/* This Grid item will hold the Typography */}
              <Grid item xs={6}>
                <Typography sx={{ mt: 1, fontSize: 15, color: "grey" }} className="rsvp">
                  *Main Entrée For All Guests: Filet Mignon Steak <br></br>
                  Kindly inform us of any dietary requirements. 
                </Typography>
              </Grid>
              
              {/* This Grid item will hold the FormControl */}
              <Grid item xs={6}>
                <FormControl 
                  fullWidth                   
                  margin="none"
                  size="small" 
                  required>
                  <InputLabel id="mealOptionLabel">Food Restrictions Choice?</InputLabel>
                  <Select
                    required
                    id="mealOption"
                    label="Main Course/Entrées Option"
                    {...register("mealOption")}
                  >
                    <MenuItem value={"Chicken"}>Chicken</MenuItem>
                    <MenuItem value={"Vegan"}>Vegan</MenuItem>
                    <MenuItem value={"Vegetarian"}>Vegetarian</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              {/* Uncomment this if you want to show error messages */}
              {/* <Grid item xs={12}>
                <p style={{color:"red", fontSize:25}}>{errors.mealOption?.message}</p>
              </Grid> */}
            </Grid>
            </Stack>
                  <Grid item xs={12}>
                    <TextField
                      margin="none"
                      size="small"
                      fullWidth
                      id="questionsComments"
                      label="Questions, Children Names, or Comments?"
                      multiline
                      rows={4}
                      {...register("questionsComments")}
                    />
                    {/* <p style={{color:"red", fontSize:25,}}>{errors.questionsComments?.message}</p> */}
                  </Grid>
          </Grid>
        </>
      )}
  
                  
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
        Submit
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



      /* 
      
      
      
      */