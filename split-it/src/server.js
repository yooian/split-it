const express = require('../node_modules/express');
const cors = require('../node_modules/cors');
const multer = require('../node_modules/multer');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

// Route for image upload handling
app.post('/upload-image', upload.single('file'), (req, res) => {
    const file = req.file;
    // Image upload for OCR

    // Error handling

    // Return total cost
    console.log('Uploaded file:', file);
    res.status(200).json({ message: 'DOGS' });
});


const PORT = 3001; //process.env.PORT <- allows dynamic port config by environment (ex, heroku)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});