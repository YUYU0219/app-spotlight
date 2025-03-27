import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../services/api';

export interface App {
  id: string;
  name: string;
  summary: string;
  image: string;
  category: string;
  price: string;
  title: string;
}

interface AppsState {
  freeApps: App[];
  recommendedApps: App[];
  allApps: App[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
}

const initialState: AppsState = {
  freeApps: [],
  recommendedApps: [],
  allApps: [],
  searchQuery: '',
  loading: false,
  error: null,
};

const appsSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    setFreeApps: (state, action: PayloadAction<App[]>) => {
      state.freeApps = action.payload;
    },
    setRecommendedApps: (state, action: PayloadAction<App[]>) => {
      state.recommendedApps = action.payload;
      state.allApps = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setFreeApps,
  setRecommendedApps,
  setLoading,
  setError,
  setSearchQuery,
} = appsSlice.actions;

// 選擇器
export const selectFilteredApps = (state: { apps: AppsState }) => {
  const { allApps, searchQuery } = state.apps;
  if (!searchQuery) return allApps;

  const query = searchQuery.toLowerCase();
  return allApps.filter(app => {
    const name = app.name?.toLowerCase() || '';
    const summary = app.summary?.toLowerCase() || '';
    const title = app.title?.toLowerCase() || '';
    
    return name.includes(query) ||
           summary.includes(query) ||
           title.includes(query);
  });
};

export default appsSlice.reducer; 