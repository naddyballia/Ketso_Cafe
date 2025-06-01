// backend/test-login.js
const axios = require('axios');

async function testLogin() {
    try {
        console.log('Testing login endpoint...');
        const response = await axios.post('http://localhost:3001/api/auth/login', {
            username: 'admin',
            password: 'adminpassword'
        });
        console.log('Status:', response.status);
        console.log('Token:', response.data.token);
        return response.data.token;
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
    }
}

testLogin(); 