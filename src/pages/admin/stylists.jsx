import { useState } from 'react';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';
import { C } from '../../constants/theme';
import { iconBtn } from '../../constants/styles';
import { useApp } from '../../context/AppContext';
import { fmtIDR } from '../../utils/helpers';
import { IMG } from '../../constants/images';
import AdminInput from '../../components/admin/AdminInput';

export default function Stylists() {
  const { stylists, setStylists, services, showToast } = useApp();
  const [form, setForm] = useState({ name: '', specialty: '', rating: 4.8, photo: '', bio: '', serviceIds: [] });
  const [editId, setEditId] = useState(null);

  const startEdit = (s) => {
    setForm({
      name: s.name, specialty: s.specialty, rating: s.rating,
      photo: s.photo, bio: s.bio, serviceIds: [...s.serviceIds],
    });
    setEditId(s.id);
  };
  const reset = () => {
    setForm({ name: '', specialty: '', rating: 4.8, photo: '', bio: '', serviceIds: [] });
    setEditId(null);
  };

  const submit = () => {
    if (!form.name.trim() || !form.specialty.trim()) {
      showToast('Nama dan spesialisasi wajib diisi', 'error');
      return;
    }
    const data = {
      ...form,
      rating: Number(form.rating),
      photo: form.photo || IMG.s1,
      portfolio: editId
        ? stylists.find(s => s.id === editId)?.portfolio || []
        : [IMG.galA, IMG.galB, IMG.galC, IMG.galD, IMG.galE, IMG.galF, IMG.galG, IMG.galH],
    };
    if (editId) {
      setStylists(stylists.map(s => s.id === editId ? { ...s, ...data } : s));
      showToast('Stylist berhasil diperbarui', 'success');
    } else {
      const id = Math.max(0, ...stylists.map(s => s.id)) + 1;
      setStylists([...stylists, { id, ...data }]);
      showToast('Stylist berhasil ditambahkan', 'success');
    }
    reset();
  };

  const del = (id) => {
    setStylists(stylists.filter(s => s.id !== id));
    showToast('Stylist berhasil dihapus', 'success');
  };

  const toggleService = (id) => {
    setForm({
      ...form,
      serviceIds: form.serviceIds.includes(id)
        ? form.serviceIds.filter(x => x !== id)
        : [...form.serviceIds, id],
    });
  };

  return (
    <>
      <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 8 }}>— Dasbor —</div>
      <h1 className="serif" style={{ fontSize: 36, margin: '0 0 30px', color: C.taupe, fontWeight: 400 }}>
        Kelola <span style={{ fontStyle: 'italic', color: C.roseDark }}>stylist</span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 28 }} className="hero-grid">
        <div style={{ background: C.peachLight, padding: 24, borderRadius: 20 }}>
          <h3 className="serif" style={{ fontSize: 20, margin: '0 0 18px', color: C.taupe, fontWeight: 600 }}>
            {editId ? 'Ubah stylist' : 'Tambah stylist baru'}
          </h3>
          <AdminInput label="Nama" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="cth. Aria Chen" />
          <AdminInput label="Spesialisasi" value={form.specialty} onChange={(v) => setForm({ ...form, specialty: v })} placeholder="cth. Color Specialist" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <AdminInput label="Rating" type="number" value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} />
            <AdminInput label="URL Foto" value={form.photo} onChange={(v) => setForm({ ...form, photo: v })} placeholder="https://..." />
          </div>
          <AdminInput label="Bio" value={form.bio} onChange={(v) => setForm({ ...form, bio: v })} placeholder="Bio singkat..." textarea />

          <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', color: C.taupeLight, marginBottom: 6, marginTop: 14 }}>
            Layanan yang dikuasai ({form.serviceIds.length})
          </div>
          <div style={{
            maxHeight: 220, overflowY: 'auto', background: C.bg, borderRadius: 12,
            padding: 10, border: `1px solid ${C.line}`,
          }}>
            {services.map(s => (
              <label key={s.id} style={{
                display: 'flex', gap: 8, alignItems: 'center', padding: '6px 8px',
                borderRadius: 8, fontSize: 12, cursor: 'pointer', color: C.taupe,
                background: form.serviceIds.includes(s.id) ? C.peachLight : 'transparent',
              }}>
                <input
                  type="checkbox"
                  checked={form.serviceIds.includes(s.id)}
                  onChange={() => toggleService(s.id)}
                  style={{ accentColor: C.rose }}
                />
                <span style={{ flex: 1 }}>{s.name}</span>
                <span className="mono" style={{ fontSize: 10, color: C.taupeLight }}>{fmtIDR(s.price)}</span>
              </label>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button onClick={submit} style={{
              flex: 1, padding: 12, background: C.taupe, color: C.bg, border: 'none',
              borderRadius: 999, fontSize: 13, fontWeight: 500,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <Plus size={14} /> {editId ? 'Simpan Perubahan' : 'Tambah Stylist'}
            </button>
            {editId && (
              <button onClick={reset} style={{
                padding: '12px 16px', background: 'transparent', color: C.taupe,
                border: `1px solid ${C.taupe}`, borderRadius: 999, fontSize: 13,
              }}>Batal</button>
            )}
          </div>
        </div>

        <div style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: 18 }}>
          <div style={{
            padding: '16px 22px', borderBottom: `1px solid ${C.line}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <h3 className="serif" style={{ fontSize: 18, margin: 0, color: C.taupe, fontWeight: 600 }}>Semua stylist</h3>
            <span className="mono" style={{ fontSize: 11, color: C.taupeLight }}>{stylists.length} total</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14, padding: 18 }}>
            {stylists.map(s => (
              <div key={s.id} style={{ border: `1px solid ${C.line}`, borderRadius: 14, overflow: 'hidden', background: C.bg }}>
                <div style={{ aspectRatio: '1/1', background: C.peachLight }}>
                  <img src={s.photo} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 12 }}>
                  <div className="serif" style={{ fontSize: 14, color: C.taupe, fontWeight: 600 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: C.taupeLight, marginTop: 2 }}>{s.specialty}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
                    <Star size={11} style={{ color: C.roseDark, fill: C.roseDark }} />
                    <span className="mono" style={{ fontSize: 11, color: C.taupe }}>{s.rating}</span>
                    <span className="mono" style={{ fontSize: 10, color: C.taupeLight, marginLeft: 'auto' }}>
                      {s.serviceIds.length} layanan
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                    <button onClick={() => startEdit(s)} style={{ flex: 1, ...iconBtn, padding: 6, justifyContent: 'center' }}>
                      <Edit2 size={12} />
                    </button>
                    <button onClick={() => del(s.id)} style={{ flex: 1, ...iconBtn, color: '#8B3A3A', padding: 6, justifyContent: 'center' }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}