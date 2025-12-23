# 🤖 AI Code Reviewer & Bug Finder

An **AI-powered full-stack developer tool** that analyzes code snippets and provides **instant insights**, including bug detection, fixes, explanations, and complexity analysis.

This project demonstrates **modern frontend engineering**, **Next.js backend APIs**, **MongoDB integration**, **authentication**, and **AI-driven workflows**.

---

## ✨ Features

- 🚨 Bug Detection (logical, runtime & syntax errors)
- 🛠️ Auto-Fix Suggestions with optimized code
- 📘 Code Explanation (step-by-step)
- ⚡ Time & Space Complexity Analysis
- 🧠 AI-powered responses using modern AI SDKs
- 🔐 Authentication with NextAuth (Google / GitHub)
- 📊 History tracking using MongoDB
- 🎨 Clean & responsive UI with Tailwind CSS

---

## 🧩 Tech Stack

### Frontend
- Next.js (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Lucide React Icons
- AI SDK (`ai`, `@google/genai`)

### Backend
- Next.js API Routes
- MongoDB
- Mongoose
- NextAuth.js


---

## 📦 Dependencies

```json
{
  "@google/genai": "^1.34.0",
  "ai": "^5.0.115",
  "lucide-react": "^0.556.0",
  "mongoose": "^9.0.2",
  "next": "16.0.7",
  "next-auth": "^4.24.13",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "zustand": "^5.0.9"
}
```

```
git clone https://github.com/AniketPatil64/AI-Code-Reviewer-Bug-Finder.git
```
```
# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ai-code-reviewer

# NextAuth
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# AI Provider
GOOGLE_GENAI_API_KEY=your_genai_api_key
```
```
cd AI-Code-Reviewer-Bug-Finder
```
```
npm install
```
```
npm run dev
```

```
src/
├── app/
│   ├── api/              # Backend API routes
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # User dashboard
│   └── page.tsx          # Home page
├── components/           # Reusable UI components
├── models/               # Mongoose schemas
├── lib/                  # Database & utilities
├── store/                # Zustand stores
└── styles/               # Global styles
```






