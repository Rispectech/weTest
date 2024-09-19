const sequelize = require("../db/db");
const { generateHash } = require("../utils/bcrypt");
const { createAccessToken, createRefreshToken } = require("../utils/jwt");

const registerUser = async (username, password) => {
  const hashedPassword = generateHash(password);

  const [result] = await sequelize.query("INSERT INTO users (email, password) VALUES (?, ?)", [
    email,
    hashedPassword,
  ]);
  const user = { id: result.insertId, email };
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);
};
