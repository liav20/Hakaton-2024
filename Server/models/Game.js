const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
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
    Date: {
        require: false,
        type: Date
    }
})

module.exports = mongoose.model('Game', dataSchema);