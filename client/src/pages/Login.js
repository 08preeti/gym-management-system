import React, { useState } from 'react';
import './Login.css';

export default function Login({ onLogin }) {
  const [tab, setTab] = useState('Admin');
  const [email, setEmail] = useState('admin@gym.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    onLogin(tab);
  };

  return (
    <div className="login-screen">
      <div className="login-box">
        <div className="login-logo">
          <div className="login-logo-icon">🏋️</div>
          <h1>GymPro</h1>
          <p>Gym Management System</p>
        </div>

        <div className="login-tabs">
          {['Admin', 'Member'].map(t => (
            <button
              key={t}
              className={`login-tab${tab === t ? ' active' : ''}`}
              onClick={() => { setTab(t); setError(''); }}
            >
              {t}
            </button>
          ))}
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@gym.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="btn btn-primary login-btn">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>login</span>
            Sign In as {tab}
          </button>
        </form>

        <p className="login-hint">Demo: use any email + password to login</p>
      </div>
    </div>
  );
}
