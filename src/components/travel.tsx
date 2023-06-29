import React from 'react';
import "../App.css"
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import hou from '../images/htx.jpg'

export const Travel: React.FC = () => {
  return (<>
      <CssBaseline />
      <div style={{ height: '350px', overflow: 'hidden', width: '100%' }}>
        <Container maxWidth="lg" disableGutters style={{ height: '100%', width: '100%' }}>
          <img src={hou} alt="Header Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Container>
        <h2 className="section">Travel</h2>
      </div>

  </>);
};