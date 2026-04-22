import React, { createContext, useContext, useState } from 'react';
import { MEMBERS, BILLS, NOTIFICATIONS, SUPPLEMENTS } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [members, setMembers] = useState(MEMBERS);
  const [bills, setBills] = useState(BILLS);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [cart, setCart] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [products, setProducts] = useState(SUPPLEMENTS);

  const addProduct = (data) => {
    const newProduct = { ...data, id: Date.now(), rating: 4.5 };
    setProducts(ps => [newProduct, ...ps]);
    addToast('Product added to store!');
  };

  const updateProduct = (id, data) => {
    setProducts(ps => ps.map(p => p.id === id ? { ...p, ...data } : p));
    addToast('Product updated!');
  };

  const deleteProduct = (id) => {
    setProducts(ps => ps.filter(p => p.id !== id));
    addToast('Product removed from store.');
  };

  const addToast = (msg, type = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  };

  const addMember = (memberData) => {
    const initials = memberData.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    const newMember = { ...memberData, id: Date.now(), initials, workouts: 0, streak: 0 };
    setMembers(ms => [...ms, newMember]);
    addToast('New member registered successfully!');
  };

  const updateMember = (id, data) => {
    const initials = data.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    setMembers(ms => ms.map(m => m.id === id ? { ...m, ...data, initials } : m));
    addToast('Member updated successfully!');
  };

  const deleteMember = (id) => {
    setMembers(ms => ms.filter(m => m.id !== id));
    addToast('Member removed.');
  };

  const addBill = (billData) => {
    const newBill = { ...billData, id: `BILL-${String(bills.length + 1).padStart(3, '0')}`, date: new Date().toISOString().slice(0, 10), status: 'Unpaid' };
    setBills(b => [newBill, ...b]);
    addToast(`Bill ${newBill.id} created!`);
    return newBill;
  };

  const markNotifRead = (id) => {
    setNotifications(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(ns => ns.map(n => ({ ...n, read: true })));
    addToast('All notifications marked as read.');
  };

  const sendNotification = (notifData) => {
    const newNotif = { ...notifData, id: Date.now(), time: 'Just now', read: false };
    setNotifications(ns => [newNotif, ...ns]);
    addToast('Notification sent to all members!');
  };

  const addToCart = (item) => {
    setCart(c => {
      const existing = c.find(x => x.id === item.id);
      if (existing) return c.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x);
      return [...c, { ...item, qty: 1 }];
    });
    addToast(`${item.name.slice(0, 30)}... added to cart`);
  };

  const removeFromCart = (id) => setCart(c => c.filter(x => x.id !== id));
  const clearCart = () => setCart([]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <AppContext.Provider value={{
      members, bills, notifications, cart, toasts, products,
      addMember, updateMember, deleteMember,
      addBill, setBills,
      markNotifRead, markAllRead, sendNotification,
      addToCart, removeFromCart, clearCart,
      addProduct, updateProduct, deleteProduct,
      addToast, unreadCount, cartTotal,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
