const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    // Database name
    'artist_db',
    // User
    'root',
    // Password
    '8Attack@',
    {
      // Database location
      host: 'localhost',
      dialect: 'mysql',
      port: 3305
    }
);

module.exports = sequelize;
