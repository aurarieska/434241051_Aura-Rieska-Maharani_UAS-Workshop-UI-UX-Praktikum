import { useState } from 'react';
import {
  CreditCard, CheckCircle, Clock, Award, ChevronRight,
} from 'lucide-react';
import { C } from '../../constants/theme';
import { inputStyle } from '../../constants/styles';
import { useApp } from '../../context/AppContext';
import { fmtIDR } from '../../utils/helpers';

const methodLabel = {
  card: 'Kartu', ovo: 'OVO', gopay: 'GoPay', dana: 'DANA', transfer: 'Transfer',
};

const statusStyle = {
  completed: { bg: '#E6F0E6', fg: '#4A7A4A', label: 'Lunas' },
  pending: { bg: '#FBF0DC', fg: '#9A7B3A', label: 'Tertunda' },
  cancelled: { bg: '#F5E1E1', fg: '#8B3A3A', label: 'Dibatalkan' },
};

const svcStatusStyle = {
  belum: { bg: '#F0EAE4', fg: '#7A6B62' },
  proses: { bg: '#FBF0DC', fg: '#9A7B3A' },
  selesai: { bg: '#E6F0E6', fg: '#4A7A4A' },
};

export default function Transactions() {
  const { transactions, setTransactions, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const changeServiceStatus = (id, serviceStatus) => {
    setTransactions(transactions.map(t => t.id === id ? { ...t, serviceStatus } : t));
    showToast('Status layanan berhasil diperbarui', 'success');
  };

  const filtered = transactions.filter(t => {
    const matchSearch = (t.customerName + t.serviceName + t.stylistName + t.id)
      .toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = transactions
    .filter(t => t.status === 'completed')
    .reduce((s, t) => s + t.price, 0);
  const completedCount = transactions.filter(t => t.status === 'completed').length;
  const pendingCount = transactions.filter(t => t.status === 'pending').length;
  const avgValue = completedCount ? Math.round(totalRevenue / completedCount) : 0;

  const statusFilters = [
    { id: 'all', label: 'Semua' },
    { id: 'completed', label: 'Lunas' },
    { id: 'pending', label: 'Tertunda' },
    { id: 'cancelled', label: 'Dibatalkan' },
  ];

  return (
    <>
      <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 8 }}>— Dasbor —</div>
      <h1 className="serif" style={{ fontSize: 36, margin: '0 0 30px', color: C.taupe, fontWeight: 400 }}>
        Riwayat <span style={{ fontStyle: 'italic', color: C.roseDark }}>transaksi</span>
      </h1>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Total pendapatan', value: fmtIDR(totalRevenue), icon: CreditCard, accent: true },
          { label: 'Lunas', value: completedCount, icon: CheckCircle },
          { label: 'Tertunda', value: pendingCount, icon: Clock },
          { label: 'Rata-rata transaksi', value: fmtIDR(avgValue), icon: Award },
        ].map(s => (
          <div key={s.label} style={{
            background: s.accent ? C.taupe : C.peachLight, padding: 20, borderRadius: 18,
            color: s.accent ? C.bg : C.taupe,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', opacity: s.accent ? 0.7 : 0.6 }}>{s.label}</div>
              <s.icon size={18} style={{ color: s.accent ? C.rose : C.roseDark }} />
            </div>
            <div className="serif" style={{ fontSize: 24, fontWeight: 600, marginTop: 12 }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari pelanggan, layanan, atau ID..."
            style={{ ...inputStyle, marginTop: 0, paddingLeft: 16 }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {statusFilters.map(s => (
            <button key={s.id} onClick={() => setStatusFilter(s.id)} style={{
              padding: '9px 16px', borderRadius: 999, fontSize: 12,
              border: `1px solid ${statusFilter === s.id ? C.rose : C.line}`,
              background: statusFilter === s.id ? C.peachLight : C.bg,
              color: statusFilter === s.id ? C.taupe : C.taupeLight,
              fontWeight: statusFilter === s.id ? 600 : 400,
            }}>{s.label}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: 18, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
            <thead>
              <tr style={{ background: C.peachLight }}>
                {['ID Transaksi', 'Pelanggan', 'Layanan', 'Stylist', 'Tanggal & Jam', 'Metode', 'Jumlah', 'Pembayaran', 'Status Layanan'].map((h, i) => (
                  <th key={h} className="mono" style={{
                    textAlign: i === 6 ? 'right' : 'left', padding: '14px 18px',
                    fontSize: 10, textTransform: 'uppercase', color: C.taupeLight,
                    fontWeight: 500, letterSpacing: '0.05em', whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ padding: '40px', textAlign: 'center', color: C.taupeLight, fontSize: 14 }}>
                    Belum ada transaksi yang cocok.
                  </td>
                </tr>
              ) : filtered.map(t => {
                const stStatus = statusStyle[t.status] || statusStyle.pending;
                const ss = t.serviceStatus || 'belum';
                const stSvc = svcStatusStyle[ss] || svcStatusStyle.belum;
                return (
                  <tr key={t.id} style={{ borderTop: `1px solid ${C.line}` }}>
                    <td className="mono" style={{ padding: '14px 18px', fontSize: 12, color: C.taupe, whiteSpace: 'nowrap' }}>{t.id}</td>
                    <td style={{ padding: '14px 18px', fontSize: 13, color: C.taupe, fontWeight: 600, whiteSpace: 'nowrap' }}>{t.customerName}</td>
                    <td style={{ padding: '14px 18px', fontSize: 13, color: C.taupe, whiteSpace: 'nowrap' }}>{t.serviceName}</td>
                    <td style={{ padding: '14px 18px', fontSize: 13, color: C.taupeLight, whiteSpace: 'nowrap' }}>{t.stylistName}</td>
                    <td style={{ padding: '14px 18px', fontSize: 12, color: C.taupeLight, whiteSpace: 'nowrap' }}>
                      {t.date} · {String(t.time).padStart(2, '0')}:00
                    </td>
                    <td style={{ padding: '14px 18px', fontSize: 12, color: C.taupe, whiteSpace: 'nowrap' }}>
                      <span style={{ background: C.peachLight, padding: '4px 10px', borderRadius: 999 }}>
                        {methodLabel[t.paymentMethod] || t.paymentMethod}
                      </span>
                    </td>
                    <td className="serif" style={{
                      padding: '14px 18px', fontSize: 15, color: C.roseDark,
                      fontWeight: 600, textAlign: 'right', whiteSpace: 'nowrap',
                    }}>{fmtIDR(t.price)}</td>
                    <td style={{ padding: '14px 18px', whiteSpace: 'nowrap' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontSize: 11, fontWeight: 600,
                        padding: '4px 12px', borderRadius: 999,
                        background: stStatus.bg, color: stStatus.fg,
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: stStatus.fg }} />
                        {stStatus.label}
                      </span>
                    </td>
                    <td style={{ padding: '14px 18px', whiteSpace: 'nowrap' }}>
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <select
                          value={ss}
                          onChange={(e) => changeServiceStatus(t.id, e.target.value)}
                          style={{
                            appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none',
                            fontSize: 11, fontWeight: 600, padding: '5px 28px 5px 24px', borderRadius: 999,
                            border: 'none', cursor: 'pointer', outline: 'none',
                            background: stSvc.bg, color: stSvc.fg,
                          }}
                        >
                          <option value="belum">Menunggu</option>
                          <option value="proses">Dikerjakan</option>
                          <option value="selesai">Selesai</option>
                        </select>
                        <span style={{
                          position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)',
                          width: 6, height: 6, borderRadius: '50%', pointerEvents: 'none', background: stSvc.fg,
                        }} />
                        <ChevronRight size={12} style={{
                          position: 'absolute', right: 9, top: '50%',
                          transform: 'translateY(-50%) rotate(90deg)',
                          pointerEvents: 'none', color: stSvc.fg,
                        }} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <p style={{ fontSize: 12, color: C.taupeLight, marginTop: 14, textAlign: 'center' }}>
        Menampilkan {filtered.length} dari {transactions.length} transaksi · Booking baru otomatis muncul di sini
      </p>
    </>
  );
}