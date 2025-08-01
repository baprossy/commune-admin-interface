import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  Users, CreditCard, FileText, AlertCircle, 
  CheckCircle, Clock, DollarSign, BarChart3, Calendar,
  ArrowUp
} from 'lucide-react';

const DashboardHome = () => {
  const stats = [
    {
      title: 'Total Citoyens',
      value: '2,847',
      change: '+12%',
      icon: Users,
      color: 'bg-gradient-to-r from-blue-500 to-rdc-blue',
      textColor: 'text-blue-600'
    },
    {
      title: 'Paiements ce mois',
      value: '1,234',
      change: '+8%',
      icon: CreditCard,
      color: 'bg-gradient-to-r from-rdc-yellow to-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Revenus totaux',
      value: '45,231 $',
      change: '+15%',
      icon: DollarSign,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      textColor: 'text-green-600'
    },
    {
      title: 'Documents émis',
      value: '892',
      change: '+5%',
      icon: FileText,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      textColor: 'text-purple-600'
    }
  ];

  const recentActivities = [
    { user: 'Jean Mukadi', action: 'Paiement taxe foncière', time: '2h', status: 'success' },
    { user: 'Marie Kasongo', action: 'Demande acte de naissance', time: '4h', status: 'pending' },
    { user: 'Paul Tshimanga', action: 'Nouveau citoyen enregistré', time: '6h', status: 'success' },
    { user: 'Grace Mbuyi', action: 'Paiement permis construire', time: '8h', status: 'success' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-rdc-blue to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Bonjour, Administrateur 👋
            </h1>
            <p className="text-blue-100 text-lg">
              Voici un aperçu de votre commune aujourd'hui
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="h-5 w-5" />
              <span className="text-blue-100">{new Date().toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-5 rounded-sm overflow-hidden shadow-md relative" style={{
                background: 'linear-gradient(135deg, #0066CC 0%, #0066CC 25%, #FFD700 25%, #FFD700 27%, #FF0000 27%, #FF0000 73%, #FFD700 73%, #FFD700 75%, #0066CC 75%, #0066CC 100%)'
              }}>
                <svg className="absolute top-0.5 left-1" width="8" height="8" viewBox="0 0 24 24" fill="#FFD700">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <span className="text-xs text-blue-100">RDC</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 ${stat.textColor} bg-opacity-10 px-2 py-1 rounded-full`}>
                  <ArrowUp className="h-3 w-3" />
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Activités Récentes</h3>
            <BarChart3 className="h-5 w-5 text-rdc-blue" />
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  {activity.status === 'success' ? 
                    <CheckCircle className="h-4 w-4 text-green-600" /> :
                    <Clock className="h-4 w-4 text-yellow-600" />
                  }
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-500">Il y a {activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">Tâches Prioritaires</h3>
            <AlertCircle className="h-5 w-5 text-orange-500" />
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Urgent
                </span>
              </div>
              <h4 className="font-medium text-gray-800 text-sm mb-1">Valider 12 demandes d'actes</h4>
              <p className="text-xs text-gray-600">Aujourd'hui</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Moyen
                </span>
              </div>
              <h4 className="font-medium text-gray-800 text-sm mb-1">Réviser budget municipal</h4>
              <p className="text-xs text-gray-600">Cette semaine</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Paiements Mensuels</h3>
          <div className="h-64 flex items-end justify-around bg-gradient-to-t from-rdc-blue/5 to-transparent rounded-lg p-4">
            {[65, 78, 90, 45, 88, 92].map((height, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="bg-gradient-to-t from-rdc-blue to-blue-400 rounded-t w-8 transition-all hover:from-rdc-yellow hover:to-yellow-400"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">
                  {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Types de Documents</h3>
          <div className="space-y-4">
            {[
              { name: 'Actes de naissance', count: 145, color: 'bg-rdc-blue' },
              { name: 'Permis de construire', count: 89, color: 'bg-rdc-yellow' },
              { name: 'Certificats résidence', count: 67, color: 'bg-rdc-red' },
              { name: 'Autres documents', count: 43, color: 'bg-gray-400' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <span className="font-medium text-gray-800">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardHome />} />
    </Routes>
  );
};

export default AdminDashboard;
