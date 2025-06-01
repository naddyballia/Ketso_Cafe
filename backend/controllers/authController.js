const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const db = require('../config/database'); // Your db object with User model
const User = db.User; // Assuming your User model is accessed via db.User

// POST /api/auth/register - Register a new staff user
exports.register = async (req, res) => {
    try {
        const { username, password, role, restaurant_id } = req.body;

        // Validate input (basic example)
        if (!username || !password || !role) {
            return res.status(400).json({ message: 'Username, password, and role are required.' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { username: username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists.' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({
            username: username,
            password_hash: hashedPassword, // Store the hashed password
            role: role,
            restaurant_id: restaurant_id || null // Handle optional restaurant_id
        });

        // For now, just send a success message.
        // Later, you might want to generate a JWT token here or send back user info (excluding password)
        res.status(201).json({
            message: 'User registered successfully!',
            userId: newUser.id
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// POST /api/auth/login - Login a staff user
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        // Find user by username
        const user = await User.findOne({ where: { username: username } });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

        // Compare password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
        }

        // User authenticated, create a JWT
        const payload = {
            userId: user.id,
            username: user.username,
            role: user.role
            // You can add more data to the payload if needed
        };

        // Sign the token
        // Ensure you have JWT_SECRET in your .env file
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour (you can adjust this)
        );

        res.status(200).json({
            message: 'Login successful!',
            token: token,
            user: { // Optionally send back some user info (excluding password)
                id: user.id,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
}; 