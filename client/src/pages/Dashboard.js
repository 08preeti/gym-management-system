import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MiniBarChart, PlanBadge, StatusBadge, FeesBadge, Avatar } from '../components/UI';
import { WEEKLY_ATTENDANCE, MONTHLY_DATA } from '../data/mockData';
import './Dashboard.css';

export default function Dashboard({ onNavigate }) {
  const { members, stats, loading, fetchStats } = useApp();

  useEffect(() => { fetchStats(); }, [fetchStats]);

  const s = stats || {};

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Dashboard</h2>
          <p className="page-subtitle">Welcome back, Admin · {new Date().toDateString()}</p>
        </div>
        <span className="tag">
          <span style={{ width:7,height:7,borderRadius:'50%',background:'var(--green)',display:'inline-block' }} /> Live
        </span>
      </div>

     
      <div className="stats-grid">
        {[
          { label: 'Total Members',     value: loading.stats ? '—' : s.totalMembers,   sub: 'Registered',         icon: '👥' },
          { label: 'Active Members',    value: loading.stats ? '—' : s.activeMembers,  sub: `${(s.totalMembers||0)-(s.activeMembers||0)} inactive`, icon: '⚡' },
          { label: 'Fees Pending',      value: loading.stats ? '—' : s.pendingFees,    sub: 'Members with dues',   icon: '💰' },
          { label: "Today's Check-ins", value: loading.stats ? '—' : s.checkinsToday,  sub: '↑ 12% vs yesterday',  icon: '📊' },
        ].map(sc => (
          <div className="stat-card" key={sc.label}>
            <div className="stat-icon">{sc.icon}</div>
            <div className="stat-label">{sc.label}</div>
            <div className="stat-value">{loading.stats ? <span className="spinner-sm" style={{ borderTopColor:'var(--primary)',borderColor:'var(--border)' }} /> : sc.value}</div>
            <div className="stat-sub">{sc.sub}</div>
          </div>
        ))}
      </div>

      
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><span className="card-title">Weekly Attendance</span><span className="tag">This Week</span></div>
          <div className="card-body"><MiniBarChart data={WEEKLY_ATTENDANCE} valueKey="count" labelKey="day" /></div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Revenue by Plan</span>{!loading.stats && <span className="badge badge-green">↑ 21%</span>}</div>
          <div className="card-body">
            <div className="revenue-total">${loading.stats ? '—' : (s.totalRevenue||0).toLocaleString()}</div>
            <div style={{ fontSize:12,color:'var(--muted)',marginBottom:16 }}>Total collected revenue</div>
            {[{ plan:'VIP Access',pct:46,color:'var(--purple)' },{ plan:'Premium',pct:32,color:'var(--primary)' },{ plan:'Basic',pct:22,color:'var(--green)' }].map(p => (
              <div key={p.plan} style={{ marginBottom:12 }}>
                <div style={{ display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:4 }}>
                  <span style={{ color:'var(--muted2)' }}>{p.plan}</span><span style={{ fontWeight:600 }}>{p.pct}%</span>
                </div>
                <div style={{ height:6,background:'var(--border)',borderRadius:3 }}>
                  <div style={{ height:'100%',width:`${p.pct}%`,background:p.color,borderRadius:3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom:20 }}>
        <div className="card">
          <div className="card-header"><span className="card-title">Monthly Revenue</span></div>
          <div className="card-body"><MiniBarChart data={MONTHLY_DATA} valueKey="revenue" labelKey="month" /></div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Member Growth</span></div>
          <div className="card-body"><MiniBarChart data={MONTHLY_DATA} valueKey="members" labelKey="month" /></div>
        </div>
      </div>

      
      <div className="card">
        <div className="card-header">
          <span className="card-title">Recent Members</span>
          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('manage-members')}>View all →</button>
        </div>
        {loading.members ? (
          <div className="loading-overlay"><div className="spinner-lg" /><span>Loading members...</span></div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Member</th><th>Plan</th><th>Fee Package</th><th>Joined</th><th>Status</th><th>Fees</th></tr></thead>
              <tbody>
                {members.slice(0, 5).map(m => (
                  <tr key={m.id}>
                    <td><div className="member-info-cell"><Avatar initials={m.initials} inactive={m.status==='Inactive'} /><div><div className="name">{m.name}</div><div className="email">{m.email}</div></div></div></td>
                    <td><PlanBadge plan={m.plan} /></td>
                    <td style={{ color:'var(--muted)',fontSize:12 }}>{m.fee}</td>
                    <td style={{ color:'var(--muted)',fontSize:12 }}>{m.start}</td>
                    <td><StatusBadge status={m.status} /></td>
                    <td><FeesBadge fees={m.fees} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
