const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

// Use incorrect password for the test user
const data = JSON.stringify({
  username: 'teststaff',
  password: 'wrongpassword'
});

const req = http.request(options, (res) => {
  let responseData = '';
  
  console.log('Status Code:', res.statusCode);
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(responseData);
      console.log('Response Body:', JSON.stringify(parsedData, null, 2));
    } catch (e) {
      console.log('Response Body (raw):', responseData);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end(); 