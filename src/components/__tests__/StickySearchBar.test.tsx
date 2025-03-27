import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import SearchBar from '../SearchBar/SearchBar'
import appsReducer from '../../store/appsSlice'

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

describe('StickySearchBar 組件', () => {
  it('應該正確渲染搜尋框', () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    )

    expect(screen.getByPlaceholderText('搜尋應用程式...')).toBeInTheDocument()
  })

  it('應該在輸入時更新搜尋關鍵字', () => {
    const store = createTestStore()
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    )

    const searchInput = screen.getByPlaceholderText('搜尋應用程式...')
    fireEvent.change(searchInput, { target: { value: '測試' } })

    // 檢查 store 中的搜尋關鍵字是否更新
    expect(store.getState().apps.searchQuery).toBe('測試')
  })
}) 