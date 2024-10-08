const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define("users", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Question = sequelize.define("questions", {
  type: {
    type: DataTypes.ENUM("1", "2", "3"),
    allowNull: false,
    comment: "1: mcq, 2: fill-in-the-blank, 3: descriptive",
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  options: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  correct_answer: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Models synchronized successfully.");
  } catch (error) {
    console.error("Error syncing models:", error);
  }
};

module.exports = { User, syncModels, Question };
