const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

// Define routes for users
router.get('/getFriends/:id', async (req, res) => {
    console.log('hellos from friend');

    const userID = req.params.id;
    try{
        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json(user.friends);
    }
    catch(error){
        console.error('Error:', error);

        if (error instanceof Error) {
            // Synchronous error
            res.status(500).json({ message: 'Server error' });
        } else if (error instanceof PromiseRejectionEvent) {
            // Asynchronous promise rejection
            res.status(500).json({ message: 'Promise rejection error' });
        } else {
            // Other types of errors
            res.status(500).json({ message: 'Unknown error' });
        }
    } 
});

router.get('/getGames/:id', async (req, res) => {
    console.log('hellos from friend');
    const userID = req.params.id;
    try{
        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } 

        // Array to hold game objects
        const games = [];

        // Loop through each game ID in the user's games list
        for (const gameId of user.games) {
            // Find the game by its ID and push it to the games array
            const game = await Game.findById(gameId);
            if (game) {
                games.push(game);
            }
        }

        // Send the array of game objects as the response
        return res.json({ games });
    }
    catch(error){
        console.error('Error:', error);

        if (error instanceof Error) {
            // Synchronous error
            res.status(500).json({ message: 'Server error' });
        } else if (error instanceof PromiseRejectionEvent) {
            // Asynchronous promise rejection
            res.status(500).json({ message: 'Promise rejection error' });
        } else {
            // Other types of errors
            res.status(500).json({ message: 'Unknown error' });
        }
    }
});

router.get('/getInfo/:id',async (req, res) => {
    const id = req.params.id;
    console.log('id',id);
    const user = await User.findById(id);
    if(!user){
        return res.json('error no user with that id found')
    }
    return res.json(user);
});

router.post('/addFriend/:id', async (req, res) => {
    const userID = req.params.id;
    const friendEmail = req.body.email;
    try{
        // Find the user who is initiating the request by their ID
        const user = await User.findById(userID);
        // console.log(user.email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the friend user by their email
        const friendUser = await User.findOne({ email: friendEmail });

        if (!friendUser) {
            return res.status(404).json({ message: 'Friend not found' });
        }

        // Check if the friendID is already in the user's friends array
        if (user.friends.includes(friendUser._id)) {
            return res.status(400).json({ message: 'Friend already added' });
        }

        // Add the friend's ID to the user's friends array
        await user.friends.push(friendUser.email);
        await friendUser.friends.push(user.email);

        // Save both updated documents
        await Promise.all([user.save(), friendUser.save()]);

        res.json({ message: 'Friend added successfully' });
    }
    catch(error){
        console.error('Error:', error);

        if (error instanceof Error) {
            // Synchronous error
            res.status(500).json({ message: 'Server error' });
        } else if (error instanceof PromiseRejectionEvent) {
            // Asynchronous promise rejection
            res.status(500).json({ message: 'Promise rejection error' });
        } else {
            // Other types of errors
            res.status(500).json({ message: 'Unknown error' });
        }
    }
});

router.delete('/removeFriend/:id', async (req, res) => {
    // Logic to remove a friend from the user's friends list
    const userID = req.params.id;
    const friendEmail = req.query.email; // Extract friend's email from query parameter

    try {
        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the friend user by their email
        const friendUser = await User.findOne({ email: friendEmail });

        if (!friendUser) {
            return res.status(404).json({ message: 'Friend not found' });
        }

        // Check if the friend's email is in the user's friends array
        const friendIndex = user.friends.indexOf(friendUser.email);
        if (friendIndex === -1) {
            return res.status(400).json({ message: 'Friend not found in user\'s friends list' });
        }

        // Remove friend's email from user's friends array
        user.friends = user.friends.filter(email => email.toString() !== friendUser.email.toString());

        // Remove user's email from friend's friends array
        friendUser.friends = friendUser.friends.filter(email => email.toString() !== user.email.toString());

        // Save both updated documents
        await Promise.all([user.save(), friendUser.save()]);

        res.json({ message: 'Friend removed successfully' });
    } catch (error) {
        console.error('Error:', error);

        if (error instanceof Error) {
            // Synchronous error
            res.status(500).json({ message: 'Server error' });
        } else if (error instanceof PromiseRejectionEvent) {
            // Asynchronous promise rejection
            res.status(500).json({ message: 'Promise rejection error' });
        } else {
            // Other types of errors
            res.status(500).json({ message: 'Unknown error' });
        }
    }
});


module.exports = router;
