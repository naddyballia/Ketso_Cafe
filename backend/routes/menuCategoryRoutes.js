const express = require('express');
const router = express.Router();
const menuCategoryController = require('../controllers/menuCategoryController');
// Temporarily comment out the auth middleware import since we're not using it yet
// const { protect, authorize } = require('../middleware/authMiddleware');

// Define routes for Menu Categories

// POST /api/categories - Create a new menu category
// For now, we will make this route public for testing
router.post('/', menuCategoryController.createMenuCategory);
// Example with protection (we will enable this later):
// router.post('/', protect, authorize('admin', 'manager'), menuCategoryController.createMenuCategory);

// GET /api/categories - Get all menu categories
// This route can be public or protected depending on requirements.
// For now, let's assume it's public for testing.
router.get('/', menuCategoryController.getAllMenuCategories);
// Example with protection (we will enable this later):
// router.get('/', protect, menuCategoryController.getAllMenuCategories);

// GET /api/categories/:id - Get a single menu category by ID
// Important: This route must be defined after the '/' route to avoid conflicts
router.get('/:id', (req, res) => {
    console.log('Route handler called for ID:', req.params.id);
    return menuCategoryController.getMenuCategoryById(req, res);
});
// Example with protection (we will enable this later):
// router.get('/:id', protect, menuCategoryController.getMenuCategoryById);

// We will add routes for update, and delete later:
// router.put('/:id', protect, authorize('admin', 'manager'), menuCategoryController.updateMenuCategory);
// router.delete('/:id', protect, authorize('admin', 'manager'), menuCategoryController.deleteMenuCategory);

module.exports = router; 