# React + FastAPI Auth Template

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?logo=fastapi)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-181717?logo=github)](https://github.com/rajjitlai/React_FastAPI_Auth_Template)

A professional, modern, and secure full-stack authentication template. This project features a high-performance **FastAPI** backend, a sleek **React** frontend with **Glassmorphism** design, and **SQLite** for lightweight persistent storage.

![Preview](/assets/preview.png)

## ✨ Key Features

- **🔐 Secure Authentication**: JWT-based auth using **HTTP-only cookies** for maximum XSS protection.
- **🎨 Modern UI/UX**: Dark-themed, glassmorphic design built with pure CSS and React.
- **⚡ High Performance**: Fast, asynchronous backend powered by FastAPI and Uvicorn.
- **📂 Database Integration**: Pre-configured SQLAlchemy ORM with SQLite.
- **📖 Interactive API Docs**: Built-in Swagger UI and ReDoc for easy API testing and exploration.
- **🛠️ Production Ready**: Includes environment variable support, password hashing with Bcrypt, and professional project structure.

## 🚀 Getting Started

### Prerequisites

- **Python** 3.9+
- **Node.js** 18+
- **npm** or **yarn**

### Installation & Setup

#### 1. Backend (FastAPI)

```bash
cd server
python -m venv venv
# Windows
.\venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
python main.py
```

#### 2. Frontend (React)

```bash
cd client
npm install
cp .env.example .env # Create if not exists
npm run dev
```

## 🛠️ API Documentation

The backend provides interactive documentation out of the box:

- **Swagger UI**: [http://localhost:3000/docs](http://localhost:3000/docs) - Explore and test endpoints directly.
- **ReDoc**: [http://localhost:3000/redoc](http://localhost:3000/redoc) - Clean, technical documentation.

## 📁 Project Structure

```text
├── client/              # React (Vite) Frontend
│   ├── src/components/  # Glassmorphic UI Components
│   └── App.css          # Modern Dark Theme Styles
├── server/              # FastAPI Backend
│   ├── routes/          # API Endpoints (Auth, User)
│   ├── auth.py          # JWT & Security Logic
│   ├── models.py        # SQLAlchemy Models
│   └── database.py      # DB Connection & Session
└── README.md            # You are here
```

## 🔗 Links

- **Repository**: [https://github.com/rajjitlai/React_FastAPI_Auth_Template](https://github.com/rajjitlai/React_FastAPI_Auth_Template)

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

Developed with ❤️ by **Rajjit Laishram**, 2026.
