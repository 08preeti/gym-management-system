import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Icon, Modal } from '../components/UI';

const CATEGORIES = ['All', 'Protein', 'Pre-Workout', 'Vitamins', 'Creatine', 'Gear'];
const EMOJI_OPTIONS = ['🥛','⚡','💊','💪','🔬','🧴','🐟','🍫','🏋️','🥗','🍎','🧃','🫙','🥤','🎯','🧪'];

const BLANK_FORM = {
  name: '', category: 'Protein', price: '', stock: '',
  emoji: '🥛', image: null,   // image = base64 string or null
  description: '', imageMode: 'emoji',  // 'emoji' | 'upload'
};


export default function SupplementStore({ onNavigate }) {
  const { products, addToCart, addProduct, updateProduct, deleteProduct } = useApp();

  const [category, setCategory]           = useState('All');
  const [search, setSearch]               = useState('');
  const [showModal, setShowModal]         = useState(false);
  const [editProduct, setEditProduct]     = useState(null);
  const [form, setForm]                   = useState(BLANK_FORM);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [viewMode, setViewMode]           = useState('grid');
  const [dragOver, setDragOver]           = useState(false);

  const fileInputRef = useRef(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // ── Read file → base64
  const readFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      set('image', e.target.result);
      set('imageMode', 'upload');
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e) => readFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    readFile(e.dataTransfer.files[0]);
  };

  const clearImage = () => {
    set('image', null);
    set('imageMode', 'emoji');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const filtered = products.filter(s => {
    const matchCat    = category === 'All' || s.category === category;
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const openAdd = () => {
    setEditProduct(null);
    setForm(BLANK_FORM);
    setShowModal(true);
  };

  const openEdit = (product) => {
    setEditProduct(product);
    setForm({
      name:        product.name,
      category:    product.category,
      price:       product.price,
      stock:       product.stock,
      emoji:       product.emoji || '🥛',
      image:       product.image || null,
      description: product.description || '',
      imageMode:   product.image ? 'upload' : 'emoji',
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.price || !form.stock) return;
    const data = {
      name:        form.name,
      category:    form.category,
      price:       parseFloat(form.price),
      stock:       parseInt(form.stock),
      emoji:       form.emoji,
      image:       form.imageMode === 'upload' ? form.image : null,
      description: form.description,
    };
    if (editProduct) {
      updateProduct(editProduct.id, data);
    } else {
      addProduct(data);
    }
    setShowModal(false);
    setEditProduct(null);
    setForm(BLANK_FORM);
  };

  const handleDelete = (id) => { deleteProduct(id); setConfirmDelete(null); };

  const totalProducts = products.length;
  const lowStockCount = products.filter(p => p.stock <= 5).length;
  const totalStockVal = products.reduce((s, p) => s + p.price * p.stock, 0);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Supplement Store</h2>
          <p className="page-subtitle">{totalProducts} products · {lowStockCount} low stock</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ display: 'flex', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
            {['grid','table'].map(m => (
              <button key={m}
                className="btn btn-sm"
                style={{ borderRadius: 0, border: 'none', background: viewMode === m ? 'var(--primary)' : 'transparent', color: viewMode === m ? '#fff' : 'var(--muted2)' }}
                onClick={() => setViewMode(m)}
              >
                <Icon name={m === 'grid' ? 'grid_view' : 'table_rows'} size={16} />
              </button>
            ))}
          </div>
          <button className="btn btn-ghost" onClick={() => onNavigate('cart')}>
            <Icon name="shopping_cart" size={16} /> View Cart
          </button>
          <button className="btn btn-primary" onClick={openAdd}>
            <Icon name="add" size={16} /> Add Product
          </button>
        </div>
      </div>

      {/* STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Total Products',  value: totalProducts,                   icon: '📦', color: 'var(--primary)' },
          { label: 'Low Stock Items', value: lowStockCount,                    icon: '⚠️', color: 'var(--yellow)'  },
          { label: 'Inventory Value', value: `$${totalStockVal.toFixed(0)}`,  icon: '💰', color: 'var(--green)'   },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={{ fontSize: 28, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* SEARCH + FILTERS */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="search-wrap" style={{ flex: 1, minWidth: 200 }}>
          <span className="material-symbols-outlined search-icon">search</span>
          <input className="form-input search-input" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="pill-row">
          {CATEGORIES.map(c => (
            <div key={c} className={`pill${category === c ? ' active' : ''}`} onClick={() => setCategory(c)}>{c}</div>
          ))}
        </div>
      </div>

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid-4">
          {filtered.map(s => (
            <div key={s.id} className="product-card">
              {/* Image or Emoji */}
              {s.image ? (
                <img src={s.image} alt={s.name} style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block', borderBottom: '1px solid var(--border)' }} />
              ) : (
                <div className="product-img">{s.emoji}</div>
              )}
              <div className="product-info">
                <div className="product-name">{s.name}</div>
                <div className="product-meta">{s.category} · ⭐ {s.rating}</div>
                {s.description && <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8, lineHeight: 1.4 }}>{s.description}</div>}
                <div className="product-footer">
                  <div className="product-price">${s.price}</div>
                  <span className={`stock-badge ${s.stock <= 5 ? 'stock-low' : 'stock-ok'}`}>
                    {s.stock <= 5 ? `⚠️ ${s.stock} left` : `${s.stock} in stock`}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                  <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }} onClick={() => addToCart(s)}>
                    <Icon name="add_shopping_cart" size={13} /> Cart
                  </button>
                  <button className="btn btn-ghost btn-sm btn-icon" title="Edit" onClick={() => openEdit(s)}>
                    <Icon name="edit" size={14} />
                  </button>
                  <button className="btn btn-danger btn-sm btn-icon" title="Delete" onClick={() => setConfirmDelete(s)}>
                    <Icon name="delete" size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Product</th><th>Category</th><th>Price</th>
                  <th>Stock</th><th>Rating</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 10, overflow: 'hidden', background: 'var(--surface)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                          {s.image
                            ? <img src={s.image} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            : s.emoji}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                          {s.description && <div style={{ fontSize: 11, color: 'var(--muted)' }}>{s.description.slice(0, 38)}…</div>}
                        </div>
                      </div>
                    </td>
                    <td><span className="badge badge-blue">{s.category}</span></td>
                    <td style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: 'var(--primary)' }}>${s.price}</td>
                    <td style={{ fontFamily: 'var(--mono)' }}>{s.stock}</td>
                    <td>⭐ {s.rating}</td>
                    <td><span className={`stock-badge ${s.stock <= 5 ? 'stock-low' : 'stock-ok'}`}>{s.stock <= 5 ? 'Low Stock' : 'In Stock'}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn btn-primary btn-sm" onClick={() => addToCart(s)}><Icon name="add_shopping_cart" size={13} /> Add</button>
                        <button className="btn btn-ghost btn-sm btn-icon" onClick={() => openEdit(s)}><Icon name="edit" size={14} /></button>
                        <button className="btn btn-danger btn-sm btn-icon" onClick={() => setConfirmDelete(s)}><Icon name="delete" size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--muted)' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <p>No products found.{' '}
            <button className="btn btn-primary btn-sm" style={{ marginLeft: 8 }} onClick={openAdd}>
              <Icon name="add" size={13} /> Add Product
            </button>
          </p>
        </div>
      )}

      {/* ── ADD / EDIT MODAL ─────────────────────────────────────────── */}
      {showModal && (
        <Modal
          title={editProduct ? 'Edit Product' : 'Add New Product'}
          onClose={() => { setShowModal(false); setEditProduct(null); setForm(BLANK_FORM); }}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => { setShowModal(false); setEditProduct(null); }}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={!form.name.trim() || !form.price || !form.stock}>
                <Icon name={editProduct ? 'save' : 'add'} size={16} />
                {editProduct ? 'Update Product' : 'Add Product'}
              </button>
            </>
          }
        >

          {/* ── IMAGE / ICON TABS ── */}
          <div className="form-group">
            <label className="form-label">Product Image</label>

            {/* Tab switcher */}
            <div style={{ display: 'flex', background: 'var(--surface)', borderRadius: 10, padding: 4, marginBottom: 12, border: '1px solid var(--border)' }}>
              {[
                { key: 'upload', icon: 'upload',      label: 'Upload Image' },
                { key: 'emoji',  icon: 'emoji_emotions', label: 'Use Emoji'    },
              ].map(t => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => set('imageMode', t.key)}
                  style={{
                    flex: 1, padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font)', fontSize: 13, fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    background: form.imageMode === t.key ? 'var(--primary)' : 'transparent',
                    color:      form.imageMode === t.key ? '#fff'           : 'var(--muted2)',
                    transition: 'all 0.15s',
                  }}
                >
                  <Icon name={t.icon} size={16} />
                  {t.label}
                </button>
              ))}
            </div>

            {/* ── UPLOAD TAB ── */}
            {form.imageMode === 'upload' && (
              <div>
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileInput}
                />

                {form.image ? (
                  /* Image preview with remove & replace buttons */
                  <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '2px solid var(--primary)' }}>
                    <img
                      src={form.image}
                      alt="Product preview"
                      style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
                    />
                    {/* Overlay actions */}
                    <div style={{
                      position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      opacity: 0, transition: 'opacity 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.opacity = 1}
                      onMouseLeave={e => e.currentTarget.style.opacity = 0}
                    >
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => fileInputRef.current.click()}
                      >
                        <Icon name="swap_horiz" size={15} /> Replace
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={clearImage}
                      >
                        <Icon name="delete" size={15} /> Remove
                      </button>
                    </div>
                    {/* Corner badge */}
                    <div style={{ position: 'absolute', top: 8, right: 8, background: 'var(--green)', color: '#fff', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
                      ✓ Image uploaded
                    </div>
                  </div>
                ) : (
                  /* Drop zone */
                  <div
                    onClick={() => fileInputRef.current.click()}
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    style={{
                      border: `2px dashed ${dragOver ? 'var(--primary)' : 'var(--border)'}`,
                      borderRadius: 12,
                      padding: '32px 20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      background: dragOver ? 'var(--primary-glow)' : 'var(--surface)',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                      <Icon name="cloud_upload" size={28} color="var(--primary)" />
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>
                      {dragOver ? 'Drop image here' : 'Click to upload or drag & drop'}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14 }}>
                      PNG, JPG, WEBP, GIF supported · Max 5MB
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={e => { e.stopPropagation(); fileInputRef.current.click(); }}
                    >
                      <Icon name="folder_open" size={14} /> Browse Files
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ── EMOJI TAB ── */}
            {form.imageMode === 'emoji' && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {EMOJI_OPTIONS.map(e => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => set('emoji', e)}
                    style={{
                      width: 44, height: 44, fontSize: 22, borderRadius: 10, cursor: 'pointer',
                      border: `2px solid ${form.emoji === e ? 'var(--primary)' : 'var(--border)'}`,
                      background: form.emoji === e ? 'var(--primary-light)' : 'var(--surface)',
                      transition: 'all 0.15s',
                    }}
                  >
                    {e}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* NAME */}
          <div className="form-group">
            <label className="form-label">Product Name *</label>
            <input className="form-input" placeholder="e.g. Whey Protein 2kg" value={form.name} onChange={e => set('name', e.target.value)} />
          </div>

          {/* CATEGORY + PRICE */}
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select className="form-input" value={form.category} onChange={e => set('category', e.target.value)}>
                {['Protein', 'Pre-Workout', 'Vitamins', 'Creatine', 'Gear'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Price ($) *</label>
              <input className="form-input" type="number" min="0" step="0.01" placeholder="0.00" value={form.price} onChange={e => set('price', e.target.value)} />
            </div>
          </div>

          {/* STOCK */}
          <div className="form-group">
            <label className="form-label">Stock Quantity *</label>
            <input className="form-input" type="number" min="0" placeholder="e.g. 50" value={form.stock} onChange={e => set('stock', e.target.value)} />
          </div>

          {/* DESCRIPTION */}
          <div className="form-group">
            <label className="form-label">Description (optional)</label>
            <textarea className="form-input" rows={3} placeholder="Brief product description..." value={form.description} onChange={e => set('description', e.target.value)} style={{ resize: 'vertical' }} />
          </div>

          {/* LIVE PREVIEW */}
          {form.name && (
            <div>
              <label className="form-label" style={{ marginBottom: 8, display: 'block' }}>Preview</label>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', display: 'flex', gap: 0 }}>
                {/* Thumb */}
                <div style={{ width: 72, height: 72, flexShrink: 0, background: 'var(--card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
                  {form.imageMode === 'upload' && form.image
                    ? <img src={form.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : form.emoji}
                </div>
                <div style={{ padding: '10px 14px' }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{form.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', margin: '2px 0' }}>{form.category} · {form.stock || '0'} in stock</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 16, fontWeight: 800, color: 'var(--primary)' }}>${form.price || '0.00'}</div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      )}

      {/* ── CONFIRM DELETE MODAL ── */}
      {confirmDelete && (
        <Modal
          title="Delete Product"
          onClose={() => setConfirmDelete(null)}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(confirmDelete.id)}>
                <Icon name="delete" size={16} /> Delete
              </button>
            </>
          }
        >
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ width: 72, height: 72, borderRadius: 16, overflow: 'hidden', background: 'var(--surface)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>
              {confirmDelete.image
                ? <img src={confirmDelete.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : confirmDelete.emoji}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{confirmDelete.name}</div>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
              Remove this product from the store?<br />
              This action <strong style={{ color: 'var(--red)' }}>cannot be undone</strong>.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
