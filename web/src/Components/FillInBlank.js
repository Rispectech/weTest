import React from "react";

const FillInBlank = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      required
      onChange={(e) => onChange(e.target.value)}
      className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter your answer"
    />
  );
};

export default FillInBlank;
