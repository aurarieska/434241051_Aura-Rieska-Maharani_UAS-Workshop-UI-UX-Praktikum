import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flower2, ArrowRight, Star, Sparkles, Scissors, Palette, Brush, Droplet, Eye,
  Award, Shield, Smile, Camera, Send, Mail, MapPin, Phone, Clock, Menu, X,
} from 'lucide-react';
import { C } from '../constants/theme';
import { IMG } from '../constants/images';
import { TESTIMONIALS, INIT_STYLISTS } from '../constants/seedData';
import { useApp } from '../context/AppContext';
import { fmtDate } from '../utils/helpers';

export default function Landing() {
  const navigate = useNavigate();
  const { user, articles } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [openArticle, setOpenArticle] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goLogin = () => navigate('/login');
  const goApp = () => navigate(user ? (user.role === 'admin' ? '/admin' : '/app/services') : '/login');

  const navLinks = [
    { label: 'Beranda', href: '#home' },
    { label: 'Layanan', href: '#services' },
    { label: 'Stylist', href: '#stylists' },
    { label: 'Jurnal', href: '#journal' },
    { label: 'Galeri', href: '#gallery' },
    { label: 'Kontak', href: '#contact' },
  ];
  const shownArticles = showAllArticles ? articles : articles.slice(0, 4);

  return (
    <div>
      {/* NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,253,249,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${C.line}` : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '18px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="serif" style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: C.taupe, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Flower2 size={22} style={{ color: C.rose }} />
            <span>The Powder Room</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="hide-mobile">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} style={{ color: C.taupe, textDecoration: 'none', fontSize: 14, fontWeight: 500, opacity: 0.85 }}>
                {l.label}
              </a>
            ))}
            <button onClick={goLogin} style={{ background: C.taupe, color: C.bg, border: 'none', padding: '10px 22px', borderRadius: 999, fontSize: 14, fontWeight: 500 }}>
              Masuk
            </button>
          </div>
          <button onClick={() => setMobile(!mobile)} className="show-mobile" style={{ background: 'transparent', border: 'none', display: 'none' }}>
            {mobile ? <X /> : <Menu />}
          </button>
        </div>
        {mobile && (
          <div className="show-mobile" style={{ display: 'none', flexDirection: 'column', background: C.bg, padding: '20px 28px', borderTop: `1px solid ${C.line}` }}>
            {navLinks.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMobile(false)} style={{ color: C.taupe, textDecoration: 'none', padding: '12px 0', fontSize: 15 }}>{l.label}</a>
            ))}
            <button onClick={goLogin} style={{ background: C.taupe, color: C.bg, border: 'none', padding: '12px', borderRadius: 999, marginTop: 12 }}>Masuk</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" style={{ paddingTop: 120, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 100, right: -100, width: 400, height: 400, background: C.peach, borderRadius: '50%', filter: 'blur(80px)', opacity: 0.5, zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: 0, left: -150, width: 350, height: 350, background: C.rose, borderRadius: '50%', filter: 'blur(100px)', opacity: 0.25, zIndex: 0 }} />

        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="hero-grid">
          <div className="fadeUp">
            <div className="mono" style={{ fontSize: 12, color: C.roseDark, textTransform: 'uppercase', marginBottom: 24 }}>◦ Sejak 2018 · Jakarta</div>
            <h1 className="serif" style={{ fontSize: 'clamp(40px, 6vw, 76px)', fontWeight: 400, lineHeight: 1.02, margin: 0, color: C.taupe, letterSpacing: '-0.03em' }}>
              Saat kecantikan<br />
              <span style={{ fontStyle: 'italic', fontWeight: 300, color: C.roseDark }}>menjadi</span> ritual.
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: C.taupeLight, marginTop: 28, maxWidth: 480 }}>
              Sebuah ruang tenang di jantung kota. Dari rambut bergaya editorial, nail art penuh karakter,
              hingga facial yang dirancang khusus — setiap detail kami siapkan agar kamu merasa istimewa menjadi diri sendiri.
            </p>
            <div style={{ marginTop: 40, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button onClick={goApp} style={{ background: C.taupe, color: C.bg, border: 'none', padding: '16px 32px', borderRadius: 999, fontSize: 15, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 30px -10px rgba(74,59,50,0.4)' }}>
                Buat Janji <ArrowRight size={16} />
              </button>
              <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} style={{ background: 'transparent', color: C.taupe, border: `1.5px solid ${C.taupe}`, padding: '15px 30px', borderRadius: 999, fontSize: 15, fontWeight: 500 }}>
                Jelajahi Layanan
              </button>
            </div>
            <div style={{ marginTop: 48, display: 'flex', gap: 36, flexWrap: 'wrap' }}>
              {[['12+', 'Stylist'], ['50+', 'Layanan'], ['4.9★', 'Rating']].map(([n, l]) => (
                <div key={l}>
                  <div className="serif" style={{ fontSize: 30, color: C.taupe, fontWeight: 500 }}>{n}</div>
                  <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.taupeLight, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="fadeUp delay-2" style={{ position: 'relative' }}>
            <div style={{ width: '100%', aspectRatio: '4/5', borderRadius: '50% 50% 4px 4px / 30% 30% 4px 4px', overflow: 'hidden', boxShadow: '0 30px 80px -30px rgba(74,59,50,0.4)', border: `6px solid ${C.bg}`, position: 'relative' }}>
              <img src={IMG.hero} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', bottom: 30, left: -20, background: C.bg, padding: '16px 20px', borderRadius: 16, boxShadow: '0 20px 40px -15px rgba(74,59,50,0.2)', display: 'flex', gap: 12, alignItems: 'center', border: `1px solid ${C.line}` }}>
              <div style={{ width: 44, height: 44, background: C.peach, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={20} style={{ color: C.roseDark }} />
              </div>
              <div>
                <div style={{ fontSize: 12, color: C.taupeLight }}>Minggu ini</div>
                <div className="serif" style={{ fontSize: 18, color: C.taupe, fontWeight: 600 }}>Spesial Glow Up</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section id="services" style={{ padding: '100px 28px', background: C.peachLight }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 12 }}>— Karya Kami —</div>
            <h2 className="serif" style={{ fontSize: 'clamp(32px,4vw,52px)', margin: 0, color: C.taupe, fontWeight: 400, letterSpacing: '-0.02em' }}>
              Layanan <span style={{ fontStyle: 'italic', color: C.roseDark }}>andalan</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {[
              { icon: Scissors, name: 'Potong Rambut', desc: 'Potongan yang dibentuk sesuai karaktermu' },
              { icon: Palette, name: 'Pewarnaan Rambut', desc: 'Warna yang dilukis dengan presisi' },
              { icon: Brush, name: 'Nail Art', desc: 'Kanvas mungil untuk ide-ide berani' },
              { icon: Flower2, name: 'Facial', desc: 'Perawatan kulit sebagai sebuah ritual' },
              { icon: Eye, name: 'Makeup', desc: 'Dari natural hingga statement' },
              { icon: Droplet, name: 'Perawatan Rambut', desc: 'Pemulihan menyeluruh' },
            ].map((s, i) => (
              <div key={s.name} className="card-hover fadeUp" style={{ background: C.bg, padding: 32, borderRadius: 20, textAlign: 'center', animationDelay: `${i * 0.08}s`, border: `1px solid ${C.line}` }}>
                <div style={{ width: 64, height: 64, background: C.peach, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <s.icon size={28} style={{ color: C.roseDark }} />
                </div>
                <h3 className="serif" style={{ fontSize: 22, margin: '0 0 8px', color: C.taupe, fontWeight: 500 }}>{s.name}</h3>
                <p style={{ fontSize: 14, color: C.taupeLight, margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section style={{ padding: '100px 28px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="hero-grid">
          <div>
            <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 12 }}>— Kenapa Kami —</div>
            <h2 className="serif" style={{ fontSize: 'clamp(32px,4vw,48px)', margin: 0, color: C.taupe, fontWeight: 400, lineHeight: 1.1 }}>
              Pengalaman yang<br /><span style={{ fontStyle: 'italic', color: C.roseDark }}>dirangkai</span> dengan hati.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: C.taupeLight, marginTop: 24 }}>
              Bertahun-tahun kami mengasah apa yang membuat sebuah salon benar-benar terasa seperti rumah.
              Setiap pilihan — dari produk hingga playlist — kami pertimbangkan dengan saksama.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {[
              { icon: Award, t: 'Stylist Profesional', d: 'Terlatih internasional, mengabdi di sini.' },
              { icon: Sparkles, t: 'Produk Premium', d: 'Brand mewah pilihan yang kami percaya.' },
              { icon: Shield, t: 'Higienis & Nyaman', d: 'Alat sekali pakai. Ritual yang bersih.' },
              { icon: Smile, t: 'Perawatan Personal', d: 'Ceritamu membentuk layananmu.' },
            ].map((w, i) => (
              <div key={w.t} className="fadeUp" style={{ animationDelay: `${i * 0.1}s`, padding: '24px 0', borderTop: `1px solid ${C.line}` }}>
                <w.icon size={24} style={{ color: C.roseDark, marginBottom: 12 }} />
                <h4 className="serif" style={{ fontSize: 18, margin: '0 0 6px', color: C.taupe, fontWeight: 600 }}>{w.t}</h4>
                <p style={{ fontSize: 13, color: C.taupeLight, margin: 0, lineHeight: 1.6 }}>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STYLISTS */}
      <section id="stylists" style={{ padding: '100px 28px', background: C.peachLight }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 50, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 12 }}>— Para Stylist Kami —</div>
              <h2 className="serif" style={{ fontSize: 'clamp(32px,4vw,48px)', margin: 0, color: C.taupe, fontWeight: 400 }}>
                Kenalan dengan <span style={{ fontStyle: 'italic', color: C.roseDark }}>tangan</span> di balik semuanya
              </h2>
            </div>
            <button onClick={goApp} style={{ background: 'transparent', color: C.taupe, border: `1.5px solid ${C.taupe}`, padding: '12px 26px', borderRadius: 999, fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
              Lihat Semua Stylist <ArrowRight size={14} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {INIT_STYLISTS.slice(0, 4).map((s, i) => (
              <div key={s.id} className="card-hover fadeUp" style={{ animationDelay: `${i * 0.1}s`, background: C.bg, borderRadius: 24, overflow: 'hidden', border: `1px solid ${C.line}` }}>
                <div style={{ aspectRatio: '4/5', overflow: 'hidden' }}>
                  <img src={s.photo} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 20 }}>
                  <h4 className="serif" style={{ margin: 0, fontSize: 19, color: C.taupe, fontWeight: 600 }}>{s.name}</h4>
                  <p style={{ margin: '4px 0 10px', fontSize: 13, color: C.taupeLight }}>{s.specialty}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Star size={14} style={{ color: C.roseDark, fill: C.roseDark }} />
                    <span className="mono" style={{ fontSize: 13, color: C.taupe }}>{s.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" style={{ padding: '100px 28px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 12 }}>— Galeri Karya —</div>
            <h2 className="serif" style={{ fontSize: 'clamp(32px,4vw,48px)', margin: 0, color: C.taupe, fontWeight: 400 }}>
              Karya yang <span style={{ fontStyle: 'italic', color: C.roseDark }}>bercerita</span>.
            </h2>
          </div>
          <div style={{ columnCount: 4, columnGap: 16 }} className="gallery-grid">
            {[IMG.galA, IMG.galB, IMG.galC, IMG.galD, IMG.galE, IMG.galF, IMG.galG, IMG.galH].map((src, i) => (
              <div key={i} style={{ breakInside: 'avoid', marginBottom: 16, borderRadius: 12, overflow: 'hidden' }}>
                <img src={src} alt="" style={{ width: '100%', display: 'block', transition: 'transform 0.6s' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNAL */}
      <section id="journal" style={{ padding: '100px 28px', background: C.peachLight }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 50, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 12 }}>— Jurnal Kami —</div>
              <h2 className="serif" style={{ fontSize: 'clamp(32px,4vw,48px)', margin: 0, color: C.taupe, fontWeight: 400 }}>
                Catatan tentang <span style={{ fontStyle: 'italic', color: C.roseDark }}>kecantikan</span> &amp; perawatan
              </h2>
            </div>
            <button onClick={() => setShowAllArticles(v => !v)} style={{ background: 'transparent', color: C.taupe, border: `1.5px solid ${C.taupe}`, padding: '12px 26px', borderRadius: 999, fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
              {showAllArticles ? 'Sembunyikan' : 'Tampilkan Semua'} <ArrowRight size={14} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 24 }}>
            {shownArticles.map((a, i) => (
              <div key={a.id} onClick={() => setOpenArticle(a)} className="card-hover fadeUp" style={{ animationDelay: `${i * 0.08}s`, background: C.bg, borderRadius: 20, overflow: 'hidden', border: `1px solid ${C.line}`, cursor: 'pointer' }}>
                <div style={{ aspectRatio: '16/10', overflow: 'hidden', background: C.peach }}>
                  <img src={a.image} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 20 }}>
                  <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', color: C.roseDark, marginBottom: 10 }}>
                    {a.tag} · {fmtDate(a.date)}
                  </div>
                  <h3 className="serif" style={{ fontSize: 19, margin: '0 0 8px', color: C.taupe, fontWeight: 600, lineHeight: 1.25 }}>{a.title}</h3>
                  <p style={{ fontSize: 13, color: C.taupeLight, margin: 0, lineHeight: 1.6 }}>{a.excerpt}</p>
                  <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.roseDark, fontWeight: 600 }}>
                    Baca selengkapnya <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '100px 28px', background: C.peach }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 12 }}>— Kata Mereka —</div>
            <h2 className="serif" style={{ fontSize: 'clamp(32px,4vw,48px)', margin: 0, color: C.taupe, fontWeight: 400 }}>
              Dari pelanggan <span style={{ fontStyle: 'italic', color: C.roseDark }}>setia</span> kami
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="fadeUp" style={{ animationDelay: `${i * 0.1}s`, background: C.bg, padding: 28, borderRadius: 20 }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={14} style={{ color: C.roseDark, fill: C.roseDark }} />)}
                </div>
                <p className="serif" style={{ fontSize: 17, lineHeight: 1.6, color: C.taupe, margin: '0 0 20px', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 14 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.taupe }}>{t.name}</div>
                  <div className="mono" style={{ fontSize: 11, color: C.taupeLight, marginTop: 2 }}>{t.service}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '120px 28px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, background: C.rose, borderRadius: '50%', filter: 'blur(120px)', opacity: 0.2 }} />
        <div style={{ position: 'relative' }}>
          <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 16 }}>— Hampir Sampai —</div>
          <h2 className="serif" style={{ fontSize: 'clamp(40px,6vw,80px)', margin: 0, color: C.taupe, fontWeight: 400, lineHeight: 1, letterSpacing: '-0.03em' }}>
            Siap untuk<br /><span style={{ fontStyle: 'italic', color: C.roseDark }}>glow up?</span>
          </h2>
          <p style={{ fontSize: 17, color: C.taupeLight, marginTop: 24, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
            Buat janji pertamamu hari ini — pelanggan baru kami sajikan konsultasi kulit kepala secara cuma-cuma.
          </p>
          <div style={{ marginTop: 40, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={goApp} style={{ background: C.taupe, color: C.bg, border: 'none', padding: '18px 36px', borderRadius: 999, fontSize: 15, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 10, boxShadow: '0 12px 35px -10px rgba(74,59,50,0.45)' }}>
              Buat Janji <ArrowRight size={16} />
            </button>
            <button onClick={goLogin} style={{ background: 'transparent', color: C.taupe, border: `1.5px solid ${C.taupe}`, padding: '17px 34px', borderRadius: 999, fontSize: 15, fontWeight: 500 }}>
              Masuk
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" style={{ background: C.taupe, color: C.bg, padding: '80px 28px 30px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40 }} className="footer-grid">
          <div>
            <div className="serif" style={{ fontSize: 26, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Flower2 size={26} style={{ color: C.rose }} /> The Powder Room
            </div>
            <p style={{ fontSize: 14, opacity: 0.7, lineHeight: 1.7, maxWidth: 360 }}>
              Sebuah ruang tenang di jantung Jakarta, tempat kecantikan menjelma ritual. Hadir sejak 2018.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 20 }}>
              {[Camera, Send, Mail].map((I, i) => (
                <a key={i} href="#" style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,253,249,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.bg }}>
                  <I size={16} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h5 className="mono" style={{ fontSize: 11, textTransform: 'uppercase', opacity: 0.6, margin: '0 0 16px' }}>Kunjungi</h5>
            <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.7, margin: 0, display: 'flex', gap: 8, alignItems: 'start' }}>
              <MapPin size={14} style={{ flexShrink: 0, marginTop: 4 }} />
              Jl. Senopati No. 24<br />Jakarta Selatan
            </p>
          </div>
          <div>
            <h5 className="mono" style={{ fontSize: 11, textTransform: 'uppercase', opacity: 0.6, margin: '0 0 16px' }}>Jam Buka</h5>
            <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.7, margin: 0, display: 'flex', gap: 8, alignItems: 'start' }}>
              <Clock size={14} style={{ flexShrink: 0, marginTop: 4 }} />
              Senin–Sabtu 09:00–20:00<br />Minggu 10:00–18:00
            </p>
          </div>
          <div>
            <h5 className="mono" style={{ fontSize: 11, textTransform: 'uppercase', opacity: 0.6, margin: '0 0 16px' }}>Kontak</h5>
            <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.7, margin: 0 }}>
              <span style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}><Phone size={14} /> +62 21 555 0123</span>
              <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Mail size={14} /> hello@powderroom.id</span>
            </p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,253,249,0.1)', marginTop: 50, paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 12, opacity: 0.5 }}>© 2026 The Powder Room. Hak cipta dilindungi.</span>
          <span className="mono" style={{ fontSize: 12, opacity: 0.5 }}>Dibuat dengan ♡ di Jakarta</span>
        </div>
      </footer>

      {/* ARTICLE MODAL */}
      {openArticle && (
        <div onClick={() => setOpenArticle(null)} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(74,59,50,0.45)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 20px', overflowY: 'auto', animation: 'fadeIn 0.3s ease-out' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: C.bg, borderRadius: 24, maxWidth: 720, width: '100%', overflow: 'hidden', boxShadow: '0 40px 100px -30px rgba(74,59,50,0.5)', position: 'relative' }}>
            <button onClick={() => setOpenArticle(null)} style={{ position: 'absolute', top: 16, right: 16, zIndex: 2, width: 38, height: 38, borderRadius: '50%', background: C.bg, border: `1px solid ${C.line}`, color: C.taupe, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={18} />
            </button>
            <div style={{ aspectRatio: '16/8', overflow: 'hidden', background: C.peach }}>
              <img src={openArticle.image} alt={openArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '32px 36px 40px' }}>
              <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 12 }}>
                {openArticle.tag} · {fmtDate(openArticle.date)} · oleh {openArticle.author}
              </div>
              <h2 className="serif" style={{ fontSize: 'clamp(28px,4vw,40px)', margin: 0, color: C.taupe, fontWeight: 400, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                {openArticle.title}
              </h2>
              <div style={{ marginTop: 22 }}>
                {openArticle.body.split('\n\n').map((para, i) => (
                  <p key={i} style={{ fontSize: 16, lineHeight: 1.8, color: C.taupeLight, margin: '0 0 18px' }}>{para}</p>
                ))}
              </div>
              <button onClick={goApp} style={{ marginTop: 10, background: C.taupe, color: C.bg, border: 'none', padding: '14px 28px', borderRadius: 999, fontSize: 14, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                Buat Janji Kunjungan <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}