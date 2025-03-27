import React from 'react';
import { Input } from 'antd';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/appsSlice';
import './StickySearchBar.css';

const StickySearchBar: React.FC = () => {
  const dispatch = useDispatch();

  const handleSearch = (value: string) => {
    dispatch(setSearchQuery(value));
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-content">
        <Input
          size="large"
          placeholder="搜尋應用程式..."
          prefix={<Search className="search-icon" />}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default StickySearchBar; 