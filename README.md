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

---

## ⚙️ Setup Instructions

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
# Fill in MONGO_URI, JWT_SECRET, OPENROUTER_API_KEY in .env
npm install
npm run dev       # runs on http://localhost:5000
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start         # runs on http://localhost:3000
```

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register HR/Admin user |
| POST | `/api/auth/login` | Login and get JWT token |
| GET | `/api/auth/me` | Get current user (Protected) |

### Employees (All Protected with JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/employees` | Add employee |
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/:id` | Get single employee |
| GET | `/api/employees/search?department=X` | Search by department/name |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

### AI (Protected with JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/recommend` | Get AI recommendation for an employee |
| GET | `/api/ai/rankings` | Get AI rankings for all employees |

---

## 🧪 Sample Postman Body

**POST /api/employees**
```json
{
  "name": "Aman Verma",
  "email": "aman@gmail.com",
  "department": "Development",
  "skills": ["React", "Node.js", "MongoDB"],
  "performanceScore": 85,
  "experience": 3
}
```

**POST /api/auth/login**
```json
{
  "email": "hr@company.com",
  "password": "password123"
}
```

**POST /api/ai/recommend**
```json
{
  "employeeId": "<mongodb_id_here>"
}
```

---

## 🔐 Security
- JWT Authentication (7-day expiry)
- Passwords hashed with bcryptjs (salt rounds: 10)
- Protected routes require `Authorization: Bearer <token>` header
- Input validation with Mongoose schema validators

---

## 🚀 Deployment (Render)

1. Push repo to GitHub
2. Create two Render services: one for backend (Node), one for frontend (Static Site)
3. Set environment variables in Render dashboard
4. Backend URL: set `REACT_APP_API_URL` in frontend env to your Render backend URL

---

## 📦 Tech Stack
- **Frontend**: React.js, React Router DOM, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Auth**: JWT + bcryptjs
- **AI**: OpenRouter API (OpenAI compatible)
- **Deployment**: Render
