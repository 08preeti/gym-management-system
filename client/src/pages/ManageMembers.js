import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Avatar, PlanBadge, StatusBadge, FeesBadge, Icon, EmptyState } from '../components/UI';

export default function ManageMembers({ onNavigate, onEditMember }) {
  const { members, deleteMember } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = members.filter(m => {
    const q = search.toLowerCase();
    const matchSearch = !q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.phone.includes(q);
    const matchFilter = filter === 'All' || m.status === filter || m.plan === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Manage Members</h2>
          <p className="page-subtitle">{members.length} total members registered</p>
        </div>
        <button className="btn btn-primary" onClick={() => onNavigate('add-member')}>
          <Icon name="person_add" size={16} /> Add Member
        </button>
      </div>

      {/* FILTERS */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-body" style={{ paddingBottom: 14 }}>
          <div className="search-wrap" style={{ marginBottom: 12 }}>
            <span className="material-symbols-outlined search-icon">search</span>
            <input
              className="form-input search-input"
              placeholder="Find by name, email or phone..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="pill-row">
            {['All', 'Active', 'Inactive', 'Premium', 'VIP', 'Basic'].map(f => (
              <div key={f} className={`pill${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{f}</div>
            ))}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card">
        {filtered.length === 0 ? (
          <EmptyState icon="manage_search" title="No members found" description="Try adjusting your search or filter." />
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Plan</th>
                  <th>Phone</th>
                  <th>Joined</th>
                  <th>Status</th>
                  <th>Fees</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(m => (
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
                    <td style={{ color: 'var(--muted)', fontSize: 12 }}>{m.phone}</td>
                    <td style={{ color: 'var(--muted)', fontSize: 12 }}>{m.start}</td>
                    <td><StatusBadge status={m.status} /></td>
                    <td><FeesBadge fees={m.fees} /></td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn btn-ghost btn-sm btn-icon" title="View Profile"
                          onClick={() => onNavigate('member-profile', m)}>
                          <Icon name="visibility" size={15} />
                        </button>
                        <button className="btn btn-ghost btn-sm btn-icon" title="Edit"
                          onClick={() => onEditMember(m)}>
                          <Icon name="edit" size={15} />
                        </button>
                        <button className="btn btn-danger btn-sm btn-icon" title="Delete"
                          onClick={() => deleteMember(m.id)}>
                          <Icon name="delete" size={15} />
                        </button>
                      </div>
                    </td>
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
