import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState('ready');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  async function handleOnSubmit(e) {
    e.preventDefault();

    if (!file) return; 

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'test-react-uploads-unsigned');

    try {
      const response = await fetch('http://localhost:3000/upload-image', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        console.log('Image uploaded successfully');
        setMessage('Image uploaded successfully');
      } else {
        const errorResponse = await response.json();
        console.error('Failed to upload image: ', errorResponse);
        setMessage('Failed to upload image: ' + errorResponse.message);
      }
    } catch (error) {
      console.error('Error uploading image: ', error);
      setMessage('Error uploading image: ' + error.message);
    }
  }

  function handleOnChange(e) {
    const target = e.target;
    if (target.files.length > 0) {
      const selectedFile = target.files[0];
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; 
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onload = function(event) {
          setPreview(event.target.result); 
        };
        reader.readAsDataURL(selectedFile);
      } else {
        console.log('Selected file is not a supported image type.');
        setMessage('Please select a JPEG, PNG, or GIF image.');
        setPreview(null); 
        target.value = ''; 
      }
    }
  }

  return (
    <div className="App">
      <div className="content">
        <h1>Split-it</h1>
      
        <form onSubmit={handleOnSubmit}>
          <input type="file" 
                name="image" 
                accept="image/jpeg, image/png, image/gif" 
                onChange={handleOnChange}
          />
          <p></p>
          {preview && <img src={preview} alt="Preview" style={{ width: '400px', height: 'auto' }} />} 
          <p></p>
          <button type="submit">Submit</button>
        </form>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default App;
