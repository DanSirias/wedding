import React from 'react';
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Home} from './components/home';
import {Events} from './components/events';
import {Travel} from './components/travel';
import {GiftRegistry} from './components/gift';
import { RSVP } from './components/rsvp';
import { WeddingParty } from './components/weddingparty';
import { CssBaseline } from '@mui/material';
import Navbar from './components/navbar';





const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/events" element={<Events />} />
          <Route path="/weddingparty" element={<WeddingParty />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/gift" element={<GiftRegistry />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;