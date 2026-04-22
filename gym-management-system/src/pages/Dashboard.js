import React from 'react';
import { useApp } from '../context/AppContext';
import { StatCard, MiniBarChart, PlanBadge, StatusBadge, FeesBadge, Avatar } from '../components/UI';
import { WEEKLY_ATTENDANCE, MONTHLY_DATA } from '../data/mockData';
import './Dashboard.css';

export default function Dashboard({ onNavigate }) {
  const { members } = useApp();
  const active = members.filter(m => m.status === 'Active').length;
  const due = members.filter(m => m.fees === 'Due').length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Dashboard</h2>
          <p className="page-subtitle">Welcome back, Admin · {new Date().toDateString()}</p>
        </div>
        <span className="tag">
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
          Live
        </span>
      </div>

      {/* STAT CARDS */}
      <div className="stats-grid">
        <StatCard label="Total Members"     value={members.length} sub="2 new this month"          icon="👥" />
        <StatCard label="Active Members"    value={active}         sub={`${members.length - active} inactive`} icon="⚡" />
        <StatCard label="Fees Pending"      value={due}            sub="Require collection"         icon="💰" />
        <StatCard label="Today's Check-ins" value={47}             sub={<><span className="up">↑ 12%</span> vs yesterday</>} icon="📊" />
      </div>

      {/* CHARTS ROW */}
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Weekly Attendance</span>
            <span className="tag">This Week</span>
          </div>
          <div className="card-body">
            <MiniBarChart data={WEEKLY_ATTENDANCE} valueKey="count" labelKey="day" />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Revenue by Plan</span>
            <span className="badge badge-green">↑ 21%</span>
          </div>
          <div className="card-body">
            <div className="revenue-total">$3,890</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16 }}>March 2025 total revenue</div>
            {[
              { plan: 'VIP Access', pct: 46, color: 'var(--purple)' },
              { plan: 'Premium',    pct: 32, color: 'var(--primary)' },
              { plan: 'Basic',      pct: 22, color: 'var(--green)'   },
            ].map(p => (
              <div key={p.plan} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: 'var(--muted2)' }}>{p.plan}</span>
                  <span style={{ fontWeight: 600 }}>{p.pct}%</span>
                </div>
                <div style={{ height: 6, background: 'var(--border)', borderRadius: 3 }}>
                  <div style={{ height: '100%', width: `${p.pct}%`, background: p.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MONTHLY CHART */}
      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div className="card">
          <div className="card-header"><span className="card-title">Monthly Revenue</span></div>
          <div className="card-body">
            <MiniBarChart data={MONTHLY_DATA} valueKey="revenue" labelKey="month" />
          </div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Member Growth</span></div>
          <div className="card-body">
            <MiniBarChart data={MONTHLY_DATA} valueKey="members" labelKey="month" />
          </div>
        </div>
      </div>

      {/* RECENT MEMBERS */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Recent Members</span>
          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('manage-members')}>
            View all →
          </button>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Member</th>
                <th>Plan</th>
                <th>Fee Package</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Fees</th>
              </tr>
            </thead>
            <tbody>
              {members.slice(0, 5).map(m => (
                <tr key={m.id}>
                  <td>
                    <div className="member-info-cell">
                      <Avatar initials={m.initials} inactive={m.status === 'Inactive'} />
                      <div>
                        <div className="name">{m.name}</div>
                        <div className="email">{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><PlanBadge plan={m.plan} /></td>
                  <td style={{ color: 'var(--muted)', fontSize: 12 }}>{m.fee}</td>
                  <td style={{ color: 'var(--muted)', fontSize: 12 }}>{m.start}</td>
                  <td><StatusBadge status={m.status} /></td>
                  <td><FeesBadge fees={m.fees} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
