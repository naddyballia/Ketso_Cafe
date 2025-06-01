// backend/test-category-routes.js
const axios = require('axios');
require('dotenv').config();

// Base URL for API requests
const API_URL = 'http://localhost:3001';

// Function to login and get token
async function loginAndGetToken() {
    try {
        console.log('Attempting to login...');
        
        // Login as admin user
        const loginResponse = await axios.post(`${API_URL}/api/auth/login`, {
            username: 'admin', // Adjust based on your actual admin user
            password: 'adminpassword' // Adjust based on your actual admin password
        });

        console.log('Login successful!');
        return loginResponse.data.token;
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Function to test creating a new menu category
async function testCreateMenuCategory(token) {
    try {
        console.log('\n--- Testing Create Menu Category ---');
        console.log('Token:', token);
        console.log('URL:', `${API_URL}/api/categories`);
        console.log('Data:', { name: 'Test Category', restaurant_id: 1 });
        
        const response = await axios.post(
            `${API_URL}/api/categories`,
            { name: 'Test Category', restaurant_id: 1 },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('Status:', response.status);
        console.log('Response:', response.data);
        
        return response.data.category.id; // Return the created category ID for further testing
    } catch (error) {
        console.error('Create category failed:', error.response ? error.response.data : error.message);
        console.error('Error details:', error);
        throw error;
    }
}

// Function to test getting all menu categories
async function testGetAllMenuCategories(token) {
    try {
        console.log('\n--- Testing Get All Menu Categories ---');
        console.log('Token:', token);
        console.log('URL:', `${API_URL}/api/categories`);
        
        const response = await axios.get(
            `${API_URL}/api/categories`,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('Status:', response.status);
        console.log('Categories count:', response.data.count);
        console.log('Categories:', response.data.categories.map(cat => ({ id: cat.id, name: cat.name })));
    } catch (error) {
        console.error('Get categories failed:', error.response ? error.response.data : error.message);
        console.error('Error details:', error);
        throw error;
    }
}

// Main test function
async function runTests() {
    try {
        // Login and get token
        const token = await loginAndGetToken();
        console.log('Successfully logged in and got token');

        // Test creating a new category
        const categoryId = await testCreateMenuCategory(token);
        
        // Test getting all categories
        await testGetAllMenuCategories(token);
        
        console.log('\nAll tests completed successfully!');
    } catch (error) {
        console.error('Test failed:', error);
    }
}

// Run the tests
runTests(); 