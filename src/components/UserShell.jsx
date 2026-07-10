import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Flower2, Sparkles, ShoppingCart, Calendar, BookOpen, User, LogOut,
} from 'lucide-react';
import { C } from '../constants/theme';
import { useApp } from '../context/AppContext';

export default function UserShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, cart } = useApp();

  // Decide which item is active from current pathname
  const path = location.pathname;
  const active =
  path.startsWith('/app/services') ? 'services'
    : path.startsWith('/app/cart') || path.startsWith('/app/payment') ? 'cart'
    : path.startsWith('/app/bookings') ? 'bookings'
    : path.startsWith('/app/articles') ? 'articles'
    : path.startsWith('/app/profile') ? 'profile'
    : '';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const items = [
    { id: 'services', label: 'Layanan', icon: Sparkles, to: '/app/services' },
    { id: 'cart', label: 'Keranjang', icon: ShoppingCart, to: '/app/cart', badge: cart.length },
    { id: 'bookings', label: 'Booking Saya', icon: Calendar, to: '/app/bookings' },
    { id: 'articles', label: 'Jurnal', icon: BookOpen, to: '/app/articles' },
    { id: 'profile', label: 'Profil', icon: User, to: '/app/profile' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '100vh' }} className="shell-grid">
      <aside style={{
        background: C.bg, borderRight: `1px solid ${C.line}`, padding: '30px 22px',
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
      }} className="shell-aside">
        <div onClick={() => navigate('/app/services')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40 }}>
          <Flower2 size={20} style={{ color: C.roseDark }} />
          <span className="serif" style={{ fontSize: 19, fontWeight: 600, color: C.taupe }}>Powder Room</span>
        </div>

        <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', color: C.taupeLight, marginBottom: 12 }}>MENU</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {items.map(item => (
            <button key={item.id} onClick={() => navigate(item.to)} style={{
              background: active === item.id ? C.peach : 'transparent',
              border: 'none', padding: '12px 14px', borderRadius: 12,
              display: 'flex', alignItems: 'center', gap: 12, color: active === item.id ? C.taupe : C.taupeLight,
              fontSize: 14, fontWeight: active === item.id ? 600 : 400, textAlign: 'left',
              transition: 'all 0.2s',
            }}>
              <item.icon size={17} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge ? (
                <span className="mono" style={{
                  fontSize: 11, background: C.rose, color: C.bg, minWidth: 20, height: 20,
                  borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px',
                }}>{item.badge}</span>
              ) : null}
            </button>
          ))}
        </nav>

        <div style={{ position: 'absolute', bottom: 30, left: 22, right: 22 }}>
          <div style={{ padding: 14, background: C.peachLight, borderRadius: 16, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: C.rose, color: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600 }}>
                {user?.name?.[0]}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.taupe, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
                <div style={{ fontSize: 11, color: C.taupeLight, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</div>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} style={{
            width: '100%', background: 'transparent', border: `1px solid ${C.line}`, color: C.taupe,
            padding: '10px', borderRadius: 12, fontSize: 13,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}><LogOut size={14} /> Keluar</button>
        </div>
      </aside>

      <main style={{ padding: '32px 40px 60px', background: C.bg }} className="shell-main">
        <Outlet />
      </main>
    </div>
  );
}