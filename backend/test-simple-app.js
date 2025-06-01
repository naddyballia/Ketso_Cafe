// backend/test-simple-app.js
const axios = require('axios');

async function testSimpleApp() {
    try {
        // Test root endpoint
        console.log('Testing root endpoint...');
        const rootResponse = await axios.get('http://localhost:3002');
        console.log('Root endpoint successful!');
        console.log('Status:', rootResponse.status);
        console.log('Response:', rootResponse.data);
        
        // Login to get token from main app
        console.log('\nLogging in to get token from main app...');
        const loginResponse = await axios.post('http://localhost:3001/api/auth/login', {
            username: 'admin',
            password: 'adminpassword'
        });
        const token = loginResponse.data.token;
        console.log('Login successful, got token');
        
        // Test GET request to /api/categories on simple app
        console.log('\nTesting GET /api/categories on simple app...');
        try {
            const getResponse = await axios.get(
                'http://localhost:3002/api/categories',
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('GET categories successful!');
            console.log('Status:', getResponse.status);
            console.log('Response:', getResponse.data);
        } catch (error) {
            console.error('GET categories failed:', error.response ? error.response.data : error.message);
            console.error('Status:', error.response ? error.response.status : 'Unknown');
        }
        
        // Test POST request to /api/categories on simple app
        console.log('\nTesting POST /api/categories on simple app...');
        try {
            const postResponse = await axios.post(
                'http://localhost:3002/api/categories',
                { name: 'Test Category', restaurant_id: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('POST category successful!');
            console.log('Status:', postResponse.status);
            console.log('Response:', postResponse.data);
        } catch (error) {
            console.error('POST category failed:', error.response ? error.response.data : error.message);
            console.error('Status:', error.response ? error.response.status : 'Unknown');
        }
    } catch (error) {
        console.error('Test failed:', error.message);
    }
}

testSimpleApp(); 