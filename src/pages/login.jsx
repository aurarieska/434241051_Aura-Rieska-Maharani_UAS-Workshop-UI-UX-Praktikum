import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flower2, ArrowLeft, ArrowRight } from 'lucide-react';
import { C } from '../constants/theme';
import { useApp } from '../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const handleLogin = () => {
    const u = login(email, pwd);
    if (u) navigate(u.role === 'admin' ? '/admin' : '/app/services');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="login-grid">
      {/* LEFT */}
      <div style={{ background: C.peach, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 50 }} className="hide-mobile">
        <div onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, color: C.taupe }}>
          <Flower2 size={22} style={{ color: C.roseDark }} />
          <span className="serif" style={{ fontSize: 22, fontWeight: 600 }}>The Powder Room</span>
        </div>
        <div style={{ position: 'absolute', top: -150, right: -150, width: 500, height: 500, background: C.rose, borderRadius: '50%', filter: 'blur(80px)', opacity: 0.3 }} />
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, background: C.bg, borderRadius: '50%', filter: 'blur(60px)', opacity: 0.5 }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="serif" style={{ fontSize: 'clamp(36px,5vw,60px)', margin: 0, color: C.taupe, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            Selamat datang<br />
            <span style={{ fontStyle: 'italic', color: C.roseDark }}>kembali, cantik.</span>
          </h1>
          <p style={{ fontSize: 16, color: C.taupeLight, marginTop: 20, maxWidth: 360, lineHeight: 1.7 }}>
            Masuk untuk melanjutkan ritual kecantikanmu bersama kami. Para stylist sudah menanti.
          </p>
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', opacity: 0.6 }}>— Pilihan Hari Ini —</div>
          <p className="serif" style={{ fontSize: 22, margin: '6px 0', color: C.taupe, fontStyle: 'italic' }}>"Ketenangan juga sebentuk cahaya."</p>
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 30 }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <button onClick={() => navigate('/')} style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: 6, color: C.taupeLight, fontSize: 14, marginBottom: 30, padding: 0 }}>
            <ArrowLeft size={16} /> Kembali ke beranda
          </button>
          <h2 className="serif" style={{ fontSize: 36, margin: 0, color: C.taupe, fontWeight: 400 }}>Masuk</h2>
          <p style={{ fontSize: 14, color: C.taupeLight, marginTop: 8 }}>Isi data berikut untuk masuk ke akunmu.</p>

          <div style={{ marginTop: 36 }}>
            <label className="mono" style={{ fontSize: 12, color: C.taupeLight, display: 'block', marginBottom: 8 }}>EMAIL</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="kamu@email.com" style={{
              width: '100%', padding: '14px 16px', border: `1.5px solid ${C.line}`, borderRadius: 12,
              fontSize: 15, background: C.bg, color: C.taupe, outline: 'none',
            }} onFocus={(e) => e.target.style.borderColor = C.rose} onBlur={(e) => e.target.style.borderColor = C.line} />

            <label className="mono" style={{ fontSize: 12, color: C.taupeLight, display: 'block', marginBottom: 8, marginTop: 18 }}>KATA SANDI</label>
            <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="••••••••" style={{
                width: '100%', padding: '14px 16px', border: `1.5px solid ${C.line}`, borderRadius: 12,
                fontSize: 15, background: C.bg, color: C.taupe, outline: 'none',
              }} onFocus={(e) => e.target.style.borderColor = C.rose} onBlur={(e) => e.target.style.borderColor = C.line} />

            <div style={{ marginTop: 12, fontSize: 12, color: C.taupeLight, display: 'flex', justifyContent: 'space-between' }}>
              <label style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <input type="checkbox" /> Ingat saya
              </label>
              <a href="#" style={{ color: C.roseDark, textDecoration: 'none' }}>Lupa kata sandi?</a>
            </div>

            <button onClick={handleLogin} style={{
              width: '100%', marginTop: 28, padding: '16px', background: C.taupe, color: C.bg, border: 'none',
              borderRadius: 999, fontSize: 15, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            }}>Masuk <ArrowRight size={16} /></button>

            <p style={{ marginTop: 24, fontSize: 13, color: C.taupeLight, textAlign: 'center' }}>
              Baru di sini? <a href="#" style={{ color: C.roseDark, fontWeight: 500 }}>Buat akun</a>
            </p>

            <div style={{ marginTop: 24, padding: 14, background: C.peachLight, borderRadius: 12, fontSize: 12, color: C.taupeLight, lineHeight: 1.6 }}>
              <strong style={{ color: C.taupe }}>Akun demo:</strong><br />
              Admin: admin@gmail.com / admin123<br />
              Pelanggan: user@gmail.com / user123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}