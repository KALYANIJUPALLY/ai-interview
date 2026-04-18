{questions.length > 0 && (
  <div className="mt-6">
    <h2 className="text-xl font-semibold mb-3">
      Interview Questions
    </h2>

    {questions.map((q, index) => (
      <div
        key={index}
        className="bg-white p-4 mb-4 rounded-xl shadow hover:shadow-md transition"
      >
        {/* Question */}
        <p className="font-medium mb-2">{q}</p>

        {/* 🎤 Record Button */}
        <button
          onClick={() => startRecording(index)}
          className={`px-4 py-2 rounded text-white ${
            listeningIndex === index
              ? "bg-red-500"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {listeningIndex === index
            ? "🎤 Listening..."
            : "🎤 Record Answer"}
        </button>

        {/* 📝 Answer Display */}
        {answers[index] && (
          <div className="mt-3 p-3 bg-gray-100 rounded text-sm">
            <strong>Your Answer:</strong>
            <p>{answers[index]}</p>
          </div>
        )}
      </div>
    ))}
  </div>
)}