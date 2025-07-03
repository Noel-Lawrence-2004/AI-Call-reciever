# 📞 AI Call Center Dashboard

An interactive, AI-powered call center dashboard built using **Next.js**, **TypeScript**, and **ShadCN UI**. This tool simulates call center operations like tracking call history, agent status, call recordings, analytics, admin configurations, and includes a **Voice Simulator** interface for testing agent interactions.

---

## 🚀 Features

- 📜 Call history with status (completed, missed, in-progress)
- 🎧 Call recording player with transcription display
- 👥 Real-time agent status tracking (available, busy, offline)
- 📊 Analytics dashboard showing call volume trends, success rates, and more
- ⚙️ Admin panel to manage phone numbers and webhook endpoints
- 🔁 Voice simulator to test call interaction flows
- 🧭 Sidebar-based navigation with persistent state
- 🌗 Fully responsive UI with clean components from ShadCN
- 🛠️ Easy to extend for live APIs and backend integration

---

## 🖼️ Screenshots

### 📍 Dashboard Overview
![Dashboard](public/screenshots/dashboard.png)

### 👥 Agent Status Page
![Agent Status](public/screenshots/AgentPool.png)

### 🎧 Call Conversations
![Conversation 1 ](public/screenshots/Conversation1.png)

![Conversation 2 ](public/screenshots/Conversation2.png)


---

## 🧱 Tech Stack

- **Next.js 14 (App Router)**
- **TypeScript**
- **ShadCN UI (Tailwind + Radix UI)**
- **Lucide Icons**
- **React Hooks + Modular Components**
- **Voice Simulator Component**

---

## 📁 Project Structure

ai-call-center-dashboard/
- ├── app/                    # Main Next.js app folder (App Router)
- │   ├── page.tsx            # Main entry page for the dashboard
- │   └── agents/             # Agents route (e.g., agents/page.tsx for Agent List)
- ├── components/             # Reusable UI and functional components
- │   ├── VoiceSimulator.tsx  # Call interaction simulator
- │   └── ui/                 # ShadCN UI components (Button, Card, etc.)
- ├── public/                 # Static assets (images, icons, audio)
- │   └── screenshots/        # App screenshots for README
- ├── styles/                 # Tailwind/global styles if any
- ├── README.md               # Project overview and documentation
- ├── package.json            # Project dependencies and scripts
- └── .gitignore              # Files to be ignored by Git

---

## 🛠️ Setup Instructions

1. **Clone the repo**

git clone https://github.com/Noel-Lawrence-2004/AI-Call-reciever.git
cd ai-call-center-dashboard

2. **Install dependencies**

npm install

3. **Run the development server**

npm run dev

Open http://localhost:3000 to view it in your browser.

**Contributing**
Pull requests are welcome! If you'd like to contribute, please fork the repo and submit a PR. For major changes, open an issue first to discuss what you’d like to change.

**License**
This project is open-source and available under the MIT License.

---

