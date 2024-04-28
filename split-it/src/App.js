import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import F_PAGE_1 from "./pages/f_page_1";
import F_PAGE_2 from "./pages/f_page_2";
import F_PAGE_3 from './pages/f_page_3';

import { Typography } from '@mui/material';

function App(){
  return (
      <section className="hero">
        <div className="content">
          <Typography variant='h1'>Split-It</Typography>
          <p>
            <Router>
              <Routes>
                <Route exact path="/" element={<F_PAGE_1 />} />
                <Route path="/f_page_2" element={<F_PAGE_2 />} />
                <Route path="/f_page_3" element={<F_PAGE_3 />} />
              </Routes>
            </Router>
          </p>
        </div>
    </section>
  );
}

export default App;