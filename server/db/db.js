const { Sequelize } = require("sequelize");

// Create a new instance of Sequelize

const sequelize = new Sequelize("weTest", "root", "rishabh132001", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Set to true if you want to see SQL queries in the console
});

// Call the sync function
// syncModels();

module.exports = sequelize;
