import { useState } from 'react';
import { C } from '../../constants/theme';
import { useApp } from '../../context/AppContext';

function Field({ label, value, onChange, editable }) {
  return (
    <div>
      <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', color: C.taupeLight, marginBottom: 6 }}>
        {label}
      </div>
      {editable && onChange ? (
        <input value={value} onChange={(e) => onChange(e.target.value)} style={{
          width: '100%', padding: '10px 12px', border: `1.5px solid ${C.rose}`, borderRadius: 10,
          fontSize: 14, background: C.bg, color: C.taupe, outline: 'none',
        }} />
      ) : (
        <div style={{ padding: '10px 12px', background: C.peachLight, borderRadius: 10, fontSize: 14, color: C.taupe }}>
          {value}
        </div>
      )}
    </div>
  );
}

export default function Profile() {
  const { user, setUser, showToast } = useApp();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState('+62 812-1234-5678');
  const [edit, setEdit] = useState(false);

  const toggle = () => {
    if (edit) {
      setUser({ ...user, name });
      showToast('Profil berhasil diperbarui', 'success');
    }
    setEdit(!edit);
  };

  return (
    <div>
      <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', color: C.roseDark, marginBottom: 8 }}>
        — Akun —
      </div>
      <h1 className="serif" style={{ fontSize: 'clamp(30px,4vw,44px)', margin: 0, color: C.taupe, fontWeight: 400, marginBottom: 30 }}>
        Profil <span style={{ fontStyle: 'italic', color: C.roseDark }}>kamu</span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 30 }} className="hero-grid">
        <div style={{ background: C.peachLight, padding: 28, borderRadius: 20, textAlign: 'center' }}>
          <div className="serif" style={{
            width: 110, height: 110, borderRadius: '50%', background: C.rose, color: C.bg,
            margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40,
          }}>
            {user.name?.[0]}
          </div>
          <div className="serif" style={{ fontSize: 22, color: C.taupe, fontWeight: 600 }}>{user.name}</div>
          <div style={{ fontSize: 13, color: C.taupeLight, marginTop: 4 }}>{user.email}</div>
          <div style={{
            marginTop: 20, paddingTop: 20, borderTop: `1px solid ${C.rose}`,
            fontSize: 12, color: C.taupeLight,
          }}>
            <div className="mono" style={{ textTransform: 'uppercase', fontSize: 10, marginBottom: 8 }}>Member sejak</div>
            <div className="serif" style={{ fontSize: 16, color: C.taupe }}>Maret 2024</div>
          </div>
        </div>

        <div>
          <div style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: 18, padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h3 className="serif" style={{ fontSize: 20, margin: 0, color: C.taupe, fontWeight: 600 }}>
                Data pribadi
              </h3>
              <button onClick={toggle} style={{
                background: 'transparent', border: `1px solid ${C.line}`, padding: '6px 16px',
                borderRadius: 999, fontSize: 12, color: C.taupe,
              }}>
                {edit ? 'Simpan' : 'Ubah'}
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="Nama lengkap" value={name} onChange={setName} editable={edit} />
              <Field label="Email" value={user.email} editable={false} />
              <Field label="No. telepon" value={phone} onChange={setPhone} editable={edit} />
              <Field label="Keanggotaan" value="Powder Member" editable={false} />
            </div>
          </div>

          <div style={{ background: C.peachLight, border: `1px solid ${C.line}`, borderRadius: 18, padding: 24, marginTop: 20 }}>
            <h3 className="serif" style={{ fontSize: 20, margin: '0 0 16px', color: C.taupe, fontWeight: 600 }}>
              Preferensi
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label="Stylist favorit" value="Aria Chen" editable={false} />
              <Field label="Tipe kulit" value="Kombinasi" editable={false} />
              <Field label="Alergi" value="Tidak ada" editable={false} />
              <Field label="Tanggal lahir" value="—" editable={false} />
            </div>
            <p style={{ fontSize: 12, color: C.taupeLight, marginTop: 14, fontStyle: 'italic' }}>
              Detail ini membantu stylist menyesuaikan setiap kunjunganmu. Perbarui kapan saja melalui resepsionis kami.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}