const mongoose = require('mongoose');

const dataScheme = new mongoose.Schema({
    HostID: {
        require: false,
        type: String
    },
    WinningTeam: {
        require: false,
        type: Array
    },
    LosingTeam: {
        require: false,
        type: Array
    },
    WinningScore: {
        require: false,
        type: Number
    },
    LosingScore: {
        require: false,
        type: Number
    },
    Scorers: {
        require: false,
        type: Array
    },
    Date: {
        require: false,
        type: Date
    }
})

module.exports = mongoose.model('Game', dataScheme);
