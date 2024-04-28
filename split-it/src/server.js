const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

// Route for image upload handling
app.post('/upload-image', upload.single('image'), (req, res) => {
    const file = req.file;

    // Error handling
    if (!file) {
        return res.status(400).json({ error: 'No image file uploaded' });
    }
        
    // Image upload for OCR


    // Return total cost

    // Success response
    console.log('Uploaded file:', file);
    res.status(200).json({ message: 'Image uploaded successfully' });
});


const PORT = 3001; //process.env.PORT <- allows dynamic port config by environment (ex, heroku)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});