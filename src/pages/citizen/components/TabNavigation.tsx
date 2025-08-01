import React from 'react';
import { TabType } from '../types';

interface TabNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  counts: {
    demands: number;
    payments: number;
    appointments: number;
  };
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab, counts }) => {
  const tabs = [
    { id: 'overview' as TabType, label: '🏠 Accueil', count: null },
    { id: 'demands' as TabType, label: '📄 Mes Demandes', count: counts.demands },
    { id: 'payments' as TabType, label: '💳 Mes Paiements', count: counts.payments },
    { id: 'appointments' as TabType, label: '📅 Mes RDV', count: counts.appointments }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex space-x-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2 px-4 font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-rdc-blue border-b-2 border-rdc-blue'
                : 'text-gray-600 hover:text-rdc-blue'
            }`}
          >
            {tab.label}
            {tab.count !== null && tab.count > 0 && (
              <span className="ml-1 bg-rdc-blue text-white text-xs px-2 py-0.5 rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
