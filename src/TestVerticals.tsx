import React, { useState } from 'react';

// Composant de test simple pour diagnostiquer le problème des onglets verticaux
const TestVerticals: React.FC = () => {
  const [activeTab, setActiveTab] = useState('demandes');

  const tabs = [
    { id: 'demandes', label: 'Mes Demandes', icon: '📋' },
    { id: 'documents', label: 'Documents', icon: '📄' },
    { id: 'paiements', label: 'Paiements', icon: '💳' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'profil', label: 'Mon Profil', icon: '👤' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'demandes':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Mes Demandes</h2>
            <div className="bg-white rounded-lg shadow p-4">
              <p>Liste des demandes en cours...</p>
              <div className="mt-4 space-y-2">
                <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                  <p className="font-semibold">Certificat de naissance</p>
                  <p className="text-sm text-gray-600">En attente - Déposée le 15/01/2025</p>
                </div>
                <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                  <p className="font-semibold">Extrait d'acte de mariage</p>
                  <p className="text-sm text-gray-600">Approuvée - Déposée le 10/01/2025</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'documents':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Mes Documents</h2>
            <div className="bg-white rounded-lg shadow p-4">
              <p>Documents téléchargés et disponibles...</p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">📄</span>
                    <div>
                      <p className="font-semibold">Extrait d'acte de naissance</p>
                      <p className="text-sm text-gray-500">Téléchargé le 12/01/2025</p>
                    </div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Télécharger à nouveau
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'paiements':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Mes Paiements</h2>
            <div className="bg-white rounded-lg shadow p-4">
              <p>Historique des paiements et factures...</p>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-semibold">Certificat de naissance</p>
                    <p className="text-sm text-gray-600">15 janvier 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">5,000 FC</p>
                    <p className="text-sm text-gray-500">Payé</p>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-semibold">Extrait d'acte de mariage</p>
                    <p className="text-sm text-gray-600">10 janvier 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-600">7,500 FC</p>
                    <p className="text-sm text-gray-500">En attente</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h2>
            <div className="bg-white rounded-lg shadow p-4">
              <p>Vos dernières notifications...</p>
              <div className="mt-4 space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-blue-800">Demande approuvée</p>
                      <p className="text-sm text-blue-600">Votre certificat de naissance est prêt</p>
                      <p className="text-xs text-gray-500 mt-1">Il y a 2 heures</p>
                    </div>
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-700">Rappel de paiement</p>
                      <p className="text-sm text-gray-600">Facture en attente de règlement</p>
                      <p className="text-xs text-gray-500 mt-1">Hier</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'profil':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Mon Profil</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  JD
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Jean Dupont</h3>
                  <p className="text-gray-600">jean.dupont@email.com</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Informations personnelles</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Téléphone:</span> +243 123 456 789</p>
                    <p><span className="font-medium">Adresse:</span> Kinshasa, RDC</p>
                    <p><span className="font-medium">Date de naissance:</span> 15/03/1985</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Statistiques</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Demandes totales:</span> 12</p>
                    <p><span className="font-medium">Demandes approuvées:</span> 9</p>
                    <p><span className="font-medium">Documents téléchargés:</span> 7</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                  Modifier le profil
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div className="p-6">Contenu non trouvé</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Test des Onglets Verticaux</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Test de diagnostic</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Navigation verticale */}
          <div className="w-64 bg-white rounded-lg shadow p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    console.log(`Clic sur onglet: ${tab.id}`); // Debug
                    setActiveTab(tab.id);
                  }}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-3 text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                  {activeTab === tab.id && (
                    <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </button>
              ))}
            </nav>
            
            {/* Debug info */}
            <div className="mt-6 p-3 bg-gray-50 rounded text-xs">
              <p><strong>Debug:</strong></p>
              <p>Onglet actif: <code>{activeTab}</code></p>
              <p>Dernière mise à jour: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="flex-1 bg-white rounded-lg shadow min-h-96">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestVerticals;
