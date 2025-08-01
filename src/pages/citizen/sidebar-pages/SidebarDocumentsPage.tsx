import React from 'react';

const SidebarDocumentsPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-purple-600 mb-4">📄 MES DOCUMENTS (SIDEBAR)</h1>
        <p className="text-lg text-gray-700">Gestion des documents - Version Sidebar</p>
        <div className="mt-4 p-4 bg-purple-50 rounded-lg">
          <p className="text-purple-800">✅ Cette page verticale fonctionne !</p>
        </div>
        <div className="mt-6 space-y-4">
          <div className="p-4 border border-purple-200 rounded-lg bg-purple-25">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              📄 Certificat de naissance
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Prêt</span>
            </h3>
            <p className="text-sm text-gray-600 mt-1">Demandé le 20 juillet 2025</p>
          </div>
          <div className="p-4 border border-purple-200 rounded-lg">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              🏠 Attestation de résidence
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">En traitement</span>
            </h3>
            <p className="text-sm text-gray-600 mt-1">Demandé le 25 juillet 2025</p>
          </div>
          <div className="p-4 border border-purple-200 rounded-lg">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              ⚖️ Casier judiciaire
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">En attente</span>
            </h3>
            <p className="text-sm text-gray-600 mt-1">Demandé le 30 juillet 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarDocumentsPage;
