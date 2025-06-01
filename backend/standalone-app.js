// backend/standalone-app.js
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// Create Express app
const app = express();
const port = 3007; // Use a different port to avoid conflicts

// Middleware to parse JSON bodies
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Basic root route
app.get('/', (req, res) => {
    res.send('Standalone App');
});

// Define hardcoded routes
app.get('/api/categories', (req, res) => {
    res.status(200).json({
        message: 'Menu categories fetched successfully!',
        count: 2,
        categories: [
            {
                id: 1,
                name: 'Standalone Category 1',
                restaurant_id: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 2,
                name: 'Standalone Category 2',
                restaurant_id: null,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]
    });
});

app.post('/api/categories', (req, res) => {
    const { name, restaurant_id } = req.body;
    res.status(201).json({
        message: 'Menu category created successfully!',
        category: {
            id: 3, // Hardcoded ID for example
            name: name || 'Default Category Name',
            restaurant_id: restaurant_id || null,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Standalone app listening at http://localhost:${port}`);
    console.log(`Try accessing: http://localhost:${port}/api/categories`);
}); 