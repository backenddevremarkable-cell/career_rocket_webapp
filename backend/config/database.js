const { Sequelize } = require('sequelize');
const config = require('./config');

let DB_NAME = config.DB_NAME;
let DB_HOST = config.DB_HOST;
let DB_PASSWORD = config.DB_PASSWORD;
let DB_USER = config.DB_USER;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4',
  },
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  },
  logging: false,
});

// Authenticate and Sync
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✔ Database connected');

    await sequelize.sync({ alter: false });
    console.log('✔ Models synchronized');
  } catch (error) {
    console.error('❌ Database error:', error);
  }
};

connectDB();

module.exports = sequelize;
