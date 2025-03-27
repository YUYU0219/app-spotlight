import React, { useEffect, useState, useRef } from 'react';
import { List, Avatar, Spin } from 'antd';
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
    <div>
      <div className="border rounded-lg bg-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">應用列表</h2>
          <List
            itemLayout="horizontal"
            dataSource={displayedApps}
            renderItem={(app: App) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={app.image}
                      size={64}
                      className="rounded-full"
                    />
                  }
                  title={app.name}
                  description={
                    <div>
                      <p className="text-gray-600">{app.category}</p>
                      <p className="text-sm text-gray-500">{app.summary}</p>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
          {/* 觀察目標元素 */}
          <div ref={observerTarget} className="h-4 w-full">
            {loading && (
              <div className="text-center py-4">
                <Spin aria-label="載入中" />
              </div>
            )}
            {!hasMore && displayedApps.length > 0 && (
              <div className="text-center text-gray-500 py-4">
                沒有更多應用程式了
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppList;