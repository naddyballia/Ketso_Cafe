// backend/routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/menuCategoryController');
const { protect, authorize } = require('../middleware/authMiddleware');

// POST /api/categories - Create a new menu category (admin only)
router.post('/', protect, authorize('admin'), categoryController.createMenuCategory);

// GET /api/categories - Get all menu categories (accessible to all authenticated users)
router.get('/', protect, categoryController.getAllMenuCategories);

// Routes to be added later:
// GET /api/categories/:id - Get a specific menu category
// PUT /api/categories/:id - Update a menu category (admin only)
// DELETE /api/categories/:id - Delete a menu category (admin only)

module.exports = router; 