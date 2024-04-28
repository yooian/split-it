import React from 'react'; // Import useState from React
import { useNavigate } from "react-router-dom";
import { Button, styled, Stack } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from "react";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function I_Page_2() {
  const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event)=> {
      const file = event.target.files[0];
      

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        formData.append('upload_preset', 'test-react-uploads-unsigned');
    
        try {
          const response = await fetch('http://localhost:3001/upload-image-2', {
            method: 'POST',
            body: formData
          });
              if (response.ok) {
                console.log('Image uploaded successfully');
        
                const data = await response.json();
                const listOrders = data.listOrders;
                console.log('Total Cost:', listOrders);
                navigate("/i_page_3", { state: { listOrders }});

              } else {
                console.error('Failed to upload image');
                setMessage('Failed to upload image. Please take another picture and try again');
              }
            
          
          } catch (error) {
          console.error('Error uploading image:', error);
          setMessage('Error uploading image. Please take another picture and try again'); 
        }
      }
    };
    return (
      <Stack sx={{flexDirection: "column", spacing: "10", alignItems: "center", justifyContent: "space-between"}}>
        <Button
          component="label"
          role={undefined}
          width="100"
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" onChange={handleSubmit}/>
        </Button>
        <p>{message}</p>
      </Stack>
    );
}
export default I_Page_2;