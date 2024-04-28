import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('ready');
  const [image, setImage] = useState(null);

  const handleOnChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (typeof image === 'undefined' || image === null) return; // Check if file is undefined or null

    const formData = new FormData();
    formData.append('image', image);
    //formData.append('upload_preset', 'test-react-uploads-unsigned');

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
  };

  return (
    <div className="App">
      <div className="content">
        <h1>Split-it</h1>
      
        <form onSubmit={handleOnSubmit}>
          <input type="file" onChange={handleOnChange} />
          <p></p>
          <button type="submit">Submit</button>
        </form>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default App;
