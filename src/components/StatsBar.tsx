import { useCompanies } from '../contexts/FilterContext';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export default function StatsBar() {
  const { filtered } = useCompanies();
  const total = useSelector((s: RootState) => s.companies.data.length);
  const pub = filtered.filter(c => c.status === 'Public').length;
  const priv = filtered.filter(c => c.status === 'Private').length;
  const acq = filtered.filter(c => c.status === 'Acquired').length;

  const chip = (color: string, count: number, label: string) => (
    <div style={{
      background: 'var(--surface)', borderRadius: 'var(--radius)',
      padding: '10px 16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
      <strong style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>{count}</strong>
      {label}
    </div>
  );

  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
      <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', padding: '10px 16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <strong style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>{filtered.length}</strong> of {total} shown
      </div>
      {chip('#22c55e', pub, 'Public')}
      {chip('#f59e0b', priv, 'Private')}
      {chip('#8b5cf6', acq, 'Acquired')}
    </div>
  );
}