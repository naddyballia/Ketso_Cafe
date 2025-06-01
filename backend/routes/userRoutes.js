// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');

// Protected route - requires valid JWT
router.get('/profile', protect, (req, res) => {
    res.status(200).json({
        message: 'You have access to the protected route',
        user: {
            userId: req.user.userId,
            username: req.user.username,
            role: req.user.role
        }
    });
});

// Role-based access - only accessible to admins
router.get('/admin', protect, authorize('admin'), (req, res) => {
    res.status(200).json({
        message: 'You have access to the admin route',
        user: {
            userId: req.user.userId,
            username: req.user.username,
            role: req.user.role
        }
    });
});

module.exports = router; 