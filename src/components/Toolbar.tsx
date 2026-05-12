import { useFilterContext } from '../contexts/FilterContext';
import { setSearch, setFilter, setView, clearFilters } from '../store/companiesSlice';
import { INDUSTRIES, STATUSES, COMPANIES } from '../data/companies';
import SearchIcon from '@mui/icons-material/Search';
import TableRowsIcon from '@mui/icons-material/TableRows';
import GridViewIcon from '@mui/icons-material/GridView';

const locations = [...new Set(COMPANIES.map(c => c.location))].sort();

export default function Toolbar() {
  const { filters, dispatch } = useFilterContext();
  const { search, industry, location, status, view } = filters;
  const hasFilters = search || industry || location || status;

  const selectStyle = {
    padding: '8px 28px 8px 10px', border: '1.5px solid var(--border)',
    borderRadius: 'var(--radius)', fontFamily: "'DM Sans', sans-serif",
    fontSize: 13, background: 'var(--bg)', color: 'var(--text)',
    outline: 'none', appearance: 'none' as const, cursor: 'pointer',
    minWidth: 140,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%236b7280'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center',
  };

  return (
    <div style={{
      background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: '1.25rem 1.5rem',
      marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center',
    }}>
      <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
        <SearchIcon style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--subtle)', fontSize: 18 }} />
        <input
          style={{
            width: '100%', padding: '8px 12px 8px 34px',
            border: '1.5px solid var(--border)', borderRadius: 'var(--radius)',
            fontFamily: "'DM Sans', sans-serif", fontSize: 14,
            background: 'var(--bg)', color: 'var(--text)', outline: 'none',
          }}
          placeholder="Search companies, tickers, CEOs…"
          value={search}
          onChange={e => dispatch(setSearch(e.target.value))}
        />
      </div>

      <select style={selectStyle} value={industry} onChange={e => dispatch(setFilter({ key: 'industry', value: e.target.value }))}>
        <option value="">All Industries</option>
        {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
      </select>

      <select style={selectStyle} value={location} onChange={e => dispatch(setFilter({ key: 'location', value: e.target.value }))}>
        <option value="">All Locations</option>
        {locations.map(l => <option key={l} value={l}>{l}</option>)}
      </select>

      <select style={selectStyle} value={status} onChange={e => dispatch(setFilter({ key: 'status', value: e.target.value }))}>
        <option value="">All Statuses</option>
        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      {hasFilters && (
        <button onClick={() => dispatch(clearFilters())} style={{
          padding: '7px 14px', border: '1.5px solid var(--border)',
          borderRadius: 'var(--radius)', background: 'transparent',
          fontFamily: "'DM Sans', sans-serif", fontSize: 13,
          color: 'var(--muted)', cursor: 'pointer',
        }}>
          ✕ Clear
        </button>
      )}

      <div style={{ display: 'flex', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        {([['table', <TableRowsIcon fontSize="small" />], ['cards', <GridViewIcon fontSize="small" />]] as const).map(([v, icon]) => (
          <button key={v} onClick={() => dispatch(setView(v))} style={{
            padding: '7px 12px', background: view === v ? 'var(--brand)' : 'transparent',
            border: 'none', cursor: 'pointer', color: view === v ? '#fff' : 'var(--muted)',
            display: 'flex', alignItems: 'center',
          }}>
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
}