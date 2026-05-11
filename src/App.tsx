import { useFilterContext } from './contexts/FilterContext';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import StatsBar from './components/StatsBar';
import TableView from './components/TableView';
import CardsView from './components/CardsView';
import CompanyModal from './components/CompanyModal';

function ViewSwitch() {
  const { filters: { view } } = useFilterContext();
  return view === 'table' ? <TableView /> : <CardsView />;
}

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Header />
      <div style={{ padding: '1.5rem 2rem' }}>
        <Toolbar />
        <StatsBar />
        <ViewSwitch />
      </div>
      <CompanyModal />
    </div>
  );
}