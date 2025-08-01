import React from 'react';

const SidebarPaiementsPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-yellow-600 mb-4">💳 MES PAIEMENTS (SIDEBAR)</h1>
        <p className="text-lg text-gray-700">Gestion des paiements - Version Sidebar</p>
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
          <p className="text-yellow-800">✅ Cette page verticale fonctionne !</p>
        </div>
        
        {/* Statistiques */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800">💰 Total payé</h3>
            <p className="text-2xl font-bold text-green-600">125,000 FC</p>
          </div>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-800">⏳ En attente</h3>
            <p className="text-2xl font-bold text-yellow-600">75,000 FC</p>
          </div>
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-semibold text-red-800">⚠️ En retard</h3>
            <p className="text-2xl font-bold text-red-600">25,000 FC</p>
          </div>
        </div>

        {/* Liste des paiements */}
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Paiements récents</h2>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">🏠 Taxe foncière 2025</h3>
                <p className="text-sm text-gray-600">Échéance : 15 août 2025</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">150,000 FC</p>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">En attente</span>
              </div>
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">📄 Certificat de naissance</h3>
                <p className="text-sm text-gray-600">Payé le 20 juillet 2025</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">5,000 FC</p>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Payé</span>
              </div>
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">🚗 Amende stationnement</h3>
                <p className="text-sm text-gray-600">Échéance dépassée</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">25,000 FC</p>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">En retard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarPaiementsPage;
