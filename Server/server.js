const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const sqlite3 = require('sqlite3').verbose();
const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');
const gameRoute = require('./routes/gameRoutes');

// Use routes
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/game', gameRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//connect the sql database
const db = new sqlite3.Database("mydatabase.db", (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the database');
        // Create tables or perform other initialization tasks here if needed
    }
});
