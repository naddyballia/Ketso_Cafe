// backend/minimal-category-by-id.js
const express = require('express');
const app = express();
const port = 3010;

// Middleware
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Basic route
app.get('/', (req, res) => {
    res.send('Minimal Category By ID App');
});

// Hardcoded route for getting a category by ID
app.get('/api/categories/:id', (req, res) => {
    console.log('Route handler called for ID:', req.params.id);
    const id = parseInt(req.params.id);
    
    // Hardcoded data for testing
    const categories = [
        { id: 1, name: 'Appetizers', restaurant_id: 1 },
        { id: 2, name: 'Main Courses', restaurant_id: 1 },
        { id: 3, name: 'Desserts', restaurant_id: 1 }
    ];
    
    const category = categories.find(cat => cat.id === id);
    
    if (!category) {
        return res.status(404).json({ message: 'Menu category not found.' });
    }
    
    res.status(200).json({
        message: 'Menu category fetched successfully!',
        category: category
    });
});

// Start server
app.listen(port, () => {
    console.log(`Minimal Category By ID app listening at http://localhost:${port}`);
    console.log(`Try accessing: http://localhost:${port}/api/categories/1`);
}); 