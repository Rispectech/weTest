const { generateHash } = require("../utils/bcrypt");

const registerUser = (username, password) => {
  const hashedPassword = generateHash(password);
};
