import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Eye, X, Calendar, DollarSign, FileText } from 'lucide-react';
import { MyDemand } from '../../types';

interface DemandsTabProps {
  demands: MyDemand[];
  onUpdateDemand?: (demandId: string, updates: Partial<MyDemand>) => void;
}

const DemandsTab: React.FC<DemandsTabProps> = ({ demands, onUpdateDemand }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'type' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedDemand, setSelectedDemand] = useState<MyDemand | null>(null);

  // Statuts possibles avec couleurs
  const statusConfig = {
    pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
    processing: { label: 'En cours', color: 'bg-blue-100 text-blue-800', icon: '🔄' },
    completed: { label: 'Terminé', color: 'bg-green-100 text-green-800', icon: '✅' },
    rejected: { label: 'Refusé', color: 'bg-red-100 text-red-800', icon: '❌' },
    cancelled: { label: 'Annulé', color: 'bg-gray-100 text-gray-800', icon: '🚫' }
  };

  // Types de documents avec icônes
  const documentTypes = {
    'Acte de naissance': { icon: '👶', color: 'text-blue-600' },
    'Acte de mariage': { icon: '💒', color: 'text-pink-600' },
    'Acte de décès': { icon: '⚱️', color: 'text-gray-600' },
    'Certificat de résidence': { icon: '🏠', color: 'text-green-600' },
    'Extrait d\'acte de naissance': { icon: '📋', color: 'text-blue-500' },
    'Légalisation de signature': { icon: '📜', color: 'text-purple-600' }
  };

  // Filtrage et tri des demandes
  const filteredAndSortedDemands = useMemo(() => {
    let filtered = demands.filter(demand => {
      const matchesSearch = demand.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           demand.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || demand.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Tri
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'type':
          comparison = a.type.localeCompare(b.type);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [demands, searchTerm, statusFilter, sortBy, sortOrder]);

  // Formatage de la date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Téléchargement de reçu (simulation)
  const handleDownloadReceipt = (demand: MyDemand) => {
    // Simulation de téléchargement
    const link = document.createElement('a');
    link.href = `data:text/plain;charset=utf-8,Reçu de demande\n\nRéférence: ${demand.id}\nType: ${demand.type}\nDate: ${formatDate(demand.date)}\nStatut: ${statusConfig[demand.status as keyof typeof statusConfig].label}\n\nAdministration Communale - RDC`;
    link.download = `recu_${demand.id}.txt`;
    link.click();
  };

  // Annulation de demande
  const handleCancelDemand = (demandId: string) => {
    if (onUpdateDemand && window.confirm('Êtes-vous sûr de vouloir annuler cette demande ?')) {
      onUpdateDemand(demandId, { status: 'cancelled' });
      setSelectedDemand(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">📄 Mes Demandes de Documents</h2>
          <p className="text-gray-600">Gérez vos demandes d'actes et certificats</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-rdc-blue">{demands.length}</div>
          <div className="text-sm text-gray-600">Demandes totales</div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = demands.filter(d => d.status === status).length;
          return (
            <div key={status} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{config.icon}</span>
                <span className="text-sm font-medium text-gray-600">{config.label}</span>
              </div>
              <div className="text-xl font-bold text-gray-800">{count}</div>
            </div>
          );
        })}
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Recherche */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par type ou référence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rdc-blue focus:border-transparent"
            />
          </div>

          {/* Filtre par statut */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rdc-blue focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              {Object.entries(statusConfig).map(([status, config]) => (
                <option key={status} value={status}>{config.label}</option>
              ))}
            </select>
          </div>

          {/* Tri */}
          <div className="flex items-center gap-2">
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field as 'date' | 'type' | 'status');
                setSortOrder(order as 'asc' | 'desc');
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rdc-blue focus:border-transparent"
            >
              <option value="date-desc">Plus récent</option>
              <option value="date-asc">Plus ancien</option>
              <option value="type-asc">Type A-Z</option>
              <option value="type-desc">Type Z-A</option>
              <option value="status-asc">Statut A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tableau des demandes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {filteredAndSortedDemands.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Aucune demande trouvée</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Essayez de modifier vos critères de recherche'
                : 'Vous n\'avez pas encore fait de demande de document'
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Référence</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedDemands.map((demand) => {
                  const statusInfo = statusConfig[demand.status as keyof typeof statusConfig];
                  const docType = documentTypes[demand.type as keyof typeof documentTypes];
                  
                  return (
                    <tr key={demand.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <span className={`text-xl ${docType?.color || 'text-gray-400'}`}>
                            {docType?.icon || '📄'}
                          </span>
                          <div>
                            <div className="font-medium text-gray-900">{demand.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono text-sm text-gray-600">{demand.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatDate(demand.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          <span>{statusInfo.icon}</span>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedDemand(demand)}
                            className="text-rdc-blue hover:text-blue-700 p-1 rounded"
                            title="Voir détails"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDownloadReceipt(demand)}
                            className="text-green-600 hover:text-green-700 p-1 rounded"
                            title="Télécharger reçu"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          {(demand.status === 'pending' || demand.status === 'processing') && (
                            <button
                              onClick={() => handleCancelDemand(demand.id)}
                              className="text-red-600 hover:text-red-700 p-1 rounded"
                              title="Annuler demande"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de détails */}
      {selectedDemand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Détails de la demande</h3>
              <button
                onClick={() => setSelectedDemand(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type de document</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{documentTypes[selectedDemand.type as keyof typeof documentTypes]?.icon || '📄'}</span>
                    <span className="font-medium">{selectedDemand.type}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Référence</label>
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{selectedDemand.id}</span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de demande</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{formatDate(selectedDemand.date)}</span>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusConfig[selectedDemand.status as keyof typeof statusConfig].color}`}>
                    <span>{statusConfig[selectedDemand.status as keyof typeof statusConfig].icon}</span>
                    {statusConfig[selectedDemand.status as keyof typeof statusConfig].label}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleDownloadReceipt(selectedDemand)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Télécharger reçu
                </button>
                {(selectedDemand.status === 'pending' || selectedDemand.status === 'processing') && (
                  <button
                    onClick={() => handleCancelDemand(selectedDemand.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Annuler
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemandsTab;
