# 🚀 SkillPath — Intelligent Learning Path Generator

## 📌 Overview

SkillPath is a full-stack intelligent learning platform designed to generate personalized learning roadmaps based on a user's goals, experience level, and learning progress.

The platform combines dynamic roadmap generation, interactive graph visualization, authentication, and persistent progress tracking to create a structured and engaging learning experience.

Unlike static roadmap websites, SkillPath focuses on personalized progression, scalable roadmap architecture, and future AI-assisted learning recommendations.

---

# 🌐 Current Project Status

🚧 **Work in Progress**

SkillPath is currently under active development and has already reached a strong functional MVP stage with authentication, roadmap persistence, graph visualization, and progress tracking completed.

The project is now evolving toward a more scalable and production-grade intelligent learning platform.

---

# 🎯 Core Features Implemented

- 🔐 JWT-based Authentication System
- 👤 User Registration & Login
- 🛡️ Protected Routes
- 🧠 Dynamic Learning Roadmap Generation
- 📊 Interactive Graph-Based Visualization
- 🔄 Personalized Learning Paths
- ✅ Progress Tracking & Completion Status
- 💾 Persistent User Progress Saving
- 🎨 Modern Responsive UI
- 🔍 Zoom/Pan Interactive Learning Graph
- 📈 Progress Percentage Tracking
- 🗂 User-Specific Roadmap Persistence
- ⚡ REST API-Based Architecture

---

# 🧠 Tech Stack

## 🖥️ Frontend
- React
- Vite
- Tailwind CSS
- React Flow

## ⚙️ Backend
- Node.js
- Express.js
- JWT Authentication
- REST APIs

## 🗄️ Database
- MongoDB
- Mongoose

## ⚙️ Development Tools
- Git
- GitHub
- Environment Variables (.env)

---

# 🧱 System Architecture

SkillPath follows a modular full-stack architecture with separate frontend, backend, and database layers.

---

## 1. Frontend (React)

- Built using React + Vite
- Uses React Flow for interactive roadmap rendering
- Handles:
  - authentication UI
  - roadmap visualization
  - progress tracking
  - interactive graph navigation
- Provides responsive and modern user experience

---

## 2. Backend (Node.js + Express)

- Handles authentication and roadmap APIs
- Generates personalized learning paths
- Manages user-specific roadmap persistence
- Provides secure protected routes using JWT

---

## 3. Database (MongoDB)

- Stores:
  - user accounts
  - generated roadmaps
  - roadmap progress
  - completion status
- Supports scalable document-based roadmap structures

---

# 📊 Current Progress

## ✅ Completed

### 🔐 Authentication System
- User registration
- Login/logout
- JWT authentication
- Protected routes
- Persistent login sessions

### 🧠 Roadmap Generation Engine
- Goal-based roadmap generation
- Beginner / Intermediate / Advanced support
- Dynamic roadmap node creation

### 📈 Interactive Visualization
- Graph-based roadmap rendering
- Zoom and pan support
- Dynamic node connections
- Responsive graph canvas

### ✅ Progress Tracking
- Mark topics as completed
- Dynamic progress percentage updates
- Persistent progress saving
- User-specific roadmap retrieval

### 💾 Database Integration
- MongoDB persistence
- User-specific roadmap ownership
- Persistent learning history

---

# 🚧 Features Currently In Development

- Scalable roadmap generation engine
- Multi-domain roadmap support
- Editable learning paths
- Improved UI/UX polish
- Advanced roadmap customization
- Smarter prerequisite mapping
- Learning analytics dashboard

---

# 🔮 Planned Future Enhancements

## 🤖 AI-Assisted Roadmap Generation
- Personalized AI-generated learning paths
- Goal-to-career timeline estimation
- Intelligent topic sequencing

## 📊 Analytics Dashboard
- Learning streaks
- Weekly/monthly progress insights
- Completion analytics

## 🧠 Advanced Personalization
- Skill-gap analysis
- Adaptive roadmap generation
- Prerequisite skipping based on known skills

## 🛠 Editable Learning Graph
- Add/remove custom nodes
- Reorder roadmap structure
- Custom learning paths

## 🌐 Production Deployment
Planned deployment architecture:

- Frontend → Vercel
- Backend → Render / AWS
- Database → MongoDB Atlas

---

# ⚙️ Environment Configuration

## Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
```

---

## Backend (.env)

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

# 🚀 Run Locally

```bash
git clone https://github.com/ghanashyamd12/Intelligent-learning-path-generator.git

cd Intelligent-learning-path-generator
```

## Frontend

```bash
cd client
npm install
npm run dev
```

## Backend

```bash
cd server
npm install
npm start
```

---

# 🧠 Engineering Highlights

- Graph-based learning visualization
- Modular roadmap architecture
- JWT-secured authentication system
- User-specific persistent progress tracking
- Dynamic roadmap generation workflows
- Scalable backend API design
- Interactive React Flow integration
- Full-stack state persistence

---

# 📈 Project Vision

SkillPath aims to evolve into a scalable intelligent learning platform capable of generating highly personalized, adaptive learning experiences for different technical domains and career goals.

The long-term goal is to combine roadmap generation, analytics, and AI-powered personalization into a unified developer learning ecosystem.

---

# 👨‍💻 Author

Ghanashyam D

---

# ⭐ If you like this project

Give it a star ⭐ on GitHub!
