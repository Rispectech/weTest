import React from "react";

const Mcq = ({ question, value, onChange }) => {
  console.log(question);
  return (
    <div className="space-y-2">
      {question.options &&
        Object.entries(question.options).map(([key, optionText]) => (
          <label key={key} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name={`question-${question.id}`}
              value={key}
              checked={value === key}
              onChange={() => onChange(key)}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span>{optionText}</span>
          </label>
        ))}
    </div>
  );
};

export default Mcq;
