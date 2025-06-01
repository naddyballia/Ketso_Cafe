const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Path to your example and real .env files
const envExamplePath = path.join(__dirname, '.env.example');
const envPath = path.join(__dirname, '.env');

// Generate a random JWT secret
const generateJwtSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

// Sample environment variables if .env.example doesn't exist
const sampleEnvContent = `# Database configuration
DB_NAME=ketso_cafe
DB_USER=postgres
DB_PASS=your_password
DB_HOST=localhost
DB_PORT=5432

# Application settings
PORT=3001

# JWT (for authentication)
JWT_SECRET=${generateJwtSecret()}
JWT_EXPIRES_IN=1h
`;

// Check if .env file already exists
if (fs.existsSync(envPath)) {
  console.log('.env file already exists. Checking if JWT_SECRET is set...');
  
  // Read the current .env file
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  // Check if JWT_SECRET is already set
  if (!envContent.includes('JWT_SECRET=')) {
    // Add JWT_SECRET to the existing .env file
    const updatedEnvContent = envContent + `\n# JWT (for authentication)\nJWT_SECRET=${generateJwtSecret()}\nJWT_EXPIRES_IN=1h\n`;
    fs.writeFileSync(envPath, updatedEnvContent);
    console.log('JWT_SECRET added to existing .env file.');
  } else {
    console.log('JWT_SECRET is already set in .env file.');
  }
  
  process.exit(0);
}

// Check if .env.example exists, if not, create it with sample content
if (!fs.existsSync(envExamplePath)) {
  console.log('Creating .env.example file with sample content...');
  fs.writeFileSync(envExamplePath, sampleEnvContent);
  console.log('.env.example file created successfully.');
}

// Copy .env.example to .env
console.log('Creating .env file from .env.example...');
fs.copyFileSync(envExamplePath, envPath);
console.log('.env file created successfully. Please update it with your actual database credentials.'); 