import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { C } from '../../constants/theme';
import { iconBtn, inputStyle } from '../../constants/styles';
import { useApp } from '../../context/AppContext';
import { fmtIDR, fmtDur } from '../../utils/helpers';
import { svcImg } from '../../constants/images';
import AdminInput from '../../components/admin/AdminInput';

export default function Services() {
  const { services, setServices, categories, setCategories, showToast } = useApp();
  const [form, setForm] = useState({ name: '', categoryId: '', duration: 60, price: 100000, image: '' });
  const [editId, setEditId] = useState(null);
  const [newCat, setNewCat] = useState('');
  const [filter, setFilter] = useState('all');

  const startEdit = (s) => {
    setForm({ name: s.name, categoryId: s.categoryId, duration: s.duration, price: s.price, image: s.image });
    setEditId(s.id);
  };
  const reset = () => {
    setForm({ name: '', categoryId: '', duration: 60, price: 100000, image: '' });
    setEditId(null);
  };

  const submit = () => {
    if (!form.name.trim() || !form.categoryId) {
      showToast('Nama dan kategori wajib diisi', 'error');
      return;
    }
    const data = {
      ...form,
      categoryId: Number(form.categoryId),
      duration: Number(form.duration),
      price: Number(form.price),
      image: form.image || svcImg('1560066984-138dadb4c035'),
    };
    if (editId) {
      setServices(services.map(s => s.id === editId ? { ...s, ...data } : s));
      showToast('Layanan berhasil diperbarui', 'success');
    } else {
      const id = Math.max(0, ...services.map(s => s.id)) + 1;
      setServices([...services, { id, ...data }]);
      showToast('Layanan berhasil ditambahkan', 'success');
    }
    reset();
  };

  const del = (id) => {
    setServices(services.filter(s => s.id !== id));
    showToast('Layanan berhasil dihapus', 'success');
  };

  const addCat = () => {
    if (!newCat.trim()) return;
    const id = Math.max(0, ...categories.map(c => c.id)) + 1;
    setCategories([...categories, { id, name: newCat, desc: '' }]);
    setForm({ ...form, categoryId: id });
    setNewCat('');
    showToast('Kategori berhasil ditambahkan', 'success');
  };

  const filtered = filter === 'all' ? services : services.filter(s => s.categoryId === Number(filter));

  return (
    <>
      <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 8 }}>— Dasbor —</div>
      <h1 className="serif" style={{ fontSize: 36, margin: '0 0 30px', color: C.taupe, fontWeight: 400 }}>
        Kelola <span style={{ fontStyle: 'italic', color: C.roseDark }}>layanan</span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 28 }} className="hero-grid">
        <div style={{ background: C.peachLight, padding: 24, borderRadius: 20, height: 'fit-content' }}>
          <h3 className="serif" style={{ fontSize: 20, margin: '0 0 18px', color: C.taupe, fontWeight: 600 }}>
            {editId ? 'Ubah layanan' : 'Tambah layanan baru'}
          </h3>
          <AdminInput label="Nama layanan" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="cth. Wolf Cut" />

          <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', color: C.taupeLight, marginBottom: 6, marginTop: 14 }}>Kategori</div>
          <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} style={inputStyle}>
            <option value="">Pilih kategori</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
            <input value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="Atau tambahkan kategori baru..." style={{ ...inputStyle, flex: 1, marginTop: 0 }} />
            <button onClick={addCat} style={{
              background: C.taupe, color: C.bg, border: 'none', padding: '0 14px',
              borderRadius: 10, fontSize: 12,
            }}>Tambah</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
            <AdminInput label="Durasi (menit)" type="number" value={form.duration} onChange={(v) => setForm({ ...form, duration: v })} />
            <AdminInput label="Harga (Rp)" type="number" value={form.price} onChange={(v) => setForm({ ...form, price: v })} />
          </div>
          <AdminInput label="URL Gambar (opsional)" value={form.image} onChange={(v) => setForm({ ...form, image: v })} placeholder="https://..." />

          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button onClick={submit} style={{
              flex: 1, padding: 12, background: C.taupe, color: C.bg, border: 'none',
              borderRadius: 999, fontSize: 13, fontWeight: 500,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <Plus size={14} /> {editId ? 'Simpan Perubahan' : 'Tambah Layanan'}
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
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap',
          }}>
            <h3 className="serif" style={{ fontSize: 18, margin: 0, color: C.taupe, fontWeight: 600 }}>Semua layanan</h3>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{
              ...inputStyle, marginTop: 0, padding: '8px 12px', fontSize: 12, width: 'auto',
            }}>
              <option value="all">Semua kategori</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div style={{ maxHeight: 600, overflowY: 'auto' }}>
            {filtered.map((s, i) => {
              const cat = categories.find(c => c.id === s.categoryId);
              return (
                <div key={s.id} style={{
                  padding: '14px 22px',
                  borderBottom: i < filtered.length - 1 ? `1px solid ${C.line}` : 'none',
                  display: 'flex', alignItems: 'center', gap: 14,
                }}>
                  <img src={s.image} alt="" style={{ width: 50, height: 50, borderRadius: 10, objectFit: 'cover' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="serif" style={{
                      fontSize: 15, color: C.taupe, fontWeight: 600,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: C.taupeLight, marginTop: 2 }}>
                      {cat?.name} · {fmtDur(s.duration)}
                    </div>
                  </div>
                  <div className="serif" style={{ fontSize: 15, color: C.roseDark, fontWeight: 600 }}>{fmtIDR(s.price)}</div>
                  <button onClick={() => startEdit(s)} style={iconBtn}><Edit2 size={14} /></button>
                  <button onClick={() => del(s.id)} style={{ ...iconBtn, color: '#8B3A3A' }}><Trash2 size={14} /></button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}