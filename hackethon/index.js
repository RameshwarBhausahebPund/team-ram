// app.js
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8009;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./authRoutes');
const vynki = require('./vynki');
const data = require('./data');
app.use('/api/auth', authRoutes);
app.use('/api/vynki', vynki);
app.use('/api/data', data);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
