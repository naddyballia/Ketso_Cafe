// backend/test-categories-direct.js
const axios = require('axios');

async function testCategoriesEndpoint() {
    try {
        // Login to get token
        console.log('Logging in to get token...');
        const loginResponse = await axios.post('http://localhost:3001/api/auth/login', {
            username: 'admin',
            password: 'adminpassword'
        });
        const token = loginResponse.data.token;
        console.log('Login successful, got token');
        
        // Test GET request to /api/categories
        console.log('\nTesting GET /api/categories...');
        try {
            const getResponse = await axios.get(
                'http://localhost:3001/api/categories',
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('GET categories successful!');
            console.log('Status:', getResponse.status);
            console.log('Categories count:', getResponse.data.count);
        } catch (error) {
            console.error('GET categories failed:', error.response ? error.response.data : error.message);
            console.error('Status:', error.response ? error.response.status : 'Unknown');
        }
        
        // Test POST request to /api/categories
        console.log('\nTesting POST /api/categories...');
        try {
            const postResponse = await axios.post(
                'http://localhost:3001/api/categories',
                { name: 'Test Category', restaurant_id: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('POST category successful!');
            console.log('Status:', postResponse.status);
            console.log('Response:', postResponse.data);
        } catch (error) {
            console.error('POST category failed:', error.response ? error.response.data : error.message);
            console.error('Status:', error.response ? error.response.status : 'Unknown');
            if (error.response && error.response.status === 404) {
                console.error('404 Not Found - The route /api/categories is not being handled correctly');
            }
        }
    } catch (error) {
        console.error('Test failed:', error.response ? error.response.data : error.message);
    }
}

testCategoriesEndpoint(); 