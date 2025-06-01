// backend/test-standalone-app.js
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// Create Express app
const app = express();
const port = 3009; // Use a different port to avoid conflicts

// Middleware to parse JSON bodies
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Set up a new Sequelize instance
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/ketso_cafe', {
    dialect: 'postgres',
    logging: false
});

// Define the MenuCategory model directly
const MenuCategory = sequelize.define('MenuCategory', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'MenuCategories' // Match the table name in your database
});

// Basic root route
app.get('/', (req, res) => {
    res.send('Test Standalone App');
});

// Route to get all categories
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await MenuCategory.findAll({
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
        const category = await MenuCategory.findByPk(categoryId);
        
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
sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
        return sequelize.sync();
    })
    .then(() => {
        console.log('Database synchronized successfully.');
        app.listen(port, () => {
            console.log(`Test standalone app listening at http://localhost:${port}`);
            console.log(`Try accessing: http://localhost:${port}/api/categories/1`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    }); 