import React, { useEffect, useState, useRef } from 'react';
import { List, Avatar, Spin, Rate } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { App } from '../../store/appsSlice';
import { api } from '../../services/api';
import { setFreeApps, setLoading, setError } from '../../store/appsSlice';

const AppList: React.FC = () => {
  const dispatch = useDispatch();
  const { freeApps, searchQuery, loading } = useSelector((state: RootState) => state.apps);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [hasMore, setHasMore] = useState(true);
  const [displayedApps, setDisplayedApps] = useState<App[]>([]);
  const observerTarget = useRef<HTMLDivElement>(null);

  // 載入初始資料
  useEffect(() => {
    const fetchApps = async () => {
      try {
        dispatch(setLoading(true));
        const apps = await api.getFreeApps();
        dispatch(setFreeApps(apps));
        // 重置分頁狀態
        setPage(1);
        setHasMore(apps.length > pageSize);
        // 只顯示第一頁的數據
        setDisplayedApps(apps.slice(0, pageSize));
      } catch (error) {
        dispatch(setError('載入應用列表時發生錯誤'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchApps();
  }, [dispatch]);

  // 根據搜尋關鍵字過濾應用
  const filteredApps = freeApps.filter((app: App) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 處理載入更多
  const loadMore = () => {
    if (displayedApps.length < filteredApps.length) {
      const nextPage = page + 1;
      const startIndex = displayedApps.length;
      const endIndex = startIndex + pageSize;
      const newApps = filteredApps.slice(startIndex, endIndex);
      setDisplayedApps(prev => [...prev, ...newApps]);
      setPage(nextPage);
      setHasMore(endIndex < filteredApps.length);
    }
  };

  // 當搜尋關鍵字改變時重置分頁
  React.useEffect(() => {
    setPage(1);
    setHasMore(filteredApps.length > pageSize);
    setDisplayedApps(filteredApps.slice(0, pageSize));
  }, [searchQuery, filteredApps.length]);

  // 設置 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loading, displayedApps.length]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">應用列表</h2>
            <span className="text-sm text-gray-500">共 {filteredApps.length} 個應用</span>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={displayedApps}
            renderItem={(app: App, index: number) => (
              <List.Item className="hover:bg-gray-50 rounded-xl transition-all duration-200 group">
                <div className="flex items-center gap-4 w-full">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white font-bold text-lg group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-200 shadow-sm group-hover:shadow-md">
                    {index + 1}
                  </div>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={app.image}
                        size={80}
                        className="rounded-2xl shadow-sm group-hover:shadow-md transition-shadow"
                      />
                    }
                    title={
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {app.name}
                        </span>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {app.category}
                        </span>
                      </div>
                    }
                    description={
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Rate disabled defaultValue={4.5} allowHalf />
                          <span className="text-sm text-gray-500">(1.2k)</span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{app.summary}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>4.5 MB</span>
                          <span>•</span>
                          <span>年齡分級 4+</span>
                        </div>
                      </div>
                    }
                  />
                </div>
              </List.Item>
            )}
          />
          {/* 觀察目標元素 */}
          <div ref={observerTarget} className="h-4 w-full">
            {loading && (
              <div className="text-center py-6">
                <Spin aria-label="載入中" />
                <p className="text-sm text-gray-500 mt-2">正在載入更多應用...</p>
              </div>
            )}
            {!hasMore && displayedApps.length > 0 && (
              <div className="text-center py-6">
                <div className="text-gray-400 text-sm">沒有更多應用程式了</div>
                <div className="text-gray-300 text-xs mt-1">已顯示全部 {filteredApps.length} 個應用</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppList;