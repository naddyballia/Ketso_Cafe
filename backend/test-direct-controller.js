// backend/test-direct-controller.js
const express = require('express');
const db = require('./config/database');
const menuCategoryController = require('./controllers/menuCategoryController');

// Create Express app
const app = express();
const port = 3011; // Use a different port to avoid conflicts

// Middleware to parse JSON bodies
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Basic root route
app.get('/', (req, res) => {
    res.send('Test Direct Controller App');
});

// Define routes using the controller directly
app.get('/api/categories', menuCategoryController.getAllMenuCategories);
app.post('/api/categories', menuCategoryController.createMenuCategory);

// Define the route for getting a category by ID
// This is the route we're testing
app.get('/api/categories/:id', (req, res) => {
    console.log('Route handler in app.js called for ID:', req.params.id);
    return menuCategoryController.getMenuCategoryById(req, res);
});

// Connect to database and start server
db.sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
        return db.sequelize.sync();
    })
    .then(() => {
        console.log('Database synchronized successfully.');
        app.listen(port, () => {
            console.log(`Test direct controller app listening at http://localhost:${port}`);
            console.log(`Try accessing: http://localhost:${port}/api/categories/1`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    }); 