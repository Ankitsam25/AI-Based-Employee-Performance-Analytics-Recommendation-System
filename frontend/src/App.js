import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import EmployeeListPage from './pages/EmployeeListPage';
import AddEmployeePage from './pages/AddEmployeePage';
import AIRecommendationPage from './pages/AIRecommendationPage';
import './index.css';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/employees" element={<PrivateRoute><EmployeeListPage /></PrivateRoute>} />
        <Route path="/add-employee" element={<PrivateRoute><AddEmployeePage /></PrivateRoute>} />
        <Route path="/ai-recommendations" element={<PrivateRoute><AIRecommendationPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
