// backend/test-category-by-id.js
const axios = require('axios');

async function testGetCategoryById() {
    try {
        console.log('Testing Get Category By ID...');
        
        // Test with a valid ID using the test route
        console.log('\n--- Testing GET /api/test-categories/1 ---');
        try {
            const response = await axios.get('http://localhost:3001/api/test-categories/1');
            console.log('Status:', response.status);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error.message);
            if (error.response) {
                console.error('Status:', error.response.status);
                console.error('Response:', error.response.data);
            }
        }
        
        // Test with an invalid ID using the test route
        console.log('\n--- Testing GET /api/test-categories/999 (non-existent ID) ---');
        try {
            const response = await axios.get('http://localhost:3001/api/test-categories/999');
            console.log('Status:', response.status);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error.message);
            if (error.response) {
                console.error('Status:', error.response.status);
                console.error('Response:', error.response.data);
            }
        }
        
        // Original route tests
        console.log('\n--- Testing GET /api/categories/1 ---');
        try {
            const response = await axios.get('http://localhost:3001/api/categories/1');
            console.log('Status:', response.status);
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error.message);
            if (error.response) {
                console.error('Status:', error.response.status);
                console.error('Response:', error.response.data);
            }
        }
        
        console.log('\nTesting completed!');
    } catch (error) {
        console.error('Test failed:', error.message);
    }
}

testGetCategoryById(); 