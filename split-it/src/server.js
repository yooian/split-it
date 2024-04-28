const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ dest: '/uploads' });

// Route for image upload handling
app.post('/upload-image', upload.single('image'), (req, res) => {
    // Image upload for OCR

    // Error handling

    // Return total cost
});


const PORT = 3000; //process.env.PORT <- allows dynamic port config by environment (ex, heroku)

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});