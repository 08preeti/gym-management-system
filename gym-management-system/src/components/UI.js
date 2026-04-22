import React from 'react';
import { useApp } from '../context/AppContext';

export function ToastContainer() {
  const { toasts } = useApp();
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className="toast">
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--green)' }}>
            check_circle
          </span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

export function Icon({ name, size = 20, color, style = {} }) {
  return (
    <span
      className="material-symbols-outlined"
      style={{ fontSize: size, color, ...style }}
    >
      {name}
    </span>
  );
}


export function StatCard({ label, value, sub, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}


export function Avatar({ initials, size = 'md', inactive = false }) {
  const cls = `avatar${size === 'sm' ? ' avatar-sm' : size === 'lg' ? ' avatar-lg' : ''}`;
  const bg = inactive ? 'var(--muted)' : undefined;
  return (
    <div className={cls} style={{ background: bg }}>
      {initials}
    </div>
  );
}


export function Badge({ children, variant = 'blue' }) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}

export function PlanBadge({ plan }) {
  const variant = plan === 'VIP' ? 'purple' : plan === 'Premium' ? 'blue' : 'green';
  return <Badge variant={variant}>{plan}</Badge>;
}

export function StatusBadge({ status }) {
  return <Badge variant={status === 'Active' ? 'green' : 'red'}>{status}</Badge>;
}

export function FeesBadge({ fees }) {
  return <Badge variant={fees === 'Paid' ? 'green' : 'yellow'}>{fees}</Badge>;
}


export function MiniBarChart({ data, valueKey, labelKey }) {
  const max = Math.max(...data.map(d => d[valueKey]));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 130, padding: '0 4px' }}>
      {data.map(d => (
        <div key={d[labelKey]} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 10, color: 'var(--primary)', fontWeight: 600 }}>{d[valueKey]}</span>
          <div
            style={{
              width: '100%',
              background: 'linear-gradient(180deg, var(--primary) 0%, rgba(13,89,242,0.4) 100%)',
              borderRadius: '5px 5px 0 0',
              height: `${(d[valueKey] / max) * 100}px`,
              minHeight: 4,
              transition: 'opacity 0.2s',
              cursor: 'pointer',
            }}
          />
          <span style={{ fontSize: 10, color: 'var(--muted)' }}>{d[labelKey]}</span>
        </div>
      ))}
    </div>
  );
}


export function QRCode({ seed = 1, size = 200 }) {
  const cellSize = Math.floor(size / 12);
  const cells = Array.from({ length: 100 }, (_, i) => {
    const v = (seed * 17 + i * 37 + i * i * 13) % 256;
    const dark = v > 100;
    return (
      <div
        key={i}
        style={{
          borderRadius: dark ? 3 : 2,
          background: dark ? '#0d59f2' : 'rgba(13,89,242,0.07)',
          width: cellSize,
          height: cellSize,
        }}
      />
    );
  });
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(10, ${cellSize}px)`, gap: 2 }}>
      {cells}
    </div>
  );
}


export function Modal({ title, onClose, children, footer }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="btn-close" onClick={onClose}>
            <Icon name="close" size={18} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}


export function ProgressBar({ value, max, color = 'var(--primary)', height = 6 }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ height, background: 'var(--border)', borderRadius: 3 }}>
      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 3, transition: 'width 0.3s' }} />
    </div>
  );
}

// ── EMPTY STATE ───────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, description }) {
  return (
    <div className="empty-state">
      <span className="material-symbols-outlined icon">{icon}</span>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
}
