import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { membersAPI, billsAPI, notificationsAPI, productsAPI, statsAPI } from '../services/api';


export const AppContext = createContext(null);

export function AppProvider({ children }) {

  const [members,       setMembers]       = useState([]);
  const [bills,         setBills]         = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [products,      setProducts]      = useState([]);
  const [stats,         setStats]         = useState(null);
  const [cart,          setCart]          = useState([]);
  const [toasts,        setToasts]        = useState([]);
  const [loading,       setLoading]       = useState({
    members: false, bills: false, notifications: false, products: false, stats: false,
  });
  const [errors, setErrors] = useState({});

  
  const addToast = useCallback((msg, type = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  const setLoad = (key, val) => setLoading(l => ({ ...l, [key]: val }));
  const setErr  = (key, val) => setErrors(e => ({ ...e, [key]: val }));

  
  const fetchMembers = useCallback(async (params = {}) => {
    setLoad('members', true);
    try {
      const res = await membersAPI.getAll(params);
      setMembers(res.data);
      setErr('members', null);
    } catch (e) {
      setErr('members', e.message);
      addToast('Failed to load members: ' + e.message, 'error');
    } finally {
      setLoad('members', false);
    }
  }, [addToast]);

  const fetchBills = useCallback(async () => {
    setLoad('bills', true);
    try {
      const res = await billsAPI.getAll();
      setBills(res.data);
    } catch (e) {
      addToast('Failed to load bills: ' + e.message, 'error');
    } finally {
      setLoad('bills', false);
    }
  }, [addToast]);

  const fetchNotifications = useCallback(async () => {
    setLoad('notifications', true);
    try {
      const res = await notificationsAPI.getAll();
      setNotifications(res.data);
    } catch (e) {
      addToast('Failed to load notifications: ' + e.message, 'error');
    } finally {
      setLoad('notifications', false);
    }
  }, [addToast]);

  const fetchProducts = useCallback(async (params = {}) => {
    setLoad('products', true);
    try {
      const res = await productsAPI.getAll(params);
      setProducts(res.data);
    } catch (e) {
      addToast('Failed to load products: ' + e.message, 'error');
    } finally {
      setLoad('products', false);
    }
  }, [addToast]);

  const fetchStats = useCallback(async () => {
    setLoad('stats', true);
    try {
      const res = await statsAPI.getDashboard();
      setStats(res.data);
    } catch (e) {
      addToast('Failed to load stats: ' + e.message, 'error');
    } finally {
      setLoad('stats', false);
    }
  }, [addToast]);

  
  useEffect(() => {
    fetchMembers();
    fetchBills();
    fetchNotifications();
    fetchProducts();
    fetchStats();
  }, [fetchMembers, fetchBills, fetchNotifications, fetchProducts, fetchStats]);

  
  const addMember = async (data) => {
    try {
      const res = await membersAPI.create(data);
      setMembers(ms => [...ms, res.data]);
      addToast('Member registered successfully!');
      fetchStats();
      return res.data;
    } catch (e) {
      addToast('Error: ' + e.message, 'error');
      throw e;
    }
  };

  const updateMember = async (id, data) => {
    try {
      const res = await membersAPI.update(id, data);
      setMembers(ms => ms.map(m => m.id === id ? res.data : m));
      addToast('Member updated!');
      return res.data;
    } catch (e) {
      addToast('Error: ' + e.message, 'error');
      throw e;
    }
  };

  const deleteMember = async (id) => {
    try {
      await membersAPI.delete(id);
      setMembers(ms => ms.filter(m => m.id !== id));
      addToast('Member removed.');
      fetchStats();
    } catch (e) {
      addToast('Error: ' + e.message, 'error');
    }
  };

  const checkInMember = async (id) => {
    try {
      const res = await membersAPI.checkIn(id);
      setMembers(ms => ms.map(m => m.id === id ? res.data : m));
      addToast(`${res.data.name} checked in! 💪`);
      return res.data;
    } catch (e) {
      addToast('Check-in failed: ' + e.message, 'error');
    }
  };

  
  const addBill = async (data) => {
    try {
      const res = await billsAPI.create(data);
      setBills(b => [res.data, ...b]);
      addToast(`Bill ${res.data.id} created!`);
      fetchStats();
      return res.data;
    } catch (e) {
      addToast('Error: ' + e.message, 'error');
      throw e;
    }
  };

  const updateBill = async (id, data) => {
    try {
      const res = await billsAPI.update(id, data);
      setBills(bs => bs.map(b => b.id === id ? res.data : b));
      addToast('Bill updated!');
    } catch (e) {
      addToast('Error: ' + e.message, 'error');
    }
  };

  const deleteBill = async (id) => {
    try {
      await billsAPI.delete(id);
      setBills(bs => bs.filter(b => b.id !== id));
      addToast('Bill deleted.');
    } catch (e) {
      addToast('Error: ' + e.message, 'error');
    }
  };

  
  const sendNotification = async (data) => {
    try {
      const res = await notificationsAPI.send(data);
      setNotifications(ns => [res.data, ...ns]);
      addToast('Notification sent to all members!');
    } catch (e) {
      addToast('Error: ' + e.message, 'error');
    }
  };

  const markNotifRead = async (id) => {
    try {
      await notificationsAPI.markRead(id);
      setNotifications(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (e) {
      
    }
  };

  const markAllRead = async () => {
    try {
      await notificationsAPI.markAllRead();
      setNotifications(ns => ns.map(n => ({ ...n, read: true })));
      addToast('All notifications marked as read.');
    } catch (e) {
      addToast('Error: ' + e.message, 'error');
    }
  };

 
  const addProduct = async (data) => {
    try {
      const res = await productsAPI.create(data);
      setProducts(ps => [res.data, ...ps]);
      addToast('Product added to store!');
      return res.data;
    } catch (e) {
      addToast('Error: ' + e.message, 'error');
      throw e;
    }
  };

  const updateProduct = async (id, data) => {
    try {
      const res = await productsAPI.update(id, data);
      setProducts(ps => ps.map(p => p.id === id ? res.data : p));
      addToast('Product updated!');
    } catch (e) {
      addToast('Error: ' + e.message, 'error');
    }
  };

  const deleteProduct = async (id) => {
    try {
      await productsAPI.delete(id);
      setProducts(ps => ps.filter(p => p.id !== id));
      addToast('Product removed.');
    } catch (e) {
      addToast('Error: ' + e.message, 'error');
    }
  };

  const addToCart = (item) => {
    setCart(c => {
      const existing = c.find(x => x.id === item.id);
      if (existing) return c.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x);
      return [...c, { ...item, qty: 1 }];
    });
    
    const displayName = item.name.length > 30 ? item.name.slice(0, 30) + '…' : item.name;
    addToast(`${displayName} added to cart`);
  };

  const removeFromCart = (id) => setCart(c => c.filter(x => x.id !== id));
  const clearCart      = ()   => setCart([]);


  const unreadCount = notifications.filter(n => !n.read).length;
  const cartTotal   = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <AppContext.Provider value={{
      // State
      members, bills, notifications, products, stats, cart, toasts, loading, errors,
      // Member
      addMember, updateMember, deleteMember, checkInMember, fetchMembers,
      // Bill
      addBill, updateBill, deleteBill, fetchBills,
      // Notification
      sendNotification, markNotifRead, markAllRead,
      // Product
      addProduct, updateProduct, deleteProduct, fetchProducts,
      // Cart
      addToCart, removeFromCart, clearCart,
      // Misc
      addToast, fetchStats, unreadCount, cartTotal,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
