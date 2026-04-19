# 🚀 AI Interview Prep Dashboard

An AI-powered web application that generates personalized interview questions from a resume, supports voice-based answering, and provides AI-driven feedback to help users prepare for technical and HR interviews.

---

## 🌟 Features

* 📄 **Resume-Based Question Generation**
  Upload your resume and get tailored interview questions using AI.

* 🧠 **Category-Based Questions**
  Choose between:

  * Technical
  * HR
  * Project-based

* 🔢 **Dynamic Question Count**
  Select how many questions you want to practice.

* 🎤 **Voice Answer Recording**
  Answer questions using your voice with real-time speech-to-text.

* 📊 **AI Answer Evaluation**
  Get feedback including:

  * Score (/10)
  * Improvements
  * Suggested better answer

* ⚡ **Real-Time Processing**
  Fast and interactive UI with instant responses.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios

### Backend

* Node.js

### AI Integration

* OpenRouter API (LLM - GPT-based models)

---

## 📂 Project Structure

```
ai-interview-dashboard/
│
├── frontend/        # React App
│   ├── src/
│   └── package.json
│
├── backend/         # Node Server
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/ai-interview-dashboard.git
cd ai-interview-dashboard
```

---

### 2️⃣ Setup Backend

```
cd backend
npm install
```

Create a `.env` file:

```
API_KEY=your_openrouter_api_key
```

Run server:

```
node server.js
```

---

### 3️⃣ Setup Frontend

```
cd frontend
npm install
npm start
---

## 🧪 How It Works

1. Upload your resume
2. Select question category
3. Generate AI-based questions
4. Record answers using voice
5. Get AI feedback instantly

---

## 🚧 Challenges Solved

* Handling large resume input (token optimization)
* Integrating AI APIs efficiently
* Implementing browser-based voice recognition
* Managing async frontend-backend communication

---

## 💡 Future Improvements

* User authentication
* Save interview history
* Advanced analytics dashboard
* Multi-language support

---

## 🙌 Author

**Kalyani Jupally**

* LinkedIn: https://www.linkedin.com/in/kalyani-jupally-b9221a2a1
* Email: kalyani.jupally12@gmail.com

---

## ⭐ Contribute

Feel free to fork this repo and enhance the project!

---

## 📜 License

This project is open-source and available under the MIT License.
