import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [resumeText, setResumeText] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [loading, setLoading] = useState(false);
  const [listeningIndex, setListeningIndex] = useState(null);
  const [category, setCategory] = useState("technical");
  const [numQuestions, setNumQuestions] = useState(5);

  // 📄 Upload Resume
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setResumeText(event.target.result);
    };
    reader.readAsText(file);
  };

  // 🚀 Generate Questions
  const generateQuestions = async () => {
    if (!resumeText) return;

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/generate", {
        resumeText: resumeText.substring(0, 3000),
        category,
        numQuestions,
      });

      const list = res.data.questions
        .split("\n")
        .filter((q) => q.trim() !== "");

      setQuestions(list);
      setAnswers({});
      setFeedback({});
    } catch (err) {
      alert("Failed to generate questions");
    }

    setLoading(false);
  };

  // 🔁 Auto regenerate on category change
  useEffect(() => {
    if (resumeText) {
      generateQuestions();
    }
  }, [category]);

  // 🎤 Voice Recording
  const startRecording = (index) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Use Chrome for voice feature");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    setListeningIndex(index);
    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;

      setAnswers((prev) => ({
        ...prev,
        [index]: text,
      }));

      setListeningIndex(null);
    };

    recognition.onerror = () => {
      setListeningIndex(null);
    };
  };

  // 📊 Evaluate Answer
  const evaluateAnswer = async (index) => {
    const answer = answers[index];
    if (!answer) return alert("Record answer first");

    try {
      const res = await axios.post("http://localhost:5000/evaluate", {
        question: questions[index],
        answer,
      });

      setFeedback((prev) => ({
        ...prev,
        [index]: res.data.feedback,
      }));
    } catch (err) {
      alert("Evaluation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
        🚀 AI Interview Prep Dashboard
      </h1>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow">

        {/* Category */}
        <div className="flex gap-3 mb-4">
          {["technical", "hr", "project"].map((type) => (
            <button
              key={type}
              onClick={() => setCategory(type)}
              className={`px-4 py-2 rounded ${
                category === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Number of Questions */}
        <input
          type="number"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          className="border p-2 rounded w-full mb-3"
          placeholder="Number of questions"
        />

        {/* Upload */}
        <input type="file" onChange={handleFileUpload} />

        <button
          onClick={generateQuestions}
          className="w-full mt-3 bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Generating..." : "Generate Questions"}
        </button>

        {/* Questions */}
        {questions.map((q, i) => (
          <div key={i} className="mt-5 p-4 bg-gray-50 rounded shadow">
            <p>{q}</p>

            {/* 🎤 Record */}
            <button
              onClick={() => startRecording(i)}
              className={`mt-2 px-3 py-1 text-white rounded ${
                listeningIndex === i
                  ? "bg-red-500"
                  : "bg-green-600"
              }`}
            >
              {listeningIndex === i
                ? "🎤 Listening..."
                : "🎤 Record"}
            </button>

            {/* Answer */}
            {answers[i] && (
              <p className="mt-2 text-sm bg-white p-2 rounded">
                {answers[i]}
              </p>
            )}

            {/* Evaluate */}
            <button
              onClick={() => evaluateAnswer(i)}
              className="mt-2 px-3 py-1 bg-purple-600 text-white rounded"
            >
              Evaluate
            </button>

            {/* Feedback */}
            {feedback[i] && (
              <div className="mt-2 bg-green-100 p-2 rounded text-sm">
                {feedback[i]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;