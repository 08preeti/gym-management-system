import React, { useState, useEffect } from 'react';
import { EXERCISES } from '../data/mockData';
import { Icon } from '../components/UI';

export default function WorkoutTracker() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let t;
    if (running) t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const fmt = (s) => {
    const h = Math.floor(s / 3600).toString().padStart(2, '0');
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  const toggleComplete = (id) => {
    setCompleted(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]);
  };

  const CATEGORY_COLORS = {
    Chest: '#ef4444', Legs: '#f59e0b', Back: '#22c55e',
    Shoulders: '#8b5cf6', Cardio: '#0d59f2', Arms: '#f97316',
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Workout Tracker</h2>
          <p className="page-subtitle">Track your active workout session</p>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--primary-light)', border: '1px solid rgba(13,89,242,0.3)', padding: '8px 16px', borderRadius: 10 }}>
          <Icon name="timer" size={16} color="var(--primary)" />
          <span style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: 'var(--primary)', fontSize: 16 }}>{fmt(seconds)}</span>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 2 }}>Today's Session</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{completed.length} of {EXERCISES.length} exercises</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--mono)' }}>
                {Math.round((completed.length / EXERCISES.length) * 100)}%
              </div>
            </div>
          </div>
          <div style={{ height: 10, background: 'var(--border)', borderRadius: 5 }}>
            <div style={{ height: '100%', width: `${(completed.length / EXERCISES.length) * 100}%`, background: 'linear-gradient(90deg, var(--primary), var(--purple))', borderRadius: 5, transition: 'width 0.4s' }} />
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button className={`btn ${running ? 'btn-danger' : 'btn-primary'}`} onClick={() => setRunning(r => !r)}>
              <Icon name={running ? 'pause' : 'play_arrow'} size={16} />
              {running ? 'Pause Timer' : 'Start Timer'}
            </button>
            <button className="btn btn-ghost" onClick={() => { setSeconds(0); setRunning(false); setCompleted([]); }}>
              <Icon name="refresh" size={16} /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* EXERCISES */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {EXERCISES.map(ex => {
          const done = completed.includes(ex.id);
          const catColor = CATEGORY_COLORS[ex.category] || 'var(--primary)';
          return (
            <div
              key={ex.id}
              className="card"
              style={{ opacity: done ? 0.65 : 1, transition: 'opacity 0.2s', cursor: 'pointer' }}
              onClick={() => setSelected(selected?.id === ex.id ? null : ex)}
            >
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: `${catColor}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 20, color: catColor }}>
                        {done ? 'check_circle' : 'fitness_center'}
                      </span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{ex.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{ex.muscle}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 6, background: `${catColor}22`, color: catColor, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      {ex.category}
                    </span>
                    <button
                      className={`btn btn-sm ${done ? 'btn-success' : 'btn-ghost'}`}
                      onClick={e => { e.stopPropagation(); toggleComplete(ex.id); }}
                    >
                      <Icon name={done ? 'check_circle' : 'radio_button_unchecked'} size={14} />
                      {done ? 'Done' : 'Mark Done'}
                    </button>
                  </div>
                </div>

                {selected?.id === ex.id && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)', display: 'flex', gap: 12 }}>
                    {[
                      { label: 'Sets',  value: ex.sets  },
                      { label: 'Reps',  value: ex.reps  },
                      { label: 'Rest',  value: ex.rest  },
                    ].map(s => (
                      <div key={s.label} style={{ flex: 1, textAlign: 'center', background: 'var(--surface)', borderRadius: 10, padding: '10px 8px' }}>
                        <div style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--mono)', color: 'var(--primary)' }}>{s.value}</div>
                        <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 3 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
