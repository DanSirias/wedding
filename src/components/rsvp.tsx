import React, { SyntheticEvent, ChangeEvent, FormEvent, ChangeEventHandler } from "react";
import { useState } from "react";
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
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from "@mui/material/FormControl";
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material';

interface RSVPFormData {
  firstName: string;
  lastName: string;
  email: string;
  attending: string;
  bringingGuest: string;
  guestFirstName: string;
  guestLastName: string;
  mealOption: string;
  foodRestrictions: string;
  questionsComments: string;
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

export const RSVP = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = React.useState(true);

  const [formData, setFormData] = useState<RSVPFormData>({
    firstName: "",
    lastName: "",
    email: "",
    attending: "",
    bringingGuest: "",
    guestFirstName: "",
    guestLastName: "",
    mealOption: "",
    foodRestrictions: "",
    questionsComments: "",
  });



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

        // const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        // const { name, value } = e.target;
        // setFormData((prevformData) => ({ ...prevformData, [name as string]: value as string }));
        // };

        const handleChange = (e: any) => {
          setFormData((prevformData) => ({ ...prevformData, [e.target.name]: e.target.value,}));
        }; 


  return (
      <div className="" style={{ padding: 30, height: "100%" }}>
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
              <Typography component="h1" variant="h5">
                R.S.V.P
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="normal" required>
                      <InputLabel id="attending">Are you attending?</InputLabel>
                      <Select
                        required
                        id="Attending"
                        value={formData.attending}
                        onChange={handleChange}
                        label="Attending test"
                        name="attending"
                      >
                        <MenuItem value={"Yes"}>SHiiiiii Hell Yes... Whoop!</MenuItem>
                        <MenuItem value={"No"}>Fuck No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="normal" required>
                      <InputLabel id="bringingGuest">Are you bringing a Guest?</InputLabel>
                      <Select
                        required
                        id="bringingGuest"
                        value={formData.bringingGuest}
                        onChange={handleChange}
                        label="bringingGuest"
                        name="bringingGuest"
                      >
                        <MenuItem value={"Yes"}>Yes</MenuItem>
                        <MenuItem value={"No"}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {formData.bringingGuest === "Yes" && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="guestFirstName"
                          label="Guest First Name"
                          name="guestFirstName"
                          value={formData.guestFirstName}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="guestLastName"
                          label="Guest Last Name"
                          name="guestLastName"
                          value={formData.guestLastName}
                          onChange={handleChange}
                        />
                      </Grid>
                    </>
                  )}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="normal" required>
                      <InputLabel id="mealOption">Main Course/Entrées Option</InputLabel>
                      <Select
                        required
                        id="mealOption"
                        label="Main Course/Entrées Option"
                        name="mealOption"
                        value={formData.mealOption}
                        onChange={handleChange}
                      >
                        <MenuItem value={"Yes"}>Beef</MenuItem>
                        <MenuItem value={"No"}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="foodRestrictions"
                      label="Any Food Restrictions?"
                      name="foodRestrictions"
                      value={formData.foodRestrictions}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="questionsComments"
                      label="Questions or Comments?"
                      name="questionsComments"
                      value={formData.questionsComments}
                      onChange={handleChange}
                      multiline
                      rows={4}
                    />
                  </Grid>
                </Grid>
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
