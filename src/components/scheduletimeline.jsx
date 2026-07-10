import { C } from '../constants/theme';

export default function ScheduleTimeline({ hours, appointments, service, selectedHour, onSelect, isOverlap }) {
  return (
    <div style={{ background: C.peachLight, borderRadius: 18, padding: 24 }}>
      <div style={{ position: 'relative', overflowX: 'auto' }} className="scrollbar-hide">
        <div style={{ minWidth: 720, position: 'relative', display: 'flex' }}>
          {hours.map((h, i) => (
            <div key={h} style={{
              flex: 1, minWidth: 60,
              borderLeft: i === 0 ? 'none' : `1px solid ${C.line}`,
              padding: '6px 0', textAlign: 'center',
            }}>
              <div className="mono" style={{ fontSize: 11, color: C.taupeLight }}>
                {String(h).padStart(2, '0')}:00
              </div>
            </div>
          ))}
        </div>

        {/* Track */}
        <div style={{
          position: 'relative', minWidth: 720, marginTop: 8, height: 80,
          background: C.bg, borderRadius: 12, border: `1px solid ${C.line}`,
        }}>
          {/* Existing appointments */}
          {appointments.map(a => {
            const startPct = ((a.startHour - hours[0]) / hours.length) * 100;
            const widthPct = (a.duration / 60 / hours.length) * 100;
            return (
              <div key={a.id} style={{
                position: 'absolute', top: 8, bottom: 8,
                left: `${startPct}%`, width: `${widthPct}%`,
                background: a.fromCart
                  ? C.rose
                  : `repeating-linear-gradient(45deg, ${C.line}, ${C.line} 6px, ${C.peach} 6px, ${C.peach} 12px)`,
                borderRadius: 8, padding: 6, fontSize: 10,
                color: a.fromCart ? C.bg : C.taupe, overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="mono" style={{ fontSize: 9 }}>{a.fromCart ? 'Di Keranjang' : 'Terisi'}</span>
              </div>
            );
          })}

          {/* Selected slot */}
          {selectedHour !== null && service && (() => {
            const startPct = ((selectedHour - hours[0]) / hours.length) * 100;
            const widthPct = (service.duration / 60 / hours.length) * 100;
            return (
              <div style={{
                position: 'absolute', top: 4, bottom: 4,
                left: `${startPct}%`, width: `${widthPct}%`,
                background: C.taupe, borderRadius: 8, color: C.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 0 3px ${C.rose}, 0 6px 20px -5px rgba(74,59,50,0.4)`,
                zIndex: 2,
              }}>
                <span className="mono" style={{ fontSize: 11 }}>Jam Pilihanmu</span>
              </div>
            );
          })()}

          {/* Clickable hour buttons */}
          {hours.map((h, i) => {
            const blocked = isOverlap(h);
            const isSelected = selectedHour === h;
            return (
              <button key={h} onClick={() => onSelect(h)} style={{
                position: 'absolute', top: 0, bottom: 0,
                left: `${(i / hours.length) * 100}%`,
                width: `${100 / hours.length}%`,
                background: 'transparent', border: 'none',
                cursor: blocked ? 'not-allowed' : 'pointer',
                opacity: blocked && !isSelected ? 0.6 : 1, zIndex: 3,
              }} title={blocked ? 'Slot tidak tersedia' : `Pilih jam ${h}:00`} />
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ marginTop: 14, display: 'flex', gap: 18, fontSize: 12, color: C.taupeLight, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              width: 14, height: 14,
              background: `repeating-linear-gradient(45deg, ${C.line}, ${C.line} 3px, ${C.peach} 3px, ${C.peach} 6px)`,
              borderRadius: 4, display: 'block',
            }} />
            Terisi
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 14, height: 14, background: C.taupe, borderRadius: 4, display: 'block' }} />
            Jam pilihanmu
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 14, height: 14, background: C.bg, border: `1px solid ${C.line}`, borderRadius: 4, display: 'block' }} />
            Tersedia
          </div>
        </div>
      </div>
    </div>
  );
}