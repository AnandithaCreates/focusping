# 🚀 FocusPing – Smart Study Productivity Analyzer

FocusPing is a minimal yet powerful study productivity app that helps you track focus sessions and get instant feedback using a serverless AWS backend.

It is built as a full-stack cloud project using React + AWS Lambda + API Gateway + AWS Amplify.

---

## 🌍 Live App
https://main.d17mdo0ntgha9u.amplifyapp.com/

---

## ✨ Features

🧠 Study Analyzer  
- Enter topic + study duration  
- Get productivity score (1–10)  
- Smart feedback tips

⏳ Focus Sessions  
- Encourages deep work (Pomodoro style)

📊 Productivity Score System  
- 0–3 → Low focus  
- 4–6 → Medium focus  
- 7–10 → Deep work achieved  

📝 Session History  
- Tracks recent study sessions

🎨 Modern UI  
- Animated gradient background  
- Floating particles  
- Glassmorphism UI card  
- Smooth animations

---

## ⚙️ Architecture

React (Frontend)
        │
        ▼
API Gateway (HTTP API)
        │
        ▼
AWS Lambda Function
        │
        ▼
Returns productivity score + feedback

---

## ☁️ Tech Stack

- React + Vite
- Framer Motion (animations)
- AWS Lambda (backend logic)
- API Gateway (HTTP API)
- AWS Amplify (hosting)

---

## 🧠 Backend Logic

- ≥ 90 min → Excellent deep work
- ≥ 45 min → Good focus
- ≥ 20 min → Needs improvement
- < 20 min → Try Pomodoro technique

---

## 🚀 Deployment Flow

1. Create React app (Vite)
2. Build UI
3. Create AWS Lambda function
4. Connect API Gateway
5. Deploy frontend using AWS Amplify

---

## 💻 Run Locally

npm install  
npm run dev

---

## 🧪 Build Project

npm run build

---

## 💡 Why This Project Matters

✔ Serverless architecture  
✔ Full-stack cloud deployment  
✔ Real-world productivity tool  
✔ React + AWS integration  
✔ Portfolio + hackathon ready  

---

## 🔮 Future Improvements

- Authentication (AWS Cognito)
- Save sessions (DynamoDB)
- Dashboard analytics
- Notifications
- PWA mobile version

---
## 🔄 Technical Workflow & Impact

### **The Workflow**
The application operates on a purely event-driven architecture to ensure zero idle costs:
1. **Trigger:** User inputs study data via the React frontend.
2. **Processing:** A REST request is sent through **AWS API Gateway**, triggering a **Node.js Lambda** function.
3. **Logic:** The Lambda function calculates productivity metrics based on duration-intensity algorithms.
4. **Response:** Results are piped back to the UI in real-time, providing immediate cognitive feedback to the user.

### **The Impact**
FocusPing was designed to solve the "productivity paradox"—where tracking work often becomes a distraction itself. 
* **Cost Efficiency:** By utilizing AWS Amplify (paused) and Lambda, the project demonstrates a **100% serverless** footprint, meaning costs only incur during active usage.
* **Behavioral Science:** Uses Pomodoro-inspired logic to encourage "Deep Work" states, helping users recognize when their focus sessions are too short to be effective.
* **Developer Readiness:** Built as a template for scalable cloud applications, proving how modern UI (Framer Motion) can be paired with robust cloud backends.


## 👩‍💻 Developer
Built by Ananditha ⚡  
Focus creates consistency.
