// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// Enable CORS for requests from frontend
app.use(cors({ origin: 'http://localhost:3001' }));

// Parse JSON request bodies
app.use(express.json());

// Route handler
app.use('/api', authRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
