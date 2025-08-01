import React from 'react';
import { FileText, CreditCard, Calendar, TrendingUp, Bell, Clock, CheckCircle, AlertTriangle, User, MapPin, Phone } from 'lucide-react';

const AccueilPage: React.FC = () => {
  // Données simulées pour le dashboard
  const stats = {
    totalDocuments: 12,
    documentsEnCours: 2,
    totalPaiements: 8,
    paiementsEnAttente: 3,
    montantEnAttente: 520000,
    prochainRdv: {
      service: 'État Civil',
      date: '2025-08-05',
      heure: '09:00'
    }
  };

  const activitesRecentes = [
    {
      id: '1',
      type: 'document',
      titre: 'Certificat de naissance prêt',
      description: 'Votre certificat de naissance est prêt pour retrait',
      date: '2025-08-01',
      statut: 'success'
    },
    {
      id: '2',
      type: 'paiement',
      titre: 'Taxe foncière échue',
      description: 'La taxe foncière 2025 arrive à échéance dans 15 jours',
      date: '2025-07-31',
      statut: 'warning'
    },
    {
      id: '3',
      type: 'rdv',
      titre: 'Rendez-vous confirmé',
      description: 'RDV État Civil confirmé pour le 5 août à 9h00',
      date: '2025-07-30',
      statut: 'info'
    }
  ];

  const servicesRapides = [
    {
      id: '1',
      nom: 'Demande de certificat',
      description: 'Certificats de naissance, mariage, décès',
      icon: FileText,
      color: 'bg-blue-100 text-blue-600',
      action: 'documents'
    },
    {
      id: '2',
      nom: 'Payer une facture',
      description: 'Taxes, amendes, services municipaux',
      icon: CreditCard,
      color: 'bg-green-100 text-green-600',
      action: 'paiements'
    },
    {
      id: '3',
      nom: 'Prendre RDV',
      description: 'Rendez-vous avec les services',
      icon: Calendar,
      color: 'bg-purple-100 text-purple-600',
      action: 'rendez-vous'
    },
    {
      id: '4',
      nom: 'Trouver un service',
      description: 'Localiser les services municipaux',
      icon: MapPin,
      color: 'bg-orange-100 text-orange-600',
      action: 'services-locaux'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'document': return FileText;
      case 'paiement': return CreditCard;
      case 'rdv': return Calendar;
      default: return Bell;
    }
  };

  const getActivityColor = (statut: string) => {
    switch (statut) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header de bienvenue */}
      <div className="bg-gradient-to-r from-rdc-blue to-blue-700 rounded-xl shadow-lg p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Tableau de bord citoyen</h1>
            <p className="text-blue-100">
              Bienvenue sur votre espace personnel des services municipaux
            </p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-blue-100">Aujourd'hui</p>
            <p className="text-xl font-semibold">
              {new Date().toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Documents</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalDocuments}</p>
              <p className="text-xs text-blue-600">{stats.documentsEnCours} en cours</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Paiements</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalPaiements}</p>
              <p className="text-xs text-yellow-600">{stats.paiementsEnAttente} en attente</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">À payer</p>
              <p className="text-xl font-bold text-gray-800">
                {stats.montantEnAttente.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">FC</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Prochain RDV</p>
              <p className="text-sm font-bold text-gray-800">{stats.prochainRdv.service}</p>
              <p className="text-xs text-purple-600">
                {new Date(stats.prochainRdv.date).toLocaleDateString('fr-FR')} à {stats.prochainRdv.heure}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Services rapides */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Services rapides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {servicesRapides.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                    onClick={() => {
                      // Navigation vers la section correspondante
                      console.log(`Navigation vers ${service.action}`);
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${service.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {service.nom}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Activités récentes */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Activités récentes</h2>
          <div className="space-y-4">
            {activitesRecentes.map((activite) => {
              const Icon = getActivityIcon(activite.type);
              const colorClass = getActivityColor(activite.statut);
              
              return (
                <div key={activite.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-lg ${colorClass}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 text-sm">{activite.titre}</h4>
                    <p className="text-xs text-gray-600 mt-1">{activite.description}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(activite.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Actions rapides en bas */}
      <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-800">Besoin d'aide ?</h3>
            <p className="text-sm text-gray-600">Contactez nos services pour toute question</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Phone className="w-4 h-4" />
              Nous contacter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <MapPin className="w-4 h-4" />
              Nous trouver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccueilPage;
