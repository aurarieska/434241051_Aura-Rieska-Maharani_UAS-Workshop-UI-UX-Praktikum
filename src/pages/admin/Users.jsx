import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { C } from '../../constants/theme';
import { iconBtn, inputStyle } from '../../constants/styles';
import { useApp } from '../../context/AppContext';
import AdminInput from '../../components/admin/AdminInput';

const blank = { name: '', email: '', password: '', role: 'user' };

export default function Users() {
  const { users, setUsers, showToast } = useApp();
  const [form, setForm] = useState(blank);
  const [editId, setEditId] = useState(null);
  const [showPw, setShowPw] = useState(false);

  const startEdit = (u) => {
    setForm({ name: u.name, email: u.email, password: u.password, role: u.role });
    setEditId(u.id);
  };
  const reset = () => { setForm(blank); setEditId(null); };

  const submit = () => {
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      showToast('Nama, email, dan kata sandi wajib diisi', 'error');
      return;
    }
    const email = form.email.trim().toLowerCase();
    const dup = users.some(u => u.email.toLowerCase() === email && u.id !== editId);
    if (dup) { showToast('Email sudah terdaftar', 'error'); return; }
    if (editId) {
      setUsers(users.map(u => u.id === editId ? { ...u, ...form, email } : u));
      showToast('Pengguna berhasil diperbarui', 'success');
    } else {
      const id = Math.max(0, ...users.map(u => u.id)) + 1;
      setUsers([...users, { id, ...form, email }]);
      showToast('Pengguna berhasil ditambahkan', 'success');
    }
    reset();
  };

  const del = (id) => {
    const u = users.find(x => x.id === id);
    if (u?.role === 'admin' && users.filter(x => x.role === 'admin').length <= 1) {
      showToast('Admin terakhir tidak bisa dihapus', 'error');
      return;
    }
    setUsers(users.filter(x => x.id !== id));
    showToast('Pengguna berhasil dihapus', 'success');
  };

  const roleLabel = (r) => r === 'admin' ? 'Admin' : 'Pelanggan';

  return (
    <>
      <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 8 }}>— Dasbor —</div>
      <h1 className="serif" style={{ fontSize: 36, margin: '0 0 30px', color: C.taupe, fontWeight: 400 }}>
        Kelola <span style={{ fontStyle: 'italic', color: C.roseDark }}>pengguna</span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 28 }} className="hero-grid">
        <div style={{ background: C.peachLight, padding: 24, borderRadius: 20, height: 'fit-content' }}>
          <h3 className="serif" style={{ fontSize: 20, margin: '0 0 18px', color: C.taupe, fontWeight: 600 }}>
            {editId ? 'Ubah pengguna' : 'Tambah pengguna baru'}
          </h3>
          <AdminInput label="Nama" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="cth. Aisha Pramudita" />
          <AdminInput label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="nama@email.com" />

          <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', color: C.taupeLight, marginBottom: 6, marginTop: 12 }}>Kata sandi</div>
          <div style={{ position: 'relative' }}>
            <input
              type={showPw ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              style={{ ...inputStyle, marginTop: 0, paddingRight: 72 }}
            />
            <button onClick={() => setShowPw(v => !v)} style={{
              position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
              background: 'transparent', border: 'none', color: C.roseDark, fontSize: 11, fontWeight: 600,
            }}>
              {showPw ? 'Sembunyikan' : 'Tampilkan'}
            </button>
          </div>

          <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', color: C.taupeLight, marginBottom: 6, marginTop: 12 }}>Peran</div>
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} style={{ ...inputStyle, marginTop: 0 }}>
            <option value="user">Pelanggan</option>
            <option value="admin">Admin</option>
          </select>

          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button onClick={submit} style={{
              flex: 1, padding: 12, background: C.taupe, color: C.bg, border: 'none',
              borderRadius: 999, fontSize: 13, fontWeight: 500,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <Plus size={14} /> {editId ? 'Simpan Perubahan' : 'Tambah Pengguna'}
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
            <h3 className="serif" style={{ fontSize: 18, margin: 0, color: C.taupe, fontWeight: 600 }}>Semua pengguna</h3>
            <span className="mono" style={{ fontSize: 11, color: C.taupeLight }}>{users.length} total</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
              <thead>
                <tr style={{ background: C.peachLight }}>
                  {['Nama', 'Email', 'Kata Sandi', 'Peran', ''].map((h, i) => (
                    <th key={i} className="mono" style={{
                      textAlign: 'left', padding: '12px 18px', fontSize: 10, textTransform: 'uppercase',
                      color: C.taupeLight, fontWeight: 500, letterSpacing: '0.05em', whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} style={{ borderTop: `1px solid ${C.line}` }}>
                    <td style={{ padding: '12px 18px', fontSize: 13, color: C.taupe, fontWeight: 600, whiteSpace: 'nowrap' }}>{u.name}</td>
                    <td style={{ padding: '12px 18px', fontSize: 13, color: C.taupeLight, whiteSpace: 'nowrap' }}>{u.email}</td>
                    <td className="mono" style={{ padding: '12px 18px', fontSize: 12, color: C.taupeLight, whiteSpace: 'nowrap' }}>
                      {'•'.repeat(Math.min(u.password.length, 8))}
                    </td>
                    <td style={{ padding: '12px 18px', whiteSpace: 'nowrap' }}>
                      <span className="mono" style={{
                        fontSize: 10, textTransform: 'uppercase', padding: '4px 10px', borderRadius: 999,
                        background: u.role === 'admin' ? C.taupe : C.peachLight,
                        color: u.role === 'admin' ? C.bg : C.roseDark,
                      }}>{roleLabel(u.role)}</span>
                    </td>
                    <td style={{ padding: '12px 18px', whiteSpace: 'nowrap', display: 'flex', gap: 6 }}>
                      <button onClick={() => startEdit(u)} style={iconBtn}><Edit2 size={14} /></button>
                      <button onClick={() => del(u.id)} style={{ ...iconBtn, color: '#8B3A3A' }}><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}