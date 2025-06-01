const axios = require('axios');

async function testServer() {
    try {
        console.log('Testing server root endpoint...');
        const response = await axios.get('http://localhost:3001');
        console.log('Status:', response.status);
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error testing server:', error.message);
    }
}

testServer(); 