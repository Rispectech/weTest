const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("weTest", "root", "rishabh132001", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
