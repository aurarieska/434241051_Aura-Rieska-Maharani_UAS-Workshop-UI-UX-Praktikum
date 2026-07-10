import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Star, Clock, ShoppingCart, X,
  ChevronLeft, ChevronRight, Calendar as CalIcon,
} from 'lucide-react';
import { C } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { fmtIDR, fmtDur } from '../../utils/helpers';
import ScheduleTimeline from '../../components/ScheduleTimeline';

const WORK_START = 9;
const WORK_END = 20;
const DAYS = ['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN'];

const monthMatrix = (date) => {
  const y = date.getFullYear();
  const m = date.getMonth();
  const first = new Date(y, m, 1);
  const last = new Date(y, m + 1, 0);
  const startMon = (first.getDay() + 6) % 7;
  const cells = [];
  for (let i = 0; i < startMon; i++) cells.push(null);
  for (let d = 1; d <= last.getDate(); d++) cells.push(new Date(y, m, d));
  return cells;
};

const sameDay = (a, b) =>
  a && b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const genDescription = (svc, cat) =>
  `${svc.name} eksklusif yang dikerjakan oleh para master stylist kami dengan ketelitian dan perhatian penuh. Cocok untukmu yang menghargai ${cat?.name?.toLowerCase() || 'kecantikan'} yang dirangkai dengan niat — menggunakan produk pilihan dan teknik yang diasah bertahun-tahun.`;

export default function ServiceDetail() {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const { services, stylists, categories, appointments, cart, addToCart, showToast } = useApp();

  const service = services.find(s => s.id === Number(serviceId));
  const category = categories.find(c => c.id === service?.categoryId);

  const availableStylists = service ? stylists.filter(s => s.serviceIds.includes(service.id)) : [];

  const [selectedStylistId, setSelectedStylistId] = useState(availableStylists[0]?.id || null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calMonth, setCalMonth] = useState(new Date());

  if (!service) {
    return (
      <div style={{ padding: 40 }}>
        <p style={{ color: C.taupeLight }}>Layanan tidak ditemukan.</p>
        <button onClick={() => navigate('/app/services')} style={{
          marginTop: 12, padding: '10px 22px', background: C.taupe, color: C.bg,
          border: 'none', borderRadius: 999, fontSize: 13,
        }}>Kembali ke layanan</button>
      </div>
    );
  }

  if (availableStylists.length === 0) {
    return (
      <div>
        <button onClick={() => navigate('/app/services')} style={{
          background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: 6,
          color: C.taupeLight, fontSize: 14, padding: 0, marginBottom: 20,
        }}>
          <ArrowLeft size={16} /> Kembali ke layanan
        </button>
        <h1 className="serif" style={{ fontSize: 32, margin: 0, color: C.taupe, fontWeight: 400 }}>
          {service.name}
        </h1>
        <div style={{
          marginTop: 24, padding: 40, background: C.peachLight, borderRadius: 18,
          textAlign: 'center', color: C.taupeLight,
        }}>
          Belum ada stylist yang tersedia untuk layanan ini.
        </div>
      </div>
    );
  }

  const selectedStylist = availableStylists.find(s => s.id === selectedStylistId) || availableStylists[0];
  const hours = Array.from({ length: WORK_END - WORK_START }, (_, i) => WORK_START + i);

  const blockingAppointments = [
    ...appointments.filter(a => a.stylistId === selectedStylist.id),
    ...cart
      .filter(c => c.stylist.id === selectedStylist.id)
      .map(c => ({
        id: c.cartId, stylistId: c.stylist.id, startHour: c.time,
        duration: c.service.duration, fromCart: true,
      })),
  ];

  const isOverlap = (start) => {
    const end = start + service.duration / 60;
    if (end > WORK_END) return true;
    return blockingAppointments.some(a => {
      const aEnd = a.startHour + a.duration / 60;
      return start < aEnd && a.startHour < end;
    });
  };

  const handleSelectHour = (h) => {
    if (isOverlap(h)) {
      showToast('Jam ini sudah terisi, silakan pilih jam lain', 'error');
      return;
    }
    setSelectedHour(h);
  };

  const handleStylistChange = (s) => {
    setSelectedStylistId(s.id);
    setSelectedHour(null);
  };

  const handleAddToCart = () => {
    if (selectedHour === null) return;
    const ok = addToCart({ service, stylist: selectedStylist, time: selectedHour });
    if (ok) navigate('/app/cart');
  };

  const cells = monthMatrix(calMonth);
  const monthLabel = calMonth.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  const goPrevMonth = () => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() - 1, 1));
  const goNextMonth = () => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 1));

  const today = new Date();
  const description = genDescription(service, category);
  const todayLabel = 'Hari ini, ' + today.toLocaleDateString('id-ID', { weekday: 'short', month: 'short', day: '2-digit' });

  return (
    <div>
      <button onClick={() => navigate('/app/services')} style={{
        background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: 6,
        color: C.taupeLight, fontSize: 14, padding: 0, marginBottom: 20,
      }}>
        <ArrowLeft size={16} /> Kembali ke layanan
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '0.72fr 1.28fr', gap: 20 }} className="hero-grid">

        {/* LEFT — ARTIST PICKER */}
        <aside style={{
          background: C.peachLight, borderRadius: 24, padding: 22, height: 'fit-content',
        }}>
          <h2 className="serif" style={{
            fontSize: 22, margin: 0, color: C.taupe, fontWeight: 500, letterSpacing: '-0.01em',
          }}>
            Pilih <span style={{ fontStyle: 'italic', color: C.roseDark }}>Stylist-mu</span>
          </h2>
          <p style={{ fontSize: 13, color: C.taupeLight, margin: '6px 0 18px', lineHeight: 1.6 }}>
            Para master stylist kami menyajikan visi dan presisi untuk setiap kunjunganmu.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {availableStylists.map(s => {
              const isSelected = s.id === selectedStylist.id;
              return (
                <button key={s.id} onClick={() => handleStylistChange(s)} style={{
                  background: isSelected ? C.bg : 'transparent',
                  border: isSelected ? `1.5px solid ${C.rose}` : '1.5px solid transparent',
                  borderRadius: 14, padding: 10,
                  display: 'flex', alignItems: 'center', gap: 12,
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                }}>
                  <img src={s.photo} alt={s.name} style={{
                    width: 44, height: 44, borderRadius: '50%', objectFit: 'cover',
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="serif" style={{
                      fontSize: 14, color: C.taupe, fontWeight: 600,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: C.taupeLight, marginTop: 2 }}>{s.specialty}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{
            marginTop: 18, padding: 16, background: C.peach, borderRadius: 16,
          }}>
            <div className="mono" style={{
              fontSize: 10, textTransform: 'uppercase', color: C.roseDark, marginBottom: 8,
            }}>Tentang {selectedStylist.name.split(' ')[0]}</div>
            <p style={{ fontSize: 12, color: C.taupe, lineHeight: 1.7, margin: '0 0 14px' }}>
              {selectedStylist.bio}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 14 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} style={{
                  color: i < Math.floor(selectedStylist.rating) ? C.roseDark : C.line,
                  fill: i < Math.floor(selectedStylist.rating) ? C.roseDark : C.line,
                }} />
              ))}
              <span className="mono" style={{ fontSize: 10, color: C.taupeLight, marginLeft: 6 }}>
                ({Math.round(selectedStylist.rating * 25)} Ulasan)
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {selectedStylist.portfolio.slice(0, 3).map((src, i) => (
                <div key={i} style={{
                  aspectRatio: '1/1', borderRadius: 8, overflow: 'hidden', background: C.peachLight,
                }}>
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* RIGHT — SERVICE / DATE / SCHEDULE */}
        <main>
          <div style={{
            background: C.bg, border: `1px solid ${C.line}`, borderRadius: 20, padding: 22,
            display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 22, marginBottom: 18,
          }}>
            <div>
              <div className="mono" style={{
                fontSize: 10, textTransform: 'uppercase', color: C.roseDark, marginBottom: 8,
              }}>{category?.name}</div>
              <h1 className="serif" style={{
                fontSize: 'clamp(28px,3.5vw,38px)', margin: 0, color: C.taupe,
                fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1,
              }}>{service.name}</h1>
              <div className="serif" style={{
                fontSize: 22, color: C.roseDark, fontWeight: 600, marginTop: 10,
              }}>{fmtIDR(service.price)}</div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 12, color: C.taupeLight, marginTop: 4,
              }}>
                <Clock size={12} /> Durasi {fmtDur(service.duration)}
              </div>
              <p style={{
                fontSize: 14, color: C.taupeLight, lineHeight: 1.7, margin: '14px 0 0',
              }}>{description}</p>
            </div>
            <div style={{
              aspectRatio: '1/1', borderRadius: 16, overflow: 'hidden', background: C.peachLight,
            }}>
              <img src={service.image} alt={service.name} style={{
                width: '100%', height: '100%', objectFit: 'cover',
              }} />
            </div>
          </div>

          <section style={{
            background: C.bg, border: `1px solid ${C.line}`, borderRadius: 20, padding: 22, marginBottom: 18,
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14,
            }}>
              <div>
                <h3 className="serif" style={{
                  fontSize: 20, margin: 0, color: C.taupe, fontWeight: 500,
                }}>Pilih Tanggal</h3>
                <div className="mono" style={{ fontSize: 11, color: C.taupeLight, marginTop: 2 }}>
                  {monthLabel}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={goPrevMonth} style={{
                  width: 30, height: 30, borderRadius: '50%', background: C.bg,
                  border: `1px solid ${C.line}`, color: C.taupe,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><ChevronLeft size={14} /></button>
                <button onClick={goNextMonth} style={{
                  width: 30, height: 30, borderRadius: '50%', background: C.bg,
                  border: `1px solid ${C.line}`, color: C.taupe,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><ChevronRight size={14} /></button>
              </div>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 6,
            }}>
              {DAYS.map(d => (
                <div key={d} className="mono" style={{
                  fontSize: 10, color: C.taupeLight, textAlign: 'center', padding: '6px 0',
                }}>{d}</div>
              ))}
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4,
            }}>
              {cells.map((cell, i) => {
                if (!cell) return <div key={i} />;
                const isSelected = sameDay(cell, selectedDate);
                const isToday = sameDay(cell, today);
                return (
                  <button key={i} onClick={() => setSelectedDate(cell)} style={{
                    aspectRatio: '1/1',
                    background: isSelected ? C.roseDark : 'transparent',
                    border: !isSelected && isToday ? `1.5px solid ${C.rose}` : '1.5px solid transparent',
                    borderRadius: '50%',
                    color: isSelected ? C.bg : isToday ? C.roseDark : C.taupe,
                    fontSize: 13, fontWeight: isSelected || isToday ? 600 : 400,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s',
                  }}>{cell.getDate()}</button>
                );
              })}
            </div>
          </section>

          <section style={{ marginBottom: 18 }}>
            <h3 className="serif" style={{
              fontSize: 20, margin: 0, color: C.taupe, fontWeight: 500,
            }}>Jadwal Hari Ini</h3>
            <p style={{ fontSize: 13, color: C.taupeLight, marginTop: 4, marginBottom: 14 }}>
              Jam operasional {WORK_START}:00 – {WORK_END}:00. Klik jam yang tersedia untuk memesan.
            </p>
            <ScheduleTimeline
              hours={hours}
              appointments={blockingAppointments}
              service={service}
              selectedHour={selectedHour}
              onSelect={handleSelectHour}
              isOverlap={isOverlap}
            />
          </section>

          {selectedHour !== null && (
            <div style={{
              background: C.peachLight, borderRadius: 20, padding: 20,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              flexWrap: 'wrap', gap: 16,
            }}>
              <div>
                <div className="mono" style={{
                  fontSize: 10, textTransform: 'uppercase', color: C.roseDark, marginBottom: 6,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <X size={11} /> Bookingmu
                </div>
                <div className="serif" style={{ fontSize: 18, color: C.taupe, fontWeight: 600 }}>
                  {service.name} bersama {selectedStylist.name}
                </div>
                <div style={{
                  display: 'flex', gap: 16, marginTop: 6, fontSize: 12, color: C.taupeLight,
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <CalIcon size={11} /> {todayLabel}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={11} /> {String(selectedHour).padStart(2, '0')}:00
                  </span>
                </div>
              </div>
              <button onClick={handleAddToCart} style={{
                background: C.taupe, color: C.bg, border: 'none', padding: '14px 24px',
                borderRadius: 999, fontSize: 14, fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: 10,
                boxShadow: '0 8px 24px -8px rgba(74,59,50,0.4)',
              }}>
                <ShoppingCart size={16} /> Tambah ke Keranjang — {fmtIDR(service.price)}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}