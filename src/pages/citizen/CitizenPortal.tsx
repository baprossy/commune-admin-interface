import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { User, FileText, CreditCard, Calendar, Settings, Home } from 'lucide-react';
import CitizenHome from './components/CitizenHome';
import ServicesPage from './pages/ServicesPage';

// Interface pour les props du composant principal
interface CitizenPortalProps {
  currentUser: {
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

// Interface pour les props du profil
interface CitizenProfileProps {
  currentUser: CitizenPortalProps['currentUser'];
}

// Composant Modal réutilisable
const Modal = ({ isOpen, onClose, title, children }: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Composant Profile corrigé avec les vraies données et rôles
const CitizenProfile = ({ currentUser }: CitizenProfileProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Déterminer le statut utilisateur
  const getUserStatus = () => {
    if (currentUser.role === 'agent') return 'Agent Municipal';
    if (currentUser.role === 'admin') return 'Administrateur';
    return 'Citoyen';
  };

  const getUserStatusColor = () => {
    if (currentUser.role === 'agent') return 'text-blue-600 bg-blue-100';
    if (currentUser.role === 'admin') return 'text-purple-600 bg-purple-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Mon Profil</h2>
      
      {/* Section Profil Principal */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {currentUser.firstName.charAt(0)}{currentUser.lastName.charAt(0)}
          </div>
          <div className="ml-6">
            <h3 className="text-2xl font-semibold text-gray-800">{currentUser.firstName} {currentUser.lastName}</h3>
            <p className="text-gray-600 text-lg">{currentUser.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <p className={`text-sm px-2 py-1 rounded inline-block ${getUserStatusColor()}`}>
                ✓ {getUserStatus()}
              </p>
              <p className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded inline-block">
                ✓ Compte vérifié
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input type="text" defaultValue={currentUser.firstName} className="w-full border rounded-lg px-3 py-2" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input type="text" defaultValue={currentUser.lastName} className="w-full border rounded-lg px-3 py-2" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" defaultValue={currentUser.email} className="w-full border rounded-lg px-3 py-2" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <input type="text" defaultValue={getUserStatus()} className="w-full border rounded-lg px-3 py-2" readOnly />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input type="tel" defaultValue={currentUser.phone} className="w-full border rounded-lg px-3 py-2" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <textarea defaultValue={currentUser.address} className="w-full border rounded-lg px-3 py-2 h-20" readOnly />
            </div>
            
            {/* Champs spécifiques aux agents */}
            {currentUser.role === 'agent' && (
              <>
                {currentUser.matricule && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Matricule</label>
                    <input type="text" defaultValue={currentUser.matricule} className="w-full border rounded-lg px-3 py-2" readOnly />
                  </div>
                )}
                {currentUser.service && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                    <input type="text" defaultValue={currentUser.service} className="w-full border rounded-lg px-3 py-2" readOnly />
                  </div>
                )}
                {currentUser.fonction && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fonction</label>
                    <input type="text" defaultValue={currentUser.fonction} className="w-full border rounded-lg px-3 py-2" readOnly />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button 
            onClick={() => setShowEditModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Modifier le profil
          </button>
          <button 
            onClick={() => setShowPasswordModal(true)}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Changer le mot de passe
          </button>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Modifier le profil">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
            <input type="text" defaultValue={currentUser.firstName} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input type="text" defaultValue={currentUser.lastName} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input type="tel" defaultValue={currentUser.phone} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
            <textarea defaultValue={currentUser.address} className="w-full border rounded-lg px-3 py-2 h-20" />
          </div>
          
          {/* Champs agents dans le modal d'édition */}
          {currentUser.role === 'agent' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                <select defaultValue={currentUser.service} className="w-full border rounded-lg px-3 py-2">
                  <option value="Etat Civil">État Civil</option>
                  <option value="Urbanisme">Urbanisme</option>
                  <option value="Fiscalite">Fiscalité</option>
                  <option value="Social">Social</option>
                  <option value="Technique">Technique</option>
                  <option value="Securite">Sécurité</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fonction</label>
                <input type="text" defaultValue={currentUser.fonction} className="w-full border rounded-lg px-3 py-2" />
              </div>
            </>
          )}
          
          <div className="flex justify-end gap-3 mt-6">
            <button 
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Annuler
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Sauvegarder
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showPasswordModal} onClose={() => setShowPasswordModal(false)} title="Changer le mot de passe">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
            <input type="password" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
            <input type="password" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le nouveau mot de passe</label>
            <input type="password" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button 
              onClick={() => setShowPasswordModal(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Annuler
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Changer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Autres composants
const CitizenDocuments = () => (
  <div className="max-w-4xl mx-auto p-6">
    <h2 className="text-3xl font-bold text-gray-800 mb-8">Mes Documents</h2>
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-600">Fonctionnalité en cours de développement...</p>
    </div>
  </div>
);

const CitizenServices = () => <ServicesPage />;

const CitizenRequests = () => (
  <div className="max-w-4xl mx-auto p-6">
    <h2 className="text-3xl font-bold text-gray-800 mb-8">Mes Demandes</h2>
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-600">Fonctionnalité en cours de développement...</p>
    </div>
  </div>
);

// Composant Sidebar
const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: Home, label: 'Accueil' },
    { path: '/dashboard/profile', icon: User, label: 'Mon Profil' },
    { path: '/dashboard/services', icon: Settings, label: 'Services' },
    { path: '/dashboard/documents', icon: FileText, label: 'Documents' },
    { path: '/dashboard/requests', icon: Calendar, label: 'Mes Demandes' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">Menu</h2>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                isActive ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

// Composant principal avec LAYOUT COMPLET
const CitizenPortal: React.FC<CitizenPortalProps> = ({ currentUser }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Contenu principal */}
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<CitizenHome />} />
          <Route path="/profile" element={<CitizenProfile currentUser={currentUser} />} />
          <Route path="/documents" element={<CitizenDocuments />} />
          <Route path="/services" element={<CitizenServices />} />
          <Route path="/requests" element={<CitizenRequests />} />
        </Routes>
      </div>
    </div>
  );
};

export default CitizenPortal;
