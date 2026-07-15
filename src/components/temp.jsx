import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { C } from '../constants/theme';
import { fmtIDR, fmtDur } from '../utils/helpers';

export default function ServicesRow({ items }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const w = scrollRef.current.firstChild?.offsetWidth || 220;
      scrollRef.current.scrollBy({ left: dir * (w + 16), behavior: 'smooth' });
    }
  };

  const pickService = (s) => navigate(`/app/services/${s.id}`);

  return (
    <div style={{ position: 'relative' }}>
      <div ref={scrollRef} className="scrollbar-hide" style={{
        display: 'grid', gridAutoFlow: 'column',
        gridAutoColumns: 'calc((100% - 80px) / 6)',
        gap: 16, overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: 4,
      }}>
        {items.map(s => (
          <div key={s.id} onClick={() => pickService(s)} className="card-hover" style={{
            scrollSnapAlign: 'start', background: C.bg, border: `1px solid ${C.line}`,
            borderRadius: 18, overflow: 'hidden', cursor: 'pointer',
          }}>
            <div style={{ aspectRatio: '1/1', overflow: 'hidden', background: C.peachLight }}>
              <img src={s.image} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: 14 }}>
              <h4 className="serif" style={{ margin: 0, fontSize: 16, color: C.taupe, fontWeight: 600, lineHeight: 1.25 }}>{s.name}</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, fontSize: 12, color: C.taupeLight }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={11} /> {fmtDur(s.duration)}
                </span>
              </div>
              <div className="serif" style={{ marginTop: 8, fontSize: 16, color: C.roseDark, fontWeight: 600 }}>{fmtIDR(s.price)}</div>
            </div>
          </div>
        ))}
      </div>
      {items.length > 6 && (
        <>
          <button onClick={() => scroll(-1)} style={{
            position: 'absolute', left: -16, top: '40%', transform: 'translateY(-50%)',
            width: 36, height: 36, borderRadius: '50%', background: C.bg, border: `1px solid ${C.line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 20px -8px rgba(74,59,50,0.3)', color: C.taupe,
          }}><ChevronLeft size={18} /></button>
          <button onClick={() => scroll(1)} style={{
            position: 'absolute', right: -16, top: '40%', transform: 'translateY(-50%)',
            width: 36, height: 36, borderRadius: '50%', background: C.bg, border: `1px solid ${C.line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 20px -8px rgba(74,59,50,0.3)', color: C.taupe,
          }}><ChevronRight size={18} /></button>
        </>
      )}
    </div>
  );
}