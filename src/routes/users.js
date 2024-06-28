const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Register User
router.post('/register', async (req, res) => {
    const { name, email, password, state } = req.body;
    try {
        let user = new User({ name, email, password, state });
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get User by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
