// backend/controllers/menuCategoryController-simple.js

// 1. Create a new Menu Category - Simplified version with hardcoded response
exports.createMenuCategory = async (req, res) => {
    try {
        const { name, restaurant_id } = req.body;

        // Basic validation
        if (!name) {
            return res.status(400).json({ message: 'Category name is required.' });
        }

        // Return a hardcoded successful response
        res.status(201).json({
            message: 'Menu category created successfully!',
            category: {
                id: 1,
                name: name,
                restaurant_id: restaurant_id || null,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

    } catch (error) {
        console.error('Error creating menu category:', error);
        res.status(500).json({ message: 'Error creating menu category', error: error.message });
    }
};

// 2. Get all Menu Categories - Simplified version with hardcoded response
exports.getAllMenuCategories = async (req, res) => {
    try {
        // Return hardcoded categories
        const categories = [
            {
                id: 1,
                name: 'Appetizers',
                restaurant_id: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 2,
                name: 'Main Courses',
                restaurant_id: null,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 3,
                name: 'Desserts',
                restaurant_id: null,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

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