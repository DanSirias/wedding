import React from 'react';
import { useState } from "react";
import { auth, googleProvider } from "../backend/firebase-config";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signInWithEmailAndPassword, 
    signOut,
  } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../App.css"
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import hou from '../images/htx.jpg'
//import { Button, Col, Container, Form, Navbar } from "react-bootstrap";

export const Login = () => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const signIn = async () => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User Signed In"); 
        navigate('/'); 
      } catch (err) {
        console.error(err);
      }
    };
  
    const signInWithGoogle = async () => {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (err) {
        console.error(err);
      }
    };
  
    const logout = async () => {
      try {
        await signOut(auth);

      } catch (err) {
        console.error(err);
      }
    };
  
    return (
      <div>
        <input
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password..."
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn}> Sign In</button>
{/*         <button onClick={signInWithGoogle}> Sign In With Google</button> */}
        <button onClick={logout}> Logout </button>

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