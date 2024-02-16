const sqlite3 = require('sqlite3').verbose();

//connect the sql database
const db = new sqlite3.Database("mydatabase.db", (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the database');
        // Create tables or perform other initialization tasks here if needed
    }
});

module.exports = db;