import React from 'react';

const SidebarProfilPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-green-600 mb-4">👤 MON PROFIL (SIDEBAR)</h1>
        <p className="text-lg text-gray-700">Page profil de Christian Mukendi - Version Sidebar</p>
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <p className="text-green-800">✅ Cette page verticale fonctionne !</p>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800">Nom</h3>
            <p className="text-gray-600">Christian Mukendi</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800">Email</h3>
            <p className="text-gray-600">christian.mukendi@email.com</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800">Téléphone</h3>
            <p className="text-gray-600">+243 123 456 789</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800">Adresse</h3>
            <p className="text-gray-600">Kinshasa, RDC</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfilPage;
