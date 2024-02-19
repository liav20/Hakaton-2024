const express = require('express');
const router = express.Router();
const Lobby = require('../models/Lobby');
const User = require('../models/User'); // Assuming this is your User model

// Endpoint to create a lobby
router.post('/createLobby', async (req, res) => {
  const { gameId, hostId } = req.body;

  try {
    // Verify host exists
    const host = await User.findById(hostId);
    if (!host) return res.status(404).json({ message: 'Host not found' });

    const newLobby = new Lobby({ gameId, hostId, players: [hostId] });
    await newLobby.save();
    res.status(201).json(newLobby);
  } catch (error) {
    res.status(500).json({ message: 'Error creating lobby', error });
  }
});
router.post('/joinLobby', async (req, res) => {
    const { lobbyId, userId } = req.body;
  
    try {
      const lobby = await Lobby.findById(lobbyId);
      if (!lobby) return res.status(404).json({ message: 'Lobby not found' });
  
      // Verify user exists and isn't already in the lobby
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      if (lobby.players.includes(userId)) return res.status(400).json({ message: 'User already in the lobby' });
  
      // Add user to lobby and save
      lobby.players.push(userId);
      await lobby.save();
      res.json(lobby);
    } catch (error) {
      res.status(500).json({ message: 'Error joining lobby', error });
    }
  });

module.exports = router;