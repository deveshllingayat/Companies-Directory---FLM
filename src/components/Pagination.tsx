import { useFilterContext } from '../contexts/FilterContext';
import { setPage } from '../store/companiesSlice';

interface Props { page: number; pages: number; total: number; }

export default function Pagination({ page, pages, total }: Props) {
  const { filters: { pageSize }, dispatch } = useFilterContext();
  const visible: number[] = [];
  for (let i = Math.max(1, page - 2); i <= Math.min(pages, page + 2); i++) visible.push(i);

  const btn = (label: React.ReactNode, onClick: () => void, active = false, disabled = false) => (
    <button onClick={onClick} disabled={disabled} style={{
      width: 34, height: 34, borderRadius: 8,
      border: `1.5px solid ${active ? 'var(--brand)' : 'var(--border)'}`,
      background: active ? 'var(--brand)' : 'var(--surface)',
      color: active ? '#fff' : 'var(--muted)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontSize: 13, fontWeight: 500, opacity: disabled ? 0.35 : 1,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {label}
    </button>
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '1.25rem' }}>
      <span style={{ fontSize: 13, color: 'var(--muted)', marginRight: 8 }}>
        {Math.min((page - 1) * pageSize + 1, total)}–{Math.min(page * pageSize, total)} of {total}
      </span>
      {btn('‹', () => dispatch(setPage(page - 1)), false, page === 1)}
      {page > 3 && <>{btn('1', () => dispatch(setPage(1)))} <span style={{ color: 'var(--muted)' }}>…</span></>}
      {visible.map(p => btn(p, () => dispatch(setPage(p)), p === page))}
      {page < pages - 2 && <><span style={{ color: 'var(--muted)' }}>…</span>{btn(pages, () => dispatch(setPage(pages)))}</>}
      {btn('›', () => dispatch(setPage(page + 1)), false, page === pages)}
    </div>
  );
}