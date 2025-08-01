import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import AdminDashboard from './pages/admin/AdminDashboard';
import CitizenPortal from './pages/citizen/CitizenPortal';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import TestPage from './TestPage';
import './index.css';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  role: 'admin' | 'citizen';
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Charger l'utilisateur connecté depuis le localStorage au démarrage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erreur parsing savedUser:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Récupérer tous les utilisateurs enregistrés
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    // Chercher l'utilisateur avec cet email
    let user = users.find((u: User) => u.email === email);

    // Si pas trouvé, créer un utilisateur admin par défaut pour les emails admin
    if (!user && email.includes('admin')) {
      user = {
        id: 'admin-' + Date.now(),
        firstName: 'Administrateur',
        lastName: 'Système',
        email: email,
        phone: '+243 000 000 000',
        address: 'Kinshasa, RDC',
        role: 'admin' as const
      };
    }

    // Si toujours pas trouvé, créer un utilisateur citoyen par défaut
    if (!user) {
      user = {
        id: 'citizen-' + Date.now(),
        firstName: 'Utilisateur',
        lastName: 'Inconnu',
        email: email,
        phone: '+243 000 000 000',
        address: 'Kinshasa, RDC',
        role: 'citizen' as const
      };
    }

    console.log('Connexion utilisateur:', user);

    // Connecter l'utilisateur
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Ouvrir la sidebar sur desktop après login
    if (window.innerWidth >= 1024) {
      setSidebarOpen(true);
    }
  };

  const handleRegister = (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  }) => {
    console.log('Données inscription reçues:', userData);

    // Créer le nouvel utilisateur avec les VRAIES données
    const newUser: User = {
      id: 'citizen-' + Date.now(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      role: 'citizen'
    };

    console.log('Nouvel utilisateur créé:', newUser);

    // Sauvegarder dans la liste des utilisateurs enregistrés
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

    // Connecter automatiquement le nouvel utilisateur
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    console.log('Utilisateur sauvegardé et connecté:', newUser);

    // Ouvrir la sidebar sur desktop après inscription
    if (window.innerWidth >= 1024) {
      setSidebarOpen(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setSidebarOpen(false);
    localStorage.removeItem('currentUser');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-rdc-blue to-blue-900">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onRegister={handleRegister} />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header
          userRole={currentUser!.role}
          onLogout={handleLogout}
          onToggleSidebar={toggleSidebar}
        />
        <div className="flex relative">
          <Sidebar
            userRole={currentUser!.role}
            isOpen={sidebarOpen}
            onClose={closeSidebar}
          />
          <main className={`flex-1 transition-all duration-300 ${
            !isMobile && sidebarOpen ? 'ml-64' :
            isMobile ? 'ml-0' :
            'ml-0'
          }`}>
            <div className="p-4 md:p-6">
              <Routes>
                {currentUser!.role === 'admin' && (
                  <>
                    <Route path="/admin/*" element={<AdminDashboard />} />
                    <Route path="/" element={<Navigate to="/admin" />} />
                  </>
                )}
                {currentUser!.role === 'citizen' && (
                  <>
                    <Route path="/citizen/*" element={<CitizenPortal />} />
                    <Route path="/" element={<Navigate to="/citizen" />} />
                  </>
                )}
                <Route path="/test" element={<TestPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
