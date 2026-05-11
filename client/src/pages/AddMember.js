import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/UI';

const BLANK = {
  name: '', dob: '', gender: 'Male', email: '', phone: '',
  emergency: '', plan: 'Basic', fee: 'Monthly - $49.99',
  start: '', status: 'Active', fees: 'Paid',
  weight: '', height: '', goal: 'Fitness',
};

export default function AddMember({ onNavigate, editData, onCancelEdit }) {
  const { addMember, updateMember } = useApp();
  const [form, setForm] = useState(editData || BLANK);

  useEffect(() => { setForm(editData || BLANK); }, [editData]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (editData) {
      updateMember(editData.id, form);
      onCancelEdit();
      onNavigate('manage-members');
    } else {
      addMember(form);
      setForm(BLANK);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">{editData ? 'Edit Member' : 'Add New Member'}</h2>
          <p className="page-subtitle">{editData ? 'Update member information' : 'Register a new gym member'}</p>
        </div>
        {editData && (
          <button className="btn btn-ghost" onClick={() => { onCancelEdit(); onNavigate('manage-members'); }}>
            <Icon name="close" size={16} /> Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {/* PERSONAL INFO */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-header">
            <span className="card-title">Personal Information</span>
          </div>
          <div className="card-body">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. John Doe" required />
              </div>
              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input className="form-input" type="date" value={form.dob} onChange={e => set('dob', e.target.value)} />
              </div>
              <div className="form-group form-full">
                <label className="form-label">Gender</label>
                <div className="radio-group">
                  {['Male', 'Female', 'Other'].map(g => (
                    <div key={g} className={`radio-option${form.gender === g ? ' selected' : ''}`} onClick={() => set('gender', g)}>{g}</div>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Weight</label>
                <input className="form-input" value={form.weight} onChange={e => set('weight', e.target.value)} placeholder="e.g. 70kg" />
              </div>
              <div className="form-group">
                <label className="form-label">Height</label>
                <input className="form-input" value={form.height} onChange={e => set('height', e.target.value)} placeholder="e.g. 175cm" />
              </div>
              <div className="form-group form-full">
                <label className="form-label">Fitness Goal</label>
                <select className="form-input" value={form.goal} onChange={e => set('goal', e.target.value)}>
                  {['Weight Loss', 'Muscle Gain', 'Strength', 'Fitness', 'Flexibility', 'Endurance'].map(g => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT INFO */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-header">
            <span className="card-title">Contact Information</span>
          </div>
          <div className="card-body">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="john@email.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input className="form-input" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 (555) 000-0000" />
              </div>
              <div className="form-group form-full">
                <label className="form-label">Emergency Contact (Name & Phone)</label>
                <input className="form-input" value={form.emergency} onChange={e => set('emergency', e.target.value)} placeholder="Jane Doe - +1 (555) 111-2222" />
              </div>
            </div>
          </div>
        </div>

        {/* MEMBERSHIP */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-header">
            <span className="card-title">Membership Details</span>
          </div>
          <div className="card-body">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Membership Plan</label>
                <select className="form-input" value={form.plan} onChange={e => set('plan', e.target.value)}>
                  <option>Basic</option>
                  <option>Premium</option>
                  <option>VIP</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input className="form-input" type="date" value={form.start} onChange={e => set('start', e.target.value)} />
              </div>
              <div className="form-group form-full">
                <label className="form-label">Fee Package</label>
                <select className="form-input" value={form.fee} onChange={e => set('fee', e.target.value)}>
                  <option>Monthly - $49.99</option>
                  <option>Quarterly - $129.99</option>
                  <option>Annual - $450.00</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Account Status</label>
                <select className="form-input" value={form.status} onChange={e => set('status', e.target.value)}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Fees Status</label>
                <select className="form-input" value={form.fees} onChange={e => set('fees', e.target.value)}>
                  <option>Paid</option>
                  <option>Due</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          {editData && (
            <button type="button" className="btn btn-ghost" onClick={() => { onCancelEdit(); onNavigate('manage-members'); }}>
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            <Icon name={editData ? 'save' : 'person_add'} size={16} />
            {editData ? 'Update Member' : 'Register Member'}
          </button>
        </div>
      </form>
    </div>
  );
}
//this is new