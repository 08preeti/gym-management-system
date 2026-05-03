import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/UI';

export default function EditProfile() {
  const { addToast } = useApp();
  const [form, setForm] = useState({
    name: 'Admin User', email: 'admin@gym.com', phone: '+1 555-0000',
    gymName: 'GymPro Fitness Center', address: '123 Fitness Street, Mumbai 400001',
    tagline: 'Your fitness, our priority', openTime: '06:00', closeTime: '22:00',
  });
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });

  const set    = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const setPass = (k, v) => setPasswordForm(f => ({ ...f, [k]: v }));

  const handleSaveProfile = (e) => {
    e.preventDefault();
    addToast('Profile updated successfully!');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordForm.newPass !== passwordForm.confirm) {
      addToast('Passwords do not match!');
      return;
    }
    addToast('Password changed successfully!');
    setPasswordForm({ current: '', newPass: '', confirm: '' });
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Edit Profile</h2>
          <p className="page-subtitle">Manage your account and gym settings</p>
        </div>
      </div>

      {/* ADMIN PROFILE */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-header"><span className="card-title">Admin Information</span></div>
        <div className="card-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: '#fff' }}>AD</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{form.name}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>{form.email}</div>
              <span className="tag" style={{ marginTop: 6, display: 'inline-flex' }}>Gym Manager</span>
            </div>
          </div>
          <form onSubmit={handleSaveProfile}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" value={form.email} onChange={e => set('email', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input className="form-input" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
              <button type="submit" className="btn btn-primary">
                <Icon name="save" size={16} /> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* GYM SETTINGS */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-header"><span className="card-title">Gym Settings</span></div>
        <div className="card-body">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Gym Name</label>
              <input className="form-input" value={form.gymName} onChange={e => set('gymName', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Tagline</label>
              <input className="form-input" value={form.tagline} onChange={e => set('tagline', e.target.value)} />
            </div>
            <div className="form-group form-full">
              <label className="form-label">Address</label>
              <input className="form-input" value={form.address} onChange={e => set('address', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Opening Time</label>
              <input className="form-input" type="time" value={form.openTime} onChange={e => set('openTime', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Closing Time</label>
              <input className="form-input" type="time" value={form.closeTime} onChange={e => set('closeTime', e.target.value)} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
            <button className="btn btn-primary" onClick={() => addToast('Gym settings saved!')}>
              <Icon name="save" size={16} /> Save Settings
            </button>
          </div>
        </div>
      </div>

      {/* CHANGE PASSWORD */}
      <div className="card">
        <div className="card-header"><span className="card-title">Change Password</span></div>
        <div className="card-body">
          <form onSubmit={handleChangePassword}>
            <div className="form-grid">
              <div className="form-group form-full">
                <label className="form-label">Current Password</label>
                <input className="form-input" type="password" value={passwordForm.current} onChange={e => setPass('current', e.target.value)} placeholder="Enter current password" />
              </div>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input className="form-input" type="password" value={passwordForm.newPass} onChange={e => setPass('newPass', e.target.value)} placeholder="Enter new password" />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input className="form-input" type="password" value={passwordForm.confirm} onChange={e => setPass('confirm', e.target.value)} placeholder="Confirm new password" />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
              <button type="submit" className="btn btn-primary">
                <Icon name="lock" size={16} /> Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
