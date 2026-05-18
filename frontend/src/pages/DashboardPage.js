import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getAllEmployees } from '../api';

const DashboardPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllEmployees()
      .then(({ data }) => setEmployees(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const avgScore = employees.length
    ? Math.round(employees.reduce((s, e) => s + e.performanceScore, 0) / employees.length)
    : 0;

  const topPerformers = employees.filter((e) => e.performanceScore >= 80).length;
  const departments = [...new Set(employees.map((e) => e.department))].length;

  const topEmployees = [...employees].sort((a, b) => b.performanceScore - a.performanceScore).slice(0, 5);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Employee Performance Analytics Overview</p>
        </div>

        {loading ? (
          <div className="loading"><div className="spinner" /></div>
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{employees.length}</div>
                <div className="stat-label">Total Employees</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{avgScore}</div>
                <div className="stat-label">Avg. Score</div>
              </div>
              <div className="stat-card">
                <div className="stat-value" style={{ color: 'var(--success)' }}>{topPerformers}</div>
                <div className="stat-label">Top Performers</div>
              </div>
              <div className="stat-card">
                <div className="stat-value" style={{ color: 'var(--accent2)' }}>{departments}</div>
                <div className="stat-label">Departments</div>
              </div>
            </div>

            <div className="card">
              <h2 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                🏆 Top 5 Performers
              </h2>
              {topEmployees.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No employees yet. <a href="/add-employee" style={{ color: 'var(--accent)' }}>Add one!</a></p>
              ) : (
                topEmployees.map((emp, i) => (
                  <div key={emp._id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 0', borderBottom: i < topEmployees.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '800', color: 'var(--accent)', width: '1.5rem' }}>#{i + 1}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700' }}>{emp.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{emp.department}</div>
                    </div>
                    <span className={`badge ${emp.performanceScore >= 80 ? 'badge-green' : emp.performanceScore >= 60 ? 'badge-yellow' : 'badge-red'}`}>
                      {emp.performanceScore}/100
                    </span>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
