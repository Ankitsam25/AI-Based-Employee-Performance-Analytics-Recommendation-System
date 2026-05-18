import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getAllEmployees, getRecommendation, getRankings } from '../api';

const AIRecommendationPage = () => {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [rankings, setRankings] = useState(null);
  const [loadingRec, setLoadingRec] = useState(false);
  const [loadingRank, setLoadingRank] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllEmployees().then(({ data }) => setEmployees(data)).catch(console.error);
  }, []);

  const handleRecommend = async () => {
    if (!selected) return;
    setLoadingRec(true);
    setError('');
    setRecommendation(null);
    try {
      const { data } = await getRecommendation({ employeeId: selected });
      setRecommendation(data);
    } catch (err) {
      setError(err.response?.data?.message || 'AI request failed');
    } finally {
      setLoadingRec(false);
    }
  };

  const handleRankings = async () => {
    setLoadingRank(true);
    setError('');
    setRankings(null);
    try {
      const { data } = await getRankings();
      setRankings(data.rankings);
    } catch (err) {
      setError(err.response?.data?.message || 'Rankings request failed');
    } finally {
      setLoadingRank(false);
    }
  };

  const formatResult = (result) => {
    if (typeof result === 'object') return JSON.stringify(result, null, 2);
    return result;
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">🤖 AI Recommendations</h1>
          <p className="page-subtitle">AI-powered promotion, training & ranking suggestions</p>
        </div>

        {error && <div className="error-box">{error}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Individual Recommendation */}
          <div className="card">
            <h2 style={{ fontWeight: '800', marginBottom: '1rem' }}>Individual Recommendation</h2>
            <div className="form-group">
              <label className="form-label">Select Employee</label>
              <select className="form-input" value={selected} onChange={(e) => setSelected(e.target.value)}>
                <option value="">-- Choose employee --</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name} ({emp.department} · {emp.performanceScore}/100)
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-ai" onClick={handleRecommend} disabled={!selected || loadingRec}>
              {loadingRec ? '⏳ Analyzing...' : '✨ Get AI Recommendation'}
            </button>

            {recommendation && (
              <div className="ai-box">
                <h4>Result for {recommendation.employee}</h4>
                <pre className="ai-text">{formatResult(recommendation.recommendation)}</pre>
              </div>
            )}
          </div>

          {/* Rankings */}
          <div className="card">
            <h2 style={{ fontWeight: '800', marginBottom: '1rem' }}>AI Employee Rankings</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Get AI-powered rankings and recommendations for all employees at once.
            </p>
            <button className="btn btn-ai" onClick={handleRankings} disabled={loadingRank || employees.length === 0}>
              {loadingRank ? '⏳ Ranking...' : '📊 Generate Rankings'}
            </button>

            {rankings && (
              <div className="ai-box">
                <h4>AI Rankings ({employees.length} employees)</h4>
                <pre className="ai-text">{formatResult(rankings)}</pre>
              </div>
            )}
          </div>
        </div>

        {/* Feature Cards */}
        <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {[
            { icon: '🎯', title: 'Promotion Recommendation', desc: 'AI evaluates score, experience & skills to recommend promotions' },
            { icon: '📚', title: 'Training Suggestions', desc: 'Personalized course recommendations based on skill gaps' },
            { icon: '💬', title: 'AI Feedback', desc: 'Detailed performance feedback for each employee' },
            { icon: '🏆', title: 'Employee Ranking', desc: 'AI-ranked list of top performers across departments' },
          ].map((f, i) => (
            <div key={i} className="card" style={{ borderColor: 'rgba(129,140,248,0.3)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{f.icon}</div>
              <div style={{ fontWeight: '800', marginBottom: '0.25rem' }}>{f.title}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIRecommendationPage;
