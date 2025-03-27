import React from 'react';
import { Card } from 'antd';
import { useSelector } from 'react-redux';
import { App, selectFilteredApps } from '../store/appsSlice';
import './RecommendedApps.css';

const RecommendedApps: React.FC = () => {
  const filteredApps = useSelector(selectFilteredApps);

  return (
    <div className="recommended-apps">
      <h2 className="recommended-title">推薦應用</h2>
      <div className="apps-container">
        <div className="apps-list">
          {filteredApps.map((app: App) => (
            <div key={app.id} className="app-card">
              <Card
                hoverable
                className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-blue-100 bg-gradient-to-b from-white to-blue-50"
                cover={
                  <div className="app-card-container">
                    <img
                      alt={app.name}
                      src={app.image}
                      className="app-image"
                    />
                    <div className="app-info">
                      <h3 className="app-name">{app.name}</h3>
                      <p className="app-category">{app.category}</p>
                    </div>
                  </div>
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedApps; 