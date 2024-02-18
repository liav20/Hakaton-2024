const mongoose = require('mongoose');

const MONGO_CONNECTION_STRING = 'mongodb://localhost:27017';

mongoose.connect(MONGO_CONNECTION_STRING).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Couldn't connect to Mongo: ", error);
});