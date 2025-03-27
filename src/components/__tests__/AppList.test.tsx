import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import AppList from '../AppList/AppList'
import appsReducer, { setFreeApps } from '../../store/appsSlice'

// 創建測試用的 store
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      apps: appsReducer,
    },
    preloadedState: {
      apps: {
        freeApps: [],
        recommendedApps: [],
        allApps: [],
        searchQuery: '',
        loading: false,
        error: null,
        ...initialState,
      },
    },
  })
}

// 模擬數據
const mockApps = [
  {
    id: '1',
    name: 'Youtube',
    category: '照片和影片',
    summary: '這是一個測試應用',
  },
  {
    id: '2',
    name: 'Line',
    category: '社交',
    summary: '這是另一個測試應用',
  },
  {
    id: '3',
    name: '麻將明星3缺1',
    category: '遊戲',
    summary: '這是一個遊戲應用',
  },
]

describe('AppList 組件', () => {
  it('應該正確渲染應用列表', () => {
    const store = createTestStore({ freeApps: mockApps })
    render(
      <Provider store={store}>
        <AppList />
      </Provider>
    )

    // 檢查標題
    expect(screen.getByText('應用列表')).toBeInTheDocument()

    // 檢查應用項目
    expect(screen.getByText('Youtube')).toBeInTheDocument()
    expect(screen.getByText('Line')).toBeInTheDocument()
    expect(screen.getByText('麻將明星3缺1')).toBeInTheDocument()
  })

  it('應該顯示載入狀態', () => {
    const store = createTestStore({ loading: true })
    render(
      <Provider store={store}>
        <AppList />
      </Provider>
    )

    // 使用 aria-busy 屬性來檢查載入狀態
    const loadingElement = screen.getByLabelText('載入中')
    expect(loadingElement).toBeInTheDocument()
    expect(loadingElement).toHaveAttribute('aria-busy', 'true')
  })

  it('應該顯示沒有更多應用的提示', async () => {
    const store = createTestStore({ freeApps: mockApps })
    render(
      <Provider store={store}>
        <AppList />
      </Provider>
    )

    // 等待並檢查提示文字
    await waitFor(() => {
      expect(screen.getByText('沒有更多應用程式了')).toBeInTheDocument()
    })
  })

  it('應該根據搜尋關鍵字過濾應用', async () => {
    const store = createTestStore({
      freeApps: mockApps,
      searchQuery: '遊戲'
    })
    render(
      <Provider store={store}>
        <AppList />
      </Provider>
    )

    // 等待並檢查過濾結果
    await waitFor(() => {
      expect(screen.getByText('麻將明星3缺1')).toBeInTheDocument()
      expect(screen.queryByText('Youtube')).not.toBeInTheDocument()
      expect(screen.queryByText('Line')).not.toBeInTheDocument()
    })
  })
}) 