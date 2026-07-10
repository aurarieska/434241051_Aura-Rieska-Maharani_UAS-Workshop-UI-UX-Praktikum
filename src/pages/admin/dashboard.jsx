import { useNavigate } from 'react-router-dom';
import {
  CreditCard, Users, LayoutGrid, Tag, FileText, UserCog,
  TrendingUp, Calendar, Star, ArrowRight, Clock, Sparkles, CheckCircle,
} from 'lucide-react';
import { C } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { fmtIDR } from '../../utils/helpers';

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    categories, services, stylists, articles, users, transactions,
  } = useApp();

  const completedTx = transactions.filter(t => t.status === 'completed');
  const totalRevenue = completedTx.reduce((s, t) => s + t.price, 0);
  const pendingCount = transactions.filter(t => t.status === 'pending').length;
  const avgRating = stylists.length
    ? (stylists.reduce((s, st) => s + st.rating, 0) / stylists.length).toFixed(1)
    : '0';

  const svcStatusCounts = { belum: 0, proses: 0, selesai: 0 };
  transactions.forEach(t => {
    const ss = t.serviceStatus || 'belum';
    svcStatusCounts[ss] = (svcStatusCounts[ss] || 0) + 1;
  });

  const recentTx = transactions.slice(0, 5);
  const methodLabel = { card: 'Kartu', ovo: 'OVO', gopay: 'GoPay', dana: 'DANA', transfer: 'Transfer' };

  const topStylists = [...stylists]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <>
      <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 8 }}>
        — Dasbor —
      </div>
      <h1 className="serif" style={{ fontSize: 36, margin: '0 0 8px', color: C.taupe, fontWeight: 400 }}>
        Selamat datang <span style={{ fontStyle: 'italic', color: C.roseDark }}>kembali</span>
      </h1>
      <p style={{ fontSize: 15, color: C.taupeLight, margin: '0 0 28px' }}>
        Berikut ringkasan terkini dari operasional salon.
      </p>

      {/* ===== STAT CARDS ROW 1 — Revenue & Counts ===== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
        <StatCard
          label="Total Pendapatan"
          value={fmtIDR(totalRevenue)}
          icon={TrendingUp}
          accent
        />
        <StatCard
          label="Transaksi Lunas"
          value={completedTx.length}
          icon={CreditCard}
        />
        <StatCard
          label="Transaksi Tertunda"
          value={pendingCount}
          icon={Clock}
        />
        <StatCard
          label="Rating Rata-rata"
          value={`${avgRating} / 5.0`}
          icon={Star}
        />
      </div>

      {/* ===== STAT CARDS ROW 2 — Entity Counts ===== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Kategori', value: categories.length, icon: Tag, to: '/admin/categories' },
          { label: 'Layanan', value: services.length, icon: LayoutGrid, to: '/admin/services' },
          { label: 'Stylist', value: stylists.length, icon: Users, to: '/admin/stylists' },
          { label: 'Artikel', value: articles.length, icon: FileText, to: '/admin/articles' },
          { label: 'Pengguna', value: users.length, icon: UserCog, to: '/admin/users' },
          { label: 'Transaksi', value: transactions.length, icon: CreditCard, to: '/admin/transactions' },
        ].map(s => (
          <button key={s.label} onClick={() => navigate(s.to)} style={{
            background: C.bg, border: `1px solid ${C.line}`, borderRadius: 16, padding: 16,
            display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', textAlign: 'left',
            transition: 'all 0.2s',
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%', background: C.peach,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <s.icon size={16} style={{ color: C.roseDark }} />
            </div>
            <div>
              <div className="mono" style={{ fontSize: 9, textTransform: 'uppercase', color: C.taupeLight }}>{s.label}</div>
              <div className="serif" style={{ fontSize: 20, color: C.taupe, fontWeight: 600, marginTop: 2 }}>{s.value}</div>
            </div>
          </button>
        ))}
      </div>

      {/* ===== TWO COLUMN: Status Pengerjaan + Top Stylist ===== */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }} className="hero-grid">

        {/* Status Pengerjaan */}
        <div style={{ background: C.peachLight, borderRadius: 20, padding: 22 }}>
          <h3 className="serif" style={{ fontSize: 18, margin: '0 0 16px', color: C.taupe, fontWeight: 600 }}>
            Status Pengerjaan
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Menunggu', value: svcStatusCounts.belum, bg: '#F0EAE4', fg: '#7A6B62', icon: Clock },
              { label: 'Dikerjakan', value: svcStatusCounts.proses, bg: '#FBF0DC', fg: '#9A7B3A', icon: Sparkles },
              { label: 'Selesai', value: svcStatusCounts.selesai, bg: '#E6F0E6', fg: '#4A7A4A', icon: CheckCircle },
            ].map(s => (
              <div key={s.label} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 14px', background: C.bg, borderRadius: 12,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', background: s.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <s.icon size={14} style={{ color: s.fg }} />
                  </div>
                  <span style={{ fontSize: 14, color: C.taupe }}>{s.label}</span>
                </div>
                <span className="serif" style={{ fontSize: 20, fontWeight: 600, color: s.fg }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Stylist */}
        <div style={{ background: C.peachLight, borderRadius: 20, padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 className="serif" style={{ fontSize: 18, margin: 0, color: C.taupe, fontWeight: 600 }}>
              Stylist Terbaik
            </h3>
            <button onClick={() => navigate('/admin/stylists')} style={{
              background: 'transparent', border: 'none', color: C.roseDark,
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              Lihat semua <ArrowRight size={12} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {topStylists.map((s, i) => (
              <div key={s.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', background: C.bg, borderRadius: 12,
              }}>
                <div className="mono" style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: i === 0 ? C.roseDark : C.peach,
                  color: i === 0 ? C.bg : C.taupe,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 600, flexShrink: 0,
                }}>{i + 1}</div>
                <img src={s.photo} alt="" style={{
                  width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0,
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="serif" style={{
                    fontSize: 14, color: C.taupe, fontWeight: 600,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: C.taupeLight }}>{s.specialty}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Star size={12} style={{ color: C.roseDark, fill: C.roseDark }} />
                  <span className="mono" style={{ fontSize: 12, color: C.taupe }}>{s.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== RECENT TRANSACTIONS ===== */}
      <div style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: 20, overflow: 'hidden' }}>
        <div style={{
          padding: '16px 22px', borderBottom: `1px solid ${C.line}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <h3 className="serif" style={{ fontSize: 18, margin: 0, color: C.taupe, fontWeight: 600 }}>
            Transaksi Terbaru
          </h3>
          <button onClick={() => navigate('/admin/transactions')} style={{
            background: 'transparent', border: 'none', color: C.roseDark,
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            Lihat semua <ArrowRight size={12} />
          </button>
        </div>

        {recentTx.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: C.taupeLight, fontSize: 14 }}>
            Belum ada transaksi.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
              <thead>
                <tr style={{ background: C.peachLight }}>
                  {['ID', 'Pelanggan', 'Layanan', 'Metode', 'Jumlah', 'Status'].map(h => (
                    <th key={h} className="mono" style={{
                      textAlign: h === 'Jumlah' ? 'right' : 'left',
                      padding: '12px 18px', fontSize: 10, textTransform: 'uppercase',
                      color: C.taupeLight, fontWeight: 500, whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentTx.map(t => {
                  const stMap = {
                    completed: { bg: '#E6F0E6', fg: '#4A7A4A', label: 'Lunas' },
                    pending: { bg: '#FBF0DC', fg: '#9A7B3A', label: 'Tertunda' },
                    cancelled: { bg: '#F5E1E1', fg: '#8B3A3A', label: 'Dibatalkan' },
                  };
                  const st = stMap[t.status] || stMap.pending;
                  return (
                    <tr key={t.id} style={{ borderTop: `1px solid ${C.line}` }}>
                      <td className="mono" style={{ padding: '12px 18px', fontSize: 12, color: C.taupe, whiteSpace: 'nowrap' }}>{t.id}</td>
                      <td style={{ padding: '12px 18px', fontSize: 13, color: C.taupe, fontWeight: 600, whiteSpace: 'nowrap' }}>{t.customerName}</td>
                      <td style={{ padding: '12px 18px', fontSize: 13, color: C.taupeLight, whiteSpace: 'nowrap' }}>{t.serviceName}</td>
                      <td style={{ padding: '12px 18px', fontSize: 12, whiteSpace: 'nowrap' }}>
                        <span style={{ background: C.peachLight, padding: '3px 10px', borderRadius: 999, color: C.taupe }}>
                          {methodLabel[t.paymentMethod] || t.paymentMethod}
                        </span>
                      </td>
                      <td className="serif" style={{ padding: '12px 18px', fontSize: 14, color: C.roseDark, fontWeight: 600, textAlign: 'right', whiteSpace: 'nowrap' }}>
                        {fmtIDR(t.price)}
                      </td>
                      <td style={{ padding: '12px 18px', whiteSpace: 'nowrap' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999,
                          background: st.bg, color: st.fg,
                        }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: st.fg }} />
                          {st.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

/* ===== Stat Card Component ===== */
function StatCard({ label, value, icon: Icon, accent }) {
  return (
    <div style={{
      background: accent ? C.taupe : C.peachLight,
      padding: 20, borderRadius: 18,
      color: accent ? C.bg : C.taupe,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', opacity: accent ? 0.7 : 0.6 }}>
          {label}
        </div>
        <Icon size={18} style={{ color: accent ? C.rose : C.roseDark }} />
      </div>
      <div className="serif" style={{ fontSize: 24, fontWeight: 600, marginTop: 12 }}>{value}</div>
    </div>
  );
}