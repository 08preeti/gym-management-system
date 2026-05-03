import React from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/UI';

export default function Cart({ onNavigate }) {
  const { cart, removeFromCart, clearCart, cartTotal, addToast } = useApp();

  const handleCheckout = () => {
    clearCart();
    addToast('Order placed successfully! 🎉');
    onNavigate('supplement-store');
  };

  if (cart.length === 0) {
    return (
      <div>
        <div className="page-header">
          <div>
            <h2 className="page-title">Cart</h2>
            <p className="page-subtitle">Your shopping cart</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--muted)' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🛒</div>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--muted2)' }}>Cart is Empty</h3>
          <p style={{ fontSize: 13, marginBottom: 20 }}>Add supplements from the store to get started.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('supplement-store')}>
            <Icon name="storefront" size={16} /> Browse Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Cart</h2>
          <p className="page-subtitle">{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
        </div>
        <button className="btn btn-ghost" onClick={() => onNavigate('supplement-store')}>
          <Icon name="arrow_back" size={16} /> Continue Shopping
        </button>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* CART ITEMS */}
        <div>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: 14, padding: 16, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, marginBottom: 12, alignItems: 'center' }}>
              <div style={{ width: 56, height: 56, background: 'var(--surface)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
                {item.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{item.category}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginTop: 4 }}>
                  ${(item.price * item.qty).toFixed(2)}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '4px 10px', fontSize: 13, fontWeight: 600 }}>
                  x{item.qty}
                </div>
                <button className="btn btn-danger btn-sm btn-icon" onClick={() => removeFromCart(item.id)}>
                  <Icon name="delete" size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <div className="card">
          <div className="card-header"><span className="card-title">Order Summary</span></div>
          <div className="card-body">
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--muted2)' }}>{item.name.slice(0, 28)}... x{item.qty}</span>
                <span style={{ fontWeight: 600 }}>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="divider" />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 18, marginBottom: 20 }}>
              <span>Total</span>
              <span style={{ fontFamily: 'var(--mono)', color: 'var(--primary)' }}>${cartTotal.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: 12 }} onClick={handleCheckout}>
              <Icon name="payment" size={16} /> Proceed to Checkout
            </button>
            <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }} onClick={clearCart}>
              <Icon name="delete_sweep" size={16} /> Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
