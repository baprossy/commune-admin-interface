import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CitizenHome from './components/CitizenHome';

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
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Composant Mon Profil avec boutons fonctionnels
const CitizenProfile = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mon Profil</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            JD
          </div>
          <div className="ml-6">
            <h3 className="text-2xl font-semibold text-gray-800">Jean Dupont</h3>
            <p className="text-gray-600 text-lg">jean.dupont@email.com</p>
            <p className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded mt-2 inline-block">
              ✓ Compte vérifié
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-4 text-lg flex items-center">
              <span className="mr-2">👤</span> Informations personnelles
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Téléphone:</span>
                <span className="text-gray-800">+243 123 456 789</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Adresse:</span>
                <span className="text-gray-800">Kinshasa, RDC</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Date de naissance:</span>
                <span className="text-gray-800">15/03/1985</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-4 text-lg flex items-center">
              <span className="mr-2">📊</span> Statistiques
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Demandes totales:</span>
                <span className="text-blue-800 font-bold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Demandes approuvées:</span>
                <span className="text-green-600 font-bold">9</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setShowEditModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <span className="mr-2">✏️</span> Modifier le profil
            </button>
            <button 
              onClick={() => setShowPasswordModal(true)}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
            >
              <span className="mr-2">🔒</span> Changer mot de passe
            </button>
          </div>
        </div>
      </div>

      {/* Modal Modifier Profil */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Modifier le profil">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
            <input type="text" defaultValue="Jean" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input type="text" defaultValue="Dupont" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg">
              Annuler
            </button>
            <button type="submit" onClick={(e) => { e.preventDefault(); alert('Profil mis à jour !'); setShowEditModal(false); }} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
              Sauvegarder
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Mot de passe */}
      <Modal isOpen={showPasswordModal} onClose={() => setShowPasswordModal(false)} title="Changer le mot de passe">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
            <input type="password" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={() => setShowPasswordModal(false)} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg">
              Annuler
            </button>
            <button type="submit" onClick={(e) => { e.preventDefault(); alert('Mot de passe changé !'); setShowPasswordModal(false); }} className="flex-1 bg-blue-600 text-white py-2 rounded-lg">
              Changer
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

// Composant Documents avec boutons cliquables
const CitizenDocuments = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);

  const handleDownload = (docName: string) => {
    alert(`Téléchargement de: ${docName}`);
  };

  const handleView = (docName: string) => {
    alert(`Ouverture de: ${docName}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mes Documents</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">Documents téléchargés et disponibles</p>
          <button 
            onClick={() => setShowRequestModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            📄 Nouvelle demande
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 bg-blue-50">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">📋</span>
              <div>
                <p className="font-semibold">Acte de naissance</p>
                <p className="text-sm text-gray-500">12/01/2025</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleDownload('Acte de naissance')}
                className="flex-1 text-blue-600 border border-blue-300 px-3 py-1 rounded hover:bg-blue-100"
              >
                📥 Télécharger
              </button>
              <button 
                onClick={() => handleView('Acte de naissance')}
                className="border px-3 py-1 rounded hover:bg-gray-100"
              >
                👁️ Voir
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-green-50">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">🏠</span>
              <div>
                <p className="font-semibold">Certificat de résidence</p>
                <p className="text-sm text-gray-500">08/01/2025</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleDownload('Certificat de résidence')}
                className="flex-1 text-green-600 border border-green-300 px-3 py-1 rounded hover:bg-green-100"
              >
                📥 Télécharger
              </button>
              <button 
                onClick={() => handleView('Certificat de résidence')}
                className="border px-3 py-1 rounded hover:bg-gray-100"
              >
                👁️ Voir
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Nouvelle demande */}
      <Modal isOpen={showRequestModal} onClose={() => setShowRequestModal(false)} title="Nouvelle demande">
        <div className="space-y-4">
          <p>Sélectionnez le document :</p>
          <button 
            onClick={() => { alert('Demande d\'acte de naissance initiée'); setShowRequestModal(false); }}
            className="w-full p-3 border rounded hover:bg-gray-50 text-left"
          >
            📋 Acte de naissance - 5,000 FC
          </button>
          <button 
            onClick={() => { alert('Demande de certificat de résidence initiée'); setShowRequestModal(false); }}
            className="w-full p-3 border rounded hover:bg-gray-50 text-left"
          >
            🏠 Certificat de résidence - 3,000 FC
          </button>
        </div>
      </Modal>
    </div>
  );
};

// Composant Paiements avec boutons Payer
const CitizenPayments = () => {
  const handlePayment = (ref: string) => {
    alert(`Paiement initié pour ${ref}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mes Paiements</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border rounded-lg bg-green-50">
            <div>
              <p className="font-semibold">Certificat de naissance</p>
              <p className="text-sm text-gray-600">Réf: CN-2025-001</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600">5,000 FC</p>
              <p className="text-sm text-green-700 bg-green-200 px-2 py-1 rounded">✓ Payé</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-4 border rounded-lg bg-orange-50">
            <div>
              <p className="font-semibold">Acte de mariage</p>
              <p className="text-sm text-gray-600">Réf: AM-2025-002</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-bold text-orange-600">7,500 FC</p>
                <p className="text-sm text-orange-700">⏳ En attente</p>
              </div>
              <button 
                onClick={() => handlePayment('AM-2025-002')}
                className="bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700"
              >
                Payer
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-4 border rounded-lg bg-blue-50">
            <div>
              <p className="font-semibold">Taxes communales 2025</p>
              <p className="text-sm text-gray-600">Réf: TC-2025-004</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-bold text-blue-600">45,000 FC</p>
                <p className="text-sm text-blue-700">💳 À payer</p>
              </div>
              <button 
                onClick={() => handlePayment('TC-2025-004')}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Payer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant Rendez-vous avec boutons
const CitizenAppointments = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mes Rendez-vous</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">Rendez-vous programmés</p>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            📅 Nouveau RDV
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold text-blue-800">Service état civil</p>
                <p className="text-blue-600">Demain à 14h30</p>
                <p className="text-sm text-gray-600">Bureau 205</p>
              </div>
              <div>
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">Confirmé</span>
                <button 
                  onClick={() => alert('Rendez-vous annulé')}
                  className="block text-red-600 text-sm mt-1 hover:text-red-800"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Nouveau rendez-vous">
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Service</label>
            <select className="w-full border rounded px-3 py-2">
              <option>État civil</option>
              <option>Urbanisme</option>
              <option>Finances</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-300 py-2 rounded">
              Annuler
            </button>
            <button onClick={() => { alert('Rendez-vous demandé !'); setShowModal(false); }} className="flex-1 bg-blue-600 text-white py-2 rounded">
              Confirmer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Composant Services avec boutons fonctionnels
const CitizenServices = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleServiceClick = (service: string) => {
    setSelectedService(service);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Services Locaux</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg bg-blue-50">
            <div className="flex items-center mb-3">
              <span className="text-3xl mr-3">🏛️</span>
              <h3 className="font-semibold">État Civil</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Actes de naissance, mariage, décès</p>
            <button 
              onClick={() => handleServiceClick('État Civil')}
              className="w-full bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
            >
              Faire une demande
            </button>
          </div>
          
          <div className="p-4 border rounded-lg bg-orange-50">
            <div className="flex items-center mb-3">
              <span className="text-3xl mr-3">🏗️</span>
              <h3 className="font-semibold">Urbanisme</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Permis de construire</p>
            <button 
              onClick={() => handleServiceClick('Urbanisme')}
              className="w-full bg-orange-600 text-white px-3 py-2 rounded hover:bg-orange-700"
            >
              Faire une demande
            </button>
          </div>
          
          <div className="p-4 border rounded-lg bg-green-50">
            <div className="flex items-center mb-3">
              <span className="text-3xl mr-3">💰</span>
              <h3 className="font-semibold">Finances</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Taxes, impôts locaux</p>
            <button 
              onClick={() => handleServiceClick('Finances')}
              className="w-full bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
            >
              Consulter
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={selectedService}>
        <div className="space-y-4">
          <p>Service sélectionné : {selectedService}</p>
          <div className="flex gap-3">
            <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-300 py-2 rounded">
              Fermer
            </button>
            <button onClick={() => { alert(`Demande ${selectedService} initiée !`); setShowModal(false); }} className="flex-1 bg-blue-600 text-white py-2 rounded">
              Continuer
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Composant principal CitizenPortal
const CitizenPortal: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CitizenHome />} />
      <Route path="/profile" element={<CitizenProfile />} />
      <Route path="/documents" element={<CitizenDocuments />} />
      <Route path="/payments" element={<CitizenPayments />} />
      <Route path="/appointments" element={<CitizenAppointments />} />
      <Route path="/services" element={<CitizenServices />} />
    </Routes>
  );
};

export default CitizenPortal;
