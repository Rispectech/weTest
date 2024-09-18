const express = require("express");
const sequelize = require("./db/db");
const connection = require("./db/db");

const app = express();
const PORT = 5000;

app.listen(PORT, async () => {
  console.log(`Server is listening at port ${5000}`);
  await sequelize.authenticate();
  console.log("Connection to the database has been established successfully.");
});
