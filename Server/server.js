const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');
const gameRoute = require('./routes/gameRoutes');
const db = require('./services/db')
const app = express();


app.use(express.json());
app.use(cors());
// Use routes
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/game', gameRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
