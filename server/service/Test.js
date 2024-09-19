const { Question } = require("../db/model");

const addQuestion = async (body) => {
  const { type, text, options, correct_answer } = body;

  const question = await Question.create({ type, text, options, correct_answer });

  return question;
};

const getQuestions = async () => {
  const questions = await Question.findAll();
  return questions;
};

const gradeQuestions = async (body) => {
  const { answers } = body;

  const questions = await Question.findAll({});

  const questionMap = new Map();
  questions.forEach((q) => {
    questionMap.set(q.dataValues.id, q.dataValues);
  });

  const results = answers.map((answer) => {
    const question = questionMap.get(answer.questionId);

    // console.log(question);

    if (!question) {
      return { questionId: answer.questionId, result: "Question not found" };
    }

    let isCorrect = false;

    if (question.type === "1") {
      let options = question.options;

      options = options?.options || [];
      isCorrect = question.correct_answer === answer.userAnswer;
    } else if (question.type === "2") {
      isCorrect =
        question.correct_answer.toLowerCase().trim() ===
        answer.userAnswer.toLowerCase().trim();
    } else if (question.type === "3") {
      const correctWords = question.correct_answer.split(" ");
      const userWords = answer.userAnswer.split(" ");

      const matchingWords = userWords.filter((word) => correctWords.includes(word));
      const percentage = (matchingWords.length / correctWords.length) * 100;

      score = percentage >= 70 ? question.score : (percentage / 100) * question.score;
      isCorrect = percentage >= 70;
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
