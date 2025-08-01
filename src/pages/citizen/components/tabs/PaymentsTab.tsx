import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Eye, CreditCard, Calendar, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { MyPayment } from '../../types';

interface PaymentsTabProps {
  payments: MyPayment[];
  onUpdatePayment?: (paymentId: string, updates: Partial<MyPayment>) => void;
}

const PaymentsTab: React.FC<PaymentsTabProps> = ({ payments, onUpdatePayment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'type' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedPayment, setSelectedPayment] = useState<MyPayment | null>(null);

  // Statuts avec couleurs
  const statusConfig = {
    pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
    processing: { label: 'En cours', color: 'bg-blue-100 text-blue-800', icon: '🔄' },
    completed: { label: 'Payé', color: 'bg-green-100 text-green-800', icon: '✅' },
    failed: { label: 'Échoué', color: 'bg-red-100 text-red-800', icon: '❌' },
    refunded: { label: 'Remboursé', color: 'bg-purple-100 text-purple-800', icon: '↩️' }
  };

  // Types de paiements avec icônes
  const paymentTypes = {
    'Taxe Foncière': { icon: '🏠', color: 'text-blue-600' },
    'Permis de Construire': { icon: '🏗️', color: 'text-orange-600' },
    'Patente Commerciale': { icon: '🏪', color: 'text-purple-600' },
    'Amendes': { icon: '⚠️', color: 'text-red-600' },
    'Taxe de Voirie': { icon: '🛣️', color: 'text-gray-600' },
    'Droit de Marché': { icon: '🏪', color: 'text-green-600' }
  };

  // Méthodes de paiement avec icônes
  const paymentMethods = {
    'Carte Bancaire': { icon: '💳', color: 'text-blue-600' },
    'Mobile Money': { icon: '📱', color: 'text-green-600' },
    'Virement Bancaire': { icon: '🏦', color: 'text-purple-600' },
    'Espèces': { icon: '💵', color: 'text-yellow-600' }
  };

  // Calculs statistiques
  const stats = useMemo(() => {
    const total = payments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
    const completed = payments.filter(p => p.status === 'completed');
    const totalPaid = completed.reduce((sum, p) => sum + parseFloat(p.amount), 0);
    const pending = payments.filter(p => p.status === 'pending' || p.status === 'processing');
    const totalPending = pending.reduce((sum, p) => sum + parseFloat(p.amount), 0);
    
    return {
      total: payments.length,
      totalAmount: total,
      paid: completed.length,
      paidAmount: totalPaid,
      pending: pending.length,
      pendingAmount: totalPending,
      failed: payments.filter(p => p.status === 'failed').length
    };
  }, [payments]);

  // Filtrage et tri
  const filteredAndSortedPayments = useMemo(() => {
    let filtered = payments.filter(payment => {
      const matchesSearch = payment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           payment.reference?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
      const matchesMethod = methodFilter === 'all' || payment.method === methodFilter;
      
      return matchesSearch && matchesStatus && matchesMethod;
    });

    // Tri
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'amount':
          comparison = parseFloat(a.amount) - parseFloat(b.amount);
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
  }, [payments, searchTerm, statusFilter, methodFilter, sortBy, sortOrder]);

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

  // Formatage de montant
  const formatAmount = (amount: string | number) => {
    return parseFloat(amount.toString()).toLocaleString('fr-FR');
  };

  // Téléchargement de reçu
  const handleDownloadReceipt = (payment: MyPayment) => {
    const receiptContent = `REÇU DE PAIEMENT
Administration Communale - RDC

Référence: ${payment.id}
Type: ${payment.type}
Montant: ${formatAmount(payment.amount)} FC
Date: ${formatDate(payment.date)}
Méthode: ${payment.method}
Statut: ${statusConfig[payment.status as keyof typeof statusConfig].label}
${payment.reference ? `Référence externe: ${payment.reference}` : ''}

Merci pour votre paiement.
`;
    
    const link = document.createElement('a');
    link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(receiptContent)}`;
    link.download = `recu_${payment.id}.txt`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">💳 Mes Paiements</h2>
          <p className="text-gray-600">Historique de vos paiements et taxes</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-rdc-yellow">{stats.total}</div>
          <div className="text-sm text-gray-600">Paiements totaux</div>
        </div>
      </div>

      {/* Statistiques détaillées */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">{stats.paid}</div>
              <div className="text-xs text-gray-600">Payés</div>
            </div>
          </div>
          <div className="text-sm font-medium text-green-600">
            {formatAmount(stats.paidAmount)} FC
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">{stats.pending}</div>
              <div className="text-xs text-gray-600">En attente</div>
            </div>
          </div>
          <div className="text-sm font-medium text-yellow-600">
            {formatAmount(stats.pendingAmount)} FC
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-600 font-bold text-sm">✕</span>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">{stats.failed}</div>
              <div className="text-xs text-gray-600">Échoués</div>
            </div>
          </div>
          <div className="text-sm font-medium text-red-600">
            Vérifier
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-rdc-yellow rounded-lg flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">Total</div>
              <div className="text-xs text-gray-600">Montant</div>
            </div>
          </div>
          <div className="text-sm font-bold text-rdc-yellow">
            {formatAmount(stats.totalAmount)} FC
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
              placeholder="Rechercher par type, référence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rdc-yellow focus:border-transparent"
            />
          </div>

          {/* Filtre par statut */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rdc-yellow focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              {Object.entries(statusConfig).map(([status, config]) => (
                <option key={status} value={status}>{config.label}</option>
              ))}
            </select>
          </div>

          {/* Filtre par méthode */}
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-gray-400" />
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rdc-yellow focus:border-transparent"
            >
              <option value="all">Toutes les méthodes</option>
              {Object.keys(paymentMethods).map((method) => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>

          {/* Tri */}
          <div className="flex items-center gap-2">
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field as 'date' | 'amount' | 'type' | 'status');
                setSortOrder(order as 'asc' | 'desc');
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-rdc-yellow focus:border-transparent"
            >
              <option value="date-desc">Plus récent</option>
              <option value="date-asc">Plus ancien</option>
              <option value="amount-desc">Montant ↓</option>
              <option value="amount-asc">Montant ↑</option>
              <option value="type-asc">Type A-Z</option>
              <option value="status-asc">Statut A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tableau des paiements */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {filteredAndSortedPayments.length === 0 ? (
          <div className="text-center py-12">
            <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Aucun paiement trouvé</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' || methodFilter !== 'all'
                ? 'Essayez de modifier vos critères de recherche'
                : 'Vous n\'avez pas encore effectué de paiement'
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Référence</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Méthode</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedPayments.map((payment) => {
                  const statusInfo = statusConfig[payment.status as keyof typeof statusConfig];
                  const paymentType = paymentTypes[payment.type as keyof typeof paymentTypes];
                  const method = paymentMethods[payment.method as keyof typeof paymentMethods];
                  
                  return (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <span className={`text-xl ${paymentType?.color || 'text-gray-400'}`}>
                            {paymentType?.icon || '💳'}
                          </span>
                          <div>
                            <div className="font-medium text-gray-900">{payment.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-mono text-sm text-gray-600">{payment.id}</div>
                          {payment.reference && (
                            <div className="font-mono text-xs text-gray-400">{payment.reference}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatDate(payment.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3 text-green-600" />
                          <span className="font-bold text-gray-900">{formatAmount(payment.amount)} FC</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className={`text-lg ${method?.color || 'text-gray-400'}`}>
                            {method?.icon || '💳'}
                          </span>
                          <span className="text-sm text-gray-600">{payment.method}</span>
                        </div>
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
                            onClick={() => setSelectedPayment(payment)}
                            className="text-rdc-yellow hover:text-yellow-700 p-1 rounded"
                            title="Voir détails"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {payment.status === 'completed' && (
                            <button
                              onClick={() => handleDownloadReceipt(payment)}
                              className="text-green-600 hover:text-green-700 p-1 rounded"
                              title="Télécharger reçu"
                            >
                              <Download className="h-4 w-4" />
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
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Détails du paiement</h3>
              <button
                onClick={() => setSelectedPayment(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <span className="sr-only">Fermer</span>
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type de paiement</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{paymentTypes[selectedPayment.type as keyof typeof paymentTypes]?.icon || '💳'}</span>
                    <span className="font-medium">{selectedPayment.type}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Référence</label>
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{selectedPayment.id}</span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de paiement</label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{formatDate(selectedPayment.date)}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Montant</label>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-bold text-green-600 text-lg">{formatAmount(selectedPayment.amount)} FC</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Méthode de paiement</label>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{paymentMethods[selectedPayment.method as keyof typeof paymentMethods]?.icon || '💳'}</span>
                    <span className="font-medium">{selectedPayment.method}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusConfig[selectedPayment.status as keyof typeof statusConfig].color}`}>
                    <span>{statusConfig[selectedPayment.status as keyof typeof statusConfig].icon}</span>
                    {statusConfig[selectedPayment.status as keyof typeof statusConfig].label}
                  </span>
                </div>
                
                {selectedPayment.reference && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Référence externe</label>
                    <p className="font-mono text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">{selectedPayment.reference}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                {selectedPayment.status === 'completed' && (
                  <button
                    onClick={() => handleDownloadReceipt(selectedPayment)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Télécharger reçu
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

export default PaymentsTab;
