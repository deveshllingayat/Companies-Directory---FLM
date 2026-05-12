import { useFilterContext } from '../contexts/FilterContext';
import { setSelected } from '../store/companiesSlice';
import { getColor, getInitials, formatEmployees } from '../utils/helpers';
import CloseIcon from '@mui/icons-material/Close';

export default function CompanyModal() {
  const { filters: { selected }, dispatch } = useFilterContext();
  if (!selected) return null;
  const c = selected;
  const [bg, fg] = getColor(c.name);

  const fields = [
    { label: 'Industry', value: c.industry }, { label: 'Location', value: c.location },
    { label: 'Status', value: c.status }, { label: 'Founded', value: c.founded },
    { label: 'Revenue', value: c.revenueStr }, { label: 'Employees', value: formatEmployees(c.employees) },
    { label: 'CEO', value: c.ceo }, { label: 'Rating', value: `⭐ ${c.rating} / 5.0` },
    { label: 'Website', value: c.website }, { label: 'Ticker', value: c.ticker },
  ];

  return (
    <div onClick={e => { if (e.target === e.currentTarget) dispatch(setSelected(null)); }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '1rem' }}>
      <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', maxWidth: 560, width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: bg, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 17, fontFamily: "'DM Mono', monospace", flexShrink: 0 }}>
            {getInitials(c.name)}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{c.name}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{c.ticker} · {c.website}</div>
          </div>
          <button onClick={() => dispatch(setSelected(null))} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 18, display: 'flex', alignItems: 'center', padding: 4, borderRadius: 6 }}>
            <CloseIcon />
          </button>
        </div>
        <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {fields.map(f => (
            <div key={f.label} style={{ padding: 12, background: 'var(--bg)', borderRadius: 'var(--radius)' }}>
              <label style={{ display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--subtle)', fontWeight: 600, marginBottom: 4 }}>{f.label}</label>
              <span style={{ fontSize: 14, fontWeight: 500 }}>{f.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}