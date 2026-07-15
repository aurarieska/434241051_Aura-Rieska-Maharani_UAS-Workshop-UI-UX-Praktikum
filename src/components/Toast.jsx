import { AlertCircle, CheckCircle } from 'lucide-react';
import { C } from '../constants/theme';

export default function Toast({ toast }) {
  return (
    <div style={{
      position: 'fixed', bottom: 30, left: '50%', transform: 'translateX(-50%)',
      background: toast.type === 'error' ? '#8B3A3A' : C.taupe,
      color: C.bg, padding: '14px 22px', borderRadius: 999, zIndex: 9999,
      boxShadow: '0 12px 30px -10px rgba(74,59,50,0.4)',
      display: 'flex', alignItems: 'center', gap: 10, fontSize: 14,
      animation: 'fadeUp 0.3s ease-out',
    }}>
      {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
      {toast.msg}
    </div>
  );
}