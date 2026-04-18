const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// 🔥 FIX PAYLOAD LIMIT
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

const API_KEY = "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";

// 🚀 Generate Questions
app.post("/generate", async (req, res) => {
  try {
    const { resumeText, category, numQuestions } = req.body;

    const safeText = resumeText.substring(0, 3000);

    const prompt = `
You are an expert interviewer.

Generate ${numQuestions} ${category} interview questions.

Make them:
- Relevant to the resume
- Clear and realistic
- Mixed difficulty

Resume:
${safeText}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    res.json({
      questions:
        response.data.choices[0].message.content,
    });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed" });
  }
});

// 📊 Evaluate Answer
app.post("/evaluate", async (req, res) => {
  try {
    const { question, answer } = req.body;

    const prompt = `
Evaluate this interview answer.

Question: ${question}
Answer: ${answer}

Give:
1. Score out of 10
2. Improvements
3. Better sample answer
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    res.json({
      feedback:
        response.data.choices[0].message.content,
    });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed" });
  }
});

app.listen(5000, () =>
  console.log("🚀 Server running on port 5000")
);