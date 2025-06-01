// const { DataTypes } = require('sequelize'); // Remove this line
// const sequelize = require('../config/database'); // Remove this line, sequelize is passed in

module.exports = (sequelize, DataTypes) => { // Accept sequelize and DataTypes as arguments
    const User = sequelize.define('User', {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING, // VARCHAR(255)
            allowNull: false,
            unique: true
        },
        password_hash: {
            type: DataTypes.STRING, // VARCHAR(255)
            allowNull: false
        },
        role: {
            type: DataTypes.STRING(50), // VARCHAR(50)
            allowNull: false
        },
        restaurant_id: {
            type: DataTypes.INTEGER,
            allowNull: true // Or false if a user must always be linked to a restaurant
            // We'll define foreign key associations later if needed
        }
        // createdAt and updatedAt fields are automatically added by Sequelize by default,
        // and they match the 'created_at' and 'updated_at' columns if underscored: true is set
        // or if you explicitly map them.
        // For PostgreSQL, Sequelize uses 'createdAt' and 'updatedAt' by default.
        // If your columns are 'created_at' and 'updated_at', we might need to tell Sequelize.
    }, {
        // Other model options go here
        tableName: 'Users', // Explicitly tell Sequelize the table name
        timestamps: true, // Enable timestamps (createdAt and updatedAt)
        underscored: true, // This will make Sequelize map camelCase fields to snake_case columns
                           // e.g., 'createdAt' in model maps to 'created_at' in DB.
                           // This is important if your actual column names are created_at and updated_at.
                           // Or you can define field: 'created_at' for each.
    });

    // Define associations here if needed
    // User.associate = (models) => {
    //   User.belongsTo(models.Restaurant, { foreignKey: 'restaurant_id' });
    // };

    return User;
}; 