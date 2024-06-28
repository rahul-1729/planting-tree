const express = require('express');
const router = express.Router();
const Plant = require('../models/plant');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Post a Plant with a Selfie
router.post('/', upload.single('image'), async (req, res) => {
    const { user, state } = req.body;
    const imageUrl = req.file.path;
    try {
        let plant = new Plant({ user, state, imageUrl });
        await plant.save();
        res.json(plant);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get all Plants
router.get('/', async (req, res) => {
    try {
        const plants = await Plant.find().populate('user', ['name', 'state']);
        res.json(plants);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete a Plant by ID
router.delete('/:id', async (req, res) => {
    try {
        await Plant.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Plant removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
