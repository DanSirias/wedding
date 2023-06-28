import React from 'react';
import './App.css';
import logo from './images/RDlogo.svg'; 
import {Navbar} from './components/navbar'

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
      <img className='logo' src={logo} alt="Logo" /> 
      </header>        <p>
          COMING SOON
        </p>
    </div>
  );
}

export default App;
