import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { C } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { fmtDate } from '../../utils/helpers';

export default function Articles() {
  const navigate = useNavigate();
  const { articles } = useApp();
  const [feature, ...rest] = articles;

  const open = (a) => navigate(`/app/articles/${a.id}`);

  return (
    <div>
      <div style={{ marginBottom: 30 }}>
        <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 8 }}>
          — Jurnal Kami —
        </div>
        <h1 className="serif" style={{ fontSize: 'clamp(34px,4vw,48px)', margin: 0, color: C.taupe, fontWeight: 400, letterSpacing: '-0.02em' }}>
          Cerita &amp; tips <span style={{ fontStyle: 'italic', color: C.roseDark }}>kecantikan</span>
        </h1>
        <p style={{ fontSize: 15, color: C.taupeLight, marginTop: 10, maxWidth: 600 }}>
          Catatan dari para stylist kami — seputar rambut, kulit, kuku, dan ritual di antaranya.
        </p>
      </div>

      {feature && (
        <div onClick={() => open(feature)} className="card-hover" style={{
          background: C.bg, border: `1px solid ${C.line}`, borderRadius: 24, overflow: 'hidden',
          cursor: 'pointer', display: 'grid', gridTemplateColumns: '1.1fr 1fr', marginBottom: 30,
        }}>
          <div style={{ minHeight: 260, background: C.peach }}>
            <img src={feature.image} alt={feature.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', color: C.roseDark, marginBottom: 12 }}>
              Pilihan · {feature.tag} · {fmtDate(feature.date)}
            </div>
            <h2 className="serif" style={{ fontSize: 'clamp(24px,3vw,32px)', margin: '0 0 12px', color: C.taupe, fontWeight: 500, lineHeight: 1.2 }}>
              {feature.title}
            </h2>
            <p style={{ fontSize: 15, color: C.taupeLight, margin: 0, lineHeight: 1.7 }}>{feature.excerpt}</p>
            <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.roseDark, fontWeight: 600 }}>
              Baca selengkapnya <ArrowRight size={14} />
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
        {rest.map((a, i) => (
          <div key={a.id} onClick={() => open(a)} className="card-hover fadeUp" style={{
            animationDelay: `${i * 0.06}s`, background: C.bg, border: `1px solid ${C.line}`,
            borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
          }}>
            <div style={{ aspectRatio: '16/10', overflow: 'hidden', background: C.peach }}>
              <img src={a.image} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: 18 }}>
              <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', color: C.roseDark, marginBottom: 8 }}>
                {a.tag} · {fmtDate(a.date)}
              </div>
              <h3 className="serif" style={{ fontSize: 18, margin: '0 0 6px', color: C.taupe, fontWeight: 600, lineHeight: 1.25 }}>{a.title}</h3>
              <p style={{ fontSize: 13, color: C.taupeLight, margin: 0, lineHeight: 1.6 }}>{a.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}