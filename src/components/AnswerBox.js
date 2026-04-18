import React, { useState } from "react";

const AnswerBox = ({ question }) => {
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState("");

  const evaluateAnswer = () => {
    if (answer.length > 50) {
      setScore("Good Answer ⭐");
    } else {
      setScore("Needs Improvement ⚠️");
    }
  };

  return (
    <div>
      <textarea
        rows="3"
        placeholder="Type your answer..."
        onChange={(e) => setAnswer(e.target.value)}
      />
      <br />
      <button onClick={evaluateAnswer}>Evaluate</button>
      <p>{score}</p>
    </div>
  );
};

export default AnswerBox;