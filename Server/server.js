const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;


//connect the sql database
const db = new sqlite3.Database("C:\\Users\\user\\Desktop\\mffDB", (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the database');
        // Create tables or perform other initialization tasks here if needed
    }
});

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
