import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Clock,
  Camera,
  Download
} from 'lucide-react';

interface Service {
  id: string;
  nom: string;
  description: string;
  prix: string;
  delai: string;
  documents: string[];
  categorie: string;
  statut: 'disponible' | 'maintenance' | 'ferme';
  responsable?: string;
}

interface DemandeModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
  currentUser: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
}

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  status: 'pending' | 'uploaded' | 'error';
}

const DemandeModal: React.FC<DemandeModalProps> = ({ isOpen, onClose, service, currentUser }) => {
  const [step, setStep] = useState(1); // 1: Info, 2: Documents, 3: Validation, 4: Confirmation
  const [formData, setFormData] = useState({
    motif: '',
    urgence: 'normale',
    informationsComplementaires: '',
    datePreferee: '',
    heurePreferee: '',
    modeRetrait: 'guichet' // guichet, domicile, email
  });
  
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [numeroDossier, setNumeroDossier] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, documentType: string) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const newFile: UploadedFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: `${documentType} - ${file.name}`,
          type: file.type,
          size: file.size,
          url: URL.createObjectURL(file),
          status: 'uploaded'
        };
        setUploadedFiles(prev => [...prev, newFile]);
      });
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const calculateTotalCost = () => {
    const basePrix = parseInt(service.prix.replace(/[^\d]/g, '')) || 0;
    const urgenceMultiplier = formData.urgence === 'urgente' ? 1.5 : 1;
    const domicileExtra = formData.modeRetrait === 'domicile' ? 5000 : 0;
    return Math.round(basePrix * urgenceMultiplier + domicileExtra);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Générer numéro de dossier
    const numero = `${service.categorie.toUpperCase()}-${Date.now().toString().slice(-6)}`;
    setNumeroDossier(numero);
    
    setIsSubmitting(false);
    setStep(4);
  };

  const resetModal = () => {
    setStep(1);
    setFormData({
      motif: '',
      urgence: 'normale',
      informationsComplementaires: '',
      datePreferee: '',
      heurePreferee: '',
      modeRetrait: 'guichet'
    });
    setUploadedFiles([]);
    setNumeroDossier('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Demande de Service</h2>
            <p className="text-sm text-gray-600 mt-1">{service.nom}</p>
          </div>
          <button
            onClick={resetModal}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {['Informations', 'Documents', 'Validation', 'Confirmation'].map((stepName, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step > index + 1 ? 'bg-green-500 text-white' :
                  step === index + 1 ? 'bg-blue-500 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {step > index + 1 ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>
                <span className={`ml-2 text-sm ${step >= index + 1 ? 'text-gray-900' : 'text-gray-500'}`}>
                  {stepName}
                </span>
                {index < 3 && (
                  <div className={`w-8 h-0.5 mx-4 ${step > index + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Informations */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations de la demande</h3>
                
                {/* Service Info */}
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Service:</span>
                      <p className="text-blue-800 font-semibold">{service.nom}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Prix de base:</span>
                      <p className="text-green-600 font-semibold">{service.prix}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Délai:</span>
                      <p className="text-orange-600 font-semibold">{service.delai}</p>
                    </div>
                  </div>
                </div>

                {/* User Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="inline w-4 h-4 mr-1" />
                      Nom complet
                    </label>
                    <input
                      type="text"
                      value={`${currentUser.firstName} ${currentUser.lastName}`}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline w-4 h-4 mr-1" />
                      Téléphone
                    </label>
                    <input
                      type="text"
                      value={currentUser.phone}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="inline w-4 h-4 mr-1" />
                      Email
                    </label>
                    <input
                      type="email"
                      value={currentUser.email}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline w-4 h-4 mr-1" />
                      Adresse
                    </label>
                    <input
                      type="text"
                      value={currentUser.address}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Motif de la demande *
                    </label>
                    <textarea
                      name="motif"
                      value={formData.motif}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Expliquez brièvement pourquoi vous avez besoin de ce service..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Urgence
                      </label>
                      <select
                        name="urgence"
                        value={formData.urgence}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="normale">Normale (+0%)</option>
                        <option value="urgente">Urgente (+50%)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mode de retrait
                      </label>
                      <select
                        name="modeRetrait"
                        value={formData.modeRetrait}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="guichet">Au guichet (+0 FC)</option>
                        <option value="domicile">À domicile (+5000 FC)</option>
                        <option value="email">Par email (si applicable)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline w-4 h-4 mr-1" />
                        Date préférée
                      </label>
                      <input
                        type="date"
                        name="datePreferee"
                        value={formData.datePreferee}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock className="inline w-4 h-4 mr-1" />
                        Heure préférée
                      </label>
                      <select
                        name="heurePreferee"
                        value={formData.heurePreferee}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Peu importe</option>
                        <option value="08:00">08:00 - 09:00</option>
                        <option value="09:00">09:00 - 10:00</option>
                        <option value="10:00">10:00 - 11:00</option>
                        <option value="11:00">11:00 - 12:00</option>
                        <option value="13:00">13:00 - 14:00</option>
                        <option value="14:00">14:00 - 15:00</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Informations complémentaires
                    </label>
                    <textarea
                      name="informationsComplementaires"
                      value={formData.informationsComplementaires}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Toute information utile pour traiter votre demande..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Documents */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Documents requis</h3>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Important</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Tous les documents doivent être en cours de validité et lisibles. 
                      Formats acceptés: PDF, JPG, PNG (max 5MB par fichier).
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {service.documents.map((doc, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{doc}</h4>
                      <span className="text-sm text-red-600">*Requis</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <label className="cursor-pointer bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors flex items-center">
                        <Upload className="w-4 h-4 mr-2" />
                        Choisir fichier
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(e, doc)}
                          multiple
                        />
                      </label>
                      <span className="text-sm text-gray-500">ou</span>
                      <button className="bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center">
                        <Camera className="w-4 h-4 mr-2" />
                        Prendre photo
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Fichiers uploadés ({uploadedFiles.length})</h4>
                  <div className="space-y-2">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-green-600 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-green-800">{file.name}</p>
                            <p className="text-xs text-green-600">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Validation */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Validation de la demande</h3>
              
              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Récapitulatif</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Service demandé</h5>
                    <p className="text-gray-900">{service.nom}</p>
                    
                    <h5 className="text-sm font-medium text-gray-700 mb-2 mt-4">Motif</h5>
                    <p className="text-gray-900">{formData.motif}</p>
                    
                    <h5 className="text-sm font-medium text-gray-700 mb-2 mt-4">Urgence</h5>
                    <p className="text-gray-900 capitalize">{formData.urgence}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Documents fournis</h5>
                    <p className="text-gray-900">{uploadedFiles.length} fichier(s)</p>
                    
                    <h5 className="text-sm font-medium text-gray-700 mb-2 mt-4">Mode de retrait</h5>
                    <p className="text-gray-900 capitalize">{formData.modeRetrait}</p>
                    
                    <h5 className="text-sm font-medium text-gray-700 mb-2 mt-4">Date préférée</h5>
                    <p className="text-gray-900">
                      {formData.datePreferee || 'Aucune préférence'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Cost Calculation */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Calcul des frais
                </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prix de base</span>
                    <span className="font-medium">{service.prix}</span>
                  </div>
                  
                  {formData.urgence === 'urgente' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Supplément urgence (+50%)</span>
                      <span className="font-medium text-orange-600">
                        +{Math.round((parseInt(service.prix.replace(/[^\d]/g, '')) || 0) * 0.5)} FC
                      </span>
                    </div>
                  )}
                  
                  {formData.modeRetrait === 'domicile' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Livraison à domicile</span>
                      <span className="font-medium text-blue-600">+5 000 FC</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total à payer</span>
                      <span className="text-green-600">{calculateTotalCost().toLocaleString()} FC</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3" required />
                  <span className="text-sm text-blue-800">
                    J'accepte les conditions générales et certifie que les informations fournies sont exactes.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Demande soumise avec succès !</h3>
                <p className="text-gray-600">Votre demande a été enregistrée et sera traitée dans les plus brefs délais.</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-medium text-green-800 mb-4">Numéro de dossier</h4>
                <div className="text-2xl font-bold text-green-600 font-mono bg-white px-4 py-2 rounded border border-green-300">
                  {numeroDossier}
                </div>
                <p className="text-sm text-green-700 mt-2">
                  Conservez ce numéro pour suivre l'avancement de votre demande
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-medium text-blue-800 mb-2">Prochaines étapes</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Vérification des documents (24h)</li>
                    <li>• Traitement de la demande ({service.delai})</li>
                    <li>• Notification de finalisation</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h5 className="font-medium text-orange-800 mb-2">Paiement</h5>
                  <p className="text-sm text-orange-700">
                    Montant: <span className="font-bold">{calculateTotalCost().toLocaleString()} FC</span>
                  </p>
                  <p className="text-sm text-orange-700">
                    À régler lors du rendez-vous ou avant traitement
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="flex space-x-3">
            {step > 1 && step < 4 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Précédent
              </button>
            )}
          </div>
          
          <div className="flex space-x-3">
            {step < 3 && (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !formData.motif}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Suivant
              </button>
            )}
            
            {step === 3 && (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || uploadedFiles.length === 0}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Soumission...
                  </>
                ) : (
                  'Soumettre la demande'
                )}
              </button>
            )}
            
            {step === 4 && (
              <div className="flex space-x-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Imprimer
                </button>
                <button
                  onClick={resetModal}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandeModal;
