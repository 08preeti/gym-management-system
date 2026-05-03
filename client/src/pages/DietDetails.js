import React from 'react';
import { DIET_PLANS } from '../data/mockData';

export default function DietDetails() {
  const totalCal  = DIET_PLANS.reduce((s, p) => s + p.calories, 0);
  const totalProt = DIET_PLANS.reduce((s, p) => s + parseInt(p.protein), 0);
  const totalCarb = DIET_PLANS.reduce((s, p) => s + parseInt(p.carbs), 0);
  const totalFat  = DIET_PLANS.reduce((s, p) => s + parseInt(p.fat), 0);

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Diet Details</h2>
          <p className="page-subtitle">Daily meal plan & nutritional information</p>
        </div>
      </div>

      {/* DAY SUMMARY */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Total Calories', value: totalCal, unit: 'kcal', color: 'var(--primary)' },
          { label: 'Total Protein',  value: `${totalProt}g`, unit: '',     color: 'var(--green)'   },
          { label: 'Total Carbs',    value: `${totalCarb}g`, unit: '',     color: 'var(--yellow)'  },
          { label: 'Total Fat',      value: `${totalFat}g`,  unit: '',     color: 'var(--purple)'  },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--muted)', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800, fontFamily: 'var(--mono)', color: s.color }}>{s.value}</div>
            {s.unit && <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{s.unit}</div>}
          </div>
        ))}
      </div>

      {/* MEAL CARDS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {DIET_PLANS.map((plan, i) => (
          <div key={i} className="card">
            <div className="card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 600, marginBottom: 3 }}>{plan.time}</div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{plan.meal}</div>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 8, padding: '5px 12px', fontSize: 13, fontWeight: 600 }}>
                  🔥 {plan.calories} kcal
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
                {plan.items.map((item, j) => (
                  <div key={j} style={{ fontSize: 13, color: 'var(--muted2)', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--primary)', flexShrink: 0 }}>•</span>
                    {item}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  { label: 'Protein', value: plan.protein, color: 'var(--green)'  },
                  { label: 'Carbs',   value: plan.carbs,   color: 'var(--yellow)' },
                  { label: 'Fat',     value: plan.fat,     color: 'var(--purple)' },
                ].map(m => (
                  <div key={m.label} style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '8px 12px', textAlign: 'center' }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: m.color }}>{m.value}</div>
                    <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
