import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Family from './pages/Family';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <Link to="/" className='home-link'>
            <h1 className="name">SPLIT-IT</h1>
          </Link>
        </nav>
        <div>
          <Routes>
            <Route path="/family" element={<Family />} />
            {/* Render the "Family" button only if the current route is not "/family" */}
            <Route path="*" element={<FamilyButton />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

function FamilyButton() {
  return (
    <Link to="/family">
      <button className="bigButton">Family</button>
    </Link>
  );
}

export default App;
