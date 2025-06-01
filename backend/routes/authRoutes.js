// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Import the controller

// POST /api/auth/register - Register a new staff user
router.post('/register', authController.register);

// POST /api/auth/login - Login staff user
router.post('/login', authController.login);

module.exports = router; 