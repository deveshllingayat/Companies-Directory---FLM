/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type{ RootState, AppDispatch } from '../store';

interface FilterContextValue {
  filters: RootState['companies'];
  dispatch: AppDispatch;
}

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((s: RootState) => s.companies);
  return <FilterContext.Provider value={{ filters, dispatch }}>{children}</FilterContext.Provider>;
}

export function useFilterContext() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilterContext must be used inside FilterProvider');
  return ctx;
}

export function useCompanies() {
  const { filters } = useFilterContext();
  const { data, search, industry, location, status, sortBy, sortDir, page, pageSize } = filters;

  const filtered = useMemo(() => {
    let r = [...data];
    if (search) {
      const q = search.toLowerCase();
      r = r.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.ceo.toLowerCase().includes(q)
      );
    }
    if (industry) r = r.filter(c => c.industry === industry);
    if (location) r = r.filter(c => c.location === location);
    if (status) r = r.filter(c => c.status === status);

    r.sort((a, b) => {
      let va: string | number = (a as any)[sortBy];
      let vb: string | number = (b as any)[sortBy];
      if (typeof va === 'string') { va = va?.toLowerCase(); vb = (vb as string).toLowerCase(); }
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return r;
  }, [data, search, industry, location, status, sortBy, sortDir]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  return { filtered, paginated, total, pages };
}