const express = require("express");
const { loginUserController, registerUserController } = require("../controller/User");

const userRouter = express.Router();

userRouter.route("/user/login").post(loginUserController);
userRouter.route("/user/register").post(registerUserController);

module.exports = { userRouter };
