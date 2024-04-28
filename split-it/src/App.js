import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Page1 from "./pages/page1";
import Page2 from "./pages/page2"; 
import "./App.css";
import { useState } from "react";

function App() {
  const [message, setMessage] = useState('ready');
  const [file, setFile] = useState(null);

  async function handleOnSubmit(e) {
    e.preventDefault();

    if (typeof file === 'undefined' || file === null) return; // Check if file is undefined or null

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'test-react-uploads-unsigned');

    try {
      const response = await fetch('http://localhost:3001/upload-image', { // Fixed the URL
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        console.log('Image uploaded successfully');
        setMessage('Image uploaded successfully');
      } else {
        console.error('Failed to upload image');
        setMessage('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Error uploading image');
    }
  }

  function handleOnChange(e) {
    const target = e.target;
    if (target.files.length > 0) {
      setFile(target.files[0]);
    }
  }

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
