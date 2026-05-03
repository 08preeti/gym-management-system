import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/UI';

const FEEDBACKS = [
  { id: 1, name: 'Alex Johnson', rating: 5, comment: 'Amazing gym! The trainers are very professional and the equipment is top-notch.', date: '2025-03-10', category: 'Trainers' },
  { id: 2, name: 'Sarah Jenkins', rating: 4, comment: 'Great environment and good music. Would love more classes though.', date: '2025-03-08', category: 'Facilities' },
  { id: 3, name: 'Marcus Williams', rating: 5, comment: 'Been a member for 3 years. Best decision I ever made!', date: '2025-03-05', category: 'Overall' },
];

export default function Feedback() {
  const { members, addToast } = useApp();
  const [form, setForm] = useState({ memberId: '', category: 'Overall', rating: 5, comment: '' });
  const [feedbacks, setFeedbacks] = useState(FEEDBACKS);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.comment.trim()) return;
    const member = members.find(m => m.id === Number(form.memberId));
    const newFb = {
      id: Date.now(),
      name: member?.name || 'Anonymous',
      rating: Number(form.rating),
      comment: form.comment,
      date: new Date().toISOString().slice(0, 10),
      category: form.category,
    };
    setFeedbacks(fb => [newFb, ...fb]);
    addToast('Feedback submitted successfully!');
    setForm({ memberId: '', category: 'Overall', rating: 5, comment: '' });
  };

  const avgRating = (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1);

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Member Feedback</h2>
          <p className="page-subtitle">{feedbacks.length} reviews · ⭐ {avgRating} avg rating</p>
        </div>
      </div>

      <div className="grid-2">
        {/* SUBMIT FEEDBACK */}
        <div className="card">
          <div className="card-header"><span className="card-title">Submit Feedback</span></div>
          <div className="card-body">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Member (optional)</label>
                <select className="form-input" value={form.memberId} onChange={e => setForm(f => ({ ...f, memberId: e.target.value }))}>
                  <option value="">— Anonymous —</option>
                  {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {['Overall', 'Trainers', 'Facilities', 'Cleanliness', 'Classes', 'Value'].map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Rating: {form.rating}/5 {'⭐'.repeat(form.rating)}</label>
                <input type="range" min="1" max="5" value={form.rating} onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))} style={{ width: '100%', accentColor: 'var(--primary)' }} />
              </div>
              <div className="form-group">
                <label className="form-label">Comment</label>
                <textarea className="form-input" rows={4} placeholder="Share your experience..." value={form.comment} onChange={e => setForm(f => ({ ...f, comment: e.target.value }))} style={{ resize: 'vertical' }} />
              </div>
              <button type="submit" className="btn btn-primary">
                <Icon name="send" size={16} /> Submit Feedback
              </button>
            </form>
          </div>
        </div>

        {/* FEEDBACK LIST */}
        <div>
          {feedbacks.map(fb => (
            <div key={fb.id} className="card" style={{ marginBottom: 14 }}>
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{fb.name}</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span className="tag">{fb.category}</span>
                    <span style={{ fontSize: 13 }}>{'⭐'.repeat(fb.rating)}</span>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: 'var(--muted2)', lineHeight: 1.6, marginBottom: 8 }}>{fb.comment}</p>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{fb.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
