import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import EmployeeCard from '../components/EmployeeCard';
import { getAllEmployees, searchEmployees, getRecommendation } from '../api';

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data } = await getAllEmployees();
      setEmployees(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = {};
      if (deptFilter) params.department = deptFilter;
      if (search) params.name = search;
      const { data } = await searchEmployees(params);
      setEmployees(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearch('');
    setDeptFilter('');
    fetchEmployees();
  };

  const handleDelete = (id) => setEmployees((prev) => prev.filter((e) => e._id !== id));

  const handleRecommend = async (employee) => {
    setAiLoading(true);
    setRecommendation(null);
    try {
      const { data } = await getRecommendation({ employeeId: employee._id });
      setRecommendation({ employee: data.employee, result: data.recommendation });
    } catch (err) {
      alert('AI recommendation failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setAiLoading(false);
    }
  };

  const departments = [...new Set(employees.map((e) => e.department))];

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">{employees.length} employee(s) found</p>
        </div>

        {/* Search & Filter */}
        <div className="search-bar">
          <input
            className="form-input"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <select className="form-input" style={{ maxWidth: '200px' }} value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
            <option value="">All Departments</option>
            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
          <button className="btn btn-ghost" onClick={handleReset}>Reset</button>
        </div>

        {/* AI Recommendation Result */}
        {(aiLoading || recommendation) && (
          <div className="ai-box" style={{ marginBottom: '1.5rem' }}>
            <h4>🤖 AI Recommendation — {recommendation?.employee}</h4>
            {aiLoading ? (
              <div className="loading"><div className="spinner" /></div>
            ) : (
              <div className="ai-text">
                {typeof recommendation?.result === 'object'
                  ? JSON.stringify(recommendation.result, null, 2)
                  : recommendation?.result}
              </div>
            )}
          </div>
        )}

        {loading ? (
          <div className="loading"><div className="spinner" /></div>
        ) : employees.length === 0 ? (
          <div className="loading" style={{ color: 'var(--text-muted)' }}>No employees found.</div>
        ) : (
          <div className="employee-grid">
            {employees.map((emp) => (
              <EmployeeCard
                key={emp._id}
                employee={emp}
                onDelete={handleDelete}
                onRecommend={handleRecommend}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeListPage;
