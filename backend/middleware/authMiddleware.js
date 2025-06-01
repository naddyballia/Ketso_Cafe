const jwt = require('jsonwebtoken');
// We don't need to require('dotenv').config() here if it's already done in app.js
// as process.env variables are globally available once loaded.

const protect = (req, res, next) => {
    let token;

    // Check for token in Authorization header (Bearer Token)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (e.g., "Bearer eyJhbGciOiJIUzI1Ni...")
            token = req.headers.authorization.split(' ')[1]; // Split by space and take the second part

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Add user from payload to request object
            // This typically would involve fetching the user from DB to ensure they still exist/are active
            // For now, we'll just attach the decoded payload.
            // You might want to select specific fields or fetch the full user object from db.User later
            req.user = decoded; // The payload we set during login (userId, username, role)

            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            console.error('Token verification failed:', error.message);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Optional: Middleware to restrict access based on role
const authorize = (...roles) => { // Accepts an array of roles
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
             // This means 'protect' middleware probably didn't run or failed
            return res.status(401).json({ message: 'Not authorized' });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `User role '${req.user.role}' is not authorized to access this route` });
        }
        next();
    };
};


module.exports = { protect, authorize }; 