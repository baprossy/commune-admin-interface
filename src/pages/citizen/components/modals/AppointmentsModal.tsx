import React, { useState } from 'react';
import { X, Calendar, Clock, User, MapPin, CheckCircle, AlertCircle, Phone, Mail } from 'lucide-react';
import { MyAppointment } from '../../types';

interface AppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (appointment: MyAppointment) => void;
}

const AppointmentsModal: React.FC<AppointmentsModalProps> = ({ isOpen, onClose, onSuccess }) => {
  // États du formulaire
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    department: '',
    date: '',
    time: '',
    reason: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    notes: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Services disponibles par département
  const departments = [
    {
      id: 'etat-civil',
      name: 'État Civil',
      icon: '📋',
      color: 'bg-blue-500',
      services: [
        'Demande d\'acte de naissance',
        'Demande d\'acte de mariage',
        'Demande d\'acte de décès',
        'Déclaration de naissance',
        'Déclaration de mariage',
        'Certificat de résidence'
      ]
    },
    {
      id: 'urbanisme',
      name: 'Urbanisme & Construction',
      icon: '🏗️',
      color: 'bg-orange-500',
      services: [
        'Demande de permis de construire',
        'Certificat d\'urbanisme',
        'Déclaration de travaux',
        'Consultation du PLU',
        'Demande de raccordement',
        'Contrôle de conformité'
      ]
    },
    {
      id: 'finances',
      name: 'Finances & Taxes',
      icon: '💰',
      color: 'bg-rdc-yellow',
      services: [
        'Questions sur taxes foncières',
        'Problème de paiement',
        'Demande d\'échelonnement',
        'Réclamation fiscale',
        'Mise à jour cadastrale',
        'Évaluation immobilière'
      ]
    },
    {
      id: 'social',
      name: 'Services Sociaux',
      icon: '🤝',
      color: 'bg-green-500',
      services: [
        'Aide sociale',
        'Logement social',
        'Insertion professionnelle',
        'Aide aux familles',
        'Services aux personnes âgées',
        'Handicap et accessibilité'
      ]
    },
    {
      id: 'commerce',
      name: 'Commerce & Entreprises',
      icon: '🏪',
      color: 'bg-purple-500',
      services: [
        'Création d\'entreprise',
        'Licence commerciale',
        'Occupation du domaine public',
        'Marché et foires',
        'Publicité et enseignes',
        'Contrôle sanitaire'
      ]
    },
    {
      id: 'maire',
      name: 'Cabinet du Maire',
      icon: '🎖️',
      color: 'bg-rdc-red',
      services: [
        'Audience avec le Maire',
        'Réclamation administrative',
        'Projet de développement',
        'Partenariat public-privé',
        'Événement communautaire',
        'Médiation administrative'
      ]
    }
  ];

  // Créneaux horaires disponibles
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00'
  ];

  if (!isOpen) return null;

  // Gestionnaire de changement de formulaire
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Reset service si changement de département
    if (field === 'department') {
      setFormData(prev => ({ ...prev, [field]: value, service: '' }));
    }
  };

  // Génération d'un ID de RDV
  const generateAppointmentId = () => {
    return `RDV-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  };

  // Génération des dates disponibles (15 prochains jours ouvrables)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    let current = new Date(today);
    current.setDate(current.getDate() + 1); // Commencer demain
    
    while (dates.length < 15) {
      const dayOfWeek = current.getDay();
      // Exclure weekends (0 = dimanche, 6 = samedi)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        dates.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  // Création du rendez-vous
  const handleCreateAppointment = async () => {
    setIsProcessing(true);
    
    // Simulation du processus
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newAppointment: MyAppointment = {
      id: generateAppointmentId(),
      service: formData.service,
      date: formData.date,
      time: formData.time,
      status: 'confirmed',
      reason: formData.reason
    };

    setIsProcessing(false);
    onSuccess(newAppointment);
  };

  // Formatage de date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* En-tête */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-rdc-red p-2 rounded-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Prendre Rendez-vous</h2>
              <p className="text-sm text-gray-600">Planifiez votre visite aux services municipaux</p>
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
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${step >= num ? 'bg-rdc-red text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {step > num ? <CheckCircle className="h-4 w-4" /> : num}
                </div>
                {num < 4 && (
                  <div className={`w-12 h-0.5 mx-2 ${step > num ? 'bg-rdc-red' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2">
            <span className="text-sm text-gray-600">
              {step === 1 && "Choisir le service"}
              {step === 2 && "Date et heure"}
              {step === 3 && "Vos informations"}
              {step === 4 && "Confirmation"}
            </span>
          </div>
        </div>

        <div className="p-6">
          {/* ÉTAPE 1: Choix du service */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Quel service souhaitez-vous rencontrer ?</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map((dept) => (
                  <div
                    key={dept.id}
                    onClick={() => handleInputChange('department', dept.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md
                      ${formData.department === dept.id 
                        ? 'border-rdc-red bg-red-50' 
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{dept.icon}</span>
                      <h4 className="font-medium text-gray-800">{dept.name}</h4>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      {dept.services.slice(0, 3).map((service, idx) => (
                        <div key={idx}>• {service}</div>
                      ))}
                      {dept.services.length > 3 && (
                        <div className="text-rdc-red font-medium">
                          + {dept.services.length - 3} autres services
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {formData.department && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-3">
                    Services disponibles - {departments.find(d => d.id === formData.department)?.name}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {departments.find(d => d.id === formData.department)?.services.map((service, idx) => (
                      <label key={idx} className="flex items-center gap-2 cursor-pointer hover:bg-blue-100 p-2 rounded">
                        <input
                          type="radio"
                          name="service"
                          value={service}
                          checked={formData.service === service}
                          onChange={(e) => handleInputChange('service', e.target.value)}
                          className="text-rdc-red focus:ring-rdc-red"
                        />
                        <span className="text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!formData.service}
                  className="px-6 py-2 bg-rdc-red text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Continuer →
                </button>
              </div>
            </div>
          )}

          {/* ÉTAPE 2: Date et heure */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Service sélectionné</h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{departments.find(d => d.id === formData.department)?.icon}</span>
                  <div>
                    <div className="font-medium">{formData.service}</div>
                    <div className="text-sm text-gray-600">{departments.find(d => d.id === formData.department)?.name}</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Calendrier */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Choisir une date
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {getAvailableDates().map((date, idx) => {
                      const dateStr = date.toISOString().split('T')[0];
                      return (
                        <button
                          key={idx}
                          onClick={() => handleInputChange('date', dateStr)}
                          className={`p-3 text-sm border rounded-lg transition-all
                            ${formData.date === dateStr 
                              ? 'border-rdc-red bg-red-50 text-red-700' 
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                          <div className="font-medium">
                            {date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                          </div>
                          <div className="text-xs opacity-75">
                            {date.toLocaleDateString('fr-FR', { weekday: 'short' })}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Créneaux horaires */}
                {formData.date && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Choisir un créneau
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => handleInputChange('time', time)}
                          className={`p-2 text-sm border rounded-lg transition-all
                            ${formData.time === time 
                              ? 'border-rdc-red bg-red-50 text-red-700' 
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {formData.date && formData.time && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="h-4 w-4" />
                    <span className="font-medium">Créneaux sélectionné</span>
                  </div>
                  <p className="text-green-700 mt-1">
                    {formatDate(formData.date)} à {formData.time}
                  </p>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ← Retour
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!formData.date || !formData.time}
                  className="px-6 py-2 bg-rdc-red text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Continuer →
                </button>
              </div>
            </div>
          )}

          {/* ÉTAPE 3: Informations personnelles */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold mb-4">Vos informations de contact</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-1" />
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rdc-red focus:border-transparent"
                    placeholder="Christian Dupont"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rdc-red focus:border-transparent"
                    placeholder="+243 XX XXX XXXX"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rdc-red focus:border-transparent"
                    placeholder="christian@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motif de la visite
                  </label>
                  <input
                    type="text"
                    value={formData.reason}
                    onChange={(e) => handleInputChange('reason', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rdc-red focus:border-transparent"
                    placeholder="Précisez votre demande"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes supplémentaires
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rdc-red focus:border-transparent"
                  placeholder="Informations complémentaires, documents à apporter, etc."
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ← Retour
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!formData.contactName || !formData.contactPhone}
                  className="px-6 py-2 bg-rdc-red text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Continuer →
                </button>
              </div>
            </div>
          )}

          {/* ÉTAPE 4: Confirmation */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Confirmer votre rendez-vous</h3>
                <p className="text-gray-600">Vérifiez les informations avant de valider</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-rdc-red mt-1" />
                  <div>
                    <div className="font-medium">Date et heure</div>
                    <div className="text-gray-600">{formatDate(formData.date)} à {formData.time}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-rdc-red mt-1" />
                  <div>
                    <div className="font-medium">Lieu</div>
                    <div className="text-gray-600">Hôtel de Ville - {departments.find(d => d.id === formData.department)?.name}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-rdc-red mt-1" />
                  <div>
                    <div className="font-medium">Service demandé</div>
                    <div className="text-gray-600">{formData.service}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-rdc-red mt-1" />
                  <div>
                    <div className="font-medium">Contact</div>
                    <div className="text-gray-600">{formData.contactName}</div>
                    <div className="text-gray-600">{formData.contactPhone}</div>
                    {formData.contactEmail && <div className="text-gray-600">{formData.contactEmail}</div>}
                  </div>
                </div>

                {formData.reason && (
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-rdc-red mt-1" />
                    <div>
                      <div className="font-medium">Motif</div>
                      <div className="text-gray-600">{formData.reason}</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">À retenir :</p>
                    <ul className="space-y-1">
                      <li>• Présentez-vous 10 minutes avant l'heure</li>
                      <li>• Munissez-vous d'une pièce d'identité</li>
                      <li>• Un SMS de rappel vous sera envoyé</li>
                      <li>• En cas d'empêchement, prévenez 24h à l'avance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ← Modifier
                </button>
                <button
                  onClick={handleCreateAppointment}
                  disabled={isProcessing}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors font-medium"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Confirmation...
                    </div>
                  ) : (
                    'Confirmer le rendez-vous'
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

export default AppointmentsModal;
