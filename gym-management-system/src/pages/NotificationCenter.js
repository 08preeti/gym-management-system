import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Modal, Icon } from '../components/UI';

const TYPE_CONFIG = {
  warning: { icon: '⚠️', bg: 'rgba(245,158,11,0.15)' },
  info:    { icon: '📢', bg: 'rgba(13,89,242,0.15)'   },
  alert:   { icon: '🔔', bg: 'rgba(139,92,246,0.15)'  },
  success: { icon: '✅', bg: 'rgba(34,197,94,0.15)'   },
};

export default function NotificationCenter() {
  const { notifications, markNotifRead, markAllRead, sendNotification } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', message: '', type: 'info' });
  const unread = notifications.filter(n => !n.read).length;

  const handleSend = () => {
    if (!form.title.trim() || !form.message.trim()) return;
    sendNotification(form);
    setShowModal(false);
    setForm({ title: '', message: '', type: 'info' });
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Notification Center</h2>
          <p className="page-subtitle">{unread} unread notification{unread !== 1 ? 's' : ''}</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {unread > 0 && (
            <button className="btn btn-ghost" onClick={markAllRead}>
              <Icon name="done_all" size={16} /> Mark All Read
            </button>
          )}
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Icon name="send" size={16} /> Send Notification
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {notifications.map(n => {
            const cfg = TYPE_CONFIG[n.type] || TYPE_CONFIG.info;
            return (
              <div
                key={n.id}
                onClick={() => markNotifRead(n.id)}
                style={{
                  display: 'flex', gap: 14, padding: 14, borderRadius: 12,
                  cursor: 'pointer', transition: 'all 0.15s',
                  background: !n.read ? 'var(--primary-glow)' : '',
                  borderLeft: !n.read ? '3px solid var(--primary)' : '3px solid transparent',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = !n.read ? 'var(--primary-glow)' : ''}
              >
                <div style={{ width: 42, height: 42, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, background: cfg.bg, flexShrink: 0 }}>
                  {cfg.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>{n.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted2)', lineHeight: 1.5 }}>{n.message}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 5 }}>{n.time}</div>
                </div>
                {!n.read && (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', flexShrink: 0, marginTop: 8 }} />
                )}
              </div>
            );
          })}
          {notifications.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 24px', color: 'var(--muted)' }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>🔔</div>
              <p>No notifications yet.</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <Modal
          title="Send Notification"
          onClose={() => setShowModal(false)}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSend}>
                <Icon name="send" size={16} /> Send to All Members
              </button>
            </>
          }
        >
          <div className="form-group">
            <label className="form-label">Type</label>
            <select className="form-input" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
              <option value="info">📢 Information</option>
              <option value="warning">⚠️ Fee Reminder / Warning</option>
              <option value="alert">🔔 Alert / Schedule Change</option>
              <option value="success">✅ Success / Confirmation</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input className="form-input" placeholder="Notification title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea className="form-input" rows={4} placeholder="Write your message..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{ resize: 'vertical' }} />
          </div>
        </Modal>
      )}
    </div>
  );
}
