const { Question } = require("../db/model");

const addQuestion = async (body) => {
  const { type, text, options, correct_answer } = body;

  if (!["1", "2", "3"].includes(type)) {
    return res.status(400).send("Invalid type value");
  }

  const question = await Question.create({ type, text, options, correct_answer });

  return question;
};

const getQuestions = async () => {
  const questions = await Question.findAll();
  return questions;
};

const gradeQuestions = async (body) => {
  const { answers } = body; // answers should be an array of { questionId, userAnswer }

  if (!Array.isArray(answers)) {
    return res.status(400).send("Invalid answers format");
  }

  // Retrieve all the questions involved in the answers
  const questions = await Question.findAll({});

  const questionMap = new Map();
  questions.forEach((q) => {
    questionMap.set(q.dataValues.id, q.dataValues);
  });

  // Evaluate each answer
  const results = answers.map((answer) => {
    const question = questionMap.get(answer.questionId);

    // console.log(question);

    if (!question) {
      return { questionId: answer.questionId, result: "Question not found" };
    }

    let isCorrect = false;

    // Grading logic for different question types
    if (question.type === "1") {
      // MCQ
      let options = question.options;

      options = options?.options || [];
      isCorrect =
        question.correct_answer === answer.userAnswer && options.includes(answer.userAnswer);
    } else if (question.type === "2") {
      // Fill-in-the-Blank
      isCorrect =
        question.correct_answer.toLowerCase().trim() ===
        answer.userAnswer.toLowerCase().trim();
    } else if (question.type === "3") {
      // Descriptive
      // Simple comparison, might need more advanced logic for actual descriptive grading
      isCorrect =
        question.correct_answer.toLowerCase().trim() ===
        answer.userAnswer.toLowerCase().trim();
    }

    return {
      questionId: answer.questionId,
      isCorrect,
      correctAnswer: question.correct_answer,
      score: question.score,
    };
  });

  return {
    totalSum: results.reduce((acc, val) => {
      return acc + val.isCorrect ? val.score : 0;
    }, 0),
    results,
  };
};

module.exports = { addQuestion, getQuestions, gradeQuestions };
