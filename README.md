# SweetKata - Sweet Shop Management App 🍬

A full-stack MERN application to manage a sweet shop, including backend APIs and a React frontend.  
Users can browse sweets, manage menus, and admins can add or update items.

---

## Table of Contents
1. [Project Description](#project-description)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup Instructions](#setup-instructions)
   - [Backend](#backend)
   - [Frontend](#frontend)
5. [AI Assistance](#ai-assistance)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [License](#license)

---

## Project Description
SweetKata is a sweet shop management system that allows:
- Users to register/login securely.
- Customers to browse available sweets.
- Admins to add, update, or delete menu items.
- Purchase and restock management for inventory.
- Simple and clean UI with background images.

---

## Features
- 👥 User authentication (JWT-based).
- 🔐 Admin panel for menu management.
- 📦 Inventory purchase & restock.
- 🎨 User-friendly frontend with React.
- ⚡ REST API with Express + MongoDB.

---

## Technologies Used
- **Backend:** Node.js, Express, MongoDB, Mongoose  
- **Frontend:** React, React Router, Bootstrap  
- **Testing:** Jest, Supertest  
- **Deployment:** Render (Backend), Vercel (Frontend)  
- **AI Tools Used:** ChatGPT, GitHub Copilot  

---

## Setup Instructions

### Backend
```bash
cd backend
npm install
npm start
Runs the backend server on port 5000 by default.

Make sure .env includes:

ini
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
PORT=5000
Frontend
bash

cd frontend
npm install
npm start
Runs the frontend app on port 3000 by default.
Update API endpoints in frontend to point to backend (e.g., http://localhost:5000/api).

For production build:

bash

npm run build

Testing
Backend tests were created using Jest & Supertest.
See TEST_REPORT.md for detailed results.

Deployment
Frontend (Vercel): https://sweetkata.vercel.app/

Backend (Render): https://sweetkata.onrender.com/


---

## 🧪 Test-Driven Development (TDD) Approach

This project was developed using **TDD principles** following the **Red–Green–Refactor** cycle:

1. **Red** → Write a failing test for a new feature (e.g., user registration, login).  
2. **Green** → Implement the minimum code required to make the test pass.  
3. **Refactor** → Clean up code, extract services, and improve structure while keeping all tests passing.

### 🔍 Example Workflow
- Wrote failing test for **User Registration** (`should create a new user when valid data is provided`).  
- Implemented controller + model changes → test turned green.  
- Refactored logic into a service to improve modularity.  

### 📊 Commit History
Commits were made incrementally to reflect TDD steps:
- Add failing test → Implement feature → Refactor.

### 📝 Reporting
- Test execution results are documented in [`TEST_REPORT.md`](./TEST_REPORT.md).  
- Coverage summary included for backend, with gaps identified for future work.

