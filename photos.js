const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

// Set the storage location and filename for uploaded files
const storage = multer.diskStorage({
    destination: './uploads/', // Directory where files will be saved
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// Initialize multer with storage options
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 } // Limit file size to 1MB
}).single('fileToUpload');

// Serve static files
app.use(express.static(path.join(__dirname)));

// Serve uploaded files as static
app.use('/uploads', express.static('uploads'));

// Handle file upload
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).send('Error uploading file.');
        }
        // Show success message and link to view photos
        res.send(`
            <h1>File Uploaded Successfully!</h1>
            <a href="/photos.html">
                <button style="padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 5px;">View All Uploaded Photos</button>
            </a>
        `);
    });
});

// Endpoint to fetch list of uploaded images
app.get('/uploaded-images', (req, res) => {
    fs.readdir('./uploads/', (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read uploads folder' });
        }
        res.json(files); // Return the list of uploaded images as JSON
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
