import { createContext, useContext, useEffect, useState } from 'react';
import {
  INIT_CATEGORIES, INIT_SERVICES, INIT_STYLISTS, INIT_APPOINTMENTS,
  INIT_TRANSACTIONS, INIT_ARTICLES, INIT_USERS,
} from '../constants/seedData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Auth
  const [user, setUser] = useState(null);

  // Domain state
  const [categories, setCategories] = useState(INIT_CATEGORIES);
  const [services, setServices] = useState(INIT_SERVICES);
  const [stylists, setStylists] = useState(INIT_STYLISTS);
  const [appointments, setAppointments] = useState(INIT_APPOINTMENTS);
  const [transactions, setTransactions] = useState(INIT_TRANSACTIONS);
  const [articles, setArticles] = useState(INIT_ARTICLES);
  const [users, setUsers] = useState(INIT_USERS);

  // User session state
  const [myBookings, setMyBookings] = useState([]);
  const [cart, setCart] = useState([]);

  // Toast
  const [toast, setToast] = useState(null);
  const showToast = (msg, type = 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Inject Google Fonts once
  useEffect(() => {
    const id = 'pr-fonts';
    if (document.getElementById(id)) return;
    const l1 = document.createElement('link');
    l1.rel = 'preconnect'; l1.href = 'https://fonts.googleapis.com';
    const l2 = document.createElement('link');
    l2.rel = 'preconnect'; l2.href = 'https://fonts.gstatic.com'; l2.crossOrigin = '';
    const l3 = document.createElement('link');
    l3.id = id; l3.rel = 'stylesheet';
    l3.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..800;1,9..144,300..600&family=Manrope:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap';
    document.head.append(l1, l2, l3);
  }, []);

  // ----- AUTH -----
  const login = (email, password) => {
    if (!email || !password) {
      showToast('Mohon isi semua kolom', 'error');
      return null;
    }
    const e = email.trim().toLowerCase();
    const found = users.find(u => u.email.toLowerCase() === e && u.password === password);
    if (!found) {
      showToast('Email atau kata sandi salah', 'error');
      return null;
    }
    const u = { name: found.name, email: found.email, role: found.role };
    setUser(u);
    showToast(
      found.role === 'admin'
        ? 'Selamat datang kembali, Admin'
        : 'Selamat datang di The Powder Room',
      'success'
    );
    return u;
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    showToast('Berhasil keluar', 'info');
  };

  // ----- CART -----
  const addToCart = (item) => {
    // overlap check
    const itemEnd = item.time + item.service.duration / 60;
    const clash = cart.find(c => {
      const cEnd = c.time + c.service.duration / 60;
      return item.time < cEnd && c.time < itemEnd;
    });
    if (clash) {
      showToast(
        `Jadwal bentrok dengan "${clash.service.name}" (${String(clash.time).padStart(2, '0')}:00). Pilih jam yang berbeda.`,
        'error'
      );
      return false;
    }
    setCart([
      ...cart,
      { ...item, cartId: 'c' + Date.now() + Math.random().toString(36).slice(2, 6) },
    ]);
    showToast('Ditambahkan ke keranjang', 'success');
    return true;
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(c => c.cartId !== cartId));
  };

  // ----- CHECKOUT (CART → APPOINTMENTS + MY BOOKINGS + TRANSACTIONS) -----
  const checkoutCart = (paymentMethod) => {
    if (!user) return;
    const stamp = Date.now();
    const items = cart.map((c, idx) => ({
      c, idx, txId: 'TRX-' + (stamp + idx).toString().slice(-6),
    }));

    const newAppts = items.map(({ c, idx, txId }) => ({
      stylistId: c.stylist.id,
      date: 'today',
      startHour: c.time,
      duration: c.service.duration,
      customerName: user.name,
      serviceName: c.service.name,
      id: 'b' + stamp + '-' + idx,
      price: c.service.price,
      paymentMethod,
      paid: true,
      txId,
      serviceStatus: 'belum',
    }));

    setAppointments(prev => [...prev, ...newAppts]);

    setMyBookings(prev => [
      ...prev,
      ...items.map(({ c, idx }) => ({
        ...newAppts[idx],
        serviceImage: c.service.image,
        stylistName: c.stylist.name,
        stylistPhoto: c.stylist.photo,
      })),
    ]);

    setTransactions(prev => [
      ...items.map(({ c, txId }) => ({
        id: txId,
        customerName: user.name,
        serviceName: c.service.name,
        stylistName: c.stylist.name,
        price: c.service.price,
        paymentMethod,
        date: new Date().toISOString().slice(0, 10),
        time: c.time,
        status: 'completed',
        serviceStatus: 'belum',
      })),
      ...prev,
    ]);

    setCart([]);
  };

  const value = {
    // auth
    user, setUser, login, logout,
    // domain
    categories, setCategories,
    services, setServices,
    stylists, setStylists,
    appointments, setAppointments,
    transactions, setTransactions,
    articles, setArticles,
    users, setUsers,
    // user session
    myBookings, setMyBookings,
    cart, setCart, addToCart, removeFromCart, checkoutCart,
    // toast
    toast, showToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
};