import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export default function Header() {
  const total = useSelector((s: RootState) => s.companies.data.length);
  return (
    <header style={{
      background: '#2c5282', color: '#fff', padding: '0 2rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: 64, boxShadow: '0 2px 8px rgba(44,82,130,0.3)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 700 }}>
        Companies Directory
      </div>
      <span style={{
        fontSize: 13, background: 'rgba(255,255,255,0.15)',
        padding: '4px 12px', borderRadius: 20, fontWeight: 500,
      }}>
        {total} companies
      </span>
    </header>
  );
}