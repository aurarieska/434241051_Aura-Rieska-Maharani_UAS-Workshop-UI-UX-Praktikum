import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, CreditCard, ShoppingBag, CheckCircle,
} from 'lucide-react';
import { C } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { fmtIDR } from '../../utils/helpers';

export default function Payment() {
  const navigate = useNavigate();
  const { cart, checkoutCart, showToast } = useApp();
  const [method, setMethod] = useState(null);
  const [step, setStep] = useState('select');
  const [paidItems, setPaidItems] = useState([]);
  const [paidTotal, setPaidTotal] = useState(0);

  if (cart.length === 0 && step !== 'success') {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <p>Keranjangmu masih kosong. Tambahkan booking terlebih dahulu.</p>
        <button onClick={() => navigate('/app/services')} style={{
          marginTop: 14, padding: '12px 22px', background: C.taupe, color: C.bg, border: 'none', borderRadius: 999,
        }}>Kembali ke Layanan</button>
      </div>
    );
  }

  const methods = [
    { id: 'card', label: 'Kartu Kredit / Debit', sub: 'Visa, Mastercard, JCB', icon: CreditCard },
    { id: 'ovo', label: 'OVO', sub: 'Dompet digital · Instan', icon: ShoppingBag },
    { id: 'gopay', label: 'GoPay', sub: 'Dompet digital · Instan', icon: ShoppingBag },
    { id: 'dana', label: 'DANA', sub: 'Dompet digital · Instan', icon: ShoppingBag },
    { id: 'transfer', label: 'Transfer Bank', sub: 'BCA, Mandiri, BNI', icon: CreditCard },
  ];

  const subtotal = cart.reduce((s, c) => s + c.service.price, 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  const handlePay = () => {
    if (!method) { showToast('Mohon pilih metode pembayaran', 'error'); return; }
    setPaidItems(cart);
    setPaidTotal(total);
    checkoutCart(method);
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '60px 20px' }}>
        <div style={{
          width: 100, height: 100, borderRadius: '50%', background: C.peach,
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28,
        }}>
          <CheckCircle size={48} style={{ color: C.roseDark }} />
        </div>
        <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 10 }}>
          — Pembayaran Berhasil —
        </div>
        <h1 className="serif" style={{ fontSize: 'clamp(36px,4vw,52px)', margin: 0, color: C.taupe, fontWeight: 400 }}>
          Bookingmu sudah <span style={{ fontStyle: 'italic', color: C.roseDark }}>terkonfirmasi</span>.
        </h1>
        <p style={{ fontSize: 16, color: C.taupeLight, marginTop: 16, maxWidth: 480 }}>
          Sampai jumpa, cantik. {paidItems.length} layanan sudah kami catat — detail kami kirim ke emailmu.
        </p>

        <div style={{
          marginTop: 36, padding: 24, background: C.peachLight, borderRadius: 18,
          maxWidth: 460, width: '100%', textAlign: 'left',
        }}>
          {paidItems.map((c, i) => (
            <div key={c.cartId} style={{
              display: 'flex', gap: 14, alignItems: 'center',
              paddingBottom: 14, marginBottom: 14,
              borderBottom: i < paidItems.length - 1 ? `1px solid ${C.rose}` : 'none',
            }}>
              <img src={c.service.image} style={{ width: 52, height: 52, borderRadius: 12, objectFit: 'cover' }} alt="" />
              <div style={{ flex: 1 }}>
                <div className="serif" style={{ fontSize: 16, color: C.taupe, fontWeight: 600 }}>{c.service.name}</div>
                <div style={{ fontSize: 12, color: C.taupeLight }}>
                  bersama {c.stylist.name} · {String(c.time).padStart(2, '0')}:00
                </div>
              </div>
              <div className="serif" style={{ fontSize: 14, color: C.roseDark, fontWeight: 600 }}>{fmtIDR(c.service.price)}</div>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${C.rose}`, paddingTop: 14, fontSize: 14, color: C.taupe, display: 'flex', justifyContent: 'space-between' }}>
            <span>Total dibayar</span>
            <span className="serif" style={{ fontWeight: 600, color: C.roseDark }}>{fmtIDR(paidTotal)}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => navigate('/app/bookings')} style={{
            background: 'transparent', color: C.taupe, border: `1.5px solid ${C.taupe}`,
            padding: '14px 28px', borderRadius: 999, fontSize: 14, fontWeight: 500,
          }}>Lihat Bookingku</button>
          <button onClick={() => navigate('/app/services')} style={{
            background: C.taupe, color: C.bg, border: 'none', padding: '15px 32px',
            borderRadius: 999, fontSize: 14, fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            Kembali ke Layanan <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate('/app/cart')} style={{
        background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: 6,
        color: C.taupeLight, fontSize: 14, padding: 0, marginBottom: 20,
      }}>
        <ArrowLeft size={16} /> Kembali ke keranjang
      </button>

      <div style={{ marginBottom: 30 }}>
        <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 8 }}>
          — Pembayaran —
        </div>
        <h1 className="serif" style={{ fontSize: 'clamp(30px,4vw,44px)', margin: 0, color: C.taupe, fontWeight: 400 }}>
          Konfirmasi <span style={{ fontStyle: 'italic', color: C.roseDark }}>bookingmu</span>
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 30 }} className="hero-grid">
        <div>
          <h3 className="serif" style={{ fontSize: 20, margin: '0 0 16px', color: C.taupe, fontWeight: 600 }}>Metode pembayaran</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {methods.map(m => (
              <label key={m.id} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: 16,
                border: method === m.id ? `2px solid ${C.rose}` : `1.5px solid ${C.line}`,
                borderRadius: 14, cursor: 'pointer',
                background: method === m.id ? C.peachLight : C.bg,
                transition: 'all 0.2s',
              }}>
                <input type="radio" name="method" checked={method === m.id} onChange={() => setMethod(m.id)} style={{ accentColor: C.rose }} />
                <div style={{ width: 42, height: 42, borderRadius: 10, background: C.peach, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <m.icon size={18} style={{ color: C.roseDark }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.taupe }}>{m.label}</div>
                  <div style={{ fontSize: 12, color: C.taupeLight, marginTop: 2 }}>{m.sub}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <div style={{ position: 'sticky', top: 20, background: C.peachLight, borderRadius: 20, padding: 24 }}>
            <h3 className="serif" style={{ fontSize: 20, margin: '0 0 18px', color: C.taupe, fontWeight: 600 }}>Ringkasan pesanan</h3>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16,
              paddingBottom: 16, borderBottom: `1px solid ${C.rose}`,
            }}>
              {cart.map(c => (
                <div key={c.cartId} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <img src={c.service.image} style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover' }} alt="" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="serif" style={{ fontSize: 14, color: C.taupe, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {c.service.name}
                    </div>
                    <div style={{ fontSize: 11, color: C.taupeLight }}>{c.stylist.name} · {String(c.time).padStart(2, '0')}:00</div>
                  </div>
                  <div style={{ fontSize: 13, color: C.taupe, whiteSpace: 'nowrap' }}>{fmtIDR(c.service.price)}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: C.taupe, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: C.taupeLight }}>Subtotal ({cart.length} layanan)</span>
                <span>{fmtIDR(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: C.taupeLight }}>Pajak layanan 10%</span>
                <span>{fmtIDR(tax)}</span>
              </div>
            </div>
            <div style={{
              marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.rose}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontSize: 13, color: C.taupeLight }}>Total</span>
              <span className="serif" style={{ fontSize: 26, color: C.roseDark, fontWeight: 600 }}>{fmtIDR(total)}</span>
            </div>
            <button onClick={handlePay} style={{
              width: '100%', marginTop: 20, padding: 16, background: C.taupe, color: C.bg, border: 'none',
              borderRadius: 999, fontSize: 14, fontWeight: 500,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            }}>
              Bayar {fmtIDR(total)} <ArrowRight size={16} />
            </button>
            <p style={{ fontSize: 11, color: C.taupeLight, textAlign: 'center', marginTop: 10 }}>
              Pembayaran aman dijamin The Powder Room · Demo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}