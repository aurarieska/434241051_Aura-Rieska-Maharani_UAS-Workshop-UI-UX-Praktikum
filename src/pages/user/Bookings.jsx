import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, Calendar, CreditCard, Sparkles, CheckCircle, Clock,
} from 'lucide-react';
import { C } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { fmtIDR } from '../../utils/helpers';

const svcStatusStyle = {
  belum: { bg: '#F0EAE4', fg: '#7A6B62', label: 'Menunggu jadwal', icon: Clock },
  proses: { bg: '#FBF0DC', fg: '#9A7B3A', label: 'Sedang dikerjakan', icon: Sparkles },
  selesai: { bg: '#E6F0E6', fg: '#4A7A4A', label: 'Selesai', icon: CheckCircle },
};

export default function Bookings() {
  const navigate = useNavigate();
  const { myBookings, transactions } = useApp();
  const [filter, setFilter] = useState('all');

  const statusOf = (b) => {
    const tx = transactions.find(t => t.id === b.txId);
    return (tx && tx.serviceStatus) || b.serviceStatus || 'belum';
  };

  const sorted = [...myBookings].sort((a, b) => b.startHour - a.startHour);
  const total = myBookings.reduce((sum, b) => sum + (b.price || 0), 0);

  const counts = { belum: 0, proses: 0, selesai: 0 };
  myBookings.forEach(b => { const s = statusOf(b); counts[s] = (counts[s] || 0) + 1; });

  const visible = sorted.filter(b => filter === 'all' || statusOf(b) === filter);

  const tabs = [
    { id: 'all', label: 'Semua', count: myBookings.length },
    { id: 'belum', label: 'Menunggu', count: counts.belum },
    { id: 'proses', label: 'Dikerjakan', count: counts.proses },
    { id: 'selesai', label: 'Selesai', count: counts.selesai },
  ];

  return (
    <div>
      <div style={{ marginBottom: 30 }}>
        <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 8 }}>
          — Kalendermu —
        </div>
        <h1 className="serif" style={{ fontSize: 'clamp(34px,4vw,48px)', margin: 0, color: C.taupe, fontWeight: 400, letterSpacing: '-0.02em' }}>
          Booking <span style={{ fontStyle: 'italic', color: C.roseDark }}>saya</span>
        </h1>
        <p style={{ fontSize: 15, color: C.taupeLight, marginTop: 10, maxWidth: 600 }}>
          Semua kunjunganmu dalam satu tempat — pantau perjalanan tiap layanan dari <em>menunggu</em> sampai <em>selesai</em>.
        </p>
      </div>

      {myBookings.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14, marginBottom: 30 }}>
          {[
            { label: 'Total booking', value: myBookings.length, icon: Calendar },
            { label: 'Total pengeluaran', value: fmtIDR(total), icon: CreditCard },
            { label: 'Sedang dikerjakan', value: counts.proses, icon: Sparkles },
            { label: 'Sudah selesai', value: counts.selesai, icon: CheckCircle },
          ].map(s => (
            <div key={s.label} style={{
              background: C.peachLight, padding: 18, borderRadius: 16,
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: '50%', background: C.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <s.icon size={18} style={{ color: C.roseDark }} />
              </div>
              <div>
                <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', color: C.taupeLight }}>{s.label}</div>
                <div className="serif" style={{ fontSize: 18, color: C.taupe, fontWeight: 600, marginTop: 2 }}>{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {myBookings.length > 0 && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, borderBottom: `1px solid ${C.line}`, flexWrap: 'wrap' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setFilter(t.id)} style={{
              background: 'transparent', border: 'none', padding: '10px 4px', marginRight: 18,
              borderBottom: filter === t.id ? `2px solid ${C.rose}` : '2px solid transparent',
              color: filter === t.id ? C.taupe : C.taupeLight, fontSize: 14,
              fontWeight: filter === t.id ? 600 : 400, marginBottom: -1,
            }}>
              {t.label} <span className="mono" style={{ fontSize: 11, marginLeft: 4, opacity: 0.7 }}>{t.count}</span>
            </button>
          ))}
        </div>
      )}

      {myBookings.length === 0 ? (
        <div style={{
          padding: '60px 30px', background: C.peachLight, borderRadius: 24,
          textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', background: C.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
          }}>
            <Calendar size={32} style={{ color: C.roseDark }} />
          </div>
          <h3 className="serif" style={{ fontSize: 26, margin: 0, color: C.taupe, fontWeight: 500 }}>
            Belum ada <span style={{ fontStyle: 'italic', color: C.roseDark }}>booking</span>
          </h3>
          <p style={{ fontSize: 14, color: C.taupeLight, marginTop: 10, maxWidth: 380 }}>
            Ritual kecantikanmu akan muncul di sini. Yuk, mulai jelajahi layanan dan temukan stylist favoritmu.
          </p>
          <button onClick={() => navigate('/app/services')} style={{
            marginTop: 24, background: C.taupe, color: C.bg, border: 'none',
            padding: '14px 28px', borderRadius: 999, fontSize: 14, fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            Jelajahi Layanan <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {visible.length === 0 && (
            <div style={{
              padding: '40px 30px', background: C.peachLight, borderRadius: 18,
              textAlign: 'center', color: C.taupeLight, fontSize: 14,
            }}>
              Belum ada booking dengan status ini.
            </div>
          )}
          {visible.map((b, i) => {
            const endHour = b.startHour + Math.floor(b.duration / 60);
            const endMin = b.duration % 60;
            const ss = statusOf(b);
            const st = svcStatusStyle[ss] || svcStatusStyle.belum;
            const StIcon = st.icon;
            return (
              <div key={b.id} className="fadeUp" style={{
                animationDelay: `${i * 0.05}s`,
                background: C.bg, border: `1px solid ${C.line}`, borderRadius: 18,
                padding: 18, display: 'grid', gridTemplateColumns: '90px 1fr auto',
                gap: 18, alignItems: 'center',
              }}>
                <div style={{ aspectRatio: '1/1', borderRadius: 14, overflow: 'hidden', background: C.peachLight }}>
                  <img src={b.serviceImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em',
                      background: st.bg, color: st.fg, padding: '3px 10px', borderRadius: 999,
                    }}>
                      <StIcon size={11} /> {st.label}
                    </span>
                    <span className="mono" style={{ fontSize: 11, color: C.taupeLight }}>
                      #{b.id.slice(-6).toUpperCase()}
                    </span>
                  </div>
                  <h4 className="serif" style={{ margin: 0, fontSize: 19, color: C.taupe, fontWeight: 600 }}>{b.serviceName}</h4>
                  <div style={{ display: 'flex', gap: 18, marginTop: 8, fontSize: 13, color: C.taupeLight, flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <img src={b.stylistPhoto} alt="" style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }} />
                      {b.stylistName}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Calendar size={13} /> Hari ini
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Clock size={13} /> {String(b.startHour).padStart(2, '0')}:00 — {String(endHour).padStart(2, '0')}:{String(endMin).padStart(2, '0')}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="serif" style={{ fontSize: 22, color: C.roseDark, fontWeight: 600 }}>{fmtIDR(b.price)}</div>
                  <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', color: C.taupeLight, marginTop: 4 }}>
                    Lunas · {b.paymentMethod}
                  </div>
                </div>
              </div>
            );
          })}

          <div style={{
            marginTop: 20, padding: 24, background: C.peach, borderRadius: 20,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14,
          }}>
            <div>
              <div className="serif" style={{ fontSize: 20, color: C.taupe, fontWeight: 600 }}>
                Siap untuk <span style={{ fontStyle: 'italic', color: C.roseDark }}>ritual</span> berikutnya?
              </div>
              <div style={{ fontSize: 13, color: C.taupe, opacity: 0.8, marginTop: 4 }}>
                Temukan layanan baru atau kunjungi lagi stylist favoritmu.
              </div>
            </div>
            <button onClick={() => navigate('/app/services')} style={{
              background: C.taupe, color: C.bg, border: 'none',
              padding: '13px 26px', borderRadius: 999, fontSize: 14, fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              Booking Lagi <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}