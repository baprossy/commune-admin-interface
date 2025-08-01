import React from 'react';

const SidebarRendezVousPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">📅 RENDEZ-VOUS (SIDEBAR)</h1>
        <p className="text-lg text-gray-700">Gestion des rendez-vous - Version Sidebar</p>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800">✅ Cette page verticale fonctionne !</p>
        </div>

        {/* Prochain rendez-vous */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">🔔 Prochain rendez-vous</h2>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800">🏛️ État Civil</h3>
            <p className="text-gray-600">📅 Lundi 5 août 2025 à 09:00</p>
            <p className="text-gray-600">📍 Mairie - Bureau 12</p>
            <p className="text-sm text-blue-600 mt-2">Demande de certificat de naissance</p>
          </div>
        </div>

        {/* Liste des rendez-vous */}
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Tous mes rendez-vous</h2>
          
          <div className="p-4 border border-blue-200 rounded-lg bg-blue-25">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  🏛️ État Civil
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Confirmé</span>
                </h3>
                <p className="text-sm text-gray-600">5 août 2025 - 09:00</p>
                <p className="text-sm text-gray-600">Mairie - Bureau 12</p>
                <p className="text-xs text-blue-600 mt-1">Demande certificat de naissance</p>
              </div>
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  🏗️ Urbanisme
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">En attente</span>
                </h3>
                <p className="text-sm text-gray-600">8 août 2025 - 14:30</p>
                <p className="text-sm text-gray-600">Mairie - Bureau 5</p>
                <p className="text-xs text-blue-600 mt-1">Permis de construire</p>
              </div>
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg opacity-75">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  💰 Taxes et Impôts
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Terminé</span>
                </h3>
                <p className="text-sm text-gray-600">25 juillet 2025 - 10:15</p>
                <p className="text-sm text-gray-600">Mairie - Bureau 8</p>
                <p className="text-xs text-blue-600 mt-1">Consultation fiscale</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton nouveau RDV */}
        <div className="mt-6">
          <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
            ➕ Prendre un nouveau rendez-vous
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarRendezVousPage;
