import React, { useState } from 'react';
import './Login.css';

const registeredAccounts = [];

export default function Login({ onLogin }) {
  const [mode, setMode]         = useState('login');
  const [tab, setTab]           = useState('Admin');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]         = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    const account = registeredAccounts.find(
      a => a.email === email && a.password === password && a.role === tab
    );
    if (!account) { setError('You have not created an account. Please register first.'); return; }
    onLogin(tab, { name: account.name, email: account.email });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPass) { setError('Please fill in all fields.'); return; }
    if (password !== confirmPass) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    const exists = registeredAccounts.find(a => a.email === email && a.role === tab);
    if (exists) { setError('An account with this email already exists.'); return; }
    registeredAccounts.push({ name, email, password, role: tab });
    setError('');
    setSuccess(`Account created as ${tab}! You can now sign in.`);
    setTimeout(() => { setMode('login'); setSuccess(''); setName(''); setConfirmPass(''); setPassword(''); }, 1500);
  };

  const switchMode = (m) => { setMode(m); setError(''); setSuccess(''); };

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
            <button key={t} className={`login-tab${tab === t ? ' active' : ''}`} onClick={() => { setTab(t); setError(''); }}>{t}</button>
          ))}
        </div>

        {mode === 'login' ? (
          <>
            <form className="login-form" onSubmit={handleLogin}>
              {error && <div className="login-error">{error}</div>}
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
              </div>
              <button type="submit" className="btn btn-primary login-btn">
                <span className="material-symbols-outlined" style={{ fontSize:18 }}>login</span>
                Sign In as {tab}
              </button>
            </form>
            <div className="login-divider"><span>or</span></div>
            <button className="btn btn-ghost login-btn" onClick={() => switchMode('register')}>
              <span className="material-symbols-outlined" style={{ fontSize:18 }}>person_add</span>
              Create an Account
            </button>
          </>
        ) : (
          <>
            <h2 style={{ fontSize:16, fontWeight:700, marginBottom:16, textAlign:'center', color:'var(--text)' }}>Create Account as {tab}</h2>
            <form className="login-form" onSubmit={handleRegister}>
              {error   && <div className="login-error">{error}</div>}
              {success && <div className="login-success">{success}</div>}
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@email.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters" />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input className="form-input" type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} placeholder="Re-enter password" />
              </div>
              <button type="submit" className="btn btn-primary login-btn">
                <span className="material-symbols-outlined" style={{ fontSize:18 }}>person_add</span>
                Create Account
              </button>
            </form>
            <div className="login-divider"><span>or</span></div>
            <button className="btn btn-ghost login-btn" onClick={() => switchMode('login')}>
              <span className="material-symbols-outlined" style={{ fontSize:18 }}>login</span>
              Back to Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
}