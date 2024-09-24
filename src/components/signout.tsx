import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export const SignOut = () => {
  const [open, setOpen] = useState(true); // State to manage the dialog visibility
  const [confirmed, setConfirmed] = useState(false); // State to track if user has confirmed

  // Handle confirmation click
  const handleConfirm = () => {
    setConfirmed(true);
    setOpen(false); // Close the dialog
  };

  // Handle cancel click
  const handleCancel = () => {
    setOpen(false); // Close the dialog
  };

  useEffect(() => {
    if (confirmed) {
      // Clear session storage or any other storage where the tokens are stored
      sessionStorage.removeItem('id_token');
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');

      // AWS Cognito sign-out URL
      const cognitoDomain = process.env.REACT_APP_API_COGNITODOMAIN;
      const clientId = process.env.REACT_APP_API_CLIENTID;
      const logoutUrl = `https://${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${window.location.origin}`;

      // Redirect to AWS Cognito logout URL
      window.location.href = logoutUrl;
    }
  }, [confirmed]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Sign Out Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to sign out? You will need to log in again to access your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="contained" autoFocus>
            Yes, Log me out
          </Button>
        </DialogActions>
      </Dialog>

      {confirmed && (
        <Typography variant="h5" component="div">
          Signing you out...
        </Typography>
      )}
    </Box>
  );
};
