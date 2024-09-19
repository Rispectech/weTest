const express = require("express");
const {
  addQuestionController,
  getQuestionsController,
  gradeQuestionsController,
} = require("../controller/test");
const testRouter = express.Router();

testRouter.route("/questions/add").post(addQuestionController);
testRouter.route("/questions").get(getQuestionsController);
testRouter.route("/grade").post(gradeQuestionsController);

module.exports = { testRouter };
