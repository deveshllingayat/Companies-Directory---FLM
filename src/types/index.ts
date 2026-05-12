export type Status = 'Public' | 'Private' | 'Acquired';

export interface Company {
  id: number;
  name: string;
  ticker: string;
  industry: string;
  location: string;
  status: Status;
  founded: number;
  employees: number;
  revenue: number;
  revenueStr: string;
  ceo: string;
  website: string;
  rating: string;
}

export type SortDir = 'asc' | 'desc';
export type ViewMode = 'table' | 'cards';

export interface CompaniesState {
  data: Company[];
  search: string;
  industry: string;
  location: string;
  status: string;
  sortBy: keyof Company | 'revenue' | 'employees';
  sortDir: SortDir;
  page: number;
  pageSize: number;
  view: ViewMode;
  selected: Company | null;
  loading: boolean;
}