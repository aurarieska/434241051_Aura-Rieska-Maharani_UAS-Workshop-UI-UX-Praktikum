import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { C } from '../../constants/theme';
import { iconBtn } from '../../constants/styles';
import { useApp } from '../../context/AppContext';
import AdminInput from '../../components/admin/AdminInput';

export default function Categories() {
  const { categories, setCategories, services, showToast } = useApp();
  const [form, setForm] = useState({ name: '', desc: '' });
  const [editId, setEditId] = useState(null);

  const startEdit = (c) => { setForm({ name: c.name, desc: c.desc }); setEditId(c.id); };
  const reset = () => { setForm({ name: '', desc: '' }); setEditId(null); };

  const submit = () => {
    if (!form.name.trim()) { showToast('Nama kategori wajib diisi', 'error'); return; }
    if (editId) {
      setCategories(categories.map(c => c.id === editId ? { ...c, ...form } : c));
      showToast('Kategori berhasil diperbarui', 'success');
    } else {
      const id = Math.max(0, ...categories.map(c => c.id)) + 1;
      setCategories([...categories, { id, ...form }]);
      showToast('Kategori berhasil ditambahkan', 'success');
    }
    reset();
  };

  const del = (id) => {
    if (services.some(s => s.categoryId === id)) {
      showToast('Tidak bisa dihapus: kategori masih memiliki layanan', 'error');
      return;
    }
    setCategories(categories.filter(c => c.id !== id));
    showToast('Kategori berhasil dihapus', 'success');
  };

  return (
    <>
      <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 8 }}>— Dasbor —</div>
      <h1 className="serif" style={{ fontSize: 36, margin: '0 0 30px', color: C.taupe, fontWeight: 400 }}>
        Kelola <span style={{ fontStyle: 'italic', color: C.roseDark }}>kategori</span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 28 }} className="hero-grid">
        <div style={{ background: C.peachLight, padding: 24, borderRadius: 20, height: 'fit-content' }}>
          <h3 className="serif" style={{ fontSize: 20, margin: '0 0 18px', color: C.taupe, fontWeight: 600 }}>
            {editId ? 'Ubah kategori' : 'Tambah kategori baru'}
          </h3>
          <AdminInput label="Nama" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="cth. Pewarnaan Rambut" />
          <AdminInput label="Deskripsi" value={form.desc} onChange={(v) => setForm({ ...form, desc: v })} placeholder="Deskripsi singkat" textarea />
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button onClick={submit} style={{
              flex: 1, padding: 12, background: C.taupe, color: C.bg, border: 'none',
              borderRadius: 999, fontSize: 13, fontWeight: 500,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <Plus size={14} /> {editId ? 'Simpan Perubahan' : 'Tambah Kategori'}
            </button>
            {editId && (
              <button onClick={reset} style={{
                padding: '12px 16px', background: 'transparent', color: C.taupe,
                border: `1px solid ${C.taupe}`, borderRadius: 999, fontSize: 13,
              }}>Batal</button>
            )}
          </div>
        </div>

        <div style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: 18, overflow: 'hidden' }}>
          <div style={{
            padding: '16px 22px', borderBottom: `1px solid ${C.line}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <h3 className="serif" style={{ fontSize: 18, margin: 0, color: C.taupe, fontWeight: 600 }}>Semua kategori</h3>
            <span className="mono" style={{ fontSize: 11, color: C.taupeLight }}>{categories.length} total</span>
          </div>
          <div>
            {categories.map((c, i) => {
              const svcCount = services.filter(s => s.categoryId === c.id).length;
              return (
                <div key={c.id} style={{
                  padding: '16px 22px',
                  borderBottom: i < categories.length - 1 ? `1px solid ${C.line}` : 'none',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
                }}>
                  <div style={{ flex: 1 }}>
                    <div className="serif" style={{ fontSize: 16, color: C.taupe, fontWeight: 600 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: C.taupeLight, marginTop: 2 }}>{c.desc}</div>
                  </div>
                  <span className="mono" style={{
                    fontSize: 11, color: C.roseDark, background: C.peachLight,
                    padding: '4px 10px', borderRadius: 999,
                  }}>{svcCount} layanan</span>
                  <button onClick={() => startEdit(c)} style={iconBtn}><Edit2 size={14} /></button>
                  <button onClick={() => del(c.id)} style={{ ...iconBtn, color: '#8B3A3A' }}><Trash2 size={14} /></button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}