import React, { useState, useEffect } from 'react';
import { Bell, User, Settings, LogOut, BellRing } from 'lucide-react';
import NotificationCenter from './NotificationCenter';
import { useNotifications } from '../hooks/useNotifications';

interface HeaderProps {
  userName: string;
  currentUser?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    role: 'admin' | 'citizen' | 'agent';
    matricule?: string;
    service?: string;
    fonction?: string;
    commune?: string;
  };
}

// Composant Drapeau RDC (plus grand)
const DrapeauRDC = () => (
  <svg width="60" height="40" viewBox="0 0 60 40" className="border border-gray-300 rounded shadow-sm">
    {/* Fond bleu */}
    <rect width="60" height="40" fill="#007FFF"/>
    {/* Bande diagonale rouge */}
    <path d="M0 30 L60 10 L60 20 L0 40 Z" fill="#CE1126"/>
    {/* Bordures jaunes de la bande rouge */}
    <path d="M0 28 L60 8 L60 10 L0 30 Z" fill="#F7D618"/>
    <path d="M0 40 L60 20 L60 22 L0 42 Z" fill="#F7D618"/>
    {/* Étoile jaune */}
    <polygon points="15,8 17,14 23,14 18,18 20,24 15,20 10,24 12,18 7,14 13,14" fill="#F7D618"/>
  </svg>
);

// Composant Armoiries Authentiques (exactement comme l'image fournie)
const ArmoiriesCommune = () => (
  <svg width="65" height="75" viewBox="0 0 65 75" className="border border-gray-300 rounded shadow-md bg-white">
    {/* Lances croisées en arrière-plan */}
    <line x1="15" y1="10" x2="30" y2="40" stroke="#8B4513" strokeWidth="4"/>
    <line x1="50" y1="10" x2="35" y2="40" stroke="#8B4513" strokeWidth="4"/>
    
    {/* Pointes de lances métalliques */}
    <polygon points="12,8 18,8 15,15" fill="#C0C0C0" stroke="#808080" strokeWidth="1"/>
    <polygon points="47,8 53,8 50,15" fill="#C0C0C0" stroke="#808080" strokeWidth="1"/>
    
    {/* Tête de léopard - forme plus réaliste */}
    <ellipse cx="32.5" cy="28" rx="15" ry="12" fill="#FFD700" stroke="#FFA500" strokeWidth="2"/>
    
    {/* Oreilles du léopard */}
    <ellipse cx="24" cy="20" rx="4" ry="5" fill="#FFD700" stroke="#FFA500" strokeWidth="1"/>
    <ellipse cx="41" cy="20" rx="4" ry="5" fill="#FFD700" stroke="#FFA500" strokeWidth="1"/>
    <ellipse cx="24" cy="22" rx="2" ry="3" fill="#FF8C00"/>
    <ellipse cx="41" cy="22" rx="2" ry="3" fill="#FF8C00"/>
    
    {/* Yeux du léopard - plus expressifs */}
    <ellipse cx="28" cy="25" rx="3" ry="4" fill="#000000"/>
    <ellipse cx="37" cy="25" rx="3" ry="4" fill="#000000"/>
    <ellipse cx="28" cy="24" rx="1.5" ry="2" fill="#ffffff"/>
    <ellipse cx="37" cy="24" rx="1.5" ry="2" fill="#ffffff"/>
    
    {/* Nez triangulaire */}
    <polygon points="32.5,30 30,33 35,33" fill="#000000"/>
    
    {/* Bouche féroce avec crocs */}
    <path d="M32.5 33 Q25 38 18 36" stroke="#000000" strokeWidth="2" fill="none"/>
    <path d="M32.5 33 Q40 38 47 36" stroke="#000000" strokeWidth="2" fill="none"/>
    
    {/* Crocs proéminents */}
    <polygon points="26,36 24,42 29,38" fill="#ffffff" stroke="#000000" strokeWidth="1"/>
    <polygon points="39,36 41,42 36,38" fill="#ffffff" stroke="#000000" strokeWidth="1"/>
    <polygon points="30,38 28,44 33,40" fill="#ffffff" stroke="#000000" strokeWidth="1"/>
    <polygon points="35,38 37,44 32,40" fill="#ffffff" stroke="#000000" strokeWidth="1"/>
    
    {/* Taches de léopard caractéristiques */}
    <circle cx="26" cy="22" r="1.5" fill="#B8860B"/>
    <circle cx="39" cy="22" r="1.5" fill="#B8860B"/>
    <circle cx="22" cy="30" r="1.2" fill="#B8860B"/>
    <circle cx="43" cy="30" r="1.2" fill="#B8860B"/>
    <circle cx="32.5" cy="18" r="1" fill="#B8860B"/>
    <circle cx="28" cy="32" r="0.8" fill="#B8860B"/>
    <circle cx="37" cy="32" r="0.8" fill="#B8860B"/>
    
    {/* Banderoles rouges "TRAVAIL" */}
    <path d="M8 45 Q15 42 22 45 Q15 48 8 45" fill="#DC143C" stroke="#8B0000" strokeWidth="1"/>
    <text x="15" y="47" textAnchor="middle" fontSize="5" fill="#ffffff" fontWeight="bold">TRAVAIL</text>
    
    {/* Banderoles rouges "PROGRES" */}
    <path d="M57 45 Q50 42 43 45 Q50 48 57 45" fill="#DC143C" stroke="#8B0000" strokeWidth="1"/>
    <text x="50" y="47" textAnchor="middle" fontSize="5" fill="#ffffff" fontWeight="bold">PROGRES</text>
    
    {/* Socle "PAIX" - plus fidèle à l'original */}
    <ellipse cx="32.5" cy="58" rx="25" ry="6" fill="#DEB887" stroke="#8B7355" strokeWidth="1"/>
    <rect x="15" y="55" width="35" height="8" rx="3" fill="#DC143C" stroke="#8B0000" strokeWidth="1"/>
    <text x="32.5" y="61" textAnchor="middle" fontSize="7" fill="#ffffff" fontWeight="bold">PAIX</text>
    
    {/* Ombrage pour le relief */}
    <ellipse cx="32.5" cy="28" rx="13" ry="10" fill="none" stroke="#DAA520" strokeWidth="1" opacity="0.7"/>
  </svg>
);

const Header: React.FC<HeaderProps> = ({ userName, currentUser }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const { unreadCount, requestNotificationPermission, generateTestNotifications } = useNotifications();

  // Auto-correction du rôle si nécessaire
  useEffect(() => {
    if (currentUser && currentUser.role === 'citizen' && currentUser.email && 
        (currentUser.email.includes('agent') || currentUser.matricule || currentUser.service)) {
      // Correction automatique en agent
      const updatedUser = {
        ...currentUser,
        role: 'agent' as const,
        matricule: currentUser.matricule || 'AG2024' + Math.floor(Math.random() * 1000),
        service: currentUser.service || 'État Civil',
        fonction: currentUser.fonction || 'Agent Municipal'
      };
      
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Mettre à jour aussi dans registeredUsers
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userIndex = users.findIndex((u: any) => u.email === currentUser.email);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('registeredUsers', JSON.stringify(users));
      }
    }
  }, [currentUser]);

  useEffect(() => {
    if ('Notification' in window) {
      setHasPermission(Notification.permission === 'granted');
    }
  }, []);

  const handleNotificationRequest = async () => {
    const granted = await requestNotificationPermission();
    setHasPermission(granted);
  };

  const handleTestNotifications = () => {
    generateTestNotifications();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showUserMenu]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  };

  const getCommuneName = () => {
    if (currentUser?.commune) {
      return currentUser.commune;
    }
    
    if (currentUser?.address) {
      const address = currentUser.address.toLowerCase();
      
      // Patterns spécifiques pour identifier la commune
      const communePatterns = [
        /commune\s+de\s+([^,]+)/i,
        /commune\s+([^,]+)/i,
        /([^,\s]+)\s+commune/i,
        /bureau\s+communal\s+de\s+([^,]+)/i,
        /mairie\s+de\s+([^,]+)/i,
        // Nouveaux patterns pour capturer juste le nom de commune
        /^([^,\s]+)/i  // Premier mot de l'adresse
      ];
      
      for (const pattern of communePatterns) {
        const match = address.match(pattern);
        if (match) {
          const communeName = match[1].trim().toUpperCase();
          // Vérifier que c'est bien un nom de commune (pas une rue/avenue)
          if (!communeName.includes('RUE') && 
              !communeName.includes('AVENUE') && 
              !communeName.includes('BOULEVARD') &&
              communeName.length < 15) {
            return communeName;
          }
        }
      }
    }
    
    return 'KINSHASA'; // Fallback par défaut
  };

  const getUserStatusDisplay = () => {
    if (currentUser?.role === 'agent') return 'Agent Municipal';
    if (currentUser?.role === 'admin') return 'Administrateur';
    return 'Citoyen';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Section gauche avec Drapeau + Logo + Titre */}
        <div className="flex items-center">
          {/* Drapeau RDC */}
          <div className="mr-4">
            <DrapeauRDC />
          </div>
          
          {/* Logo et titre */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-semibold text-gray-800">
                Administration Communale de {getCommuneName()}
              </h1>
              {currentUser?.role === 'agent' && currentUser?.service && (
                <p className="text-sm text-gray-600">
                  Service {currentUser.service}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section droite */}
        <div className="flex items-center space-x-4">
          {/* Avatar et message de bienvenue */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3 hidden lg:block">
              <p className="text-sm font-medium text-gray-700">
                Bienvenue, {userName} 👋
              </p>
              {currentUser?.role === 'agent' && currentUser?.fonction && (
                <p className="text-xs text-gray-500">
                  {currentUser.fonction}
                </p>
              )}
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <NotificationCenter />
          </div>

          {/* Test notifications (développement) */}
          <div className="flex items-center space-x-2">
            {!hasPermission && (
              <button
                onClick={handleNotificationRequest}
                className="px-3 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full hover:bg-yellow-200 transition-colors"
              >
                Activer notifications
              </button>
            )}
            <button
              onClick={handleTestNotifications}
              className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
            >
              Test notif
            </button>
          </div>

          {/* Menu utilisateur */}
          <div className="relative user-menu-container">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <User className="h-5 w-5 text-gray-600" />
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {userName}
              </span>
            </button>
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">{userName}</p>
                  <p className="text-xs text-gray-500">{getUserStatusDisplay()}</p>
                  {currentUser?.role === 'agent' && (
                    <>
                      {currentUser?.matricule && (
                        <p className="text-xs text-blue-600">Mat: {currentUser.matricule}</p>
                      )}
                      {currentUser?.service && (
                        <p className="text-xs text-gray-500">{currentUser.service}</p>
                      )}
                    </>
                  )}
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Mon profil
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Paramètres
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Se déconnecter
                </button>
              </div>
            )}
          </div>

          {/* Armoiries Communales */}
          <div className="ml-4">
            <ArmoiriesCommune />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
