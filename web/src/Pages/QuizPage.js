import React, { useState } from "react";
import { WeTestIcon } from "../Components/Icon";
import QuestionComponent from "../Components/QuestionType";
import ScorePopup from "../Components/ScorePopup";

const QuizPage = () => {
  const questions = [
    {
      id: 1,
      type: "1",
      text: "What is the capital of France?",
      options: {
        1: "London",
        2: "Berlin",
        3: "Paris",
        4: "Madrid",
      },
      correct_answer: "3",
    },
    {
      id: 2,
      type: "1",
      text: "Is the Earth flat?",
      options: {
        1: "True",
        2: "False",
      },
      correct_answer: "2",
    },
    {
      id: 3,
      type: "2",
      text: "The largest planet in our solar system is _______.",
      options: null,
      correct_answer: "Jupiter",
    },
    {
      id: 4,
      type: "3",
      text: "Explain the concept of gravity in your own words.",
      options: null,
      correct_answer: null,
    },
  ];

  const [answers, setAnswers] = useState({});
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [scoreData, setScoreData] = useState(null);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedAnswers = {
      answers: Object.entries(answers).map(([questionId, userAnswer]) => ({
        questionId: parseInt(questionId),
        userAnswer,
      })),
    };
    console.log(formattedAnswers);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-16 bg-indigo-600 flex flex-col items-center py-4">
        <WeTestIcon />
        <span className="mt-2 text-white font-semibold text-xs">weTest</span>
      </div>
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Quiz</h2>
          </div>
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-8">
              {questions.map((question) => (
                <div key={question.id} className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-700">
                    {question.id}. {question.text}
                  </h3>
                  <QuestionComponent
                    question={question}
                    value={answers[question.id] || ""}
                    onChange={(value) => handleAnswerChange(question.id, value)}
                  />
                </div>
              ))}
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
              >
                Submit Answers
              </button>
            </div>
          </form>
        </div>
      </div>
      {showScorePopup && (
        <ScorePopup scoreData={scoreData} onClose={() => setShowScorePopup(false)} />
      )}
    </div>
  );
};

export default QuizPage;
