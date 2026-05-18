# 🚀 AI-Based Employee Performance Analytics & Recommendation System

**B.Tech 4th Semester | AI Driven Full Stack Development (AI308B)**

A full-stack MERN application that analyzes employee performance data and provides AI-powered recommendations using OpenRouter API.

---

## 📁 Folder Structure

```
project/
├── backend/                  ← Node.js + Express.js Backend
│   ├── config/
│   │   └── db.js             ← MongoDB connection
│   ├── controllers/
│   │   ├── authController.js ← Signup / Login / getMe
│   │   ├── employeeController.js ← CRUD operations
│   │   └── aiController.js   ← OpenRouter AI calls
│   ├── middleware/
│   │   └── authMiddleware.js ← JWT protect middleware
│   ├── models/
│   │   ├── Employee.js       ← Employee schema
│   │   └── User.js           ← User schema (bcrypt hashed)
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── employeeRoutes.js
│   │   └── aiRoutes.js
│   ├── .env.example          ← Copy to .env and fill values
│   ├── package.json
│   └── server.js             ← Entry point
│
└── frontend/                 ← React.js Frontend
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── api/
    │   │   ├── axiosInstance.js  ← Axios with auth interceptor
    │   │   └── index.js          ← All API call functions
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   └── EmployeeCard.js
    │   ├── pages/
    │   │   ├── LoginPage.js
    │   │   ├── SignupPage.js
    │   │   ├── DashboardPage.js
    │   │   ├── EmployeeListPage.js
    │   │   ├── AddEmployeePage.js
    │   │   └── AIRecommendationPage.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
```


