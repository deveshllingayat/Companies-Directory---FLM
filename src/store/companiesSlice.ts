import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CompaniesState, Company } from '../types';
import { COMPANIES } from '../data/companies';

const initialState: CompaniesState = {
  data: COMPANIES,
  search: '',
  industry: '',
  location: '',
  status: '',
  sortBy: 'name',
  sortDir: 'asc',
  page: 1,
  pageSize: 10,
  view: 'table',
  selected: null,
  loading: false,
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 1;
    },
    setFilter: (state, action: PayloadAction<{ key: 'industry' | 'location' | 'status'; value: string }>) => {
      state[action.payload.key] = action.payload.value;
      state.page = 1;
    },
    setSort: (state, action: PayloadAction<string>) => {
      if (state.sortBy === action.payload) {
        state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortBy = action.payload as CompaniesState['sortBy'];
        state.sortDir = 'asc';
      }
    },
    setPage: (state, action: PayloadAction<number>) => { state.page = action.payload; },
    setView: (state, action: PayloadAction<'table' | 'cards'>) => { state.view = action.payload; },
    setSelected: (state, action: PayloadAction<Company | null>) => { state.selected = action.payload; },
    clearFilters: (state) => {
      state.search = '';
      state.industry = '';
      state.location = '';
      state.status = '';
      state.page = 1;
    },
    setLoading: (state, action: PayloadAction<boolean>) => { state.loading = action.payload; },
  },
});

export const {
  setSearch, setFilter, setSort, setPage,
  setView, setSelected, clearFilters, setLoading,
} = companiesSlice.actions;

export default companiesSlice.reducer;