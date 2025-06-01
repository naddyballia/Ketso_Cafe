// backend/list-menu-items.js
const db = require('./config/database');

async function listMenuItems() {
    try {
        console.log('Listing all menu items...');
        
        const menuItems = await db.MenuItem.findAll({
            include: [{
                model: db.MenuCategory,
                as: 'category'
            }]
        });
        
        menuItems.forEach(item => {
            console.log(`ID: ${item.id}`);
            console.log(`Name: ${item.name}`);
            console.log(`Price: $${item.price}`);
            console.log(`Category: ${item.category ? item.category.name : 'None'}`);
            console.log('-------------------');
        });
        
        console.log(`Total: ${menuItems.length} items found`);
    } catch (error) {
        console.error('Error listing menu items:', error);
    } finally {
        await db.sequelize.close();
    }
}

listMenuItems(); 