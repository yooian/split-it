import React, { useState }  from 'react'; // Import useState from React

function Page2() { // Change function name to start with uppercase letter
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
    <div className="App">
      <div className="content">
        <form onSubmit={handleOnSubmit}>
          <input type="file" name="image" 
                onChange={handleOnChange} 
                accept="image/*" /> 
          <p></p>
          <div className='button-submit'>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default Page2; // Change export name to Page2
