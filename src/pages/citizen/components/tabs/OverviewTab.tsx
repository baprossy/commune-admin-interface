import React from 'react';
import { FileText, CreditCard, Calendar, TrendingUp, Bell } from 'lucide-react';
import { MyDemand, MyPayment, MyAppointment } from '../../types';

interface OverviewTabProps {
  myDemands: MyDemand[];
  myPayments: MyPayment[];
  myAppointments: MyAppointment[];
  setActiveTab: (tab: 'overview' | 'demands' | 'payments' | 'appointments') => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ 
  myDemands, 
  myPayments, 
  myAppointments, 
  setActiveTab 
}) => {
  // Calculs pour les statistiques
  const totalSpent = myPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + parseFloat(p.amount), 0);

  const pendingDemands = myDemands.filter(d => d.status === 'pending' || d.status === 'processing').length;
  const completedDemands = myDemands.filter(d => d.status === 'completed').length;
  const upcomingAppointments = myAppointments.filter(apt => {
    const aptDate = new Date(`${apt.date}T${apt.time}`);
    return aptDate > new Date() && apt.status === 'confirmed';
  }).length;

  // Prochains rendez-vous (3 prochains)
  const nextAppointments = myAppointments
    .filter(apt => {
      const aptDate = new Date(`${apt.date}T${apt.time}`);
      return aptDate > new Date() && apt.status === 'confirmed';
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 3);

  // Demandes récentes (5 dernières)
  const recentDemands = myDemands
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Paiements récents (5 derniers)
  const recentPayments = myPayments
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Formatage de date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Formatage de date pour RDV
  const formatAppointmentDate = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long'
    })} à ${timeStr}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'pending':
        return '⏳';
      case 'processing':
        return '🔄';
      case 'cancelled':
        return '❌';
      default:
        return '📄';
    }
  };

  return (
    <div className="space-y-8">
      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div 
          onClick={() => setActiveTab('demands')}
          className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 hover:shadow-xl transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <TrendingUp className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{myDemands.length}</div>
          <div className="text-sm text-gray-600">Demandes totales</div>
          <div className="text-xs text-blue-600 mt-2">
            {pendingDemands} en cours • {completedDemands} terminées
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('payments')}
          className="bg-white p-6 rounded-xl shadow-lg border border-yellow-100 hover:shadow-xl transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-100 p-3 rounded-lg group-hover:bg-yellow-200 transition-colors">
              <CreditCard className="h-6 w-6 text-yellow-600" />
            </div>
            <TrendingUp className="h-4 w-4 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{myPayments.length}</div>
          <div className="text-sm text-gray-600">Paiements effectués</div>
          <div className="text-xs text-yellow-600 mt-2">
            {totalSpent.toLocaleString()} FC dépensés
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('appointments')}
          className="bg-white p-6 rounded-xl shadow-lg border border-red-100 hover:shadow-xl transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-3 rounded-lg group-hover:bg-red-200 transition-colors">
              <Calendar className="h-6 w-6 text-red-600" />
            </div>
            <TrendingUp className="h-4 w-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">{myAppointments.length}</div>
          <div className="text-sm text-gray-600">Rendez-vous</div>
          <div className="text-xs text-red-600 mt-2">
            {upcomingAppointments} à venir
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <Bell className="h-6 w-6 text-green-600" />
            </div>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {pendingDemands + upcomingAppointments}
          </div>
          <div className="text-sm text-gray-600">Actions requises</div>
          <div className="text-xs text-green-600 mt-2">
            Demandes et RDV en attente
          </div>
        </div>
      </div>

      {/* Contenu principal en deux colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Colonne gauche - Activités récentes */}
        <div className="space-y-6">
          
          {/* Prochains rendez-vous */}
          {nextAppointments.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">📅 Prochains rendez-vous</h3>
                <button 
                  onClick={() => setActiveTab('appointments')}
                  className="text-sm text-rdc-red hover:text-red-700 font-medium"
                >
                  Voir tout →
                </button>
              </div>
              <div className="space-y-3">
                {nextAppointments.map((apt, index) => (
                  <div key={index} className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-red-800">📅 {apt.service}</p>
                        <p className="text-xs text-red-600 mt-1">
                          {formatAppointmentDate(apt.date, apt.time)}
                        </p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-red-200 text-red-700 rounded-full">
                        Confirmé
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Demandes récentes */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">📄 Demandes récentes</h3>
              <button 
                onClick={() => setActiveTab('demands')}
                className="text-sm text-rdc-blue hover:text-blue-700 font-medium"
              >
                Voir tout →
              </button>
            </div>
            <div className="space-y-3">
              {recentDemands.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  Aucune demande pour le moment
                </p>
              ) : (
                recentDemands.map((demand, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{getStatusIcon(demand.status)}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{demand.type}</p>
                        <p className="text-xs text-gray-500">{formatDate(demand.date)}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(demand.status)}`}>
                      {demand.status === 'completed' ? 'Terminé' : 
                       demand.status === 'pending' ? 'En attente' :
                       demand.status === 'processing' ? 'En cours' : 'Annulé'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Colonne droite - Paiements et notifications */}
        <div className="space-y-6">
          
          {/* Paiements récents */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">💳 Paiements récents</h3>
              <button 
                onClick={() => setActiveTab('payments')}
                className="text-sm text-rdc-yellow hover:text-yellow-700 font-medium"
              >
                Voir tout →
              </button>
            </div>
            <div className="space-y-3">
              {recentPayments.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  Aucun paiement pour le moment
                </p>
              ) : (
                recentPayments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">💳</span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{payment.type}</p>
                        <p className="text-xs text-gray-500">{formatDate(payment.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-600">
                        {parseFloat(payment.amount).toLocaleString()} FC
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(payment.status)}`}>
                        {payment.status === 'completed' ? 'Payé' : 
                         payment.status === 'pending' ? 'En attente' :
                         payment.status === 'failed' ? 'Échoué' : payment.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Notifications/Alertes */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-semibold text-gray-800">🔔 Notifications</h3>
            </div>
            <div className="space-y-3">
              {pendingDemands > 0 && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-warn font-medium text-yellow-800">
                    ⏳ {pendingDemands} demande(s) en cours de traitement
                  </p>
                </div>
              )}
              {upcomingAppointments > 0 && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">
                    📅 {upcomingAppointments} rendez-vous confirmé(s)
                  </p>
                </div>
              )}
              {pendingDemands === 0 && upcomingAppointments === 0 && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800">
                    ✅ Tout est à jour ! Aucune action requise.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
