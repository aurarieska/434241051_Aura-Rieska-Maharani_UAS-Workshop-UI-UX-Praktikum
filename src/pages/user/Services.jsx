import { C } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { catIcon } from '../../utils/helpers';
import ServicesRow from '../../components/ServicesRow';

export default function Services() {
  const { services, categories } = useApp();

  return (
    <div>
      <div style={{ marginBottom: 30 }}>
        <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 8 }}>
          — Layanan Kami —
        </div>
        <h1 className="serif" style={{ fontSize: 'clamp(34px,4vw,48px)', margin: 0, color: C.taupe, fontWeight: 400, letterSpacing: '-0.02em' }}>
          Pilih <span style={{ fontStyle: 'italic', color: C.roseDark }}>ritualmu</span>
        </h1>
        <p style={{ fontSize: 15, color: C.taupeLight, marginTop: 10, maxWidth: 600 }}>
          Jelajahi koleksi layanan kami. Klik salah satu layanan untuk memilih stylist pilihanmu.
        </p>
      </div>

      {categories.map(cat => {
        const items = services.filter(s => s.categoryId === cat.id);
        if (items.length === 0) return null;
        const Icon = catIcon(cat.id);

        return (
          <section key={cat.id} style={{ marginBottom: 50 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, background: C.peach, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={18} style={{ color: C.roseDark }} />
              </div>
              <div>
                <h2 className="serif" style={{ margin: 0, fontSize: 24, color: C.taupe, fontWeight: 500 }}>{cat.name}</h2>
                <div className="mono" style={{ fontSize: 11, color: C.taupeLight, marginTop: 2 }}>
                  {items.length} layanan
                </div>
              </div>
            </div>
            <ServicesRow items={items} />
          </section>
        );
      })}
    </div>
  );
}