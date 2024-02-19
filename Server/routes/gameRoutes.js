const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Game = require('../models/Game');
const User = require('../models/User');

// Define routes for users
router.post('/createGame/:hostId', async (req, res) => {
    const hostId = req.params.hostId
    const date = new Date();
    const game = await Game.create(
        {
            HostID: hostId,
            Date: date,
            LosingScore: 0,
            WinningScore: 0,
        })
    res.json(game);
});
// Get game ID by host ID
router.get('/getGameId/:hostId', async (req, res) => {
    try {
        const hostId = req.params.hostId;
        // Find a game with the given HostID
        const game = await Game.findOne({ HostID: hostId });

        // If no game found, send a 404 response
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        // Respond with the MongoDB _id of the game
        res.json({ gameId: game._id });
    } catch (error) {
        // Handle errors (e.g., invalid host ID format)
        console.error('Error fetching game ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/getInfo/:id', (req, res) => {
    // Logic to create a new user in the database
    res.json({ message: 'User created successfully' }); // Sample response
});

router.post('/matchMaking', async (req, res) => {
    const emails = req.body.emails;
    const groupNumber = parseInt(req.body.groupNumber);
    console.log('emails', emails);
    const users = await User.find({ email: { $in: emails } });
    console.log('users', users);
    function createBalancedTeams(players, numTeams) {
        // Sort players by score in descending order
        players.sort((a, b) => b.score - a.score);
    
        const teams = Array.from({ length: numTeams }, () => []);
        const totalScores = Array(numTeams).fill(0);
    
        // Calculate the number of players per team
        const playersPerTeam = Math.ceil(players.length / numTeams);
    
        // Divide players into chunks
        let chunkIndex = 0;
        for (let i = 0; i < players.length; i += playersPerTeam) {
            const chunk = players.slice(i, i + playersPerTeam);
    
            // Assign the chunk to the team with the lowest total score
            for (const player of chunk) {
                let minScoreIndex = 0;
                for (let j = 1; j < numTeams; j++) {
                    if (totalScores[j] < totalScores[minScoreIndex]) {
                        minScoreIndex = j;
                    }
                }
                teams[minScoreIndex].push(player);
                totalScores[minScoreIndex] += player.score;
            }
            chunkIndex++;
        }
        return { teams, totalScores };
    }
    const { teams, totalScores } = createBalancedTeams(users, groupNumber);
    for (let i = 0; i < teams.length; i++) {
        console.log(`Team ${i + 1}:`, teams[i], 'Total Score:', totalScores[i]);
    }
    return res.json({teams,totalScores})

});
// router.get('/EndGame', (req, res) => {
//     // Logic to create a new user in the database
//     res.json({ message: 'User created successfully' }); // Sample response
// });

module.exports = router;