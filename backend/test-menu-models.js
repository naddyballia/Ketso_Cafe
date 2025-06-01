const db = require('./config/database');

// Test function to verify models
async function testMenuModels() {
    try {
        console.log('Testing MenuCategory and MenuItem models...');
        
        // Test MenuCategory model
        console.log('\n--- Testing MenuCategory Model ---');
        const categories = await db.MenuCategory.findAll({
            limit: 5 // Limit to 5 records for testing
        });
        
        if (categories.length > 0) {
            console.log(`Found ${categories.length} categories:`);
            categories.forEach(category => {
                console.log(`- ${category.id}: ${category.name}`);
            });
        } else {
            console.log('No categories found. You might want to add some test data.');
        }
        
        // Test MenuItem model
        console.log('\n--- Testing MenuItem Model ---');
        const menuItems = await db.MenuItem.findAll({
            include: [{
                model: db.MenuCategory,
                as: 'category'
            }],
            limit: 5 // Limit to 5 records for testing
        });
        
        if (menuItems.length > 0) {
            console.log(`Found ${menuItems.length} menu items:`);
            menuItems.forEach(item => {
                const categoryName = item.category ? item.category.name : 'None';
                console.log(`- ${item.id}: ${item.name} ($${item.price}) - Category: ${categoryName}`);
            });
        } else {
            console.log('No menu items found. You might want to add some test data.');
        }
        
        console.log('\nModel testing completed successfully!');
    } catch (error) {
        console.error('Error testing models:', error);
    } finally {
        // Close the database connection
        await db.sequelize.close();
    }
}

// Run the test
testMenuModels(); 