import { C } from '../../constants/theme';
import { inputStyle } from '../../constants/styles';

export default function AdminInput({ label, value, onChange, placeholder, type = 'text', textarea }) {
  return (
    <div style={{ marginTop: 12 }}>
      <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', color: C.taupeLight, marginBottom: 6 }}>
        {label}
      </div>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          style={{ ...inputStyle, marginTop: 0, resize: 'vertical' }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ ...inputStyle, marginTop: 0 }}
        />
      )}
    </div>
  );
}