// backend/test-menu-server.js
const express = require('express');
const db = require('./config/database');

// Create Express app
const app = express();
const port = 3002; // Use a different port to avoid conflicts

// Middleware to parse JSON bodies
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Basic root route
app.get('/', (req, res) => {
    res.send('Test Menu Category Server');
});

// Import menu category routes
try {
    const menuCategoryRoutes = require('./routes/menuCategoryRoutes');
    console.log('Menu category routes imported successfully');
    
    // Mount the routes directly (no prefix)
    app.use('/api/categories', menuCategoryRoutes);
    console.log('Menu category routes registered at /api/categories');
    
    // Also mount the routes at the root level for testing
    app.use('/', menuCategoryRoutes);
    console.log('Menu category routes also registered at root level');
} catch (error) {
    console.error('Error with menu category routes:', error);
}

// Connect to database and start server
db.sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
        return db.sequelize.sync();
    })
    .then(() => {
        console.log('Database synchronized successfully.');
        app.listen(port, () => {
            console.log(`Test server listening at http://localhost:${port}`);
            console.log(`Try accessing: http://localhost:${port}/api/categories`);
            console.log(`Or try the root level: http://localhost:${port}/`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    }); 