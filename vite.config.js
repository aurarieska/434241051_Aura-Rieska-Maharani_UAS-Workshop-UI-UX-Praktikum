import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/434241051_Aura-Rieska-Maharani_UAS-Workshop-UI-UX-Praktikum/',
  server: {
    port: 5173,
    open: true,
  },
});