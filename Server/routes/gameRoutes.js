const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define routes for users
router.post('/createGame',async (req, res) => {
    
    console.log('hellos from friend');
    // Logic to fetch users from the database
    res.json({ users: [{name:'user1',}] }); // Sample response
});

router.get('/getInfo/:id', (req, res) => {
    // Logic to create a new user in the database
    res.json({ message: 'User created successfully' }); // Sample response
});

router.get('/matchMaking',async (req, res) => {
    const emails= req.body.emails;
    
    
});
// router.get('/EndGame', (req, res) => {
//     // Logic to create a new user in the database
//     res.json({ message: 'User created successfully' }); // Sample response
// });

module.exports = router;
