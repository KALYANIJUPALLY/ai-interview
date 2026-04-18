const startRecording = (index) => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Your browser does not support voice recording. Use Chrome.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  setListeningIndex(index);

  recognition.start();

  recognition.onstart = () => {
    console.log("🎤 Recording started...");
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;

    setAnswers((prev) => ({
      ...prev,
      [index]: transcript,
    }));

    setListeningIndex(null);
  };

  recognition.onerror = (event) => {
    console.error("Speech error:", event.error);
    setListeningIndex(null);
    alert("Voice recording failed. Try again.");
  };

  recognition.onend = () => {
    console.log("🎤 Recording stopped");
    setListeningIndex(null);
  };
};