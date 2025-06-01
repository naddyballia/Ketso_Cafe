// backend/app-fixed.js
const express = require('express');
const db = require('./config/database'); // Import the db object
require('dotenv').config(); // Ensure environment variables are loaded

const app = express();
const port = process.env.PORT || 3001; // Use port from .env or default to 3001

// Middleware to parse JSON bodies
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Import routes
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const userRoutes = require('./routes/userRoutes'); // Import user routes
const categoryRoutes = require('./routes/categoryRoutes'); // Import category routes

// Basic root route
app.get('/', (req, res) => {
    res.send('Hello from Ketso Cafe Backend with Sequelize models!');
});

// Use authentication routes (prefixed with /api/auth)
app.use('/api/auth', authRoutes);
console.log('Auth routes registered');

// Use user routes (prefixed with /api/users)
app.use('/api/users', userRoutes);
console.log('User routes registered');

// Use category routes (prefixed with /api/categories)
app.use('/api/categories', categoryRoutes);
console.log('Category routes registered');

console.log('Connecting to database...');
// Test database connection & Sync models
db.sequelize.authenticate()
    .then(() => {
        console.log('PostgreSQL Database connection has been established successfully.');
        // Sync all defined models to the DB.
        // Use { force: true } to drop and re-create tables - DANGEROUS IN PRODUCTION
        // Use { alter: true } to attempt to alter existing tables - USE WITH CAUTION
        return db.sequelize.sync(); // Remove options like { force: true } or { alter: true } in production
    })
    .then(() => {
        console.log('Database synchronized successfully.');
        
        // Start the server after database connection and sync
        console.log('Starting server...');
        app.listen(port, () => {
            console.log(`Ketso Cafe backend listening at http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database or synchronize:', err);
    }); 