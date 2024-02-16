const express = require('express');
const router = express.Router();

// Define routes for users
router.post('/signUp', (req, res) => {
    console.log('req.body',req.body);
    const bodyData = JSON.parse(req.body.query);
    console.log('bodyData',bodyData);
    console.log('hellos from friend');
    const { username, email, password } = bodyData;
    console.log('userName',password);
    // Logic to fetch users from the database
    res.json({ users: [{name:'user1',}] }); // Sample response
});

router.post('/signIn', (req, res) => {
    // Logic to create a new user in the database
    res.json({ message: 'User created successfully' }); // Sample response
});

module.exports = router;
