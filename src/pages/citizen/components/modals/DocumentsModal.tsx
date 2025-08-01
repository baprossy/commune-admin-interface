import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Shield } from 'lucide-react';

interface DocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (demand: any, payment: any) => void;
}

const DocumentsModal: React.FC<DocumentsModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [step, setStep] = useState<'selection' | 'payment'>('selection');

  // Documents disponibles
  const documents = [
    { name: 'Acte de naissance', price: '10$', time: '3-5 jours', icon: '👶' },
    { name: 'Acte de mariage', price: '15$', time: '5-7 jours', icon: '💒' },
    { name: 'Certificat de résidence', price: '5$', time: '1-2 jours', icon: '🏠' }
  ];

  const handleDocumentSelect = (doc: any) => {
    setSelectedDocument(doc);
    setStep('payment');
  };

  const handlePayment = () => {
    const demand = {
      id: `RDC-${Date.now()}`,
      name: selectedDocument.name,
      status: 'pending',
      requestDate: new Date().toLocaleDateString('fr-FR'),
      expectedDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
      price: selectedDocument.price,
      reference: `RDC-${Date.now().toString().slice(-8)}`
    };

    const payment = {
      id: `PAY-${Date.now()}`,
      type: selectedDocument.name,
      amount: selectedDocument.price,
      method: paymentMethod,
      date: new Date().toLocaleDateString('fr-FR'),
      status: 'completed',
      reference: demand.reference
    };

    // Directement sauvegarder et fermer
    onSuccess(demand, payment);
    onClose();
    
    // Reset
    setStep('selection');
    setSelectedDocument(null);
    setPaymentMethod('card');
  };

  const handleClose = () => {
    onClose();
    setStep('selection');
    setSelectedDocument(null);
    setPaymentMethod('card');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">📄 Demander un Document</h3>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Étape Sélection */}
        {step === 'selection' && (
          <div className="space-y-4">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-rdc-blue hover:bg-blue-50 cursor-pointer transition-all"
                onClick={() => handleDocumentSelect(doc)}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{doc.icon}</span>
                  <div>
                    <p className="font-bold text-gray-800">{doc.name}</p>
                    <p className="text-sm text-gray-600">⏱️ {doc.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-rdc-blue text-lg">{doc.price}</p>
                  <p className="text-xs text-gray-500">Cliquer</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Étape Paiement */}
        {step === 'payment' && selectedDocument && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-rdc-blue">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-3xl">{selectedDocument.icon}</span>
                <div>
                  <h4 className="font-bold text-lg">{selectedDocument.name}</h4>
                  <p className="text-sm text-gray-600">Délai: {selectedDocument.time}</p>
                </div>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Prix:</span>
                  <span className="font-bold text-2xl text-rdc-blue">{selectedDocument.price}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-bold flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-600" />
                Choisissez votre méthode de paiement :
              </h5>

              <div className="space-y-3">
                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'card' ? 'border-rdc-blue bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-center space-x-3">
                    <input type="radio" checked={paymentMethod === 'card'} readOnly />
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <span>💳 Carte bancaire (Visa, MasterCard)</span>
                  </div>
                </div>

                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'mobile' ? 'border-rdc-blue bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setPaymentMethod('mobile')}
                >
                  <div className="flex items-center space-x-3">
                    <input type="radio" checked={paymentMethod === 'mobile'} readOnly />
                    <Smartphone className="h-5 w-5 text-green-600" />
                    <span>📱 Mobile Money (Airtel, Orange, M-Pesa)</span>
                  </div>
                </div>

                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'paypal' ? 'border-rdc-blue bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <div className="flex items-center space-x-3">
                    <input type="radio" checked={paymentMethod === 'paypal'} readOnly />
                    <span className="text-xl">🅿️</span>
                    <span>PayPal (Sandbox - Tests)</span>
                  </div>
                </div>

                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'bank' ? 'border-rdc-blue bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setPaymentMethod('bank')}
                >
                  <div className="flex items-center space-x-3">
                    <input type="radio" checked={paymentMethod === 'bank'} readOnly />
                    <span className="text-xl">🏦</span>
                    <span>Virement bancaire (Rawbank, BCDC)</span>
                  </div>
                </div>

                <div
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    paymentMethod === 'cash' ? 'border-rdc-blue bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setPaymentMethod('cash')}
                >
                  <div className="flex items-center space-x-3">
                    <input type="radio" checked={paymentMethod === 'cash'} readOnly />
                    <span className="text-xl">💰</span>
                    <span>Paiement en espèces au guichet</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full bg-rdc-blue text-white py-4 rounded-lg hover:bg-blue-600 font-bold text-lg flex items-center justify-center space-x-2"
            >
              <Shield className="h-5 w-5" />
              <span>
                {paymentMethod === 'cash'
                  ? `📝 Enregistrer la Demande`
                  : `💳 Payer ${selectedDocument.price} Maintenant`
                }
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsModal;
