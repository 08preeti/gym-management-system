import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/UI';

export default function ContactSupport() {
  const { addToast } = useApp();
  const [form, setForm] = useState({ subject: '', category: 'Technical Issue', message: '', priority: 'Medium' });
  const [submitted, setSubmitted] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.subject.trim() || !form.message.trim()) return;
    addToast('Support ticket submitted! Ticket ID: #TKT-' + Math.floor(Math.random() * 90000 + 10000));
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ subject: '', category: 'Technical Issue', message: '', priority: 'Medium' });
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Contact Support</h2>
          <p className="page-subtitle">Get help from our support team</p>
        </div>
      </div>

      <div className="grid-2">
        {/* TICKET FORM */}
        <div className="card">
          <div className="card-header"><span className="card-title">Submit a Support Ticket</span></div>
          <div className="card-body">
            {submitted && (
              <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: 'var(--green)', padding: '12px 16px', borderRadius: 10, fontSize: 13, marginBottom: 16 }}>
                ✅ Ticket submitted! Our team will respond within 24 hours.
              </div>
            )}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input" value={form.category} onChange={e => set('category', e.target.value)}>
                  {['Technical Issue', 'Billing', 'Member Complaint', 'Feature Request', 'General Inquiry'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Priority</label>
                <div className="radio-group">
                  {['Low', 'Medium', 'High'].map(p => (
                    <div key={p} className={`radio-option${form.priority === p ? ' selected' : ''}`} onClick={() => set('priority', p)}>{p}</div>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input className="form-input" placeholder="Brief description of issue" value={form.subject} onChange={e => set('subject', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-input" rows={5} placeholder="Describe your issue in detail..." value={form.message} onChange={e => set('message', e.target.value)} style={{ resize: 'vertical' }} />
              </div>
              <button type="submit" className="btn btn-primary">
                <Icon name="send" size={16} /> Submit Ticket
              </button>
            </form>
          </div>
        </div>

        {/* CONTACT INFO */}
        <div>
          {[
            { icon: '📧', label: 'Email Support', value: 'support@gympro.com', sub: 'Response within 24 hours' },
            { icon: '📞', label: 'Phone Support', value: '+1 (800) GYM-HELP', sub: 'Mon-Fri 9AM to 6PM' },
            { icon: '💬', label: 'Live Chat', value: 'Available on website', sub: 'Mon-Sun 8AM to 10PM' },
            { icon: '📖', label: 'Documentation', value: 'docs.gympro.com', sub: 'Guides and tutorials' },
          ].map(c => (
            <div key={c.label} className="card" style={{ marginBottom: 14, padding: 20, display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ width: 44, height: 44, background: 'var(--primary-light)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{c.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{c.label}</div>
                <div style={{ fontSize: 14, color: 'var(--primary)', fontWeight: 600, margin: '2px 0' }}>{c.value}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{c.sub}</div>
              </div>
            </div>
          ))}

          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>FAQs</div>
            {['How to reset a member password?', 'How to generate bulk invoices?', 'How to export member data?'].map((q, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none', fontSize: 13, color: 'var(--muted2)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {q}
                <Icon name="chevron_right" size={16} color="var(--muted)" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
