import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QRCode, Icon } from '../components/UI';

export default function MemberCheckIn() {
  const { members, checkInMember, loading } = useApp();
  const active = members.filter(m => m.status === 'Active');
  const [selected, setSelected] = useState(active[0] || null);
  const [checkedIn, setCheckedIn] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleCheckIn = async () => {
    if (!selected) return;
    setChecking(true);
    const updated = await checkInMember(selected.id);
    if (updated) { setSelected(updated); setCheckedIn(true); setTimeout(() => setCheckedIn(false), 3000); }
    setChecking(false);
  };

  return (
    <div>
      <div className="page-header">
        <div><h2 className="page-title">Member Check-In</h2><p className="page-subtitle">Scan QR or select member to mark attendance</p></div>
      </div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><span className="card-title">Active Members</span><span className="badge badge-green">{active.length} active</span></div>
          <div className="card-body" style={{ display:'flex',flexDirection:'column',gap:8 }}>
            {loading.members ? <div className="loading-overlay"><div className="spinner-lg"/></div> : active.map(m => (
              <div key={m.id} onClick={() => { setSelected(m); setCheckedIn(false); }}
                style={{ display:'flex',alignItems:'center',gap:12,padding:'10px 14px',borderRadius:12,cursor:'pointer',border:`1px solid ${selected?.id===m.id?'var(--primary)':'var(--border)'}`,background:selected?.id===m.id?'var(--primary-light)':'var(--surface)',transition:'all 0.15s' }}>
                <div className="avatar avatar-sm">{m.initials}</div>
                <div style={{ flex:1 }}><div style={{ fontSize:13,fontWeight:600 }}>{m.name}</div><div style={{ fontSize:11,color:'var(--muted)' }}>{m.plan} · 🔥 {m.streak} day streak · {m.workouts} workouts</div></div>
                {selected?.id===m.id && <Icon name="check_circle" size={18} color="var(--primary)" />}
              </div>
            ))}
          </div>
        </div>
        {selected && (
          <div className="card">
            <div className="card-header"><span className="card-title">Access Pass</span><span className="tag">Live</span></div>
            <div className="card-body" style={{ display:'flex',flexDirection:'column',alignItems:'center' }}>
              <div style={{ display:'flex',gap:12,width:'100%',marginBottom:20 }}>
                {[['Streak',`🔥 ${selected.streak}`,'var(--primary-light)','rgba(13,89,242,.3)'],['Workouts',selected.workouts,'var(--surface)','var(--border)'],['Plan',selected.plan,'var(--surface)','var(--border)']].map(([l,v,bg,bc]) => (
                  <div key={l} style={{ flex:1,background:bg,border:`1px solid ${bc}`,borderRadius:12,padding:14,textAlign:'center' }}>
                    <div style={{ fontSize:11,color:'var(--muted)',textTransform:'uppercase',letterSpacing:1,marginBottom:4 }}>{l}</div>
                    <div style={{ fontSize:20,fontWeight:800 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:'white',padding:20,borderRadius:20,marginBottom:16,position:'relative' }}>
                {[['top','left','borderTop','borderLeft'],['top','right','borderTop','borderRight'],['bottom','left','borderBottom','borderLeft'],['bottom','right','borderBottom','borderRight']].map(([v,h,b1,b2],i) => (
                  <div key={i} style={{ position:'absolute',[v]:0,[h]:0,width:22,height:22,[b1]:'3px solid var(--primary)',[b2]:'3px solid var(--primary)',borderRadius:v==='top'&&h==='left'?'4px 0 0 0':v==='top'?'0 4px 0 0':h==='left'?'0 0 0 4px':'0 0 4px 0' }} />
                ))}
                <QRCode seed={selected.id} size={200} />
              </div>
              <div style={{ fontWeight:700,fontSize:17 }}>{selected.name}</div>
              <div style={{ fontFamily:'var(--mono)',fontSize:13,color:'var(--primary)',marginTop:4 }}>GYM-{String(selected.id).padStart(5,'0').slice(-5)}</div>
              <div style={{ fontSize:12,color:'var(--muted)',marginTop:4 }}>{selected.plan} Plan · {selected.status}</div>
              <button className={`btn ${checkedIn?'btn-success':'btn-primary'}`}
                style={{ width:'100%',justifyContent:'center',marginTop:20 }}
                onClick={handleCheckIn} disabled={checkedIn||checking}>
                {checking ? <><span className="spinner-sm"/> Checking in...</> : <><Icon name={checkedIn?'check_circle':'how_to_reg'} size={18}/>{checkedIn?'Checked In ✓':'Mark Check-In'}</>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
