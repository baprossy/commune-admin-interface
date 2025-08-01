import React, { useState } from 'react';
import { FileText, CreditCard, Calendar, History } from 'lucide-react';
import Header from './Header';
import TabNavigation from './TabNavigation';
import OverviewTab from './tabs/OverviewTab';
import DemandsTab from './tabs/DemandsTab';
import PaymentsTab from './tabs/PaymentsTab';
import AppointmentsTab from './tabs/AppointmentsTab';
import DocumentsModal from './modals/DocumentsModal';
import PaymentsModal from './modals/PaymentsModal';
import AppointmentsModal from './modals/AppointmentsModal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { MyDemand, MyPayment, MyAppointment } from '../types';

const CitizenHome: React.FC = () => {
  // États principaux
  const [activeTab, setActiveTab] = useState<'overview' | 'demands' | 'payments' | 'appointments'>('overview');
  const [showModal, setShowModal] = useState<string | null>(null);
  
  // Récupération du nom d'utilisateur - VERSION SIMPLIFIÉE
  const [userName] = useState(() => {
    // Essayer localStorage avec différentes clés possibles
    const possibleKeys = ['userName', 'currentUserName', 'user', 'currentUser', 'authUser'];
    for (const key of possibleKeys) {
      const stored = localStorage.getItem(key);
      if (stored && stored !== 'undefined' && stored !== 'null') {
        try {
          // Si c'est du JSON, parser
          const parsed = JSON.parse(stored);
          const name = parsed.name || parsed.firstName || parsed.username || parsed.email?.split('@')[0];
          if (name && name.length > 0) return name;
        } catch (e) {
          // Si ce n'est pas du JSON, utiliser directement
          if (stored.length > 0 && !stored.includes('{')) {
            return stored;
          }
        }
      }
    }
    
    // Essayer sessionStorage
    for (const key of possibleKeys) {
      const stored = sessionStorage.getItem(key);
      if (stored && stored !== 'undefined' && stored !== 'null') {
        try {
          const parsed = JSON.parse(stored);
          const name = parsed.name || parsed.firstName || parsed.username || parsed.email?.split('@')[0];
          if (name && name.length > 0) return name;
        } catch (e) {
          if (stored.length > 0 && !stored.includes('{')) {
            return stored;
          }
        }
      }
    }
    
    // Valeur par défaut décente
    return 'Citoyen';
  });

  // Données persistantes avec hook personnalisé
  const [myDemands, setMyDemands] = useLocalStorage<MyDemand[]>('citizenDemands', []);
  const [myPayments, setMyPayments] = useLocalStorage<MyPayment[]>('citizenPayments', []);
  const [myAppointments, setMyAppointments] = useLocalStorage<MyAppointment[]>('citizenAppointments', []);

  // Services rapides
  const quickServices = [
    { 
      title: 'Demander un Acte', 
      description: 'Acte de naissance, mariage, décès', 
      icon: FileText, 
      color: 'bg-rdc-blue', 
      action: 'Demander', 
      modalType: 'documents' 
    },
    { 
      title: 'Payer mes Taxes', 
      description: 'Taxes foncières, permis, amendes', 
      icon: CreditCard, 
      color: 'bg-rdc-yellow', 
      action: 'Payer', 
      modalType: 'payments' 
    },
    { 
      title: 'Prendre RDV', 
      description: 'Rendez-vous avec les services', 
      icon: Calendar, 
      color: 'bg-rdc-red', 
      action: 'Planifier', 
      modalType: 'appointments' 
    },
    { 
      title: 'Mon Historique', 
      description: 'Demandes, paiements, rendez-vous', 
      icon: History, 
      color: 'bg-green-600', 
      action: 'Voir', 
      modalType: 'history' 
    }
  ];

  // Gestionnaires d'événements
  const handleServiceClick = (modalType: string) => {
    if (modalType === 'history') {
      setActiveTab('demands');
    } else if (modalType === 'documents') {
      setShowModal('documents');
    } else if (modalType === 'payments') {
      setShowModal('payments');
    } else if (modalType === 'appointments') {
      setShowModal('appointments');
    } else {
      // Autres modals pas encore créés
      alert(`Modal ${modalType} sera créé prochainement !`);
    }
  };

  const closeModal = () => {
    setShowModal(null);
  };

  // Gestionnaires de mise à jour pour les onglets - VERSION CORRIGÉE
  const handleUpdateDemand = (demandId: string, updates: Partial<MyDemand>) => {
    setMyDemands((prev: MyDemand[]) => prev.map((demand: MyDemand) => 
      demand.id === demandId ? { ...demand, ...updates } : demand
    ));
  };

  const handleUpdatePayment = (paymentId: string, updates: Partial<MyPayment>) => {
    setMyPayments((prev: MyPayment[]) => prev.map((payment: MyPayment) =>
      payment.id === paymentId ? { ...payment, ...updates } : payment
    ));
  };

  const handleUpdateAppointment = (appointmentId: string, updates: Partial<MyAppointment>) => {
    setMyAppointments((prev: MyAppointment[]) => prev.map((appointment: MyAppointment) =>
      appointment.id === appointmentId ? { ...appointment, ...updates } : appointment
    ));
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <Header userName={userName} />

      {/* Navigation par onglets */}
      {activeTab !== 'overview' && (
        <TabNavigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          counts={{
            demands: myDemands.length,
            payments: myPayments.length,
            appointments: myAppointments.length
          }} 
        />
      )}

      {/* Contenu selon l'onglet actif */}
      {activeTab === 'overview' && (
        <>
          {/* Services rapides */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index} 
                  onClick={() => handleServiceClick(service.modalType)}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer group transform hover:-translate-y-1"
                >
                  <div className={`${service.color} p-4 rounded-lg mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  <div className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-rdc-blue hover:to-blue-600 hover:text-white text-gray-800 py-3 px-4 rounded-lg transition-all font-medium transform hover:scale-105 text-center">
                    {service.action} →
                  </div>
                </div>
              );
            })}
          </div>

          {/* Vue d'ensemble */}
          <OverviewTab 
            myDemands={myDemands}
            myPayments={myPayments}
            myAppointments={myAppointments}
            setActiveTab={setActiveTab}
          />
        </>
      )}

      {/* Onglet Demandes */}
      {activeTab === 'demands' && (
        <DemandsTab 
          demands={myDemands}
          onUpdateDemand={handleUpdateDemand}
        />
      )}

      {/* Onglet Paiements */}
      {activeTab === 'payments' && (
        <PaymentsTab 
          payments={myPayments}
          onUpdatePayment={handleUpdatePayment}
        />
      )}

      {/* Onglet Rendez-vous */}
      {activeTab === 'appointments' && (
        <AppointmentsTab 
          appointments={myAppointments}
          onUpdateAppointment={handleUpdateAppointment}
        />
      )}

      {/* Modal Documents */}
      {showModal === 'documents' && (
        <DocumentsModal 
          isOpen={true}
          onClose={closeModal}
          onSuccess={(demand, payment) => {
            setMyDemands([...myDemands, demand]);
            setMyPayments([...myPayments, payment]);
            alert('Demande créée avec succès !');
            closeModal();
          }}
        />
      )}

      {/* Modal Paiements */}
      {showModal === 'payments' && (
        <PaymentsModal 
          isOpen={true}
          onClose={closeModal}
          onSuccess={(payment) => {
            setMyPayments([...myPayments, payment]);
            closeModal();
          }}
        />
      )}

      {/* Modal Rendez-vous */}
      {showModal === 'appointments' && (
        <AppointmentsModal 
          isOpen={true}
          onClose={closeModal}
          onSuccess={(appointment) => {
            setMyAppointments([...myAppointments, appointment]);
            alert('Rendez-vous confirmé !');
            closeModal();
          }}
        />
      )}
    </div>
  );
};

export default CitizenHome;
