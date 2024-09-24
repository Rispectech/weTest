const userService = require("../service/User");

const registerUserController = async (req, res) => {
  try {
    const result = await userService.registerUser(req.body);
    return res.status(201).json({ data: result });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Error creating user" });
  }
};

const loginUserController = async (req, res) => {
  try {
    const result = await userService.loginUser(req.body);
    if (result.error) {
      return res.status(401).json({ message: result.message });
    } else {
      return res.status(201).json({ data: result });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error login user" });
  }
};

module.exports = {
  registerUserController,
  loginUserController,
};
