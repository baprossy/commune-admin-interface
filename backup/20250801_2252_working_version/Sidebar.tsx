import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Users, CreditCard, FileText, Vote, BarChart3, Settings,
  User, Receipt, MapPin, Calendar, X, ChevronRight 
} from 'lucide-react';

interface SidebarProps {
  userRole: 'admin' | 'citizen';
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ userRole, isOpen, onClose }) => {
  const location = useLocation();

  const adminMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/admin', color: 'text-rdc-blue' },
    { icon: Users, label: 'Citoyens', path: '/admin/citizens', color: 'text-green-600' },
    { icon: CreditCard, label: 'Paiements', path: '/admin/payments', color: 'text-rdc-yellow' },
    { icon: FileText, label: 'Documents', path: '/admin/documents', color: 'text-purple-600' },
    { icon: Vote, label: 'Élections', path: '/admin/elections', color: 'text-rdc-red' },
    { icon: BarChart3, label: 'Statistiques', path: '/admin/stats', color: 'text-indigo-600' },
    { icon: Settings, label: 'Paramètres', path: '/admin/settings', color: 'text-gray-600' },
  ];

  const citizenMenuItems = [
    { icon: Home, label: 'Accueil', path: '/citizen', color: 'text-rdc-blue' },
    { icon: User, label: 'Mon Profil', path: '/citizen/profile', color: 'text-green-600' },
    { icon: FileText, label: 'Mes Documents', path: '/citizen/documents', color: 'text-purple-600' },
    { icon: Receipt, label: 'Mes Paiements', path: '/citizen/payments', color: 'text-rdc-yellow' },
    { icon: Calendar, label: 'Rendez-vous', path: '/citizen/appointments', color: 'text-blue-600' },
    { icon: MapPin, label: 'Services Locaux', path: '/citizen/services', color: 'text-rdc-red' },
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : citizenMenuItems;

  const isActive = (path: string) => {
    if (path === '/admin' || path === '/citizen') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLinkClick = () => {
    // Fermer la sidebar sur mobile après clic
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay mobile - couvre tout l'écran */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-2xl border-r border-gray-200 
        transform transition-transform duration-300 z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:top-0 lg:h-[calc(100vh-4.5rem)]
      `}>
        {/* Header sidebar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-800 text-lg">
              {userRole === 'admin' ? 'Administration' : 'Services Citoyens'}
            </h2>
            {/* Bouton fermer visible seulement sur mobile */}
            <button 
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {userRole === 'admin' ? 'Gestion municipale' : 'Portail citoyen'}
          </p>
        </div>

        {/* Menu navigation */}
        <nav className="p-4 overflow-y-auto h-[calc(100%-180px)]">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={handleLinkClick}
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200
                      hover:bg-gray-50 group cursor-pointer
                      ${active 
                        ? 'bg-gradient-to-r from-rdc-blue to-blue-600 text-white shadow-lg' 
                        : 'text-gray-700 hover:text-rdc-blue hover:bg-blue-50'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon 
                        className={`h-5 w-5 ${
                          active ? 'text-white' : item.color
                        }`} 
                      />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronRight 
                      className={`h-4 w-4 transition-transform duration-200 ${
                        active ? 'text-white rotate-90' : 'text-gray-400 group-hover:text-rdc-blue'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer sidebar avec drapeau RDC */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-rdc-blue to-blue-700 text-white">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="w-16 h-10 rounded-lg overflow-hidden shadow-lg relative" style={{
                background: 'linear-gradient(135deg, #0066CC 0%, #0066CC 25%, #FFD700 25%, #FFD700 27%, #FF0000 27%, #FF0000 73%, #FFD700 73%, #FFD700 75%, #0066CC 75%, #0066CC 100%)'
              }}>
                <svg className="absolute top-1.5 left-2" width="16" height="16" viewBox="0 0 24 24" fill="#FFD700">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
            <p className="text-sm font-bold">République Démocratique</p>
            <p className="text-xs opacity-90">du Congo</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
