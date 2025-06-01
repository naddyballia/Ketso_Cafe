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
        console.log('\nAccessing protected route with token...');
        // Now use the token to access the protected route
        accessProtectedRoute(parsedData.token);
      } else {
        console.error('No token received from login.');
      }
    } catch (e) {
      console.error('Error parsing login response:', e);
      console.log('Raw response:', loginResponseData);
    }
  });
});

loginReq.on('error', (error) => {
  console.error('Login Error:', error);
});

loginReq.write(loginData);
loginReq.end();

// Function to access the protected route with a token
function accessProtectedRoute(token) {
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/users/profile',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

  const req = http.request(options, (res) => {
    let responseData = '';
    
    console.log('Protected Route Status Code:', res.statusCode);
    
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(responseData);
        console.log('Protected Route Response:', JSON.stringify(parsedData, null, 2));
      } catch (e) {
        console.error('Error parsing protected route response:', e);
        console.log('Raw Protected Route Response:', responseData);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Protected Route Error:', error);
  });

  req.end();

  // Keep the process running a bit longer to ensure we get the complete response
  setTimeout(() => {
    console.log('Test completed.');
  }, 1000);
} 