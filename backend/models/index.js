// backend/models/index.js
// This file is now optional since we're initializing models directly in config/database.js
// You can either remove this file or keep it for future flexibility

const db = require('../config/database');

// Export the db object from config/database.js
module.exports = db; 