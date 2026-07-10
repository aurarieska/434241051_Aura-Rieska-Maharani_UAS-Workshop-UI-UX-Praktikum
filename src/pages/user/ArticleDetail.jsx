import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { C } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { fmtDate } from '../../utils/helpers';

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { articles } = useApp();

  const article = articles.find(a => a.id === Number(id));

  if (!article) {
    return (
      <div style={{ padding: 40 }}>
        <p>Artikel tidak ditemukan.</p>
        <button onClick={() => navigate('/app/articles')} style={{
          marginTop: 12, padding: '10px 20px', background: C.taupe, color: C.bg, border: 'none', borderRadius: 999,
        }}>Kembali ke jurnal</button>
      </div>
    );
  }

  const related = articles.filter(a => a.id !== article.id).slice(0, 3);

  return (
    <div>
      <button onClick={() => navigate('/app/articles')} style={{
        background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: 6,
        color: C.taupeLight, fontSize: 14, padding: 0, marginBottom: 20,
      }}>
        <ArrowLeft size={16} /> Kembali ke jurnal
      </button>

      <article style={{ maxWidth: 760, margin: '0 auto' }}>
        <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 14 }}>
          {article.tag} · {fmtDate(article.date)} · oleh {article.author}
        </div>
        <h1 className="serif" style={{ fontSize: 'clamp(32px,5vw,52px)', margin: 0, color: C.taupe, fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {article.title}
        </h1>
        <p style={{ fontSize: 18, color: C.taupeLight, marginTop: 16, lineHeight: 1.6, fontStyle: 'italic' }}>
          {article.excerpt}
        </p>

        <div style={{
          aspectRatio: '16/8', borderRadius: 20, overflow: 'hidden', background: C.peach,
          margin: '28px 0 32px', boxShadow: '0 20px 50px -25px rgba(74,59,50,0.3)',
        }}>
          <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div>
          {article.body.split('\n\n').map((para, i) => (
            <p key={i} style={{ fontSize: 17, lineHeight: 1.85, color: C.taupe, margin: '0 0 22px' }}>{para}</p>
          ))}
        </div>

        <div style={{
          marginTop: 24, padding: 24, background: C.peach, borderRadius: 20,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14,
        }}>
          <div>
            <div className="serif" style={{ fontSize: 20, color: C.taupe, fontWeight: 600 }}>
              Tertarik untuk <span style={{ fontStyle: 'italic', color: C.roseDark }}>booking</span>?
            </div>
            <div style={{ fontSize: 13, color: C.taupe, opacity: 0.8, marginTop: 4 }}>
              Wujudkan tampilan ini bersama salah satu stylist kami.
            </div>
          </div>
          <button onClick={() => navigate('/app/services')} style={{
            background: C.taupe, color: C.bg, border: 'none', padding: '13px 26px',
            borderRadius: 999, fontSize: 14, fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            Jelajahi Layanan <ArrowRight size={16} />
          </button>
        </div>
      </article>

      {related.length > 0 && (
        <section style={{ marginTop: 50 }}>
          <h2 className="serif" style={{ fontSize: 24, margin: '0 0 18px', color: C.taupe, fontWeight: 500 }}>
            Bacaan lainnya
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
            {related.map(a => (
              <div key={a.id} onClick={() => navigate(`/app/articles/${a.id}`)} className="card-hover" style={{
                background: C.bg, border: `1px solid ${C.line}`, borderRadius: 18,
                overflow: 'hidden', cursor: 'pointer',
              }}>
                <div style={{ aspectRatio: '16/10', overflow: 'hidden', background: C.peach }}>
                  <img src={a.image} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 16 }}>
                  <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', color: C.roseDark, marginBottom: 6 }}>{a.tag}</div>
                  <h4 className="serif" style={{ fontSize: 16, margin: 0, color: C.taupe, fontWeight: 600, lineHeight: 1.3 }}>{a.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}