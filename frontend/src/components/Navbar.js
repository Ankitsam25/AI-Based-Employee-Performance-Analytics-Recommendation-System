import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <span className="nav-brand">⚡ EmpAnalytics</span>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end>
            Dashboard
          </NavLink>
          <NavLink to="/employees" className={({ isActive }) => isActive ? 'active' : ''}>
            Employees
          </NavLink>
          <NavLink to="/add-employee" className={({ isActive }) => isActive ? 'active' : ''}>
            + Add
          </NavLink>
          <NavLink to="/ai-recommendations" className={({ isActive }) => isActive ? 'active' : ''}>
            🤖 AI
          </NavLink>
          <button className="nav-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
