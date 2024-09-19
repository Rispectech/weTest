import React, { useEffect, useState } from "react";
import { WeTestIcon } from "../Components/Icon";
import QuestionComponent from "../Components/QuestionType";
import ScorePopup from "../Components/ScorePopup";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [scoreData, setScoreData] = useState(null);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/questions");
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedAnswers = {
      answers: Object.entries(answers).map(([questionId, userAnswer]) => ({
        questionId: parseInt(questionId),
        userAnswer,
      })),
    };

    try {
      const response = await fetch("http://localhost:5000/api/grade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedAnswers),
      });

      const data = await response.json();

      setScoreData(data);
      setShowScorePopup(true);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleCloseScorePopUp = () => {
    setShowScorePopup(false);
    setAnswers({});
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
                    onChange={(value, text = "") =>
                      handleAnswerChange(question.id, value, text)
                    }
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
      {showScorePopup && <ScorePopup scoreData={scoreData} onClose={handleCloseScorePopUp} />}
    </div>
  );
};

export default QuizPage;
