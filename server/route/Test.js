const express = require("express");
const {
  addQuestionController,
  getQuestionsController,
  gradeQuestionsController,
} = require("../controller/Test");
const authenticateToken = require("../middleware/auth");
const testRouter = express.Router();

testRouter.route("/questions/add").post(authenticateToken, addQuestionController);
testRouter.route("/questions").get(authenticateToken, getQuestionsController);
testRouter.route("/grade").post(authenticateToken, gradeQuestionsController);

module.exports = { testRouter };
