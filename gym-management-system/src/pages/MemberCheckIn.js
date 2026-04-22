import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QRCode, Icon } from '../components/UI';

export default function MemberCheckIn() {
  const { members, addToast } = useApp();
  const activeMembers = members.filter(m => m.status === 'Active');
  const [selected, setSelected] = useState(activeMembers[0] || null);
  const [checkedIn, setCheckedIn] = useState(false);

  const handleCheckIn = () => {
    if (!selected) return;
    setCheckedIn(true);
    addToast(`${selected.name} checked in successfully!`);
    setTimeout(() => setCheckedIn(false), 3000);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Member Check-In</h2>
          <p className="page-subtitle">Scan QR code or select a member to mark attendance</p>
        </div>
      </div>

      <div className="grid-2">
        {/* MEMBER LIST */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Active Members</span>
            <span className="badge badge-green">{activeMembers.length} online</span>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {activeMembers.map(m => (
              <div
                key={m.id}
                onClick={() => { setSelected(m); setCheckedIn(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 14px', borderRadius: 12, cursor: 'pointer',
                  border: `1px solid ${selected?.id === m.id ? 'var(--primary)' : 'var(--border)'}`,
                  background: selected?.id === m.id ? 'var(--primary-light)' : 'var(--surface)',
                  transition: 'all 0.15s',
                }}
              >
                <div className="avatar avatar-sm">{m.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{m.plan} · 🔥 {m.streak} day streak</div>
                </div>
                {selected?.id === m.id && (
                  <Icon name="check_circle" size={18} color="var(--primary)" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ACCESS PASS */}
        {selected ? (
          <div className="card">
            <div className="card-header">
              <span className="card-title">Access Pass</span>
              <span className="tag">Member QR</span>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              {/* QUICK STATS */}
              <div style={{ display: 'flex', gap: 12, width: '100%', marginBottom: 20 }}>
                <div style={{ flex: 1, background: 'var(--primary-light)', border: '1px solid rgba(13,89,242,0.3)', borderRadius: 12, padding: 14, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Streak</div>
                  <div style={{ fontSize: 24, fontWeight: 800 }}>🔥 {selected.streak}</div>
                </div>
                <div style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 14, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Workouts</div>
                  <div style={{ fontSize: 24, fontWeight: 800 }}>{selected.workouts}</div>
                </div>
                <div style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 14, textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Plan</div>
                  <div style={{ fontSize: 13, fontWeight: 700, marginTop: 4 }}>{selected.plan}</div>
                </div>
              </div>

              {/* QR CODE */}
              <div style={{ background: 'white', padding: 20, borderRadius: 20, marginBottom: 16, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: 22, height: 22, borderTop: '3px solid var(--primary)', borderLeft: '3px solid var(--primary)', borderRadius: '4px 0 0 0' }} />
                <div style={{ position: 'absolute', top: 0, right: 0, width: 22, height: 22, borderTop: '3px solid var(--primary)', borderRight: '3px solid var(--primary)', borderRadius: '0 4px 0 0' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, width: 22, height: 22, borderBottom: '3px solid var(--primary)', borderLeft: '3px solid var(--primary)', borderRadius: '0 0 0 4px' }} />
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 22, height: 22, borderBottom: '3px solid var(--primary)', borderRight: '3px solid var(--primary)', borderRadius: '0 0 4px 0' }} />
                <QRCode seed={selected.id} size={200} />
              </div>

              <div style={{ fontSize: 17, fontWeight: 700 }}>{selected.name}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--primary)', marginTop: 4 }}>
                GYM-{String(selected.id).padStart(5, '0')}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{selected.plan} Plan</div>

              <button
                className={`btn ${checkedIn ? 'btn-success' : 'btn-primary'}`}
                style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}
                onClick={handleCheckIn}
                disabled={checkedIn}
              >
                <Icon name={checkedIn ? 'check_circle' : 'how_to_reg'} size={18} />
                {checkedIn ? 'Checked In ✓' : 'Mark Check-In'}
              </button>
            </div>
          </div>
        ) : (
          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 40 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>👈</div>
              <p>Select a member to view their access pass</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
