module.exports = (sequelize, DataTypes) => {
    const MenuItem = sequelize.define('MenuItem', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
            // Foreign key constraint is defined in the association below
            // and also directly in the SQL CREATE TABLE statement
        },
        is_available: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        restaurant_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'MenuItems',
        timestamps: true,
        underscored: true,
    });

    MenuItem.associate = (models) => {
        // A MenuItem belongs to one MenuCategory
        MenuItem.belongsTo(models.MenuCategory, {
            foreignKey: 'category_id', // This foreign key in MenuItem model
            as: 'category' // Optional alias
        });
    };

    return MenuItem;
}; 