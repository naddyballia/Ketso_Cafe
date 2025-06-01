const http = require('http');

// First, we need to get a token by logging in
const loginOptions = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const loginData = JSON.stringify({
  username: 'teststaff',
  password: 'password123'
});

const loginReq = http.request(loginOptions, (loginRes) => {
  let loginResponseData = '';
  
  loginRes.on('data', (chunk) => {
    loginResponseData += chunk;
  });
  
  loginRes.on('end', () => {
    try {
      console.log('Login Status Code:', loginRes.statusCode);
      const parsedData = JSON.parse(loginResponseData);
      console.log('Login Response:', JSON.stringify(parsedData, null, 2));
      
      if (parsedData.token) {
        console.log('\nAccessing admin route with token...');
        // Now use the token to access the admin route
        accessAdminRoute(parsedData.token);
      } else {
        console.error('No token received from login.');
        process.exit(1);
      }
    } catch (e) {
      console.error('Error parsing login response:', e);
      console.log('Raw response:', loginResponseData);
      process.exit(1);
    }
  });
});

loginReq.on('error', (error) => {
  console.error('Login Error:', error);
  process.exit(1);
});

loginReq.write(loginData);
loginReq.end();

// Function to access the admin route with a token
function accessAdminRoute(token) {
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/users/admin',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const req = http.request(options, (res) => {
    let responseData = '';
    
    console.log('Admin Route Status Code:', res.statusCode);
    
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(responseData);
        console.log('Admin Route Response:', JSON.stringify(parsedData, null, 2));
      } catch (e) {
        console.error('Error parsing admin route response:', e);
        console.log('Raw Admin Route Response:', responseData);
      }
      console.log('\nTest completed.');
    });
  });

  req.on('error', (error) => {
    console.error('Admin Route Error:', error);
    process.exit(1);
  });

  req.end();
} 