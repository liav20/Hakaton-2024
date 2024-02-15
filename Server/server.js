const express = require('express');
const app = express();
const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');
const gameRoute = require('./routes/gameRoutes');

// Use routes
app.use('/api/friend', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/game', gameRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
