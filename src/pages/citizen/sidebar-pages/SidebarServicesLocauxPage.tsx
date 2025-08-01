import React from 'react';

const SidebarServicesLocauxPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-red-600 mb-4">📍 SERVICES LOCAUX (SIDEBAR)</h1>
        <p className="text-lg text-gray-700">Annuaire des services municipaux - Version Sidebar</p>
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <p className="text-red-800">✅ Cette page verticale fonctionne !</p>
        </div>

        {/* Services par catégorie */}
        <div className="mt-6 space-y-6">
          {/* Administration */}
          <div className="border border-blue-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-blue-700 mb-3 flex items-center gap-2">
              🏛️ Administration
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">Mairie Centrale</h3>
                <p className="text-sm text-gray-600">📍 123 Avenue de l'Indépendance</p>
                <p className="text-sm text-gray-600">📞 +243 123 456 789</p>
                <p className="text-sm text-gray-600">🕒 Lun-Ven: 07:30-15:30</p>
              </div>
            </div>
          </div>

          {/* Santé */}
          <div className="border border-green-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-green-700 mb-3 flex items-center gap-2">
              ❤️ Santé
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">Centre de Santé Communautaire</h3>
                <p className="text-sm text-gray-600">📍 456 Boulevard Lumumba</p>
                <p className="text-sm text-gray-600">📞 +243 987 654 321</p>
                <p className="text-sm text-gray-600">🕒 Lun-Dim: 06:00-18:00</p>
              </div>
            </div>
          </div>

          {/* Éducation */}
          <div className="border border-purple-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-purple-700 mb-3 flex items-center gap-2">
              🎓 Éducation
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">École Primaire Communale</h3>
                <p className="text-sm text-gray-600">📍 789 Rue de l'École</p>
                <p className="text-sm text-gray-600">📞 +243 555 123 456</p>
                <p className="text-sm text-gray-600">🕒 Lun-Ven: 07:00-13:00</p>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="border border-orange-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-orange-700 mb-3 flex items-center gap-2">
              👥 Social
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">Centre Social Municipal</h3>
                <p className="text-sm text-gray-600">📍 321 Avenue de la Solidarité</p>
                <p className="text-sm text-gray-600">📞 +243 444 789 123</p>
                <p className="text-sm text-gray-600">🕒 Lun-Ven: 08:00-16:00</p>
              </div>
            </div>
          </div>

          {/* Sécurité */}
          <div className="border border-gray-300 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
              🚔 Sécurité
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">Poste de Police Municipal</h3>
                <p className="text-sm text-gray-600">📍 147 Boulevard de la Paix</p>
                <p className="text-sm text-gray-600">📞 +243 111 222 333</p>
                <p className="text-sm text-gray-600">🕒 24h/24 - 7j/7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Numéros d'urgence */}
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-lg font-semibold text-red-800 mb-3">🚨 Numéros d'urgence</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">Police: <span className="text-red-600">110</span></p>
              <p className="font-semibold">Pompiers: <span className="text-red-600">118</span></p>
            </div>
            <div>
              <p className="font-semibold">SAMU: <span className="text-red-600">115</span></p>
              <p className="font-semibold">Mairie: <span className="text-red-600">123</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarServicesLocauxPage;
