// backend/minimal-app.js
const express = require('express');
const menuCategoryController = require('./controllers/menuCategoryController-simple');

// Create Express app
const app = express();
const port = 3006; // Use a different port to avoid conflicts

// Middleware to parse JSON bodies
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Basic root route
app.get('/', (req, res) => {
    res.send('Minimal App with Hardcoded Responses');
});

// Define routes directly
app.post('/api/categories', menuCategoryController.createMenuCategory);
app.get('/api/categories', menuCategoryController.getAllMenuCategories);

// Start server
app.listen(port, () => {
    console.log(`Minimal app listening at http://localhost:${port}`);
    console.log(`Try accessing: http://localhost:${port}/api/categories`);
}); 