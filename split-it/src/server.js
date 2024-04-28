const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(bodyParser.json());

// Route for image upload handling
app.post('/upload-image', upload.single('file'), (req, res) => {
    console.log("cwd:", process.cwd())
    // Extract image data from request body
    const file = req.file;

    // Error handling
    if (!file) {
        return res.status(400).json({ error: 'No image file uploaded' });
    }
    
    
    // Image upload for OCR
    // Call Python script with image data as input
    const pythonProcess = spawn('python3', ['../../image-process/real-program.py', file.path]);

    let totalCostData = ''; // Initialize an empty string to accumulate data

    // Handle stdout data from Python script
    pythonProcess.stdout.on('data', (output) => {
        if (output) {
            totalCostData += output.toString();
        }
    });

    pythonProcess.stdout.on('end', () => {
        if (totalCostData) {
            const totalCost = parseFloat(totalCostData.trim());
            // Send the response with the total cost
            res.json({ totalCost });
            console.log(`TC: ${ totalCost }`);
        } else {
            console.error('Received null or undefined data from stdout stream');
            res.status(500).send('Internal Server Error');
        }
    });

    // Success response
    console.log('Uploaded file:', file);
});

// Route for image upload handling
app.post('/upload-image-2', upload.single('file'), (req, res) => {
    console.log("cwd:", process.cwd())
    // Extract image data from request body
    const file = req.file;

    // Error handling
    if (!file) {
        return res.status(400).json({ error: 'No image file uploaded' });
    }
    
    
    // Image upload for OCR
    // Call Python script with image data as input
    const pythonProcess = spawn('python', ['../../text_process/hello_world.py', file.path]);

    let listO = ''; // Initialize an empty string to accumulate data

    // Handle stdout data from Python script
    pythonProcess.stdout.on('data', (output) => {
        if (output) {
            listO += output.toString();
        }
    });

    pythonProcess.stdout.on('end', () => {
        if (listO) {
            const listOrders = JSON.parse(listO.trim());
            // Send the response with the total cost
            res.json({ listOrders });
            console.log(`TC: ${ listOrders }`);
        } else {
            console.error('Received null or undefined data from stdout stream');
            res.status(500).send('Internal Server Error');
        }
    });

    // Success response
    console.log('Uploaded file:', file);
});

const PORT = 3001; //process.env.PORT <- allows dynamic port config by environment (ex, heroku)

app.listen(PORT, () => {
    console.log(`Server is running on port ${ PORT }`);
});