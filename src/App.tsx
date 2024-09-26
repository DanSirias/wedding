import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from '@mui/material';
import { Home } from './components/home';
import { Events } from './components/events';
import { Travel } from './components/travel';
import { GiftRegistry } from './components/gift';
import { Dashboard } from "./components/dashboard";
import { Login } from "./components/login";
import { RSVP } from './components/rsvp';
import { Guests } from './components/guests';
import { WeddingParty } from './components/weddingparty';
import { Schedule } from "./components/schedule";
import { SignOut } from "./components/signout";
import { Images } from './components/images';
import Navbar from './components/navbar';
import ProtectedRoute from './backend/auth/ProtectedRoute';  // Import ProtectedRoute
import { AuthProvider } from './backend/auth/authContext';  // Import Auth Context


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="" style={{ height: "100vh" }}>
          <CssBaseline />
          <Navbar /> {/* Navbar persists across routes */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/rsvp" element={<RSVP />} />
            <Route path="/guests" element={<Guests />} />
            <Route path="/events" element={<Events />} />
            <Route path="/weddingparty" element={<WeddingParty />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/gift" element={<GiftRegistry />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/images" element={<Images />} />

            {/* Protected Route */}
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
