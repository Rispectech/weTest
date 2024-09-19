const express = require("express");
const sequelize = require("./db/db");
const connection = require("./db/db");
const { syncModels } = require("./db/model");
const { testRouter } = require("./route/test");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use("/api/", testRouter);

app.listen(PORT, async () => {
  console.log(`Server is listening at port ${PORT}`);
  await sequelize.authenticate();
  console.log("Connection to the database has been established successfully.");
  await syncModels();
});
