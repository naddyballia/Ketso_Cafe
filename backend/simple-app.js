// backend/simple-app.js
const express = require('express');
const db = require('./config/database');
require('dotenv').config();

const app = express();
const port = 3002; // Different port to avoid conflict

// Middleware
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Import routes
const categoryRoutes = require('./routes/categoryRoutes');

// Use routes
app.use('/api/categories', categoryRoutes);
console.log('Category routes registered');

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Simple app is running!');
});

// Start the server
db.sequelize.authenticate()
    .then(() => {
        console.log('Database connection established.');
        return db.sequelize.sync();
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`Simple app listening at http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    }); 