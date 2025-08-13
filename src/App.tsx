import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import Header from './pages/citizen/components/Header';
import CitizenPortal from './pages/citizen/CitizenPortal';
import TestPage from './TestPage';

interface User {
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
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'utilisateur:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const handleLogin = (email: string, password: string, fullName?: string, userType?: string) => {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    let user = users.find((u: User) => u.email === email);
    
    if (!user && email.includes('admin')) {
      user = {
        id: 'admin-' + Date.now(),
        firstName: fullName ? fullName.split(' ')[0] : 'Administrateur',
        lastName: fullName ? fullName.split(' ').slice(1).join(' ') : 'Système',
        email: email,
        phone: '+243 999 999 999',
        address: 'Kinshasa, RDC',
        role: 'admin' as const
      };
    }
    
    if (!user) {
      // Créer utilisateur avec les infos du login
      const [firstName, ...lastNameParts] = (fullName || 'Utilisateur Inconnu').split(' ');
      const lastName = lastNameParts.join(' ') || 'Inconnu';
      
      user = {
        id: (userType === 'agent' ? 'agent-' : 'citizen-') + Date.now(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: '+243 000 000 000',
        address: 'Kinshasa, RDC',
        role: (userType as 'admin' | 'citizen' | 'agent') || 'citizen',
        ...(userType === 'agent' && {
          matricule: 'AG' + Date.now().toString().slice(-6),
          service: 'À définir',
          fonction: 'Agent Municipal'
        })
      };
    }
    
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    return true;
  };

  const handleRegister = (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    role?: string;
    matricule?: string;
    service?: string;
    fonction?: string;
    commune?: string;
  }) => {
    const newUser: User = {
      id: (userData.role === 'agent' ? 'agent-' : 'citizen-') + Date.now(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      role: (userData.role as 'admin' | 'citizen' | 'agent') || 'citizen',
      ...(userData.role === 'agent' && {
        matricule: userData.matricule,
        service: userData.service,
        fonction: userData.fonction,
        commune: userData.commune
      })
    };
    
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  if (currentUser) {
    return (
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route 
              path="/admin/*" 
              element={
                currentUser.role === 'admin' ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/dashboard" />
                )
              } 
            />
            <Route 
              path="/dashboard/*" 
              element={
                <>
                  <Header 
                    userName={`${currentUser.firstName} ${currentUser.lastName}`} 
                    currentUser={currentUser} 
                  />
                  <CitizenPortal currentUser={currentUser} />
                </>
              } 
            />
            <Route path="/" element={
              currentUser.role === 'admin' ? 
                <Navigate to="/admin" /> : 
                <Navigate to="/dashboard" />
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
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

export default App;
