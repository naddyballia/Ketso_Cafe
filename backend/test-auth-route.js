// backend/test-auth-route.js
const axios = require('axios');

async function testAuthRoute() {
    try {
        console.log('Testing login endpoint...');
        const loginResponse = await axios.post('http://localhost:3001/api/auth/login', {
            username: 'admin',
            password: 'adminpassword'
        });
        console.log('Login successful!');
        console.log('Status:', loginResponse.status);
        console.log('Token:', loginResponse.data.token);
        
        // Test a simple GET request to root
        console.log('\nTesting root endpoint...');
        const rootResponse = await axios.get('http://localhost:3001');
        console.log('Root endpoint successful!');
        console.log('Status:', rootResponse.status);
        console.log('Response:', rootResponse.data);
        
        // Test GET request to /api/users/profile with token
        console.log('\nTesting protected profile endpoint...');
        const profileResponse = await axios.get(
            'http://localhost:3001/api/users/profile',
            { headers: { Authorization: `Bearer ${loginResponse.data.token}` } }
        );
        console.log('Profile endpoint successful!');
        console.log('Status:', profileResponse.status);
        console.log('Response:', profileResponse.data);
    } catch (error) {
        console.error('Test failed:', error.response ? error.response.data : error.message);
    }
}

testAuthRoute(); 