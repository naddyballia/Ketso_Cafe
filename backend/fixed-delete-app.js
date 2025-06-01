// backend/fixed-delete-app.js
const express = require('express');
const db = require('./config/database');
require('dotenv').config();

// Create Express app
const app = express();
const port = 3005; // Use a fixed port that works

// Middleware to parse JSON bodies
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Basic root route
app.get('/', (req, res) => {
    res.send('Ketso Cafe Backend (Fixed Delete Version)');
});

// Inline route handlers for menu categories
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
        res.status(500).json({ 
            message: 'Error fetching menu categories', 
            error: error.message 
        });
    }
});

app.post('/api/categories', async (req, res) => {
    try {
        const { name, restaurant_id } = req.body;
        
        // Basic validation
        if (!name) {
            return res.status(400).json({ message: 'Category name is required.' });
        }
        
        const newCategory = await db.MenuCategory.create({
            name,
            restaurant_id: restaurant_id || null
        });
        
        res.status(201).json({
            message: 'Menu category created successfully!',
            category: newCategory
        });
    } catch (error) {
        console.error('Error creating menu category:', error);
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: 'Validation error', errors: messages });
        }
        res.status(500).json({ 
            message: 'Error creating menu category', 
            error: error.message 
        });
    }
});

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

// PUT /api/categories/:id - Update a menu category
app.put('/api/categories/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name, restaurant_id } = req.body;

        // Basic validation
        if (!name) {
            return res.status(400).json({ message: 'Category name is required for update.' });
        }

        const category = await db.MenuCategory.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({ message: 'Menu category not found.' });
        }

        // Update the category instance
        category.name = name;
        if (restaurant_id !== undefined) { // Only update restaurant_id if provided
            category.restaurant_id = restaurant_id;
        }

        await category.save(); // Save the changes to the database

        res.status(200).json({
            message: 'Menu category updated successfully!',
            category: category
        });

    } catch (error) {
        console.error('Error updating menu category:', error);
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: 'Validation error', errors: messages });
        }
        res.status(500).json({ message: 'Error updating menu category', error: error.message });
    }
});

// DELETE /api/categories/:id - Delete a menu category
app.delete('/api/categories/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await db.MenuCategory.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({ message: 'Menu category not found.' });
        }

        await category.destroy(); // Delete the category instance

        res.status(200).json({ message: 'Menu category deleted successfully!' });

    } catch (error) {
        console.error('Error deleting menu category:', error);
        res.status(500).json({ message: 'Error deleting menu category', error: error.message });
    }
});

// Import other routes after defining direct routes
let authRoutes, userRoutes;

try {
    authRoutes = require('./routes/authRoutes');
    console.log('Auth routes imported successfully');
    app.use('/api/auth', authRoutes);
    console.log('Auth routes registered');
} catch (error) {
    console.error('Error with auth routes:', error);
}

try {
    userRoutes = require('./routes/userRoutes');
    console.log('User routes imported successfully');
    app.use('/api/users', userRoutes);
    console.log('User routes registered');
} catch (error) {
    console.error('Error with user routes:', error);
}

console.log('Menu category routes registered directly');
console.log('Connecting to database...');

// Connect to database and start server
db.sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
        return db.sequelize.sync();
    })
    .then(() => {
        console.log('Database synchronized successfully.');
        app.listen(port, () => {
            console.log(`Ketso Cafe backend (Fixed Delete Version) listening at http://localhost:${port}`);
            console.log(`Try accessing: http://localhost:${port}/api/categories`);
            console.log(`Try accessing: http://localhost:${port}/api/categories/1`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    }); 