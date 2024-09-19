import React from "react";
import FillInBlank from "./FillInBlank";
import Mcq from "./Mcq";
import Text from "./Text";

const QuestionComponent = ({ question, value, onChange }) => {
  switch (question.type) {
    case "1": // Multiple choice
      return <Mcq question={question} value={value} onChange={onChange} />;
    case "2": // Fill in the blank
      return <FillInBlank value={value} onChange={onChange} />;
    case "3": // Text box
      return <Text value={value} onChange={onChange} />;
    default:
      return null;
  }
};

export default QuestionComponent;
