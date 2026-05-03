import React from 'react';
import { useApp } from '../context/AppContext';
import { MiniBarChart, StatCard, Icon } from '../components/UI';
import { MONTHLY_DATA } from '../data/mockData';

export default function ReportExport() {
  const { members, bills, addToast } = useApp();

  const active    = members.filter(m => m.status === 'Active').length;
  const paidBills = bills.filter(b => b.status === 'Paid');
  const revenue   = paidBills.reduce((s, b) => s + b.items.reduce((ss, i) => ss + i.qty * i.rate, 0), 0);
  const due       = bills.filter(b => b.status === 'Unpaid');
  const dueTotal  = due.reduce((s, b) => s + b.items.reduce((ss, i) => ss + i.qty * i.rate, 0), 0);

  const handleExport = (type) => {
    addToast(`${type} report exported successfully!`);
  };

  const REPORT_TYPES = [
    { label: 'Members Report',    desc: 'All member data, plans, and status',    icon: '👥', type: 'Members'    },
    { label: 'Financial Report',  desc: 'Revenue, bills, and pending fees',       icon: '💰', type: 'Financial'  },
    { label: 'Attendance Report', desc: 'Monthly check-in records per member',    icon: '📊', type: 'Attendance' },
    { label: 'Diet & Fitness',    desc: 'Workout and nutrition plan exports',      icon: '🥗', type: 'Diet'       },
    { label: 'Supplement Sales',  desc: 'Store sales and inventory summary',       icon: '🛒', type: 'Store'      },
    { label: 'Full Backup',       desc: 'Complete system data export (JSON)',      icon: '💾', type: 'Backup'     },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Reports &amp; Export</h2>
          <p className="page-subtitle">Analytics, statistics, and data exports</p>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <StatCard label="Total Revenue"    value={`$${revenue.toFixed(0)}`} sub="From paid bills"        icon="💵" />
        <StatCard label="Active Members"   value={active}                   sub={`of ${members.length} total`} icon="👥" />
        <StatCard label="Pending Dues"     value={`$${dueTotal.toFixed(0)}`} sub={`${due.length} unpaid bills`} icon="⏳" />
        <StatCard label="Avg Daily Visits" value={47}                        sub="↑ 12% this month"       icon="📅" />
      </div>

      {/* CHARTS */}
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><span className="card-title">Monthly Revenue</span></div>
          <div className="card-body"><MiniBarChart data={MONTHLY_DATA} valueKey="revenue" labelKey="month" /></div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Member Growth</span></div>
          <div className="card-body"><MiniBarChart data={MONTHLY_DATA} valueKey="members" labelKey="month" /></div>
        </div>
      </div>

      {/* PLAN BREAKDOWN */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header"><span className="card-title">Plan Distribution</span></div>
        <div className="card-body">
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {['Basic', 'Premium', 'VIP'].map((plan, i) => {
              const count = members.filter(m => m.plan === plan).length;
              const pct   = members.length ? Math.round((count / members.length) * 100) : 0;
              const colors = ['var(--green)', 'var(--primary)', 'var(--purple)'];
              return (
                <div key={plan} style={{ flex: 1, minWidth: 120 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                    <span style={{ fontWeight: 600 }}>{plan}</span>
                    <span style={{ color: 'var(--muted)' }}>{count} ({pct}%)</span>
                  </div>
                  <div style={{ height: 8, background: 'var(--border)', borderRadius: 4 }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: colors[i], borderRadius: 4 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* EXPORT CARDS */}
      <div className="card">
        <div className="card-header"><span className="card-title">Export Reports</span></div>
        <div className="card-body">
          <div className="grid-3">
            {REPORT_TYPES.map(r => (
              <div key={r.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 20 }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>{r.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 5 }}>{r.label}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.5 }}>{r.desc}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => handleExport(r.type)}>
                    <Icon name="download" size={14} /> CSV
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => handleExport(r.type + ' PDF')}>
                    <Icon name="picture_as_pdf" size={14} /> PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
