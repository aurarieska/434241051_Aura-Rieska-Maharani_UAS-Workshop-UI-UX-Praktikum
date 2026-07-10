import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, ShoppingCart, Clock, Trash2,
} from 'lucide-react';
import { C } from '../../constants/theme';
import { iconBtn } from '../../constants/styles';
import { useApp } from '../../context/AppContext';
import { fmtIDR } from '../../utils/helpers';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useApp();
  const subtotal = cart.reduce((s, c) => s + c.service.price, 0);

  if (cart.length === 0) {
    return (
      <div>
        <div style={{ marginBottom: 30 }}>
          <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 8 }}>
            — Keranjangmu —
          </div>
          <h1 className="serif" style={{ fontSize: 'clamp(34px,4vw,48px)', margin: 0, color: C.taupe, fontWeight: 400, letterSpacing: '-0.02em' }}>
            Keranjang masih <span style={{ fontStyle: 'italic', color: C.roseDark }}>kosong</span>
          </h1>
        </div>
        <div style={{
          padding: '60px 30px', background: C.peachLight, borderRadius: 24,
          textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%', background: C.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
          }}>
            <ShoppingCart size={32} style={{ color: C.roseDark }} />
          </div>
          <h3 className="serif" style={{ fontSize: 26, margin: 0, color: C.taupe, fontWeight: 500 }}>
            Belum ada apa-apa di <span style={{ fontStyle: 'italic', color: C.roseDark }}>sini</span>
          </h3>
          <p style={{ fontSize: 14, color: C.taupeLight, marginTop: 10, maxWidth: 380 }}>
            Tambahkan beberapa layanan dan jam favoritmu, lalu selesaikan semua sekaligus dalam satu pembayaran.
          </p>
          <button onClick={() => navigate('/app/services')} style={{
            marginTop: 24, background: C.taupe, color: C.bg, border: 'none',
            padding: '14px 28px', borderRadius: 999, fontSize: 14, fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            Jelajahi Layanan <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate('/app/services')} style={{
        background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: 6,
        color: C.taupeLight, fontSize: 14, padding: 0, marginBottom: 20,
      }}>
        <ArrowLeft size={16} /> Lanjut menjelajah
      </button>

      <div style={{ marginBottom: 30 }}>
        <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 8 }}>
          — Keranjangmu —
        </div>
        <h1 className="serif" style={{ fontSize: 'clamp(34px,4vw,48px)', margin: 0, color: C.taupe, fontWeight: 400, letterSpacing: '-0.02em' }}>
          Tinjau <span style={{ fontStyle: 'italic', color: C.roseDark }}>pilihanmu</span>
        </h1>
        <p style={{ fontSize: 15, color: C.taupeLight, marginTop: 10 }}>
          {cart.length} layanan siap dipesan dalam satu pembayaran.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 30 }} className="hero-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {cart.map((c, i) => {
            const endHour = c.time + Math.floor(c.service.duration / 60);
            const endMin = c.service.duration % 60;
            return (
              <div key={c.cartId} className="fadeUp" style={{
                animationDelay: `${i * 0.05}s`, background: C.bg, border: `1px solid ${C.line}`,
                borderRadius: 18, padding: 16,
                display: 'grid', gridTemplateColumns: '72px 1fr auto',
                gap: 16, alignItems: 'center',
              }}>
                <div style={{ aspectRatio: '1/1', borderRadius: 12, overflow: 'hidden', background: C.peachLight }}>
                  <img src={c.service.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <h4 className="serif" style={{ margin: 0, fontSize: 18, color: C.taupe, fontWeight: 600 }}>{c.service.name}</h4>
                  <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 13, color: C.taupeLight, flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <img src={c.stylist.photo} alt="" style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }} />
                      {c.stylist.name}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Clock size={13} /> {String(c.time).padStart(2, '0')}:00 — {String(endHour).padStart(2, '0')}:{String(endMin).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="serif" style={{ fontSize: 16, color: C.roseDark, fontWeight: 600, marginTop: 8 }}>
                    {fmtIDR(c.service.price)}
                  </div>
                </div>
                <button onClick={() => removeFromCart(c.cartId)} style={{ ...iconBtn, color: '#8B3A3A' }} title="Hapus">
                  <Trash2 size={15} />
                </button>
              </div>
            );
          })}
        </div>

        <div>
          <div style={{ position: 'sticky', top: 20, background: C.peachLight, borderRadius: 20, padding: 24 }}>
            <h3 className="serif" style={{ fontSize: 20, margin: '0 0 18px', color: C.taupe, fontWeight: 600 }}>
              Ringkasan keranjang
            </h3>
            <div style={{ fontSize: 13, color: C.taupe, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {cart.map(c => (
                <div key={c.cartId} style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                  <span style={{ color: C.taupeLight, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {c.service.name}
                  </span>
                  <span style={{ whiteSpace: 'nowrap' }}>{fmtIDR(c.service.price)}</span>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.rose}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontSize: 13, color: C.taupeLight }}>Subtotal</span>
              <span className="serif" style={{ fontSize: 22, color: C.roseDark, fontWeight: 600 }}>{fmtIDR(subtotal)}</span>
            </div>
            <button onClick={() => navigate('/app/payment')} style={{
              width: '100%', marginTop: 20, padding: 16, background: C.taupe, color: C.bg, border: 'none',
              borderRadius: 999, fontSize: 14, fontWeight: 500,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            }}>
              Lanjut ke Pembayaran <ArrowRight size={16} />
            </button>
            <p style={{ fontSize: 11, color: C.taupeLight, textAlign: 'center', marginTop: 10 }}>
              Pajak layanan ditambahkan di tahap pembayaran.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}