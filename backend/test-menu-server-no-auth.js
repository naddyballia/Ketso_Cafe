// backend/test-menu-server-no-auth.js
const express = require('express');
const db = require('./config/database');
const menuCategoryController = require('./controllers/menuCategoryController');

// Create Express app
const app = express();
const port = 3003; // Use a different port to avoid conflicts

// Middleware to parse JSON bodies
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Basic root route
app.get('/', (req, res) => {
    res.send('Test Menu Category Server (No Auth)');
});

// Define routes directly without using the router from menuCategoryRoutes.js
app.post('/api/categories', menuCategoryController.createMenuCategory);
app.get('/api/categories', menuCategoryController.getAllMenuCategories);

// Connect to database and start server
db.sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
        return db.sequelize.sync();
    })
    .then(() => {
        console.log('Database synchronized successfully.');
        app.listen(port, () => {
            console.log(`Test server (no auth) listening at http://localhost:${port}`);
            console.log(`Try accessing: http://localhost:${port}/api/categories`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    }); 