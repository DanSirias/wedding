import React from 'react';
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Home} from './components/home';
import {Events} from './components/events';
import {Travel} from './components/travel';
import {GiftRegistry} from './components/gift';
import { Login } from "./components/login";
import { RSVP } from './components/rsvp';
import { WeddingParty } from './components/weddingparty';
import { CssBaseline } from '@mui/material';
import Navbar from './components/navbar';
import Container from "@mui/material/Container";


const styles = {
  container: {
    backgroundColor: "rgba(0,0,0,.4)"
  },
  containerMd: {
    "&.MuiContainer-maxWidthMd": {
      maxWidth: 2500
    }
  },

  typography: {
    height: "33.333vh"
  }
};



const App: React.FC = () => {
  return (
    <Router>

  <div className="" style={{ height: "100vh",}}>
    <CssBaseline />
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/events" element={<Events />} />
          <Route path="/weddingparty" element={<WeddingParty />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/gift" element={<GiftRegistry />} />
          <Route path="/login" element={<Login />} />
        </Routes>
          </div> 
    </Router>
  );
};

export default App;