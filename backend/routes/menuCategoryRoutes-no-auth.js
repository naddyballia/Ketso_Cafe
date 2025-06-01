const express = require('express');
const router = express.Router();
const menuCategoryController = require('../controllers/menuCategoryController');

// Define routes for Menu Categories - NO AUTH VERSION

// POST /api/categories - Create a new menu category
router.post('/', menuCategoryController.createMenuCategory);

// GET /api/categories - Get all menu categories
router.get('/', menuCategoryController.getAllMenuCategories);

// We will add routes for getById, update, and delete later:
// router.get('/:id', menuCategoryController.getMenuCategoryById);
// router.put('/:id', menuCategoryController.updateMenuCategory);
// router.delete('/:id', menuCategoryController.deleteMenuCategory);

module.exports = router; 