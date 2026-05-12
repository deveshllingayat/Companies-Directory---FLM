import { useFilterContext, useCompanies } from '../contexts/FilterContext';
import { setSelected } from '../store/companiesSlice';
import Avatar from './Avatar';
import StatusBadge from './StatusBadge';
import Pagination from './Pagination';
import { formatEmployees } from '../utils/helpers';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function CardsView() {
  const { filters: { page }, dispatch } = useFilterContext();
  const { paginated, filtered, pages } = useCompanies();

  if (paginated.length === 0) return (
    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted)' }}>
      <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.3 }}>🔍</div>
      <strong>No companies found</strong>
      <p style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your filters</p>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {paginated.map(c => (
          <div key={c.id} onClick={() => dispatch(setSelected(c))} style={{
            background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: '1.25rem',
            cursor: 'pointer', border: '1.5px solid transparent', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 6px rgba(0,0,0,0.06)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'transparent'; }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
              <Avatar name={c.name} size={44} radius={12} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 15, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</div>
                <div style={{ fontSize: 12, color: 'var(--subtle)', marginTop: 2 }}>{c.ticker} · {c.industry}</div>
              </div>
              <StatusBadge status={c.status} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 12.5 }}>
              {[['Revenue', c.revenueStr], ['Employees', formatEmployees(c.employees)], ['Founded', c.founded], ['Rating', `⭐ ${c.rating}`]].map(([label, val]) => (
                <div key={label as string} style={{ padding: 12, background: 'var(--bg)', borderRadius: 'var(--radius)' }}>
                  <label style={{ display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--subtle)', fontWeight: 600, marginBottom: 2 }}>{label}</label>
                  <span style={{ fontWeight: 500 }}>{val}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <LocationOnIcon style={{ fontSize: 13 }} />{c.location}
              </span>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>View details →</span>
            </div>
          </div>
        ))}
      </div>
      <Pagination page={page} pages={pages} total={filtered.length} />
    </div>
  );
}