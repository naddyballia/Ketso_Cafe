// backend/standalone-category-by-id.js
const express = require('express');
const db = require('./config/database');

// Create Express app
const app = express();
const port = 3008; // Use a different port to avoid conflicts

// Middleware to parse JSON bodies
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Basic root route
app.get('/', (req, res) => {
    res.send('Standalone Category By ID App');
});

// Route to get all categories
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await db.MenuCategory.findAll({
            order: [['name', 'ASC']]
        });
        
        res.status(200).json({
            message: 'Menu categories fetched successfully!',
            count: categories.length,
            categories: categories
        });
    } catch (error) {
        console.error('Error fetching menu categories:', error);
        res.status(500).json({ message: 'Error fetching menu categories', error: error.message });
    }
});

// Route to get a category by ID
app.get('/api/categories/:id', async (req, res) => {
    try {
        console.log('Route handler called for ID:', req.params.id);
        const categoryId = req.params.id;
        const category = await db.MenuCategory.findByPk(categoryId);
        
        if (!category) {
            return res.status(404).json({ message: 'Menu category not found.' });
        }
        
        res.status(200).json({
            message: 'Menu category fetched successfully!',
            category: category
        });
    } catch (error) {
        console.error('Error fetching menu category by ID:', error);
        res.status(500).json({ message: 'Error fetching menu category by ID', error: error.message });
    }
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
            console.log(`Standalone app listening at http://localhost:${port}`);
            console.log(`Try accessing: http://localhost:${port}/api/categories/1`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    }); 