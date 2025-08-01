import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Phone, Plus, Search, Filter, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface RendezVous {
  id: string;
  service: string;
  date: string;
  heure: string;
  lieu: string;
  statut: 'confirme' | 'en-attente' | 'annule' | 'termine';
  agent?: string;
  telephone?: string;
  description: string;
  motif: string;
}

const RendezVousPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tous' | 'a-venir' | 'termines'>('tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewRdvModal, setShowNewRdvModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const [rendezVous] = useState<RendezVous[]>([
    {
      id: '1',
      service: 'État Civil',
      date: '2025-08-05',
      heure: '09:00',
      lieu: 'Mairie - Bureau 12',
      statut: 'confirme',
      agent: 'Marie Kabongo',
      telephone: '+243 123 456 789',
      description: 'Demande de certificat de naissance',
      motif: 'Obtenir un certificat de naissance pour procédures administratives'
    },
    {
      id: '2',
      service: 'Urbanisme',
      date: '2025-08-08',
      heure: '14:30',
      lieu: 'Mairie - Bureau 5',
      statut: 'en-attente',
      description: 'Demande de permis de construire',
      motif: 'Construction d\'une extension résidentielle'
    },
    {
      id: '3',
      service: 'Taxes et Impôts',
      date: '2025-07-25',
      heure: '10:15',
      lieu: 'Mairie - Bureau 8',
      statut: 'termine',
      agent: 'Jean Mukendi',
      telephone: '+243 987 654 321',
      description: 'Consultation fiscale',
      motif: 'Questions sur la taxe foncière 2025'
    },
    {
      id: '4',
      service: 'Social',
      date: '2025-08-12',
      heure: '11:00',
      lieu: 'Centre Social - Bureau 3',
      statut: 'confirme',
      agent: 'Grace Ndala',
      telephone: '+243 555 123 456',
      description: 'Demande d\'aide sociale',
      motif: 'Demande de soutien pour famille nombreuse'
    }
  ]);

  const services = [
    { 
      id: 'etat-civil', 
      nom: 'État Civil', 
      description: 'Actes d\'état civil, certificats',
      disponibilites: ['09:00', '10:00', '11:00', '14:00', '15:00']
    },
    { 
      id: 'urbanisme', 
      nom: 'Urbanisme', 
      description: 'Permis de construire, urbanisme',
      disponibilites: ['08:30', '09:30', '14:30', '15:30']
    },
    { 
      id: 'taxes', 
      nom: 'Taxes et Impôts', 
      description: 'Questions fiscales, paiements',
      disponibilites: ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00']
    },
    { 
      id: 'social', 
      nom: 'Affaires Sociales', 
      description: 'Aide sociale, allocations',
      disponibilites: ['09:00', '10:00', '11:00', '14:00']
    },
    { 
      id: 'environnement', 
      nom: 'Environnement', 
      description: 'Déchets, espaces verts',
      disponibilites: ['08:30', '09:30', '14:30']
    }
  ];

  const getStatusInfo = (statut: RendezVous['statut']) => {
    switch (statut) {
      case 'confirme':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Confirmé' };
      case 'en-attente':
        return { icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'En attente' };
      case 'annule':
        return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', label: 'Annulé' };
      case 'termine':
        return { icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Terminé' };
    }
  };

  const filteredRendezVous = rendezVous.filter(rdv => {
    const matchesSearch = rdv.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rdv.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const today = new Date();
    const rdvDate = new Date(rdv.date);
    
    switch (activeTab) {
      case 'a-venir':
        return matchesSearch && rdvDate >= today && ['confirme', 'en-attente'].includes(rdv.statut);
      case 'termines':
        return matchesSearch && (rdv.statut === 'termine' || rdv.statut === 'annule');
      default:
        return matchesSearch;
    }
  });

  const handleNewRdv = () => {
    if (selectedService && selectedDate) {
      alert(`Nouveau rendez-vous demandé pour ${selectedService} le ${selectedDate}`);
      setShowNewRdvModal(false);
      setSelectedService('');
      setSelectedDate('');
    } else {
      alert('Veuillez sélectionner un service et une date');
    }
  };

  const handleCancelRdv = (rdv: RendezVous) => {
    if (confirm(`Êtes-vous sûr de vouloir annuler le rendez-vous du ${new Date(rdv.date).toLocaleDateString('fr-FR')} ?`)) {
      alert(`Rendez-vous ${rdv.service} annulé`);
    }
  };

  const handleRescheduleRdv = (rdv: RendezVous) => {
    alert(`Reprogrammation du rendez-vous ${rdv.service} - Fonctionnalité en développement`);
  };

  // Obtenir la date minimum (aujourd'hui)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Mes Rendez-vous</h1>
            <p className="text-gray-600">Planifiez et gérez vos rendez-vous avec les services municipaux</p>
          </div>
          <button
            onClick={() => setShowNewRdvModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nouveau rendez-vous
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-800">{rendezVous.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Confirmés</p>
              <p className="text-2xl font-bold text-gray-800">
                {rendezVous.filter(r => r.statut === 'confirme').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-gray-800">
                {rendezVous.filter(r => r.statut === 'en-attente').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Ce mois</p>
              <p className="text-2xl font-bold text-gray-800">
                {rendezVous.filter(r => new Date(r.date).getMonth() === new Date().getMonth()).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { key: 'tous', label: 'Tous' },
              { key: 'a-venir', label: 'À venir' },
              { key: 'termines', label: 'Terminés' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Recherche */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un rendez-vous..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Liste des rendez-vous */}
      <div className="space-y-4">
        {filteredRendezVous.map((rdv) => {
          const statusInfo = getStatusInfo(rdv.statut);
          const StatusIcon = statusInfo.icon;
          const rdvDate = new Date(rdv.date);
          const isUpcoming = rdvDate >= new Date() && ['confirme', 'en-attente'].includes(rdv.statut);
          
          return (
            <div key={rdv.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{rdv.service}</h3>
                      <p className="text-sm text-gray-600">{rdv.description}</p>
                    </div>
                    <div className={`ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      {statusInfo.label}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">
                        {rdvDate.toLocaleDateString('fr-FR', { 
                          weekday: 'long', 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{rdv.heure}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{rdv.lieu}</span>
                    </div>
                  </div>

                  {rdv.agent && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span>Agent: {rdv.agent}</span>
                      </div>
                      {rdv.telephone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{rdv.telephone}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Motif:</span> {rdv.motif}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 lg:ml-4">
                  {isUpcoming && (
                    <>
                      <button
                        onClick={() => handleRescheduleRdv(rdv)}
                        className="px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                      >
                        Reprogrammer
                      </button>
                      <button
                        onClick={() => handleCancelRdv(rdv)}
                        className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors text-sm"
                      >
                        Annuler
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal nouveau rendez-vous */}
      {showNewRdvModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Nouveau rendez-vous</h3>
            
            <div className="space-y-6">
              {/* Sélection du service */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choisir un service
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {services.map(service => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service.nom)}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedService === service.nom
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <h4 className="font-medium text-gray-800">{service.nom}</h4>
                      <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sélection de la date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date souhaitée
                </label>
                <input
                  type="date"
                  min={today}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Motif */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motif du rendez-vous
                </label>
                <textarea
                  rows={3}
                  placeholder="Décrivez brièvement l'objet de votre rendez-vous..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => {
                  setShowNewRdvModal(false);
                  setSelectedService('');
                  setSelectedDate('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleNewRdv}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Demander le rendez-vous
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RendezVousPage;
