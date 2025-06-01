// backend/config/database.js
require('dotenv').config(); // To load environment variables from .env file

const { Sequelize } = require('sequelize');

// Initialize Sequelize instance
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false, // Set to console.log to see SQL queries, or false to disable
    }
);

// Object to hold our models
const db = {};

db.Sequelize = Sequelize; // The Sequelize library itself
db.sequelize = sequelize; // The configured Sequelize instance

// Import models
db.User = require('../models/User.js')(sequelize, Sequelize.DataTypes);
db.MenuCategory = require('../models/MenuCategory.js')(sequelize, Sequelize.DataTypes);
db.MenuItem = require('../models/MenuItem.js')(sequelize, Sequelize.DataTypes);
// Add other models here later:
// db.Order = require('../models/Order.js')(sequelize, Sequelize.DataTypes);

// Call associate methods if they exist
Object.keys(db).forEach(modelName => {
    if (db[modelName] && db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Test the connection (optional, can be removed or kept for initial setup)
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully via config.');
    } catch (error) {
        console.error('Unable to connect to the database via config:', error);
    }
}
// testConnection(); // Call this if you want to test connection on app start from here

module.exports = db; // Export the db object containing sequelize instance and models