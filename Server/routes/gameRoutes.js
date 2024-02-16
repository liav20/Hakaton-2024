const express = require('express');
const router = express.Router();

// Define routes for users
router.post('/createGame', (req, res) => {
    
    console.log('hellos from friend');
    // Logic to fetch users from the database
    res.json({ users: [{name:'user1',}] }); // Sample response
});

router.get('/EndGame', (req, res) => {
    // Logic to create a new user in the database
    res.json({ message: 'User created successfully' }); // Sample response
});

module.exports = router;
