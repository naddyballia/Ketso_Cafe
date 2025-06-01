const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

// Missing the required 'role' field
const data = JSON.stringify({
  username: 'newstaff',
  password: 'password123',
  restaurant_id: 1
});

const req = http.request(options, (res) => {
  let responseData = '';
  
  console.log('Status Code:', res.statusCode);
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Response Body:', responseData);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end(); 