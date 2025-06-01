const db = require('./config/database');

// Sample data for menu categories
const sampleCategories = [
    { name: 'Appetizers', restaurant_id: 1 },
    { name: 'Main Courses', restaurant_id: 1 },
    { name: 'Desserts', restaurant_id: 1 },
    { name: 'Beverages', restaurant_id: 1 }
];

// Sample data for menu items
const sampleMenuItems = [
    {
        name: 'French Fries',
        description: 'Crispy golden fries served with ketchup',
        price: 4.99,
        image_url: '/images/french-fries.jpg',
        is_available: true,
        restaurant_id: 1,
        // category_id will be set dynamically
    },
    {
        name: 'Chicken Wings',
        description: 'Spicy chicken wings with blue cheese dip',
        price: 8.99,
        image_url: '/images/chicken-wings.jpg',
        is_available: true,
        restaurant_id: 1,
        // category_id will be set dynamically
    },
    {
        name: 'Grilled Salmon',
        description: 'Fresh salmon fillet with lemon butter sauce',
        price: 16.99,
        image_url: '/images/grilled-salmon.jpg',
        is_available: true,
        restaurant_id: 1,
        // category_id will be set dynamically
    },
    {
        name: 'Beef Burger',
        description: 'Juicy beef patty with cheese, lettuce, and tomato',
        price: 12.99,
        image_url: '/images/beef-burger.jpg',
        is_available: true,
        restaurant_id: 1,
        // category_id will be set dynamically
    },
    {
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake with vanilla ice cream',
        price: 6.99,
        image_url: '/images/chocolate-cake.jpg',
        is_available: true,
        restaurant_id: 1,
        // category_id will be set dynamically
    },
    {
        name: 'Ice Cream Sundae',
        description: 'Vanilla ice cream with chocolate sauce and nuts',
        price: 5.99,
        image_url: '/images/ice-cream-sundae.jpg',
        is_available: true,
        restaurant_id: 1,
        // category_id will be set dynamically
    },
    {
        name: 'Soft Drink',
        description: 'Coca-Cola, Sprite, or Fanta',
        price: 2.49,
        image_url: '/images/soft-drink.jpg',
        is_available: true,
        restaurant_id: 1,
        // category_id will be set dynamically
    },
    {
        name: 'Coffee',
        description: 'Freshly brewed coffee',
        price: 3.49,
        image_url: '/images/coffee.jpg',
        is_available: true,
        restaurant_id: 1,
        // category_id will be set dynamically
    }
];

// Function to seed the database
async function seedMenuData() {
    try {
        console.log('Starting to seed menu data...');
        
        // Create categories
        console.log('Creating menu categories...');
        const categories = await db.MenuCategory.bulkCreate(sampleCategories);
        console.log(`Created ${categories.length} menu categories`);
        
        // Map category names to their IDs for easy reference
        const categoryMap = {};
        categories.forEach(category => {
            categoryMap[category.name] = category.id;
        });
        
        // Assign category IDs to menu items
        const menuItemsWithCategories = sampleMenuItems.map(item => {
            let categoryId;
            
            // Assign category based on item name/type
            if (item.name.includes('Fries') || item.name.includes('Wings')) {
                categoryId = categoryMap['Appetizers'];
            } else if (item.name.includes('Burger') || item.name.includes('Salmon')) {
                categoryId = categoryMap['Main Courses'];
            } else if (item.name.includes('Cake') || item.name.includes('Ice Cream')) {
                categoryId = categoryMap['Desserts'];
            } else if (item.name.includes('Drink') || item.name.includes('Coffee')) {
                categoryId = categoryMap['Beverages'];
            } else {
                // Default category
                categoryId = categoryMap['Main Courses'];
            }
            
            return { ...item, category_id: categoryId };
        });
        
        // Create menu items
        console.log('Creating menu items...');
        const menuItems = await db.MenuItem.bulkCreate(menuItemsWithCategories);
        console.log(`Created ${menuItems.length} menu items`);
        
        console.log('Menu data seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding menu data:', error);
    } finally {
        // Close the database connection
        await db.sequelize.close();
    }
}

// Run the seeding function
seedMenuData(); 