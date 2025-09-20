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
Copy code
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
PORT=5000
Frontend
bash
Copy code
cd frontend
npm install
npm start
Runs the frontend app on port 3000 by default.
Update API endpoints in frontend to point to backend (e.g., http://localhost:5000/api).

For production build:

bash
Copy code
npm run build
AI Assistance
Tools Used
ChatGPT → Generated backend boilerplate, controllers, deployment guidance.

GitHub Copilot → Assisted with frontend forms, routing, and test stubs.

Reflection
AI tools accelerated development by reducing boilerplate and suggesting solutions.
All code was manually reviewed for correctness and security.

Testing
Backend tests were created using Jest & Supertest.
See TEST_REPORT.md for detailed results.

Deployment
Frontend (Vercel): https://sweetkata.vercel.app/

Backend (Render): https://sweetkata.onrender.com/

License
This project is submitted for assessment purposes.
Please follow AI usage policy guidelines.

Co-authored-by: ChatGPT noreply@openai.com
