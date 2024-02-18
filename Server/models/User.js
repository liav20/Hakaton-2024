const mongoose = require('mongoose')

const dataScheme = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    score: {
        required: true,
        type: Number
    },
    wins: {
        required: false,
        type: Number
    },
    lose: {
        required: false,
        type: Number
    },
    games: {
        required: false,
        type: [String]
    },
    friends: {
        required: false,
        type: [String]
    }
})

module.exports = mongoose.model('user', dataScheme)