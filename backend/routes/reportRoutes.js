const express = require('express');
const multer = require('multer');
const path = require('path');
const Report = require('../models/Report');

const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Report submission route
router.post('/submit', upload.single('image'), async (req, res) => {
    try {
        console.log('Received Request:', req.body);
        console.log('File:', req.file);

        const { description, latitude, longitude } = req.body;

        if (!description || !latitude || !longitude) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'Image upload failed' });
        }

        const report = new Report({
            description,
            image: req.file.filename,
            location: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
            }
        });

        await report.save();
        res.status(201).json({ message: 'Report submitted successfully', report });

    } catch (err) {
        console.error('Error saving report:', err);
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
