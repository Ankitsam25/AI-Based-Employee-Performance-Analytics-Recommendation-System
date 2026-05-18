import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { addEmployee } from '../api';

const AddEmployeePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', department: '', skills: '', performanceScore: '', experience: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const payload = {
        ...form,
        skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
        performanceScore: Number(form.performanceScore),
        experience: Number(form.experience),
      };
      await addEmployee(payload);
      setSuccess('Employee stored successfully! ✅');
      setForm({ name: '', email: '', department: '', skills: '', performanceScore: '', experience: '' });
      setTimeout(() => navigate('/employees'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Add Employee</h1>
          <p className="page-subtitle">Register a new employee in the system</p>
        </div>

        <div className="card" style={{ maxWidth: '600px' }}>
          {error && <div className="error-box">{error}</div>}
          {success && (
            <div style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid var(--success)', borderRadius: '8px', padding: '0.75rem 1rem', color: 'var(--success)', marginBottom: '1rem', fontSize: '0.85rem' }}>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Full Name</label>
                <input className="form-input" type="text" name="name" placeholder="Aman Verma" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Email</label>
                <input className="form-input" type="email" name="email" placeholder="aman@gmail.com" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <input className="form-input" type="text" name="department" placeholder="Development" value={form.department} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Years of Experience</label>
                <input className="form-input" type="number" name="experience" placeholder="3" value={form.experience} onChange={handleChange} required min="0" />
              </div>
              <div className="form-group">
                <label className="form-label">Performance Score (0-100)</label>
                <input className="form-input" type="number" name="performanceScore" placeholder="85" value={form.performanceScore} onChange={handleChange} required min="0" max="100" />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label className="form-label">Skills (comma-separated)</label>
                <input className="form-input" type="text" name="skills" placeholder="React, Node.js, MongoDB" value={form.skills} onChange={handleChange} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? 'Adding...' : '+ Add Employee'}
              </button>
              <button className="btn btn-ghost" type="button" onClick={() => navigate('/employees')}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeePage;
