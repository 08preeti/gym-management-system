import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Icon, Avatar } from '../components/UI';

export default function CreateBill() {
  const { members, bills, addBill } = useApp();
  const [search, setSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [items, setItems] = useState([{ desc: 'Monthly Membership', qty: 1, rate: 49.99 }]);

  const searchResults = search
    ? members.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()))
    : [];

  const total = items.reduce((s, i) => s + Number(i.qty) * Number(i.rate), 0);

  const addItem = () => setItems(i => [...i, { desc: '', qty: 1, rate: 0 }]);
  const removeItem = (idx) => setItems(i => i.filter((_, j) => j !== idx));
  const updateItem = (idx, key, val) => setItems(i => i.map((it, j) => j === idx ? { ...it, [key]: val } : it));

  const handleCreate = () => {
    if (!selectedMember) return;
    addBill({
      member: selectedMember.name,
      memberId: `GYM-${String(selectedMember.id).padStart(5, '0')}`,
      items: [...items],
    });
    setItems([{ desc: 'Monthly Membership', qty: 1, rate: 49.99 }]);
    setSelectedMember(null);
    setSearch('');
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Create Bill</h2>
          <p className="page-subtitle">Generate digital payment receipts for members</p>
        </div>
      </div>

      <div className="grid-2">
        {/* LEFT: MEMBER + ITEMS */}
        <div>
          {/* MEMBER SEARCH */}
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header"><span className="card-title">Member Information</span></div>
            <div className="card-body">
              <div className="search-wrap" style={{ marginBottom: 10 }}>
                <span className="material-symbols-outlined search-icon">search</span>
                <input
                  className="form-input search-input"
                  placeholder="Search member by name or email..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setSelectedMember(null); }}
                />
              </div>

              {searchResults.length > 0 && !selectedMember && (
                <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                  {searchResults.map(m => (
                    <div
                      key={m.id}
                      onClick={() => { setSelectedMember(m); setSearch(''); }}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid var(--border)', fontSize: 13 }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-glow)'}
                      onMouseLeave={e => e.currentTarget.style.background = ''}
                    >
                      <Avatar initials={m.initials} size="sm" />
                      <div>
                        <div style={{ fontWeight: 600 }}>{m.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--muted)' }}>GYM-{String(m.id).padStart(5,'0')} · {m.plan}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {selectedMember && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'var(--primary-light)', border: '1px solid rgba(13,89,242,0.3)', borderRadius: 12 }}>
                  <Avatar initials={selectedMember.initials} size="sm" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{selectedMember.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>GYM-{String(selectedMember.id).padStart(5,'0')} · {selectedMember.plan}</div>
                  </div>
                  <button className="btn-close" onClick={() => setSelectedMember(null)}>
                    <Icon name="close" size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* BILL ITEMS */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Bill Items</span>
              <button className="btn btn-ghost btn-sm" onClick={addItem}>
                <Icon name="add" size={14} /> Add Item
              </button>
            </div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr auto', gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, padding: '0 4px' }}>Description</span>
                <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1 }}>Qty</span>
                <span style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1 }}>Rate ($)</span>
                <span />
              </div>
              {items.map((it, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr auto', gap: 6, marginBottom: 8, alignItems: 'center' }}>
                  <input className="form-input" placeholder="Description" value={it.desc} onChange={e => updateItem(idx, 'desc', e.target.value)} />
                  <input className="form-input" type="number" min="1" value={it.qty} onChange={e => updateItem(idx, 'qty', e.target.value)} />
                  <input className="form-input" type="number" min="0" step="0.01" value={it.rate} onChange={e => updateItem(idx, 'rate', e.target.value)} />
                  {items.length > 1 && (
                    <button className="btn btn-danger btn-sm btn-icon" onClick={() => removeItem(idx)}>
                      <Icon name="close" size={14} />
                    </button>
                  )}
                </div>
              ))}
              <div className="divider" />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16 }}>
                <span>Total Amount</span>
                <span style={{ fontFamily: 'var(--mono)', color: 'var(--primary)' }}>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: PREVIEW */}
        <div className="card">
          <div className="card-header"><span className="card-title">Invoice Preview</span></div>
          <div className="card-body">
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 20, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>🏋️ GymPro</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>Management System</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Invoice</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--primary)' }}>
                    BILL-{String(bills.length + 1).padStart(3, '0')}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{new Date().toLocaleDateString()}</div>
                </div>
              </div>

              <div style={{ padding: 12, background: 'var(--card)', borderRadius: 10, marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>Billed To</div>
                <div style={{ fontWeight: 600 }}>{selectedMember?.name || '— Select a member —'}</div>
                {selectedMember && (
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>GYM-{String(selectedMember.id).padStart(5, '0')}</div>
                )}
              </div>

              <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <th style={{ textAlign: 'left', padding: '5px 0', color: 'var(--muted)', fontWeight: 600 }}>Description</th>
                    <th style={{ textAlign: 'right', padding: '5px 0', color: 'var(--muted)', fontWeight: 600 }}>Qty</th>
                    <th style={{ textAlign: 'right', padding: '5px 0', color: 'var(--muted)', fontWeight: 600 }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '8px 0' }}>{it.desc || '—'}</td>
                      <td style={{ textAlign: 'right', padding: '8px 0' }}>{it.qty}</td>
                      <td style={{ textAlign: 'right', padding: '8px 0', fontFamily: 'var(--mono)' }}>
                        ${(Number(it.qty) * Number(it.rate)).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0', fontWeight: 700, borderTop: '2px solid var(--border)', marginTop: 8 }}>
                <span>Total</span>
                <span style={{ fontFamily: 'var(--mono)', color: 'var(--primary)', fontSize: 20 }}>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={handleCreate}
              disabled={!selectedMember}
            >
              <Icon name="receipt_long" size={16} /> Generate Bill
            </button>
          </div>
        </div>
      </div>

      {/* RECENT BILLS */}
      {bills.length > 0 && (
        <div className="card" style={{ marginTop: 24 }}>
          <div className="card-header"><span className="card-title">Recent Bills</span></div>
          <div className="card-body">
            {bills.map(b => {
              const billTotal = b.items.reduce((s, i) => s + i.qty * i.rate, 0);
              return (
                <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, marginBottom: 10 }}>
                  <div style={{ width: 42, height: 42, background: 'var(--primary-light)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="receipt_long" size={20} color="var(--primary)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, color: 'var(--muted)' }}>{b.id}</div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{b.member}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>{b.memberId} · {b.date}</div>
                  </div>
                  <span className={`badge ${b.status === 'Paid' ? 'badge-green' : 'badge-yellow'}`}>{b.status}</span>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 16, fontWeight: 700, color: 'var(--primary)' }}>${billTotal.toFixed(2)}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
