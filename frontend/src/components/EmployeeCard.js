import React from 'react';
import { deleteEmployee } from '../api';

const scoreColor = (score) => {
  if (score >= 80) return 'badge-green';
  if (score >= 60) return 'badge-yellow';
  return 'badge-red';
};

const EmployeeCard = ({ employee, onDelete, onRecommend }) => {
  const handleDelete = async () => {
    if (!window.confirm(`Delete ${employee.name}?`)) return;
    try {
      await deleteEmployee(employee._id);
      onDelete(employee._id);
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="employee-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="employee-name">{employee.name}</div>
          <div className="employee-dept">{employee.department} · {employee.experience} yrs exp</div>
        </div>
        <span className={`badge ${scoreColor(employee.performanceScore)}`}>
          {employee.performanceScore}/100
        </span>
      </div>

      <div className="score-bar">
        <div className="score-fill" style={{ width: `${employee.performanceScore}%` }} />
      </div>

      <div className="skills-list">
        {employee.skills.map((skill, i) => (
          <span key={i} className="badge badge-blue">{skill}</span>
        ))}
      </div>

      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
        📧 {employee.email}
      </div>

      <div className="card-actions">
        <button className="btn btn-ai" onClick={() => onRecommend(employee)}>
          🤖 AI Rec
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
