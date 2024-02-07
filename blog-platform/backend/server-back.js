// Uncomment the line below to load environment variables from a .env file during development
// require('dotenv').config(); // Ensure 'dotenv' package is installed before uncommenting

const express = require('express'); // Importing the express framework
const mongoose = require('mongoose'); // Importing mongoose for MongoDB interactions
const cors = require('cors'); // Importing CORS middleware to enable cross-origin requests
const path = require('path'); // Importing path module for file path operations

// Importing routes from the routes directory
const postRoutes = require('./routes/posts'); 

// Retrieving environment variables or setting default values
const uploadsDir = process.env.UPLOADS_DIR || 'uploads'; // Directory for file uploads
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017'; // MongoDB URI
const dbName = process.env.MONGO_DB_NAME || 'blogPlatform'; // MongoDB database name
const PORT = process.env.PORT || 5000; // Port for the express server

const app = express(); // Creating an instance of Express

// Applying middleware
app.use(cors()); // Allowing all cross-origin requests
app.use(express.json()); // Parsing JSON bodies of incoming requests

// Serving static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, uploadsDir)));

// Connecting the post routes to our application
app.use('/api/posts', postRoutes);

// Connecting to MongoDB
mongoose.connect(`${mongoURI}/${dbName}`)
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Starting the Express server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Server is listening on the specified PORT
