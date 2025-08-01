import React from 'react';
import { Menu, LogOut, User, Bell } from 'lucide-react';

interface HeaderProps {
  userRole: 'admin' | 'citizen';
  onLogout: () => void;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, onLogout, onToggleSidebar }) => {
  return (
    <header className="bg-white shadow-lg border-b-4 border-rdc-blue sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-8 rounded-sm overflow-hidden shadow-md relative">
              <div className="w-full h-full relative" style={{
                background: 'linear-gradient(135deg, #0066CC 0%, #0066CC 25%, #FFD700 25%, #FFD700 27%, #FF0000 27%, #FF0000 73%, #FFD700 73%, #FFD700 75%, #0066CC 75%, #0066CC 100%)'
              }}>
                <svg className="absolute top-1 left-1.5" width="12" height="12" viewBox="0 0 24 24" fill="#FFD700">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
            
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Administration Communale
              </h1>
              <p className="text-sm text-rdc-blue font-medium">
                République Démocratique du Congo
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-rdc-blue hover:bg-gray-100 rounded-lg">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-rdc-red rounded-full border-2 border-white"></span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">
                {userRole === 'admin' ? 'Administrateur' : 'Citoyen'}
              </p>
              <p className="text-xs text-gray-500">
                {userRole === 'admin' ? 'Gestion municipale' : 'Services citoyens'}
              </p>
            </div>
            
            <div className="w-8 h-8 bg-gradient-to-r from-rdc-blue to-rdc-yellow rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>

            <button
              onClick={onLogout}
              className="p-2 text-gray-600 hover:text-rdc-red hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-rdc-blue via-rdc-yellow to-rdc-red"></div>
    </header>
  );
};

export default Header;
