import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page1 from "./pages/page1";
import Page2 from "./pages/page2"; 
import "./App.css";

function App() {
  return (
    <section className="hero">
      <div className="content">
      <h1>Split-It</h1>
      <p>
      <Router>
        <Routes>
          <Route exact path="/" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} /> 
        </Routes>
      </Router>
      </p>
      </div>
    </section>
  );
}

export default App;
