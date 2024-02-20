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

router.put('/EndGame/:id', async (req, res) => {
    const gameId = req.params.id; // Assuming gameId is sent in the request body

    // Retrieve user IDs, scores, and game properties from the request body
    let winningTeamUserIds = req.body.WinningTeam;
    let losingTeamUserIds = req.body.LosingTeam;
    let scorersIds = req.body.Scorers;
    let losingScore = req.body.LosingScore;
    let winningScore = req.body.WinningScore;

    // Check if winningTeamUserIds is an array, if not convert it to an array
    if (!Array.isArray(winningTeamUserIds)) {
        winningTeamUserIds = [winningTeamUserIds];
    }

    // Check if losingTeamUserIds is an array, if not convert it to an array
    if (!Array.isArray(losingTeamUserIds)) {
        losingTeamUserIds = [losingTeamUserIds];
    }

    // Check if scorersIds is an array, if not convert it to an array
    if (!Array.isArray(scorersIds)) {
        scorersIds = [scorersIds];
    }

    // Retrieve the game based on the gameId
    const game = await getGameById(gameId);

    if (!game) {
        return res.status(404).json({ error: "Game not found" });
    }

    // Update scores for winning team, losing team, and scorers
    await updateScores(winningTeamUserIds, 5); // Decrease score by 3 for winning team
    await updateScores(losingTeamUserIds, -5);  // Decrease score by 3 for losing team
    await updateScores(scorersIds, 2);         // Increase score by 5 for scorers

    // Update game properties
    game.WinningTeam = winningTeamUserIds;
    game.LosingTeam = losingTeamUserIds;
    game.Scorers = scorersIds;
    game.WinningScore = winningScore;
    game.LosingScore = losingScore;

    try {
        // Save the updated game to the database
        await game.save();
        res.status(200).json({ message: "Scores and game properties updated successfully"});
    } catch (error) {
        res.status(500).json({ error: "Error updating game properties", details: error.message });
    }
});


// Function to retrieve a game by its ID
async function getGameById(gameId) {
    try {
        const game = await Game.findById(gameId).exec();
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




module.exports = router;
