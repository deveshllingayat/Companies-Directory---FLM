import { useFilterContext, useCompanies } from '../contexts/FilterContext';
import { setSort, setSelected } from '../store/companiesSlice';
import Avatar from './Avatar';
import IndustryBadge from './IndustryBadge';
import StatusBadge from './StatusBadge';
import Pagination from './Pagination';
import { formatEmployees } from '../utils/helpers';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const COLS = [
  { key: 'name', label: 'Company' }, { key: 'industry', label: 'Industry' },
  { key: 'location', label: 'Location' }, { key: 'status', label: 'Status' },
  { key: 'revenue', label: 'Revenue' }, { key: 'employees', label: 'Employees' },
  { key: 'founded', label: 'Founded' },
];

export default function TableView() {
  const { filters, dispatch } = useFilterContext();
  const { paginated, filtered, pages } = useCompanies();
  const { page, sortBy, sortDir, loading } = filters;

  return (
    <div style={{ background: 'var(--surface)', borderRadius: 'var(--radius-lg)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
          <thead style={{ background: '#f8f8f6' }}>
            <tr>
              {COLS.map(c => (
                <th key={c.key} onClick={() => dispatch(setSort(c.key))} style={{
                  padding: '11px 16px', textAlign: 'left', fontWeight: 600,
                  fontSize: 12, color: sortBy === c.key ? 'var(--brand)' : 'var(--muted)',
                  textTransform: 'uppercase', letterSpacing: '0.5px',
                  borderBottom: '1px solid var(--border)', cursor: 'pointer', whiteSpace: 'nowrap',
                }}>
                  {c.label}
                  <span style={{ marginLeft: 4, opacity: sortBy === c.key ? 1 : 0.4, fontSize: 10 }}>
                    {sortBy === c.key ? (sortDir === 'asc' ? '↑' : '↓') : '⇅'}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array(8).fill(0).map((_, i) => (
                <tr key={i}>
                  {COLS.map(c => (
                    <td key={c.key} style={{ padding: '13px 16px', borderBottom: '1px solid #f0efe8' }}>
                      <div style={{
                        height: 14, borderRadius: 6,
                        width: c.key === 'name' ? 140 : c.key === 'industry' ? 90 : 80,
                        background: 'linear-gradient(90deg,#f0efe8 25%,#e8e7e0 50%,#f0efe8 75%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 1.4s infinite',
                      }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '4rem', textAlign: 'center', color: 'var(--muted)' }}>
                  <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.3 }}>🔍</div>
                  <strong>No companies found</strong>
                  <p style={{ fontSize: 13, marginTop: 4 }}>Try adjusting your search or filters</p>
                </td>
              </tr>
            ) : (
              paginated.map((c) => (
                <tr key={c.id} onClick={() => dispatch(setSelected(c))}
                  style={{ cursor: 'pointer', borderBottom: '1px solid #f0efe8' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#fafaf8')}
                  onMouseLeave={e => (e.currentTarget.style.background = '')}
                >
                  <td style={{ padding: '13px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={c.name} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--subtle)', fontFamily: "'DM Mono', monospace" }}>{c.ticker}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '13px 16px' }}><IndustryBadge industry={c.industry} /></td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--muted)', fontSize: 13 }}>
                      <LocationOnIcon style={{ fontSize: 13 }} />{c.location}
                    </span>
                  </td>
                  <td style={{ padding: '13px 16px' }}><StatusBadge status={c.status} /></td>
                  <td style={{ padding: '13px 16px', fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>{c.revenueStr}</td>
                  <td style={{ padding: '13px 16px', color: 'var(--muted)', fontSize: 13 }}>{formatEmployees(c.employees)}</td>
                  <td style={{ padding: '13px 16px', color: 'var(--muted)', fontSize: 13 }}>{c.founded}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination page={page} pages={pages} total={filtered.length} />
    </div>
  );
}