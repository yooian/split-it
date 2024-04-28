import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page1 from "./pages/page1";
import F_Page_2 from "./pages/f_page_2"; 

import { ThemeProvider, Typography, createTheme } from '@mui/material';
import Button from '@mui/material/Button';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PublishIcon from '@mui/icons-material/Publish';

const theme = createTheme();

function App(){
  return (
      <section className="hero">
        <div className="content">
          <Typography variant='h1'>Split-It</Typography>
          <p>
            <Router>
              <Routes>
                <Route exact path="/" element={<Page1 />} />
                <Route path="/f_page_2" element={<F_Page_2 />} /> 
              </Routes>
            </Router>
          </p>
        </div>
    </section>
  );
}

export default App;