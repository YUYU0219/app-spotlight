'use client';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import RecommendedApps from '../components/RecommendedApps';
import AppList from '../components/AppList';
import StickySearchBar from '../components/StickySearchBar';
import { api } from '../services/api';
import { setRecommendedApps, setLoading, setError } from '../store/appsSlice';

export default function Home() {
  useEffect(() => {
    const fetchRecommendedApps = async () => {
      try {
        store.dispatch(setLoading(true));
        const apps = await api.getRecommendedApps();
        store.dispatch(setRecommendedApps(apps));
      } catch (error) {
        store.dispatch(setError('載入推薦應用時發生錯誤'));
      } finally {
        store.dispatch(setLoading(false));
      }
    };

    fetchRecommendedApps();
  }, []);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <StickySearchBar />
        <div className="pt-20 w-full max-w-4xl mx-auto px-4 py-8">

          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          
          {/* 推薦應用 */}
          <div className="mb-8">
            <RecommendedApps />
          </div>
          
          {/* 應用列表 */}
          <div className="mt-8">
            <AppList />
          </div>
        </div>
      </div>
    </Provider>
  );
}