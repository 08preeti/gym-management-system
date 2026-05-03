import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Avatar, PlanBadge, StatusBadge, FeesBadge } from '../components/UI';

export default function Search({ onNavigate, onSelectMember }) {
  const { members } = useApp();
  const [query, setQuery] = useState('');

  const results = query.trim().length > 1
    ? members.filter(m =>
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.email.toLowerCase().includes(query.toLowerCase()) ||
        m.phone.includes(query) ||
        `GYM-${String(m.id).padStart(5, '0')}`.includes(query.toUpperCase())
      )
    : [];

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Search</h2>
          <p className="page-subtitle">Find members, bills, and records instantly</p>
        </div>
      </div>

      {/* SEARCH BOX */}
      <div style={{ position: 'relative', marginBottom: 24 }}>
        <span className="material-symbols-outlined" style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', fontSize: 22, pointerEvents: 'none' }}>search</span>
        <input
          className="form-input"
          style={{ paddingLeft: 52, fontSize: 16, height: 54, borderRadius: 16 }}
          placeholder="Search by name, email, phone or member ID..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 18 }}
          >
            ✕
          </button>
        )}
      </div>

      {/* RESULTS */}
      {query.trim().length > 1 && (
        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14 }}>
            {results.length} result{results.length !== 1 ? 's' : ''} for <strong style={{ color: 'var(--text)' }}>"{query}"</strong>
          </div>
          {results.map(m => (
            <div
              key={m.id}
              onClick={() => { onSelectMember(m); onNavigate('member-profile'); }}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, marginBottom: 10, cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.background = 'var(--primary-glow)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--card)'; }}
            >
              <Avatar initials={m.initials} inactive={m.status === 'Inactive'} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 3 }}>{m.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 3 }}>{m.email} · {m.phone}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                  GYM-{String(m.id).padStart(5, '0')} · Joined {m.start}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
                <PlanBadge plan={m.plan} />
                <StatusBadge status={m.status} />
                <FeesBadge fees={m.fees} />
              </div>
            </div>
          ))}
          {results.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--muted)' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
              <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 6, color: 'var(--muted2)' }}>No records found</h3>
              <p style={{ fontSize: 13 }}>No results match "{query}"</p>
            </div>
          )}
        </div>
      )}

      {/* EMPTY PROMPT */}
      {query.trim().length <= 1 && (
        <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--muted)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 72, opacity: 0.15, display: 'block', margin: '0 auto 16px' }}>manage_search</span>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--muted2)' }}>Search Records</h3>
          <p style={{ fontSize: 13 }}>Type a member name, email, phone, or member ID to search.</p>
        </div>
      )}
    </div>
  );
}
