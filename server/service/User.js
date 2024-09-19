const sequelize = require("../db/db");
const { User } = require("../db/model");
const { generateHash, compareHash } = require("../utils/bcrypt");
const { createAccessToken, createRefreshToken } = require("../utils/jwt");

const registerUser = async (body) => {
  const { email, name, password } = body;
  const hashedPassword = await generateHash(password);
  // const newUser = await User.create({ name, email, password: hashedPassword });

  const user = { email, name };
  const accessToken = createAccessToken(user);
  return { message: "User registered successfully", data: accessToken };
};

const loginUser = async (body) => {
  const { name, password } = body;
  console.log(body);

  const user = await User.findOne({ where: { name } });

  if (!user) {
    return { error: true, message: "Invalid credentials" };
  }

  const isPasswordValid = await compareHash(password, user.password);

  if (!isPasswordValid) {
    return { error: true, message: "Invalid credentials" };
  }

  // Create JWT Access Token
  const accessToken = createAccessToken({ id: user.id, email: user.email, name });

  return { error: false, data: accessToken };
};

module.exports = { loginUser, registerUser };
