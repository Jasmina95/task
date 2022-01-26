require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'Your_secret_key',
  mongoUri: process.env.MONGO || 'mongodb://localhost:27017/task'
};

module.exports = config;
