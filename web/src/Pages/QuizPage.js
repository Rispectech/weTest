import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WeTestIcon } from "../Components/Icon";
import QuestionComponent from "../Components/QuestionType";
import ScorePopup from "../Components/ScorePopup";
import { AuthContext } from "../context/context";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [scoreData, setScoreData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    try {
      const response = await fetch("https://wetest.onrender.com/api/questions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timer);
            handleNextQuestion();
            return 60;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentQuestionIndex, questions]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(60);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const formattedAnswers = {
      answers: Object.entries(answers).map(([questionId, userAnswer]) => ({
        questionId: parseInt(questionId),
        userAnswer,
      })),
    };

    try {
      const response = await fetch("https://wetest.onrender.com/api/grade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedAnswers),
      });

      const data = await response.json();

      setScoreData(data);
      setShowScorePopup(true);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  const handleCloseScorePopUp = () => {
    setShowScorePopup(false);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setTimeLeft(60);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-32 bg-indigo-600 flex flex-col items-center py-4">
        <WeTestIcon />
        <span className="mt-2 text-white font-semibold text-xs">weTest</span>
        <button
          onClick={handleLogout}
          className="mt-auto mb-4 text-white px-2 py-1 bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Quiz</h2>
            <p className="text-lg font-semibold text-gray-600 mt-2">
              Time left: {timeLeft} seconds
            </p>
          </div>
          {currentQuestion && (
            <div className="p-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-700">
                  {currentQuestionIndex + 1}. {currentQuestion.text}
                </h3>
                <QuestionComponent
                  question={currentQuestion}
                  value={answers[currentQuestion.id] || ""}
                  onChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                />
              </div>
              <div className="mt-8">
                <button
                  onClick={handleNextQuestion}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                >
                  {currentQuestionIndex < questions.length - 1
                    ? "Next Question"
                    : "Submit Quiz"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {showScorePopup && <ScorePopup scoreData={scoreData} onClose={handleCloseScorePopUp} />}
    </div>
  );
};

export default QuizPage;
