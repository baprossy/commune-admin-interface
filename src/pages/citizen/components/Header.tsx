import React, { useState, useEffect } from 'react';
import { Bell, User, Settings, LogOut, BellRing } from 'lucide-react';
import NotificationCenter from './NotificationCenter';
import { useNotifications } from '../hooks/useNotifications';

interface HeaderProps {
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  const {
    unreadCount,
    requestNotificationPermission,
    generateTestNotifications
  } = useNotifications();

  // Vérifier la permission des notifications au chargement
  useEffect(() => {
    if ('Notification' in window) {
      setHasPermission(Notification.permission === 'granted');
    }
  }, []);

  // Demander la permission pour les notifications
  const handleRequestPermission = async () => {
    const granted = await requestNotificationPermission();
    setHasPermission(granted);
    if (granted) {
      // Générer quelques notifications de test pour démonstration
      setTimeout(() => {
        generateTestNotifications();
      }, 1000);
    }
  };

  // Fermer les menus quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = () => {
      setShowUserMenu(false);
    };

    if (showUserMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showUserMenu]);

  const formatTime = () => {
    return new Date().toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between">

          {/* Informations utilisateur et salutations */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-rdc-blue to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Bienvenue, {userName} 👋
              </h1>
              <p className="text-gray-600">
                Accédez facilement à tous vos services municipaux
              </p>
            </div>
          </div>

          {/* Actions et informations */}
          <div className="flex items-center gap-4">

            {/* Date et heure */}
            <div className="hidden md:block text-right">
              <div className="text-sm font-medium text-gray-800">
                {formatTime()}
              </div>
              <div className="text-xs text-gray-500">
                {formatDate()}
              </div>
            </div>

            {/* Centre de notifications */}
            <NotificationCenter />

            {/* Indicateur de permission */}
            {!hasPermission && 'Notification' in window && (
              <button
                onClick={handleRequestPermission}
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs p-2 rounded-full transition-colors"
                title="Activer les notifications"
              >
                Activer notifications
              </button>
            )}

            {/* Menu utilisateur */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUserMenu(!showUserMenu);
                }}
                className="flex items-center gap-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <User className="h-5 w-5 text-gray-600" />
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {userName}
                </span>
              </button>

              {/* Menu déroulant */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">{userName}</p>
                    <p className="text-xs text-gray-500">Citoyen</p>
                  </div>

                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Mon profil
                  </button>

                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Paramètres
                  </button>

                  <button
                    onClick={generateTestNotifications}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Bell className="h-4 w-4" />
                    Test notifications
                  </button>

                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Se déconnecter
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Barre de statut avec informations utiles */}
        <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Services en ligne</span>
            </div>
            {hasPermission && (
              <div className="flex items-center gap-2">
                <Bell className="h-3 w-3" />
                <span>Notifications activées</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Données synchronisées</span>
            </div>
          </div>

          <div className="text-xs text-gray-400">
            Dernière mise à jour: {formatTime()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
