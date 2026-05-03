import React from 'react';
import { Avatar, QRCode, PlanBadge, StatusBadge, FeesBadge, Icon } from '../components/UI';

export default function MemberProfile({ member, onBack }) {
  if (!member) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--muted)' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>👤</div>
        <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: 'var(--muted2)' }}>No Member Selected</h3>
        <p style={{ fontSize: 13 }}>Go to <strong>Search</strong> or <strong>Manage Members</strong> and click a member to view their profile.</p>
      </div>
    );
  }

  const memberId = `GYM-${String(member.id).padStart(5, '0')}`;

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Member Profile</h2>
          <p className="page-subtitle">ID: <span style={{ color: 'var(--primary)' }}>#{memberId}</span></p>
        </div>
        {onBack && (
          <button className="btn btn-ghost" onClick={onBack}>
            <Icon name="arrow_back" size={16} /> Back
          </button>
        )}
      </div>

      {/* HEADER CARD */}
      <div className="card" style={{ marginBottom: 20, padding: 24, display: 'flex', gap: 20, alignItems: 'center' }}>
        <Avatar initials={member.initials} size="lg" inactive={member.status === 'Inactive'} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{member.name}</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 10 }}>{member.email} · {member.phone}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <StatusBadge status={member.status} />
            <PlanBadge plan={member.plan} />
            <FeesBadge fees={member.fees} />
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="streak-chip">🔥 {member.streak} Day Streak</div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>Member since {member.start}</div>
          {member.goal && <div style={{ fontSize: 12, color: 'var(--primary)', marginTop: 4 }}>Goal: {member.goal}</div>}
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid-3" style={{ marginBottom: 20 }}>
        {[
          { label: 'Total Workouts', value: member.workouts, color: 'var(--text)' },
          { label: 'Current Streak', value: `${member.streak} 🔥`, color: 'var(--yellow)' },
          { label: 'Monthly Check-ins', value: 18, color: 'var(--text)' },
        ].map(s => (
          <div className="card" key={s.label} style={{ padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--muted)', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'var(--mono)', color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        {/* DETAILS */}
        <div className="card">
          <div className="card-header"><span className="card-title">Personal Details</span></div>
          <div className="card-body">
            {[
              ['Full Name', member.name],
              ['Date of Birth', member.dob || '—'],
              ['Gender', member.gender],
              ['Weight', member.weight || '—'],
              ['Height', member.height || '—'],
              ['Phone', member.phone],
              ['Email', member.email],
              ['Emergency', member.emergency || '—'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                <span style={{ color: 'var(--muted)' }}>{k}</span>
                <span style={{ fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MEMBERSHIP + QR */}
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header"><span className="card-title">Membership Details</span></div>
            <div className="card-body">
              {[
                ['Plan', member.plan],
                ['Fee Package', member.fee],
                ['Start Date', member.start],
                ['Status', member.status],
                ['Fees', member.fees],
                ['Goal', member.goal || '—'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                  <span style={{ color: 'var(--muted)' }}>{k}</span>
                  <span style={{ fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header"><span className="card-title">QR Access Pass</span></div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ background: 'white', padding: 16, borderRadius: 16, marginBottom: 12 }}>
                <QRCode seed={member.id} size={200} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{member.name}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--primary)', marginTop: 4 }}>{memberId}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{member.plan} Plan</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
