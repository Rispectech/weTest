// ScorePopup.js
import React from "react";

function ScorePopup({ scoreData, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Quiz Results</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">Total Score: {scoreData.totalSum}</p>
            <div className="mt-4">
              {scoreData.results.map((result) => (
                <div key={result.questionId} className="mb-2 text-sm">
                  <p>
                    Question {result.questionId}: {result.isCorrect ? "Correct" : "Incorrect"}
                  </p>
                  <p>Correct Answer: {result.correctAnswer}</p>
                  <p>Score: {result.score}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScorePopup;
