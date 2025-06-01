module.exports = (sequelize, DataTypes) => {
    const MenuCategory = sequelize.define('MenuCategory', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        restaurant_id: {
            type: DataTypes.INTEGER,
            allowNull: true // Or false if a category must always be linked to a restaurant
        }
        // createdAt and updatedAt are handled by Sequelize by default
        // due to timestamps: true and underscored: true in the model options
    }, {
        tableName: 'MenuCategories', // Explicitly set table name
        timestamps: true,
        underscored: true, // Maps camelCase fields to snake_case columns (e.g., restaurantId to restaurant_id)
    });

    MenuCategory.associate = (models) => {
        // A Category can have many MenuItems
        MenuCategory.hasMany(models.MenuItem, {
            foreignKey: 'category_id', // This is the foreign key in the MenuItem model
            as: 'menuItems' // Optional alias
        });
    };

    return MenuCategory;
}; 