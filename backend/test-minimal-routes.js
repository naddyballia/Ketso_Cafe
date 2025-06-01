const axios = require('axios');

async function testMinimalRoutes() {
    try {
        console.log('Testing Minimal Routes...');
        
        // Test GET /api/categories - Get all menu categories
        console.log('\n--- Testing GET /api/categories ---');
        try {
            const getResponse = await axios.get('http://localhost:3004/api/categories');
            console.log('Status:', getResponse.status);
            console.log('Categories count:', getResponse.data.count);
            console.log('Categories:', getResponse.data.categories.map(cat => ({ id: cat.id, name: cat.name })));
        } catch (error) {
            console.error('GET categories failed:', error.response ? error.response.data : error.message);
            console.error('Status:', error.response ? error.response.status : 'Unknown');
        }
        
        // Test POST /api/categories - Create a new menu category
        console.log('\n--- Testing POST /api/categories ---');
        try {
            const postResponse = await axios.post('http://localhost:3004/api/categories', {
                name: 'Test Menu Category',
                restaurant_id: 1
            });
            console.log('Status:', postResponse.status);
            console.log('Response:', postResponse.data);
        } catch (error) {
            console.error('POST category failed:', error.response ? error.response.data : error.message);
            console.error('Status:', error.response ? error.response.status : 'Unknown');
        }
        
        console.log('\nMinimal Routes testing completed!');
    } catch (error) {
        console.error('Test failed:', error.message);
    }
}

testMinimalRoutes(); 