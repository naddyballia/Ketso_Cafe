const express = require('express');
const db = require('./config/database');

// Create Express app
const app = express();
const port = 3005; // Use a different port to avoid conflicts

// Middleware to parse JSON bodies
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Basic root route
app.get('/', (req, res) => {
    res.send('Test Menu Category Server (New)');
});

// Import menu category routes (no auth version)
try {
    const menuCategoryRoutes = require('./routes/menuCategoryRoutes-no-auth');
    console.log('Menu category routes (no auth) imported successfully');
    
    // Mount the routes
    app.use('/api/categories', menuCategoryRoutes);
    console.log('Menu category routes registered at /api/categories');
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
            console.log(`Test server (new) listening at http://localhost:${port}`);
            console.log(`Try accessing: http://localhost:${port}/api/categories`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    }); 