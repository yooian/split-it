import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { animated, useTransition } from 'react-spring';
import F_PAGE_1 from "./pages/f_page_1";
import F_PAGE_2 from "./pages/f_page_2";
import F_PAGE_3 from './pages/f_page_3';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from "./theme";

import { Box, Typography } from '@mui/material';


function App(){
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{flexDirection: "column", display: "flex", justifyContent: "space-between"}}>
          <Typography variant='h1' align='center' paddingTop={10} paddingBottom={8}>Split-It</Typography>
          <p>
            <Router>
              <Routes>
                <Route exact path="/" element={<F_PAGE_1 />} />
                <Route path="/f_page_2" element={<F_PAGE_2 />} />
                <Route path="/f_page_3" element={<F_PAGE_3 />} />
              </Routes>
            </Router>
          </p>
      </Box>
    </ThemeProvider>
  );
}

export default App;