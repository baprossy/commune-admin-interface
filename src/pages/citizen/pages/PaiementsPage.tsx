import React, { useState } from 'react';
import { CreditCard, Download, Eye, Plus, Search, Filter, Calendar, DollarSign, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

interface Paiement {
  id: string;
  titre: string;
  description: string;
  montant: number;
  statut: 'en-attente' | 'paye' | 'en-retard' | 'annule';
  dateEcheance: string;
  datePaiement?: string;
  methode?: string;
  reference?: string;
  type: 'taxe' | 'amende' | 'service' | 'document';
}

const PaiementsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tous' | 'en-attente' | 'payes' | 'retard'>('tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaiement, setSelectedPaiement] = useState<Paiement | null>(null);

  const [paiements] = useState<Paiement[]>([
    {
      id: '1',
      titre: 'Taxe foncière 2025',
      description: 'Taxe annuelle sur propriété résidentielle',
      montant: 150000,
      statut: 'en-attente',
      dateEcheance: '2025-08-15',
      type: 'taxe'
    },
    {
      id: '2',
      titre: 'Certificat de naissance',
      description: 'Frais pour certificat de naissance',
      montant: 5000,
      statut: 'paye',
      dateEcheance: '2025-07-20',
      datePaiement: '2025-07-18',
      methode: 'Carte bancaire',
      reference: 'PAY-2025-001',
      type: 'document'
    },
    {
      id: '3',
      titre: 'Amende stationnement',
      description: 'Stationnement interdit Avenue de la Paix',
      montant: 25000,
      statut: 'en-retard',
      dateEcheance: '2025-07-10',
      type: 'amende'
    },
    {
      id: '4',
      titre: 'Taxe déchets Q3 2025',
      description: 'Collecte des déchets ménagers',
      montant: 45000,
      statut: 'paye',
      dateEcheance: '2025-07-30',
      datePaiement: '2025-07-28',
      methode: 'Virement bancaire',
      reference: 'PAY-2025-002',
      type: 'service'
    },
    {
      id: '5',
      titre: 'Permis de construire',
      description: 'Frais de traitement permis de construire',
      montant: 300000,
      statut: 'en-attente',
      dateEcheance: '2025-08-20',
      type: 'service'
    }
  ]);

  const getStatusInfo = (statut: Paiement['statut']) => {
    switch (statut) {
      case 'en-attente':
        return { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'En attente' };
      case 'paye':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', label: 'Payé' };
      case 'en-retard':
        return { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100', label: 'En retard' };
      case 'annule':
        return { icon: XCircle, color: 'text-gray-600', bg: 'bg-gray-100', label: 'Annulé' };
    }
  };

  const getTypeInfo = (type: Paiement['type']) => {
    switch (type) {
      case 'taxe':
        return { color: 'text-blue-600', bg: 'bg-blue-50', label: 'Taxe' };
      case 'amende':
        return { color: 'text-red-600', bg: 'bg-red-50', label: 'Amende' };
      case 'service':
        return { color: 'text-purple-600', bg: 'bg-purple-50', label: 'Service' };
      case 'document':
        return { color: 'text-green-600', bg: 'bg-green-50', label: 'Document' };
    }
  };

  const filteredPaiements = paiements.filter(paiement => {
    const matchesSearch = paiement.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paiement.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (activeTab) {
      case 'en-attente':
        return matchesSearch && paiement.statut === 'en-attente';
      case 'payes':
        return matchesSearch && paiement.statut === 'paye';
      case 'retard':
        return matchesSearch && paiement.statut === 'en-retard';
      default:
        return matchesSearch;
    }
  });

  const totalAmount = paiements.reduce((sum, p) => sum + p.montant, 0);
  const paidAmount = paiements.filter(p => p.statut === 'paye').reduce((sum, p) => sum + p.montant, 0);
  const pendingAmount = paiements.filter(p => ['en-attente', 'en-retard'].includes(p.statut)).reduce((sum, p) => sum + p.montant, 0);

  const handlePay = (paiement: Paiement) => {
    setSelectedPaiement(paiement);
    setShowPaymentModal(true);
  };

  const handleDownloadReceipt = (paiement: Paiement) => {
    console.log(`Téléchargement du reçu pour ${paiement.reference}`);
    alert(`Téléchargement du reçu ${paiement.reference} en cours...`);
  };

  const handleViewDetails = (paiement: Paiement) => {
    console.log(`Détails pour ${paiement.id}`);
    alert(`Affichage des détails de ${paiement.titre}`);
  };

  const processPayment = () => {
    if (selectedPaiement) {
      // Simulation du paiement
      alert(`Paiement de ${selectedPaiement.montant.toLocaleString()} FC pour "${selectedPaiement.titre}" en cours...`);
      setShowPaymentModal(false);
      setSelectedPaiement(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Mes Paiements</h1>
            <p className="text-gray-600">Gérez vos factures et paiements municipaux</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-600">Solde total</p>
              <p className="text-xl font-bold text-gray-800">{pendingAmount.toLocaleString()} FC</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-800">{totalAmount.toLocaleString()}</p>
              <p className="text-xs text-gray-500">FC</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Payés</p>
              <p className="text-2xl font-bold text-gray-800">{paidAmount.toLocaleString()}</p>
              <p className="text-xs text-gray-500">FC</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-gray-800">
                {paiements.filter(p => p.statut === 'en-attente').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">En retard</p>
              <p className="text-2xl font-bold text-gray-800">
                {paiements.filter(p => p.statut === 'en-retard').length}
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
              { key: 'en-attente', label: 'En attente' },
              { key: 'payes', label: 'Payés' },
              { key: 'retard', label: 'En retard' }
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
              placeholder="Rechercher un paiement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Liste des paiements */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paiement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Échéance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPaiements.map((paiement) => {
                const statusInfo = getStatusInfo(paiement.statut);
                const typeInfo = getTypeInfo(paiement.type);
                const StatusIcon = statusInfo.icon;
                const isOverdue = new Date(paiement.dateEcheance) < new Date() && paiement.statut !== 'paye';
                
                return (
                  <tr key={paiement.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{paiement.titre}</div>
                          <div className="text-sm text-gray-500">{paiement.description}</div>
                          {paiement.reference && (
                            <div className="text-xs text-gray-400 font-mono">{paiement.reference}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${typeInfo.bg} ${typeInfo.color}`}>
                        {typeInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        {paiement.montant.toLocaleString()} FC
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                        {new Date(paiement.dateEcheance).toLocaleDateString('fr-FR')}
                      </div>
                      {paiement.datePaiement && (
                        <div className="text-xs text-green-600">
                          Payé le {new Date(paiement.datePaiement).toLocaleDateString('fr-FR')}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(paiement)}
                          className="text-blue-600 hover:text-blue-700 p-1 rounded"
                          title="Voir détails"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {paiement.statut === 'paye' && paiement.reference && (
                          <button
                            onClick={() => handleDownloadReceipt(paiement)}
                            className="text-green-600 hover:text-green-700 p-1 rounded"
                            title="Télécharger reçu"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                        {['en-attente', 'en-retard'].includes(paiement.statut) && (
                          <button
                            onClick={() => handlePay(paiement)}
                            className="text-green-600 hover:text-green-700 px-3 py-1 border border-green-300 rounded-md text-xs font-medium hover:bg-green-50"
                            title="Payer maintenant"
                          >
                            Payer
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
      </div>

      {/* Modal de paiement */}
      {showPaymentModal && selectedPaiement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Paiement</h3>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-800">{selectedPaiement.titre}</h4>
              <p className="text-sm text-gray-600 mt-1">{selectedPaiement.description}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-gray-600">Montant à payer:</span>
                <span className="text-lg font-bold text-gray-800">
                  {selectedPaiement.montant.toLocaleString()} FC
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Méthode de paiement
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Carte bancaire</option>
                  <option>Virement bancaire</option>
                  <option>Mobile Money</option>
                  <option>Espèces</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedPaiement(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={processPayment}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Payer maintenant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaiementsPage;
