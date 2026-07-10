import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { C } from '../../constants/theme';
import { iconBtn } from '../../constants/styles';
import { useApp } from '../../context/AppContext';
import { fmtDate } from '../../utils/helpers';
import AdminInput from '../../components/admin/AdminInput';

const blank = { title: '', image: '', tag: '', author: '', excerpt: '', body: '' };

export default function Articles() {
  const { articles, setArticles, showToast } = useApp();
  const [form, setForm] = useState(blank);
  const [editId, setEditId] = useState(null);

  const startEdit = (a) => {
    setForm({
      title: a.title, image: a.image, tag: a.tag || '',
      author: a.author || '', excerpt: a.excerpt || '', body: a.body || '',
    });
    setEditId(a.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const reset = () => { setForm(blank); setEditId(null); };

  const submit = () => {
    if (!form.title.trim() || !form.body.trim()) {
      showToast('Judul dan isi artikel wajib diisi', 'error');
      return;
    }
    const data = {
      ...form,
      image: form.image || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
      tag: form.tag || 'Beauty',
      author: form.author || 'The Powder Room',
      excerpt: form.excerpt || form.body.slice(0, 120),
    };
    if (editId) {
      setArticles(articles.map(a => a.id === editId ? { ...a, ...data } : a));
      showToast('Artikel berhasil diperbarui', 'success');
    } else {
      const id = Math.max(0, ...articles.map(a => a.id)) + 1;
      setArticles([{ id, date: new Date().toISOString().slice(0, 10), ...data }, ...articles]);
      showToast('Artikel berhasil dipublikasikan', 'success');
    }
    reset();
  };

  const del = (id) => {
    setArticles(articles.filter(a => a.id !== id));
    showToast('Artikel berhasil dihapus', 'success');
  };

  return (
    <>
      <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 8 }}>— Dasbor —</div>
      <h1 className="serif" style={{ fontSize: 36, margin: '0 0 30px', color: C.taupe, fontWeight: 400 }}>
        Kelola <span style={{ fontStyle: 'italic', color: C.roseDark }}>artikel</span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 28 }} className="hero-grid">
        <div style={{ background: C.peachLight, padding: 24, borderRadius: 20, height: 'fit-content' }}>
          <h3 className="serif" style={{ fontSize: 20, margin: '0 0 18px', color: C.taupe, fontWeight: 600 }}>
            {editId ? 'Ubah artikel' : 'Artikel baru'}
          </h3>
          <AdminInput label="Judul" value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="cth. Ritual Slow Beauty" />
          <AdminInput label="URL Foto" value={form.image} onChange={(v) => setForm({ ...form, image: v })} placeholder="https://..." />
          {form.image && (
            <div style={{ marginTop: 10, aspectRatio: '16/9', borderRadius: 12, overflow: 'hidden', background: C.peach }}>
              <img src={form.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <AdminInput label="Tag" value={form.tag} onChange={(v) => setForm({ ...form, tag: v })} placeholder="cth. Skincare" />
            <AdminInput label="Penulis" value={form.author} onChange={(v) => setForm({ ...form, author: v })} placeholder="cth. Aria Chen" />
          </div>
          <AdminInput label="Kutipan (opsional)" value={form.excerpt} onChange={(v) => setForm({ ...form, excerpt: v })} placeholder="Teaser singkat..." textarea />
          <AdminInput label="Isi artikel" value={form.body} onChange={(v) => setForm({ ...form, body: v })} placeholder="Tulis artikel lengkap. Pisahkan paragraf dengan baris kosong." textarea />

          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button onClick={submit} style={{
              flex: 1, padding: 12, background: C.taupe, color: C.bg, border: 'none',
              borderRadius: 999, fontSize: 13, fontWeight: 500,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <Plus size={14} /> {editId ? 'Simpan Perubahan' : 'Publikasikan'}
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
            <h3 className="serif" style={{ fontSize: 18, margin: 0, color: C.taupe, fontWeight: 600 }}>Semua artikel</h3>
            <span className="mono" style={{ fontSize: 11, color: C.taupeLight }}>{articles.length} total</span>
          </div>
          <div>
            {articles.map((a, i) => (
              <div key={a.id} style={{
                padding: '14px 22px',
                borderBottom: i < articles.length - 1 ? `1px solid ${C.line}` : 'none',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <div style={{
                  width: 64, height: 44, borderRadius: 8, overflow: 'hidden',
                  background: C.peachLight, flexShrink: 0,
                }}>
                  <img src={a.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="serif" style={{
                    fontSize: 15, color: C.taupe, fontWeight: 600,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>{a.title}</div>
                  <div className="mono" style={{ fontSize: 10, color: C.taupeLight, marginTop: 3, textTransform: 'uppercase' }}>
                    {a.tag} · {fmtDate(a.date)}
                  </div>
                </div>
                <button onClick={() => startEdit(a)} style={iconBtn}><Edit2 size={14} /></button>
                <button onClick={() => del(a.id)} style={{ ...iconBtn, color: '#8B3A3A' }}><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}