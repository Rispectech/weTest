const sequelize = require("../db/db");
const { User } = require("../db/model");
const { generateHash } = require("../utils/bcrypt");
const { createAccessToken, createRefreshToken } = require("../utils/jwt");

const registerUser = async (body) => {
  const { name, password } = body;
  const hashedPassword = generateHash(password);
  const newUser = await User.create({ name, email, password: hashedPassword });

  const user = { id: newUser.id, email, username };
  const accessToken = createAccessToken(user);
  res.status(201).json({ message: "User registered successfully", userId: newUser.id });
};
