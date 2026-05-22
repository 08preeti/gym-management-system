/*
import React, { useState } from 'react';
import { DIET_PLANS } from '../data/mockData';

const BLANK = {
  meal: '', time: '', calories: '', protein: '', carbs: '', fat: '', items: [''],
};

export default function DietDetails({ role = 'Admin' }) {
  const isAdmin = role === 'Admin';
  const [plans, setPlans]       = useState(DIET_PLANS.map((p, i) => ({ ...p, id: i + 1 })));
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId]     = useState(null);
  const [form, setForm]         = useState(BLANK);
  const [deleteId, setDeleteId] = useState(null);

  const totalCal  = plans.reduce((s, p) => s + Number(p.calories), 0);
  const totalProt = plans.reduce((s, p) => s + parseInt(p.protein), 0);
  const totalCarb = plans.reduce((s, p) => s + parseInt(p.carbs), 0);
  const totalFat  = plans.reduce((s, p) => s + parseInt(p.fat), 0);

  const openAdd = () => {
    setEditId(null);
    setForm(BLANK);
    setShowModal(true);
  };

  const openEdit = (plan) => {
    setEditId(plan.id);
    setForm({
      meal:     plan.meal,
      time:     plan.time,
      calories: plan.calories,
      protein:  plan.protein,
      carbs:    plan.carbs,
      fat:      plan.fat,
      items:    [...plan.items],
    });
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setEditId(null); setForm(BLANK); };

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const setItem = (i, v) => setForm(f => {
    const items = [...f.items];
    items[i] = v;
    return { ...f, items };
  });

  const addItem    = () => setForm(f => ({ ...f, items: [...f.items, ''] }));
  const removeItem = (i) => setForm(f => ({ ...f, items: f.items.filter((_, j) => j !== i) }));

  const handleSave = () => {
    if (!form.meal.trim() || !form.time.trim() || !form.calories) return;
    const cleanItems = form.items.filter(x => x.trim());

    if (editId !== null) {
      setPlans(ps => ps.map(p => p.id === editId ? { ...p, ...form, items: cleanItems } : p));
    } else {
      const newId = Date.now();
      setPlans(ps => [...ps, { ...form, items: cleanItems, id: newId }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setPlans(ps => ps.filter(p => p.id !== id));
    setDeleteId(null);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Diet Details</h2>
          <p className="page-subtitle">Daily meal plan & nutritional information</p>
        </div>
        {isAdmin && (
          <button className="btn btn-primary" onClick={openAdd}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
            Add Meal
          </button>
        )}
      </div>

    
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Total Calories', value: totalCal,       unit: 'kcal', color: 'var(--primary)' },
          { label: 'Total Protein',  value: `${totalProt}g`, unit: '',    color: 'var(--green)'   },
          { label: 'Total Carbs',    value: `${totalCarb}g`, unit: '',    color: 'var(--yellow)'  },
          { label: 'Total Fat',      value: `${totalFat}g`,  unit: '',    color: 'var(--purple)'  },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--muted)', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 26, fontWeight: 800, fontFamily: 'var(--mono)', color: s.color }}>{s.value}</div>
            {s.unit && <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{s.unit}</div>}
          </div>
        ))}
      </div>

      
      {plans.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--muted)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 64, opacity: 0.2, display: 'block', marginBottom: 12 }}>restaurant_menu</span>
          <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: 'var(--muted2)' }}>No Meals Added</h3>
          <p style={{ fontSize: 13 }}>Click "Add Meal" to create your first meal plan.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {plans.map((plan) => (
            <div key={plan.id} className="card">
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 600, marginBottom: 3 }}>{plan.time}</div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>{plan.meal}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 8, padding: '5px 12px', fontSize: 13, fontWeight: 600 }}>
                      🔥 {plan.calories} kcal
                    </div>
                    {isAdmin && (
                      <>
                        <button className="btn btn-ghost btn-sm btn-icon" title="Edit" onClick={() => openEdit(plan)}>
                          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>edit</span>
                        </button>
                        <button className="btn btn-danger btn-sm btn-icon" title="Delete" onClick={() => setDeleteId(plan.id)}>
                          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>delete</span>
                        </button>
                      </>
                    )}
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
      )}

      
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" style={{ maxWidth: 520 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">{editId !== null ? 'Edit Meal' : 'Add New Meal'}</span>
              <button className="btn-close" onClick={closeModal}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
              </button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Meal Name *</label>
                  <input className="form-input" value={form.meal} onChange={e => set('meal', e.target.value)} placeholder="e.g. Breakfast" />
                </div>
                <div className="form-group">
                  <label className="form-label">Time *</label>
                  <input className="form-input" value={form.time} onChange={e => set('time', e.target.value)} placeholder="e.g. 7:00 AM" />
                </div>
                <div className="form-group">
                  <label className="form-label">Calories (kcal) *</label>
                  <input className="form-input" type="number" value={form.calories} onChange={e => set('calories', e.target.value)} placeholder="e.g. 420" />
                </div>
                <div className="form-group">
                  <label className="form-label">Protein</label>
                  <input className="form-input" value={form.protein} onChange={e => set('protein', e.target.value)} placeholder="e.g. 28g" />
                </div>
                <div className="form-group">
                  <label className="form-label">Carbs</label>
                  <input className="form-input" value={form.carbs} onChange={e => set('carbs', e.target.value)} placeholder="e.g. 55g" />
                </div>
                <div className="form-group">
                  <label className="form-label">Fat</label>
                  <input className="form-input" value={form.fat} onChange={e => set('fat', e.target.value)} placeholder="e.g. 12g" />
                </div>
              </div>

              
              <div>
                <label className="form-label" style={{ marginBottom: 8, display: 'block' }}>Food Items</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {form.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8 }}>
                      <input
                        className="form-input"
                        value={item}
                        onChange={e => setItem(i, e.target.value)}
                        placeholder={`Item ${i + 1}`}
                        style={{ flex: 1 }}
                      />
                      {form.items.length > 1 && (
                        <button className="btn btn-danger btn-sm btn-icon" onClick={() => removeItem(i)}>
                          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>close</span>
                        </button>
                      )}
                    </div>
                  ))}
                  <button className="btn btn-ghost btn-sm" onClick={addItem} style={{ alignSelf: 'flex-start' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 15 }}>add</span>
                    Add Item
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{editId !== null ? 'save' : 'add'}</span>
                {editId !== null ? 'Save Changes' : 'Add Meal'}
              </button>
            </div>
          </div>
        </div>
      )}


      {deleteId !== null && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal-box" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Delete Meal</span>
              <button className="btn-close" onClick={() => setDeleteId(null)}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: 14, color: 'var(--muted2)' }}>Are you sure you want to delete this meal? This cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteId)}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>delete</span>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
*/


import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const BLANK = { meal: '', time: '', calories: '', protein: '', carbs: '', fat: '', items: [''] };

export default function DietDetails({ role = 'Admin' }) {
  const isAdmin = role === 'Admin';
  const { dietPlans, addDietPlan, updateDietPlan, deleteDietPlan } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [editId,    setEditId]    = useState(null);
  const [form,      setForm]      = useState(BLANK);
  const [deleteId,  setDeleteId]  = useState(null);

  const totalCal  = dietPlans.reduce((s, p) => s + Number(p.calories),   0);
  const totalProt = dietPlans.reduce((s, p) => s + parseInt(p.protein),  0);
  const totalCarb = dietPlans.reduce((s, p) => s + parseInt(p.carbs),    0);
  const totalFat  = dietPlans.reduce((s, p) => s + parseInt(p.fat),      0);

  const openAdd = () => { setEditId(null); setForm(BLANK); setShowModal(true); };
  const openEdit = (plan) => {
    setEditId(plan.id);
    setForm({ meal: plan.meal, time: plan.time, calories: plan.calories, protein: plan.protein, carbs: plan.carbs, fat: plan.fat, items: [...plan.items] });
    setShowModal(true);
  };
  const closeModal = () => { setShowModal(false); setEditId(null); setForm(BLANK); };
  const set     = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const setItem = (i, v) => setForm(f => { const items = [...f.items]; items[i] = v; return { ...f, items }; });
  const addItem    = () => setForm(f => ({ ...f, items: [...f.items, ''] }));
  const removeItem = (i) => setForm(f => ({ ...f, items: f.items.filter((_, j) => j !== i) }));

  const handleSave = async () => {
    if (!form.meal.trim() || !form.time.trim() || !form.calories) return;
    const cleanItems = form.items.filter(x => x.trim());
    const data = { ...form, items: cleanItems };
    if (editId !== null) {
      await updateDietPlan(editId, data);
    } else {
      await addDietPlan(data);
    }
    closeModal();
  };

  const handleDelete = async (id) => {
    await deleteDietPlan(id);
    setDeleteId(null);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Diet Details</h2>
          <p className="page-subtitle">Daily meal plan & nutritional information</p>
        </div>
        {isAdmin && (
          <button className="btn btn-primary" onClick={openAdd}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
            Add Meal
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Total Calories', value: totalCal,        unit: 'kcal', color: 'var(--primary)' },
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

      {dietPlans.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--muted)' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 64, opacity: 0.2, display: 'block', marginBottom: 12 }}>restaurant_menu</span>
          <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: 'var(--muted2)' }}>No Meals Added</h3>
          <p style={{ fontSize: 13 }}>Click "Add Meal" to create your first meal plan.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {dietPlans.map((plan) => (
            <div key={plan.id} className="card">
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 600, marginBottom: 3 }}>{plan.time}</div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>{plan.meal}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 8, padding: '5px 12px', fontSize: 13, fontWeight: 600 }}>
                      🔥 {plan.calories} kcal
                    </div>
                    {isAdmin && (
                      <>
                        <button className="btn btn-ghost btn-sm btn-icon" title="Edit" onClick={() => openEdit(plan)}>
                          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>edit</span>
                        </button>
                        <button className="btn btn-danger btn-sm btn-icon" title="Delete" onClick={() => setDeleteId(plan.id)}>
                          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>delete</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
                  {plan.items.map((item, j) => (
                    <div key={j} style={{ fontSize: 13, color: 'var(--muted2)', display: 'flex', gap: 8 }}>
                      <span style={{ color: 'var(--primary)', flexShrink: 0 }}>•</span>{item}
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
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" style={{ maxWidth: 520 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">{editId !== null ? 'Edit Meal' : 'Add New Meal'}</span>
              <button className="btn-close" onClick={closeModal}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
              </button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-grid">
                <div className="form-group"><label className="form-label">Meal Name *</label><input className="form-input" value={form.meal} onChange={e => set('meal', e.target.value)} placeholder="e.g. Breakfast" /></div>
                <div className="form-group"><label className="form-label">Time *</label><input className="form-input" value={form.time} onChange={e => set('time', e.target.value)} placeholder="e.g. 7:00 AM" /></div>
                <div className="form-group"><label className="form-label">Calories (kcal) *</label><input className="form-input" type="number" value={form.calories} onChange={e => set('calories', e.target.value)} placeholder="e.g. 420" /></div>
                <div className="form-group"><label className="form-label">Protein</label><input className="form-input" value={form.protein} onChange={e => set('protein', e.target.value)} placeholder="e.g. 28g" /></div>
                <div className="form-group"><label className="form-label">Carbs</label><input className="form-input" value={form.carbs} onChange={e => set('carbs', e.target.value)} placeholder="e.g. 55g" /></div>
                <div className="form-group"><label className="form-label">Fat</label><input className="form-input" value={form.fat} onChange={e => set('fat', e.target.value)} placeholder="e.g. 12g" /></div>
              </div>
              <div>
                <label className="form-label" style={{ marginBottom: 8, display: 'block' }}>Food Items</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {form.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8 }}>
                      <input className="form-input" value={item} onChange={e => setItem(i, e.target.value)} placeholder={`Item ${i + 1}`} style={{ flex: 1 }} />
                      {form.items.length > 1 && (
                        <button className="btn btn-danger btn-sm btn-icon" onClick={() => removeItem(i)}>
                          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>close</span>
                        </button>
                      )}
                    </div>
                  ))}
                  <button className="btn btn-ghost btn-sm" onClick={addItem} style={{ alignSelf: 'flex-start' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 15 }}>add</span> Add Item
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={closeModal}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{editId !== null ? 'save' : 'add'}</span>
                {editId !== null ? 'Save Changes' : 'Add Meal'}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal-box" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Delete Meal</span>
              <button className="btn-close" onClick={() => setDeleteId(null)}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: 14, color: 'var(--muted2)' }}>Are you sure you want to delete this meal? This cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteId)}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>delete</span> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}