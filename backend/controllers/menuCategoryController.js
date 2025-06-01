const db = require('../config/database'); // Your db object with Sequelize models
const MenuCategory = db.MenuCategory; // Access the MenuCategory model

// 1. Create a new Menu Category
// Method: POST
// Route: /api/categories (to be defined later)
exports.createMenuCategory = async (req, res) => {
    try {
        const { name, restaurant_id } = req.body;

        // Basic validation
        if (!name) {
            return res.status(400).json({ message: 'Category name is required.' });
        }

        // For now, we'll assume restaurant_id might be optional or handled differently.
        // You might want to get restaurant_id from authenticated user (req.user) in a real scenario.
        const newCategory = await MenuCategory.create({
            name,
            restaurant_id: restaurant_id || null // Or a default if applicable
        });

        res.status(201).json({
            message: 'Menu category created successfully!',
            category: newCategory
        });

    } catch (error) {
        console.error('Error creating menu category:', error);
        // Check for Sequelize validation errors (e.g., if you add unique constraints later)
        if (error.name === 'SequelizeValidationError') {
            const messages = error.errors.map(err => err.message);
            return res.status(400).json({ message: 'Validation error', errors: messages });
        }
        res.status(500).json({ message: 'Error creating menu category', error: error.message });
    }
};

// 2. Get all Menu Categories
// Method: GET
// Route: /api/categories (to be defined later)
exports.getAllMenuCategories = async (req, res) => {
    try {
        const categories = await MenuCategory.findAll({
            // Optional: include associated menu items
            // include: [{
            //     model: db.MenuItem, // Assuming MenuItem model is db.MenuItem
            //     as: 'menuItems' // The alias we defined in MenuCategory.associate
            // }]
            // Optional: order by name
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
};

// 3. Get a single Menu Category by ID
// Method: GET
// Route: /api/categories/:id
exports.getMenuCategoryById = async (req, res) => {
    try {
        console.log('getMenuCategoryById called with ID:', req.params.id);
        const categoryId = req.params.id;
        console.log('Looking for category with ID:', categoryId);
        
        const category = await MenuCategory.findByPk(categoryId, {
            // Optional: include associated menu items
            // include: [{
            //     model: db.MenuItem,
            //     as: 'menuItems'
            // }]
        });

        console.log('Category found:', category ? 'Yes' : 'No');

        if (!category) {
            console.log('Returning 404 - Category not found');
            return res.status(404).json({ message: 'Menu category not found.' });
        }

        console.log('Returning category data');
        res.status(200).json({
            message: 'Menu category fetched successfully!',
            category: category
        });

    } catch (error) {
        console.error('Error fetching menu category by ID:', error);
        res.status(500).json({ message: 'Error fetching menu category by ID', error: error.message });
    }
};

// 4. Update an existing Menu Category
// Method: PUT
// Route: /api/categories/:id (to be defined in app.js)
exports.updateMenuCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name, restaurant_id } = req.body; // Get updated data from request body

        // Basic validation
        if (!name) {
            return res.status(400).json({ message: 'Category name is required for update.' });
        }

        const category = await MenuCategory.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({ message: 'Menu category not found.' });
        }

        // Update the category instance
        category.name = name;
        if (restaurant_id !== undefined) { // Only update restaurant_id if provided
            category.restaurant_id = restaurant_id;
        }
        // Sequelize automatically handles updatedAt timestamp

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
};

// 5. Delete a Menu Category
// Method: DELETE
// Route: /api/categories/:id (to be defined in app.js)
exports.deleteMenuCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await MenuCategory.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({ message: 'Menu category not found.' });
        }

        await category.destroy(); // Delete the category instance

        res.status(200).json({ message: 'Menu category deleted successfully!' });
        // Alternatively, you can send a 204 No Content status, which is common for DELETE operations
        // res.status(204).send();

    } catch (error) {
        console.error('Error deleting menu category:', error);
        // Consider if there are foreign key constraints that might prevent deletion
        // For example, if MenuItems must have a category_id, you might need to handle
        // how associated MenuItems are dealt with (e.g., set category_id to null, or delete them too - cascading delete).
        // For now, we assume simple deletion.
        res.status(500).json({ message: 'Error deleting menu category', error: error.message });
    }
}; 