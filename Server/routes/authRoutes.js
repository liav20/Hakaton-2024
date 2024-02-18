const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

// Define routes for users
router.post('/signUp', async (req, res) => {
    const data = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        score: 45,
        wins: 0,
        lose: 0,
    });

    try {
        const isUser = await User.findOne({ email: req.body.email })
        if (isUser) {
            return res.json('already a user with this email')
        }
        await User.create(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500);
    }
});

router.post('/signIn', async (req, res) => {
    const { email, password } = req.body
    console.log('email + password', email, password);
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.json('no user found')
    }
    if (user.password !== password) {
        return res.json('wrong password')
    }
    return res.json(user);
});

router.get('/', async (req, res) => {
    res.send("Default Get");
});

router.get('/getUserById/:id?', async (req, res) => {
    console.log(req.query.id);
    res.json(await User.findById(req.query.id));
});

module.exports = router;