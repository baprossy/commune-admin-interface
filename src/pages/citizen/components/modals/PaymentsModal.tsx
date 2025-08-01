import React, { useState } from 'react';
import { X, CreditCard, DollarSign, FileText, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { MyPayment } from '../../types';

interface PaymentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (payment: MyPayment) => void;
}

const PaymentsModal: React.FC<PaymentsModalProps> = ({ isOpen, onClose, onSuccess }) => {
  // États du formulaire
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    taxType: '',
    amount: '',
    reference: '',
    paymentMethod: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardName: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Types de taxes disponibles
  const taxTypes = [
    { 
      id: 'fonciere', 
      name: 'Taxe Foncière', 
      description: 'Taxe sur les biens immobiliers',
      baseAmount: 15000,
      icon: '🏠'
    },
    { 
      id: 'permis', 
      name: 'Permis de Construire', 
      description: 'Frais de permis de construction',
      baseAmount: 25000,
      icon: '🏗️'
    },
    { 
      id: 'commerce', 
      name: 'Patente Commerciale', 
      description: 'Licence pour activité commerciale',
      baseAmount: 30000,
      icon: '🏪'
    },
    { 
      id: 'amende', 
      name: 'Amendes', 
      description: 'Contraventions et amendes diverses',
      baseAmount: 5000,
      icon: '⚠️'
    },
    { 
      id: 'voirie', 
      name: 'Taxe de Voirie', 
      description: 'Entretien des routes et infrastructures',
      baseAmount: 8000,
      icon: '🛣️'
    },
    { 
      id: 'marche', 
      name: 'Droit de Marché', 
      description: 'Occupation d\'emplacement au marché',
      baseAmount: 3000,
      icon: '🏪'
    }
  ];

  // Méthodes de paiement
  const paymentMethods = [
    { id: 'card', name: 'Carte Bancaire', icon: CreditCard, color: 'text-blue-600' },
    { id: 'mobile', name: 'Mobile Money', icon: DollarSign, color: 'text-green-600' },
    { id: 'bank', name: 'Virement Bancaire', icon: CreditCard, color: 'text-purple-600' }
  ];

  if (!isOpen) return null;

  // Gestionnaire de changement de formulaire
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-remplir le montant selon le type de taxe
    if (field === 'taxType') {
      const selectedTax = taxTypes.find(t => t.id === value);
      if (selectedTax) {
        setFormData(prev => ({ 
          ...prev, 
          [field]: value,
          amount: selectedTax.baseAmount.toString(),
          reference: `${value.toUpperCase()}-${Date.now().toString().slice(-6)}`
        }));
      }
    }
  };

  // Générer numéro de transaction
  const generateTransactionId = () => {
    return `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  };

  // Traitement du paiement
  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulation du processus de paiement
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const selectedTax = taxTypes.find(t => t.id === formData.taxType);
    const selectedMethod = paymentMethods.find(m => m.id === formData.paymentMethod);
    
    const newPayment: MyPayment = {
      id: generateTransactionId(),
      type: selectedTax?.name || 'Paiement',
      amount: formData.amount,
      date: new Date().toISOString(),
      status: 'completed',
      method: selectedMethod?.name || 'Carte Bancaire',
      reference: formData.reference
    };

    setIsProcessing(false);
    onSuccess(newPayment);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* En-tête */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-rdc-yellow p-2 rounded-lg">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Payer mes Taxes</h2>
              <p className="text-sm text-gray-600">Paiement sécurisé en ligne</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Indicateur d'étapes */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${step >= num ? 'bg-rdc-yellow text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {step > num ? <CheckCircle className="h-4 w-4" /> : num}
                </div>
                {num < 3 && (
                  <div className={`w-12 h-0.5 mx-2 ${step > num ? 'bg-rdc-yellow' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <span className="text-sm text-gray-600">
              {step === 1 && "Sélection de la taxe"}
              {step === 2 && "Mode de paiement"}
              {step === 3 && "Confirmation"}
            </span>
          </div>
        </div>

        <div className="p-6">
          {/* ÉTAPE 1: Sélection du type de taxe */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Choisissez le type de taxe à payer</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {taxTypes.map((tax) => (
                  <div
                    key={tax.id}
                    onClick={() => handleInputChange('taxType', tax.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md
                      ${formData.taxType === tax.id 
                        ? 'border-rdc-yellow bg-yellow-50' 
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{tax.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{tax.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{tax.description}</p>
                        <p className="text-lg font-bold text-rdc-yellow">
                          {tax.baseAmount.toLocaleString()} FC
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {formData.taxType && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Référence de paiement</span>
                  </div>
                  <input
                    type="text"
                    value={formData.reference}
                    onChange={(e) => handleInputChange('reference', e.target.value)}
                    className="w-full p-2 border border-blue-200 rounded-lg bg-white"
                    placeholder="Référence automatique générée"
                  />
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!formData.taxType}
                  className="px-6 py-2 bg-rdc-yellow text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Continuer →
                </button>
              </div>
            </div>
          )}

          {/* ÉTAPE 2: Mode de paiement */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Récapitulatif</h3>
                <div className="flex justify-between items-center">
                  <span>{taxTypes.find(t => t.id === formData.taxType)?.name}</span>
                  <span className="font-bold text-lg">{parseInt(formData.amount).toLocaleString()} FC</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Choisissez votre mode de paiement</h3>
                
                <div className="grid grid-cols-1 gap-4">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <div
                        key={method.id}
                        onClick={() => handleInputChange('paymentMethod', method.id)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all
                          ${formData.paymentMethod === method.id 
                            ? 'border-rdc-yellow bg-yellow-50' 
                            : 'border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`h-6 w-6 ${method.color}`} />
                          <span className="font-medium">{method.name}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Formulaire carte bancaire */}
                {formData.paymentMethod === 'card' && (
                  <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium">Informations de la carte</h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nom sur la carte
                      </label>
                      <input
                        type="text"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rdc-yellow focus:border-transparent"
                        placeholder="CHARLES DUPONT"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Numéro de carte
                      </label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rdc-yellow focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiration
                        </label>
                        <input
                          type="text"
                          value={formData.cardExpiry}
                          onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rdc-yellow focus:border-transparent"
                          placeholder="MM/AA"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          value={formData.cardCVC}
                          onChange={(e) => handleInputChange('cardCVC', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rdc-yellow focus:border-transparent"
                          placeholder="123"
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ← Retour
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!formData.paymentMethod}
                  className="px-6 py-2 bg-rdc-yellow text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Continuer →
                </button>
              </div>
            </div>
          )}

          {/* ÉTAPE 3: Confirmation */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Confirmer le paiement</h3>
                <p className="text-gray-600">Vérifiez les informations avant de procéder au paiement</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type de taxe:</span>
                  <span className="font-medium">{taxTypes.find(t => t.id === formData.taxType)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Référence:</span>
                  <span className="font-mono text-sm">{formData.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mode de paiement:</span>
                  <span className="font-medium">{paymentMethods.find(m => m.id === formData.paymentMethod)?.name}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Montant total:</span>
                    <span className="text-rdc-yellow">{parseInt(formData.amount).toLocaleString()} FC</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Information importante:</p>
                    <p>Ce paiement sera traité de manière sécurisée. Vous recevrez un reçu par email une fois le paiement confirmé.</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ← Modifier
                </button>
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors font-medium"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Traitement...
                    </div>
                  ) : (
                    `Payer ${parseInt(formData.amount).toLocaleString()} FC`
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentsModal;
