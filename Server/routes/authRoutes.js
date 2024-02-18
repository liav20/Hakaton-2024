const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

// Define routes for users
router.post('/signUp', async (req, res) => {
    const data = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        await User.create(data);
        res.status(200).json(data);
    } catch(error) {
        res.status(500);
    }
});

router.post('/signIn', async (req, res) => {
    // Logic to create a new user in the database
    
    res.json({ message: 'User created successfully' }); // Sample response
});

router.get('/', async (req, res) => {
    res.send("Default Get");
});

router.get('/getUserById/:id?', async (req, res) => {
    console.log(req.query.id);
    res.json(await User.findById(req.query.id));
});

module.exports = router;
