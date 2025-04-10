import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../services/api';

// 定義應用程式的介面，包含基本屬性
export interface App {
  id: string;          // 應用程式唯一識別碼
  name: string;        // 應用程式名稱
  summary: string;     // 應用程式簡介
  image: string;       // 應用程式圖示 URL
  category: string;    // 應用程式分類
  price: string;       // 應用程式價格
  title: string;       // 應用程式標題
}

// 定義 Redux store 的狀態介面
interface AppsState {
  freeApps: App[];           // 免費應用程式列表
  recommendedApps: App[];    // 推薦應用程式列表
  searchQuery: string;      // 搜尋關鍵字
  loading: boolean;         // 載入狀態
  error: string | null;     // 錯誤訊息
}

// 定義初始狀態
const initialState: AppsState = {
  freeApps: [],
  recommendedApps: [],
  searchQuery: '',
  loading: false,
  error: null,
};

// 創建 Redux slice，包含所有狀態更新邏輯
const appsSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    // 設置免費應用程式列表
    setFreeApps: (state, action: PayloadAction<App[]>) => {
      state.freeApps = action.payload;
    },
    // 設置推薦應用程式列表
    setRecommendedApps: (state, action: PayloadAction<App[]>) => {
      state.recommendedApps = action.payload;
    },
    // 設置載入狀態
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // 設置錯誤訊息
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    // 設置搜尋關鍵字
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

// 導出所有 action creators
export const {
  setFreeApps,
  setRecommendedApps,
  setLoading,
  setError,
  setSearchQuery,
} = appsSlice.actions;

// 共用的搜尋邏輯
const searchInApp = (app: App, searchQuery: string) => {
  // 去除首尾空格，但保留中間空格
  const query = searchQuery.trim().toLowerCase();
  
  // 如果搜尋詞包含空格，拆分成多個關鍵字
  const searchTerms = query.split(/\s+/);
  
  const name = app.name?.toLowerCase() || '';
  const summary = app.summary?.toLowerCase() || '';
  const title = app.title?.toLowerCase() || '';

  // 確保所有關鍵字都能匹配到
  return searchTerms.every(term => 
    name.includes(term) ||
    summary.includes(term) ||
    title.includes(term)
  );
};

// 選擇器：根據搜尋關鍵字過濾應用程式
export const selectFilteredApps = (state: { apps: AppsState }) => {
  const { freeApps, recommendedApps, searchQuery } = state.apps;

  // 合併所有需要搜尋的應用列表
  const allAppsToSearch = [...recommendedApps, ...freeApps];
  
  if (!searchQuery) return recommendedApps;

  // 過濾應用程式，檢查名稱、簡介和標題是否包含搜尋關鍵字
  return allAppsToSearch.filter(app => searchInApp(app, searchQuery));
};

// 搜尋推薦應用的選擇器
export const selectFilteredRecommendedApps = (state: { apps: AppsState }) => {
  const { recommendedApps, searchQuery } = state.apps;
  
  if (!searchQuery?.trim()) return recommendedApps;
  
  return recommendedApps.filter(app => searchInApp(app, searchQuery));
};

// 搜尋免費應用的選擇器
export const selectFilteredFreeApps = (state: { apps: AppsState }) => {
  const { freeApps, searchQuery } = state.apps;
  
  if (!searchQuery?.trim()) return freeApps;
  
  return freeApps.filter(app => searchInApp(app, searchQuery));
};

// 導出 reducer
export default appsSlice.reducer; 