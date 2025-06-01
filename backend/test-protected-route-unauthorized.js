const http = require('http');

// Try to access the protected route without a token
const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/users/profile',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let responseData = '';
  
  console.log('Status Code:', res.statusCode);
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(responseData);
      console.log('Response:', JSON.stringify(parsedData, null, 2));
    } catch (e) {
      console.log('Raw Response:', responseData);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end();

// Keep the process running a bit longer to ensure we get the complete response
setTimeout(() => {
  console.log('Test completed.');
}, 1000); 