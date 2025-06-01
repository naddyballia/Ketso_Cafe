const db = require('./config/database');
const bcrypt = require('bcryptjs');

async function createAdminUser() {
    try {
        console.log('Creating admin user...');
        
        // Check if admin user already exists
        const existingAdmin = await db.User.findOne({ where: { username: 'admin' } });
        
        if (existingAdmin) {
            console.log('Admin user already exists.');
            return;
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('adminpassword', salt);
        
        // Create admin user
        const adminUser = await db.User.create({
            username: 'admin',
            password_hash: hashedPassword,
            role: 'admin',
            restaurant_id: 1
        });
        
        console.log('Admin user created successfully:', {
            id: adminUser.id,
            username: adminUser.username,
            role: adminUser.role
        });
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        // Close the database connection
        await db.sequelize.close();
    }
}

// Run the function
createAdminUser(); 