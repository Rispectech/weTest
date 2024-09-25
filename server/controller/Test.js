const testService = require("../service/Test");

const addQuestionController = async (req, res) => {
  try {
    const result = await testService.addQuestion(req.body);
    res.status(201).send(result);
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).send("Error creating question");
  }
};

const getQuestionsController = async (req, res) => {
  try {
    const questions = await testService.getQuestions();
    res.status(201).json(questions);
  } catch (error) {
    console.error("Error retrieving questions:", error);
    res.status(500).send("Error retrieving questions");
  }
};

const gradeQuestionsController = async (req, res) => {
  try {
    const results = await testService.gradeQuestions(req.body);
    res.json(results);
  } catch (error) {
    console.error("Error grading answers:", error);
    res.status(500).send("Error grading answers");
  }
};

module.exports = {
  addQuestionController,
  getQuestionsController,
  gradeQuestionsController,
};
