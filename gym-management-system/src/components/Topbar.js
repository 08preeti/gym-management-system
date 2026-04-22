import React from 'react';
import { useApp } from '../context/AppContext';
import './Topbar.css';

export default function Topbar({ title, subtitle, onNavigate }) {
  const { unreadCount, cart } = useApp();
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">{title}</h1>
        {subtitle && <p className="topbar-subtitle">{subtitle}</p>}
      </div>
      <div className="topbar-right">
        <div className="search-wrap">
          <span className="material-symbols-outlined search-icon">search</span>
          <input
            className="form-input search-input topbar-search"
            placeholder="Quick search..."
            onFocus={() => onNavigate('search')}
          />
        </div>

        <button
          className="topbar-icon-btn"
          onClick={() => onNavigate('notification-center')}
          title="Notifications"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>notifications</span>
          {unreadCount > 0 && <span className="topbar-notif-dot" />}
        </button>

        <button
          className="topbar-icon-btn"
          onClick={() => onNavigate('cart')}
          title="Cart"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>shopping_cart</span>
          {cartCount > 0 && <span className="topbar-cart-badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}
