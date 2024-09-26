// Import necessary modules
const express = require('express');  // Import Express framework
const bodyParser = require('body-parser'); // Import body-parser to parse incoming request bodies
const cors = require('cors');  // Import CORS to enable Cross-Origin Resource Sharing
const authRoutes = require('./routes/authRoutes');  // Import authentication routes
require('dotenv').config();  // Load environment variables from .env file
require('./config/db');  // Initialize database connection (ensure this file correctly sets up Sequelize)

// Initialize the Express app
const app = express();

// Use CORS middleware to allow requests from different origins
app.use(cors());

// Use body-parser middleware to parse JSON data in request bodies
app.use(bodyParser.json());

// Define routes: authentication routes will be available under /api/auth
app.use('/api/auth', authRoutes);

// Define the port to listen on, either from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);  // Log a message when the server starts successfully
});
