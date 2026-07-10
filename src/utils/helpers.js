import {
    Scissors, Sparkles, Palette, Droplet, Wind, Brush, Flower2, Eye,
  } from 'lucide-react';
  
  export const fmtIDR = (n) => 'Rp ' + n.toLocaleString('id-ID');
  
  export const fmtDate = (d) => {
    try {
      return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch { return d; }
  };
  
  export const fmtDur = (m) =>
    m >= 60 ? `${Math.floor(m / 60)}h ${m % 60 ? (m % 60) + 'm' : ''}`.trim() : `${m}m`;
  
  export const catIcon = (id) => {
    const map = {
      1: Scissors, 2: Scissors, 3: Palette, 4: Droplet, 5: Wind,
      6: Sparkles, 7: Brush, 8: Flower2, 9: Sparkles, 10: Eye,
    };
    return map[id] || Sparkles;
  };