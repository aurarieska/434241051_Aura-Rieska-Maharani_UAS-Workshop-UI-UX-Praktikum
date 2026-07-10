import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Flower2, Home, Tag, LayoutGrid, Users, FileText, UserCog, CreditCard, LogOut,
} from 'lucide-react';
import { C } from '../../constants/theme';
import { useApp } from '../../context/AppContext';

export default function AdminShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, categories, services, stylists, articles, users, transactions } = useApp();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'dashboard', label: 'Dasbor', icon: Home, to: '/admin/dashboard' },
    { id: 'categories', label: 'Kategori', icon: Tag, count: categories.length, to: '/admin/categories' },
    { id: 'services', label: 'Layanan', icon: LayoutGrid, count: services.length, to: '/admin/services' },
    { id: 'stylists', label: 'Stylist', icon: Users, count: stylists.length, to: '/admin/stylists' },
    { id: 'articles', label: 'Artikel', icon: FileText, count: articles.length, to: '/admin/articles' },
    { id: 'users', label: 'Pengguna', icon: UserCog, count: users.length, to: '/admin/users' },
    { id: 'transactions', label: 'Transaksi', icon: CreditCard, count: transactions.length, to: '/admin/transactions' },
  ];

  // Determine active tab from URL
  const activeId = tabs.find(t => location.pathname.startsWith(t.to))?.id || 'categories';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '100vh' }} className="shell-grid">
      <aside style={{
        background: C.taupe, color: C.bg, padding: '30px 22px',
        position: 'sticky', top: 0, height: '100vh',
      }} className="shell-aside">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Flower2 size={20} style={{ color: C.rose }} />
          <span className="serif" style={{ fontSize: 18, fontWeight: 600 }}>Powder Room</span>
        </div>
        <div className="mono" style={{ fontSize: 10, opacity: 0.6, textTransform: 'uppercase', marginBottom: 30 }}>
          Panel Admin
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => navigate(t.to)} style={{
              background: activeId === t.id ? 'rgba(255,253,249,0.1)' : 'transparent',
              border: 'none', padding: '12px 14px', borderRadius: 12,
              display: 'flex', alignItems: 'center', gap: 12, color: C.bg,
              fontSize: 14, fontWeight: activeId === t.id ? 600 : 400,
              opacity: activeId === t.id ? 1 : 0.7, textAlign: 'left',
            }}>
              <t.icon size={17} />
              <span style={{ flex: 1 }}>{t.label}</span>
              {t.count !== undefined && (
  <span className="mono" style={{ fontSize: 11, opacity: 0.7 }}>{t.count}</span>
)}
            </button>
          ))}
        </nav>

        <div style={{ position: 'absolute', bottom: 30, left: 22, right: 22 }}>
          <div style={{ padding: 14, background: 'rgba(255,253,249,0.1)', borderRadius: 14, marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%', background: C.rose, color: C.taupe,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600,
              }}>A</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{user?.name}</div>
                <div style={{ fontSize: 11, opacity: 0.6 }}>Admin</div>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} style={{
            width: '100%', background: 'transparent',
            border: '1px solid rgba(255,253,249,0.2)', color: C.bg,
            padding: '10px', borderRadius: 10, fontSize: 13,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <LogOut size={14} /> Keluar
          </button>
        </div>
      </aside>

      <main style={{ padding: '32px 40px 60px' }} className="shell-main">
        <Outlet />
      </main>
    </div>
  );
}