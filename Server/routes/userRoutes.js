const express = require('express');
const router = express.Router();

// Define routes for users
router.get('/getFriends/:id', (req, res) => {
    console.log('hellos from friend');
    // Logic to fetch users from the database
    res.json({ users: [{name:'user1',
}] }); // Sample response
});

router.get('/getGames/:id', (req, res) => {
    console.log('hellos from friend');
    // Logic to fetch users from the database
    res.json({ users: [{name:'user1',
}] }); // Sample response
});

router.get('/getInfo/:id', (req, res) => {
    console.log('hellos from friend');
    // Logic to fetch users from the database
    res.json({ users: [{name:'user1',
}] }); // Sample response
});

router.post('/addFriend/:email', (req, res) => {
    // Logic to create a new user in the database
    res.json({ message: 'User created successfully' }); // Sample response
});

router.delete('/removeFriend/:email', (req, res) => {
    // Logic to create a new user in the database
    res.json({ message: 'User created successfully' }); // Sample response
});

module.exports = router;
