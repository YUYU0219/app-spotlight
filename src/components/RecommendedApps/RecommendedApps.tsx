import React, { useState } from 'react';
import { Card, Modal, Rate, Tag, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { App, selectFilteredApps } from '../../store/appsSlice';
import './RecommendedApps.css';

const RecommendedApps: React.FC = () => {
  const filteredApps = useSelector(selectFilteredApps);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (app: App) => {
    setSelectedApp(app);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedApp(null);
  };

  const AppPreview = ({ app }: { app: App }) => (
    <div className="p-4 max-w-xs">
      <div className="flex gap-4">
        <img
          src={app.image}
          alt={app.name}
          className="w-16 h-16 rounded-xl shadow-sm"
        />
        <div>
          <h4 className="font-semibold text-gray-800">{app.name}</h4>
          <p className="text-sm text-gray-500">{app.category}</p>
          <div className="flex items-center gap-1 mt-1">
            <Rate disabled defaultValue={4.5} allowHalf className="text-sm" />
            <span className="text-xs text-gray-500">(1.2k)</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{app.summary}</p>
    </div>
  );

  return (
    <div className="recommended-apps">
      <h2 className="recommended-title">推薦應用</h2>
      <div className="apps-container">
        <div className="apps-list">
          {filteredApps.map((app: App) => (
            <Tooltip
              key={app.id}
              title={<AppPreview app={app} />}
              placement="right"
              mouseEnterDelay={0.5}
              mouseLeaveDelay={0.1}
            >
              <div className="app-card" onClick={() => showModal(app)}>
                <Card
                  hoverable
                  className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-blue-100 bg-gradient-to-b from-white to-blue-50 cursor-pointer"
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
            </Tooltip>
          ))}
        </div>
      </div>

      <Modal
        title={null}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        className="app-detail-modal"
      >
        {selectedApp && (
          <div className="app-detail-content">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <img
                  src={selectedApp.image}
                  alt={selectedApp.name}
                  className="w-48 h-48 rounded-2xl shadow-lg"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedApp.name}</h2>
                <div className="flex items-center gap-2 mb-4">
                  <Tag color="blue">{selectedApp.category}</Tag>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-500">4.5 MB</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Rate disabled defaultValue={4.5} allowHalf />
                  <span className="text-gray-500">(1.2k 評分)</span>
                </div>
                <p className="text-gray-600 mb-4">{selectedApp.summary}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>年齡分級 4+</span>
                  <span>•</span>
                  <span>更新日期 2024-03-15</span>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">應用截圖</h3>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {/* 這裡可以添加應用截圖 */}
                <div className="w-48 h-32 bg-gray-100 rounded-lg flex-shrink-0"></div>
                <div className="w-48 h-32 bg-gray-100 rounded-lg flex-shrink-0"></div>
                <div className="w-48 h-32 bg-gray-100 rounded-lg flex-shrink-0"></div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RecommendedApps; 