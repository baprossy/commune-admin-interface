import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, Clock, MapPin, User, Phone, Eye, X, Edit } from 'lucide-react';
import { MyAppointment } from '../../types';

interface AppointmentsTabProps {
  appointments: MyAppointment[];
  onUpdateAppointment?: (appointmentId: string, updates: Partial<MyAppointment>) => void;
}

const AppointmentsTab: React.FC<AppointmentsTabProps> = ({ appointments, onUpdateAppointment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'service' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedAppointment, setSelectedAppointment] = useState<MyAppointment | null>(null);

  // Statuts avec couleurs
  const statusConfig = {
    confirmed: { label: 'Confirmé', color: 'bg-green-100 text-green-800', icon: '✅' },
    pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
    cancelled: { label: 'Annulé', color: 'bg-red-100 text-red-800', icon: '❌' },
    completed: { label: 'Terminé', color: 'bg-blue-100 text-blue-800', icon: '🏁' },
    rescheduled: { label: 'Reporté', color: 'bg-purple-100 text-purple-800', icon: '🔄' }
  };

  // Services avec icônes
  const serviceTypes = {
    'Demande d\'acte de naissance': { icon: '👶', color: 'text-blue-600', dept: 'État Civil' },
    'Demande d\'acte de mariage': { icon: '💒', color: 'text-pink-600', dept: 'État Civil' },
    'Demande d\'acte de décès': { icon: '⚱️', color: 'text-gray-600', dept: 'État Civil' },
    'Certificat de résidence': { icon: '🏠', color: 'text-green-600', dept: 'État Civil' },
    'Demande de permis de construire': { icon: '🏗️', color: 'text-orange-600', dept: 'Urbanisme' },
    'Certificat d\'urbanisme': { icon: '🗺️', color: 'text-blue-500', dept: 'Urbanisme' },
    'Questions sur taxes foncières': { icon: '💰', color: 'text-yellow-600', dept: 'Finances' },
    'Demande d\'échelonnement': { icon: '📊', color: 'text-green-500', dept: 'Finances' },
    'Aide sociale': { icon: '🤝', color: 'text-purple-600', dept: 'Services Sociaux' },
    'Création d\'entreprise': { icon: '🏪', color: 'text-indigo-600', dept: 'Commerce' },
    'Audience avec le Maire': { icon: '🎖️', color: 'text-red-600', dept: 'Cabinet du Maire' }
  };

  // Calculs statistiques
  const stats = useMemo(() => {
    const now = new Date();
    const upcoming = appointments.filter(apt => {
      const aptDate = new Date(`${apt.date}T${apt.time}`);
      return aptDate > now && (apt.status === 'confirmed' || apt.status === 'pending');
    });
    
    const past = appointments.filter(apt => {
      const aptDate = new Date(`${apt.date}T${apt.time}`);
      return aptDate < now;
    });

    return {
      total: appointments.length,
      upcoming: upcoming.length,
      past: past.length,
      confirmed: appointments.filter(apt => apt.status === 'confirmed').length,
      cancelled: appointments.filter(apt => apt.status === 'cancelled').length
    };
  }, [appointments]);

  // Filtrage et tri
  const filteredAndSortedAppointments = useMemo(() => {
    let filtered = appointments.filter(appointment => {
      const matchesSearch = appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           appointment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (appointment.contact && appointment.contact.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (appointment.reason && appointment.reason.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
      const matchesService = serviceFilter === 'all' || appointment.service === serviceFilter;
      
      return matchesSearch && matchesStatus && matchesService;
    });

    // Tri
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          const dateA = new Date(`${a.date}T${a.time}`);
          const dateB = new Date(`${b.date}T${b.time}`);
          comparison = dateA.getTime() - dateB.getTime();
          break;
        case 'service':
          comparison = a.service.localeCompare(b.service);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [appointments, searchTerm, statusFilter, serviceFilter, sortBy, sortOrder]);

  // Formatage de la date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Formatage de l'heure
  const formatTime = (timeStr: string) => {
    return timeStr;
  };

  // Vérifier si le RDV est passé
  const isPastAppointment = (date: string, time: string) => {
    const aptDateTime = new Date(`${date}T${time}`);
    return aptDateTime < new Date();
  };

  // Vérifier si le RDV est aujourd'hui
  const isToday = (date: string) => {
    const aptDate = new Date(date);
    const today = new Date();
    return aptDate.toDateString() === today.toDateString();
  };

  // Annuler un rendez-vous
  const handleCancelAppointment = (appointmentId: string) => {
    if (onUpdateAppointment && window.confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) {
      onUpdateAppointment(appointmentId, { status: 'cancelled' });
      setSelectedAppointment(null);
    }
  };

  // Services uniques pour le filtre - VERSION CORRIGÉE
  const uniqueServices = appointments.reduce((services: string[], apt) => {
    if (!services.includes(apt.service)) {
      services.push(apt.service);
    }
    return services;
  }, []);

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">📅 Mes Rendez-vous</h2>
          <p className="text-gray-600">Planifiez et gérez vos rendez-vous</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-rdc-red">{stats.total}</div>
          <div className="text-sm text-gray-600">RDV totaux</div>
        </div>
      </div>

      {/* Statistiques détaillées */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">{stats.upcoming}</div>
              <div className="text-xs text-gray-600">À venir</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold text-sm">✓</span>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">{stats.confirmed}</div>
              <div className="text-xs text-gray-600">Confirmés</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <Clock className="h-4 w-4 text-gray-600" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">{stats.past}</div>
              <div className="text-xs text-gray-600">Passés</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <X className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">{stats.cancelled}</div>
              <div className="text-xs text-gray-600">Annulés</div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Recherche */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par service, contact ou motif..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rdc-red focus:border-transparent"
            />
          </div>

          {/* Filtre par statut */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rdc-red focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              {Object.entries(statusConfig).map(([status, config]) => (
                <option key={status} value={status}>{config.label}</option>
              ))}
            </select>
          </div>

          {/* Filtre par service */}
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-400" />
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rdc-red focus:border-transparent"
            >
              <option value="all">Tous les services</option>
              {uniqueServices.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>

          {/* Tri */}
          <div className="flex items-center gap-2">
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field as 'date' | 'service' | 'status');
                setSortOrder(order as 'asc' | 'desc');
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rdc-red focus:border-transparent"
            >
              <option value="date-asc">Date croissante</option>
              <option value="date-desc">Date décroissante</option>
              <option value="service-asc">Service A-Z</option>
              <option value="status-asc">Statut A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des rendez-vous */}
      <div className="space-y-4">
        {filteredAndSortedAppointments.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 text-center py-12">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Aucun rendez-vous trouvé</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' || serviceFilter !== 'all'
                ? 'Essayez de modifier vos critères de recherche'
                : 'Vous n\'avez pas encore de rendez-vous programmé'
              }
            </p>
          </div>
        ) : (
          filteredAndSortedAppointments.map((appointment) => {
            const statusInfo = statusConfig[appointment.status as keyof typeof statusConfig];
            const serviceInfo = serviceTypes[appointment.service as keyof typeof serviceTypes];
            const isPast = isPastAppointment(appointment.date, appointment.time);
            const isTodayRdv = isToday(appointment.date);
            
            return (
              <div
                key={appointment.id}
                className={`bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow ${
                  isTodayRdv ? 'ring-2 ring-rdc-red ring-opacity-50 bg-red-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Icône du service */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className={`text-xl ${serviceInfo?.color || 'text-gray-400'}`}>
                          {serviceInfo?.icon || '📅'}
                        </span>
                      </div>
                    </div>

                    {/* Informations principales */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {appointment.service}
                        </h3>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          <span>{statusInfo.icon}</span>
                          {statusInfo.label}
                        </span>
                        {isTodayRdv && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            🔥 Aujourd'hui
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(appointment.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{formatTime(appointment.time)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>Hôtel de Ville - {serviceInfo?.dept || 'Service'}</span>
                        </div>
                      </div>

                      {appointment.contact && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                          <User className="h-4 w-4" />
                          <span>{appointment.contact}</span>
                        </div>
                      )}

                      {appointment.reason && (
                        <div className="mt-2 text-sm text-gray-600">
                          <p className="italic">"{appointment.reason}"</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => setSelectedAppointment(appointment)}
                      className="text-rdc-red hover:text-red-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Voir détails"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    
                    {!isPast && appointment.status !== 'cancelled' && (
                      <>
                        <button
                          className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          title="Annuler"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Indicateur de référence */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400 font-mono">
                    Réf: {appointment.id}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal de détails */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Détails du rendez-vous</h3>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service demandé</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{serviceTypes[selectedAppointment.service as keyof typeof serviceTypes]?.icon || '📅'}</span>
                    <span className="font-medium">{selectedAppointment.service}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Référence</label>
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{selectedAppointment.id}</span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{formatDate(selectedAppointment.date)}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{formatTime(selectedAppointment.time)}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>Hôtel de Ville - {serviceTypes[selectedAppointment.service as keyof typeof serviceTypes]?.dept || 'Service'}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusConfig[selectedAppointment.status as keyof typeof statusConfig].color}`}>
                    <span>{statusConfig[selectedAppointment.status as keyof typeof statusConfig].icon}</span>
                    {statusConfig[selectedAppointment.status as keyof typeof statusConfig].label}
                  </span>
                </div>
                
                {selectedAppointment.contact && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>{selectedAppointment.contact}</span>
                    </div>
                  </div>
                )}
                
                {selectedAppointment.reason && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Motif</label>
                    <p className="text-gray-600 italic">"{selectedAppointment.reason}"</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                {!isPastAppointment(selectedAppointment.date, selectedAppointment.time) && 
                 selectedAppointment.status !== 'cancelled' && (
                  <>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Edit className="h-4 w-4" />
                      Modifier
                    </button>
                    <button
                      onClick={() => handleCancelAppointment(selectedAppointment.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      Annuler
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsTab;
