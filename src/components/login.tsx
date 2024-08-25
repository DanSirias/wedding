import React, { useState } from "react";
import { signIn } from '@aws-amplify/auth';
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {awsConfig} from "../backend/awsCognito"
import {Amplify} from 'aws-amplify';  // Correct import for Amplify
import { Auth } from '@aws-amplify/auth';

Amplify.configure(awsConfig as any); // Configure Amplify with your AWS settings

export const Login: React.FC<{ onSignIn: () => void }> = ({ onSignIn }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate(); 

  const handleSignIn = async (): Promise<void> => {
    try {
      await Auth.signIn(username, password);
      onSignIn();
      navigate("/dashboard");
    } catch (err) {
      setError("Incorrect username or password");
      console.error("Error signing in", err);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" gutterBottom>
        Sign In
      </Typography>
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Button variant="contained" color="primary" fullWidth onClick={handleSignIn}>
        Sign In
      </Button>
    </Container>
  );
};