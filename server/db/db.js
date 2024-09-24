const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    password: process.env.DB_PORT,
    ssl: {
      require: true, // Set to true if connecting to a remote database with SSL
      rejectUnauthorized: false, // You can set this to true if you have a certificate for verification
    },
  }
);

module.exports = sequelize;
