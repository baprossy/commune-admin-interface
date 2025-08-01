import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

// Import des pages SIDEBAR (nouvelles)
import SidebarProfilPage from './sidebar-pages/SidebarProfilPage';
import SidebarDocumentsPage from './sidebar-pages/SidebarDocumentsPage';
import SidebarPaiementsPage from './sidebar-pages/SidebarPaiementsPage';
import SidebarRendezVousPage from './sidebar-pages/SidebarRendezVousPage';
import SidebarServicesLocauxPage from './sidebar-pages/SidebarServicesLocauxPage';

// Import des composants dashboard HORIZONTAUX (existants - ne pas toucher)
import OverviewTab from './components/tabs/OverviewTab';
import DemandsTab from './components/tabs/DemandsTab';
import PaymentsTab from './components/tabs/PaymentsTab';
import AppointmentsTab from './components/tabs/AppointmentsTab';

import { MyDemand, MyPayment, MyAppointment } from './types';

const CitizenLayout: React.FC = () => {
  // État pour la navigation SIDEBAR
  const [activeSection, setActiveSection] = useState('accueil');
  
  // États pour les onglets HORIZONTAUX (gardés intacts)
  const [activeTab, setActiveTab] = useState<'overview' | 'demands' | 'payments' | 'appointments'>('overview');

  // Données mockées pour onglets horizontaux (gardées intactes)
  const myDemands: MyDemand[] = [
    {
      id: '1',
      type: 'Certificat de naissance',
      date: '2025-07-20',
      status: 'ready',
      documents: ['certificat_naissance.pdf']
    },
    {
      id: '2',
      type: 'Attestation de résidence',
      date: '2025-07-25',
      status: 'processing'
    }
  ];

  const myPayments: MyPayment[] = [
    {
      id: '1',
      type: 'Taxe foncière',
      amount: '150000',
      date: '2025-07-15',
      status: 'pending',
      dueDate: '2025-08-15'
    },
    {
      id: '2',
      type: 'Certificat de naissance',
      amount: '5000',
      date: '2025-07-20',
      status: 'paid'
    }
  ];

  const myAppointments: MyAppointment[] = [
    {
      id: '1',
      service: 'État Civil',
      date: '2025-08-05',
      time: '09:00',
      status: 'confirmed',
      location: 'Mairie - Bureau 12'
    },
    {
      id: '2',
      service: 'Urbanisme',
      date: '2025-08-08',
      time: '14:30',
      status: 'pending',
      location: 'Mairie - Bureau 5'
    }
  ];

  // Fonctions de gestion pour les actions (gardées intactes)
  const handleUpdateDemand = (demandId: string, updates: Partial<MyDemand>) => {
    console.log('Update demand:', demandId, updates);
  };

  const handleUpdatePayment = (paymentId: string, updates: Partial<MyPayment>) => {
    console.log('Update payment:', paymentId, updates);
  };

  const handleUpdateAppointment = (appointmentId: string, updates: Partial<MyAppointment>) => {
    console.log('Update appointment:', appointmentId, updates);
  };

  // Fonction pour rendre le contenu principal
  const renderMainContent = () => {
    console.log('Active section:', activeSection);
    
    // PAGES SIDEBAR VERTICALES (nouvelles)
    switch (activeSection) {
      case 'profil':
        console.log('Rendering SidebarProfilPage');
        return <SidebarProfilPage />;
        
      case 'documents':
        console.log('Rendering SidebarDocumentsPage');
        return <SidebarDocumentsPage />;
        
      case 'paiements':
        console.log('Rendering SidebarPaiementsPage');
        return <SidebarPaiementsPage />;
        
      case 'rendez-vous':
        console.log('Rendering SidebarRendezVousPage');
        return <SidebarRendezVousPage />;
        
      case 'services-locaux':
        console.log('Rendering SidebarServicesLocauxPage');
        return <SidebarServicesLocauxPage />;
      
      case 'accueil':
      default:
        // PAGE ACCUEIL avec onglets HORIZONTAUX (gardés intacts)
        console.log('Rendering Accueil with horizontal tabs');
        return (
          <div className="max-w-6xl mx-auto p-6">
            {/* Onglets horizontaux (existants - ne pas toucher) */}
            <div className="bg-white rounded-xl shadow-lg mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {[
                    { key: 'overview', label: 'Aperçu', icon: '📊' },
                    { key: 'demands', label: 'Demandes', icon: '📋' },
                    { key: 'payments', label: 'Paiements', icon: '💳' },
                    { key: 'appointments', label: 'Rendez-vous', icon: '📅' }
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
                      className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.key
                          ? 'border-rdc-blue text-rdc-blue'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span>{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <OverviewTab
                    myDemands={myDemands}
                    myPayments={myPayments}
                    myAppointments={myAppointments}
                    setActiveTab={setActiveTab}
                  />
                )}
                {activeTab === 'demands' && (
                  <DemandsTab
                    demands={myDemands}
                    onUpdateDemand={handleUpdateDemand}
                  />
                )}
                {activeTab === 'payments' && (
                  <PaymentsTab
                    payments={myPayments}
                    onUpdatePayment={handleUpdatePayment}
                  />
                )}
                {activeTab === 'appointments' && (
                  <AppointmentsTab
                    appointments={myAppointments}
                    onUpdateAppointment={handleUpdateAppointment}
                  />
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={(section) => {
          console.log('SIDEBAR CLICK - Changing to:', section);
          setActiveSection(section);
        }}
      />
      
      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header userName="Christian" />
        
        {/* Contenu principal */}
        <main className="flex-1 overflow-auto">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default CitizenLayout;
