import React from 'react';
import { Home, User, FileText, CreditCard, Calendar, MapPin, ChevronRight } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  console.log('Sidebar render - activeSection:', activeSection);

  const menuItems = [
    {
      id: 'accueil',
      label: 'Accueil',
      icon: Home,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Vue d\'ensemble'
    },
    {
      id: 'profil',
      label: 'Mon Profil',
      icon: User,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Informations personnelles'
    },
    {
      id: 'documents',
      label: 'Mes Documents',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Demandes et téléchargements'
    },
    {
      id: 'paiements',
      label: 'Mes Paiements',
      icon: CreditCard,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      description: 'Factures et historique'
    },
    {
      id: 'rendez-vous',
      label: 'Rendez-vous',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Prendre et gérer RDV'
    },
    {
      id: 'services-locaux',
      label: 'Services Locaux',
      icon: MapPin,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Services municipaux'
    }
  ];

  const handleClick = (itemId: string) => {
    console.log('=== CLICK DETECTED ===');
    console.log('Clicked item:', itemId);
    console.log('Current activeSection:', activeSection);
    console.log('Calling onSectionChange...');
    
    try {
      onSectionChange(itemId);
      console.log('onSectionChange called successfully');
    } catch (error) {
      console.error('Error calling onSectionChange:', error);
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-gradient-to-r from-rdc-blue to-blue-700 rounded-full flex items-center justify-center">
            <Home className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-800">Services Citoyens</h2>
          </div>
        </div>
        <p className="text-sm text-gray-500">Portail citoyen</p>
      </div>

      {/* Menu Items */}
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <div
                key={item.id}
                onClick={() => handleClick(item.id)}
                onMouseDown={() => console.log('MouseDown on:', item.id)}
                onMouseUp={() => console.log('MouseUp on:', item.id)}
                style={{ 
                  cursor: 'pointer',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none'
                }}
                className={`
                  w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 cursor-pointer
                  ${isActive 
                    ? `${item.bgColor} ${item.color} shadow-sm border border-current border-opacity-20` 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-white bg-opacity-70' : 'bg-gray-100'}`}>
                    <Icon className={`w-4 h-4 ${isActive ? item.color : 'text-gray-500'}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className={`text-xs ${isActive ? 'text-current opacity-80' : 'text-gray-400'}`}>
                      {item.description}
                    </div>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90' : ''}`} />
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mb-2"></div>
          <p className="text-xs text-gray-500">Services en ligne</p>
          <p className="text-xs text-gray-400">Connecté</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
