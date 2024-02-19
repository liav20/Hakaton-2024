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

        // Assign players to teams while maintaining balance
        for (let i = 0; i < players.length; i++) {
            const teamIndex = i % numTeams;
            teams[teamIndex].push(players[i]);
            totalScores[teamIndex] += players[i].score;
        }
        return { teams, totalScores };
    }
    const { teams, totalScores } = createBalancedTeams(users, groupNumber);
    for (let i = 0; i < teams.length; i++) {
        console.log(`Team ${i + 1}:`, teams[i], 'Total Score:', totalScores[i]);
    }

});

router.put('/EndGame/:id', async (req, res) => {
    const gameId = req.params.id; // Assuming gameId is sent in the request body

    // Retrieve user IDs from the game object
    let winningTeamUserIds = req.body.WinningTeam;

    // Check if winningTeamUserIds is an array, if not convert it to an array
    if (!Array.isArray(winningTeamUserIds)) {
        winningTeamUserIds = [winningTeamUserIds];
    }
    let losingTeamUserIds = req.body.LosingTeam;

    // Check if losingTeamUserIds is an array, if not convert it to an array
    if (!Array.isArray(losingTeamUserIds)) {
        losingTeamUserIds = [losingTeamUserIds];
    }

    let scorersIds = req.body.Scorers;

    // Check if scorersIds is an array, if not convert it to an array
    if (!Array.isArray(scorersIds)) {
        scorersIds = [scorersIds];
    }

    // Retrieve the game based on the gameId
    const game = await getGameById(gameId);

    if (!game) {
        return res.status(404).json({ error: "Game not found" });
    }
    
    console.log(winningTeamUserIds, losingTeamUserIds, scorersIds);

    // Update scores for winning team, losing team, and scorers
    await updateScores(winningTeamUserIds, 5); // Decrease score by 3 for winning team
    await updateScores(losingTeamUserIds, -5);  // Decrease score by 3 for losing team
    await updateScores(scorersIds, 2);         // Increase score by 5 for scorers

    // Send a success response
    res.status(200).json({ message: "Scores updated successfully" });
});

// Function to retrieve a game by its ID
async function getGameById(gameId) {
    try {
        const game = await Game.findById(gameId).lean().exec();
        return game;
    } catch (error) {
        throw new Error("Error fetching game by ID: " + error.message);
    }
}

async function getUserById(userId){
    const user = await User.findById(userId);
    if(!user){
        throw new Error('No user with that id found');
    }
    return user;
}


async function updateScores(userIds, scoreChange) {
    try {
        // Ensure userIds is an array
        if (!Array.isArray(userIds)) {
            throw new Error("User IDs must be an array");
        }
        
        // Create a Set to store unique user IDs
        const uniqueUserIds = new Set(userIds);
        
        // Iterate over the unique user IDs and update scores
        await Promise.all([...uniqueUserIds].map(async (userId) => {
            const user = await getUserById(userId);
            // Count occurrences of userId in the original array
            const count = userIds.filter(id => id === userId).length;
            // Update the score property of the user
            user.score += count * scoreChange;
            // Save the updated user to the database
            await user.save();
        }));
    } catch (error) {
        // Handle any errors, maybe log them
        console.error("Error updating scores:", error.message);
        throw new Error("Error updating scores");
    }
}




module.exports = router;
