import React, { useState } from 'react';
import { 
  FileText, 
  DollarSign, 
  Building, 
  Heart, 
  Wrench, 
  Shield, 
  Users,
  Clock,
  CreditCard,
  ChevronRight,
  Search,
  Filter,
  Stethoscope
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  documents: string[];
  category: string;
  urgent?: boolean;
}

const ServicesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = [
    { id: 'all', name: 'Tous les services', icon: Users, color: 'bg-gray-500' },
    { id: 'etat-civil', name: 'État Civil', icon: FileText, color: 'bg-blue-500' },
    { id: 'fiscalite', name: 'Fiscalité', icon: DollarSign, color: 'bg-green-500' },
    { id: 'urbanisme', name: 'Urbanisme', icon: Building, color: 'bg-purple-500' },
    { id: 'social', name: 'Social', icon: Heart, color: 'bg-pink-500' },
    { id: 'technique', name: 'Technique', icon: Wrench, color: 'bg-orange-500' },
    { id: 'securite', name: 'Sécurité', icon: Shield, color: 'bg-red-500' },
    { id: 'sante', name: 'Santé', icon: Stethoscope, color: 'bg-teal-500' },
  ];

  const services: Service[] = [
    // État Civil
    {
      id: 'acte-naissance',
      name: 'Acte de naissance',
      description: 'Délivrance d\'un acte de naissance certifié conforme',
      price: '5 FC',
      duration: '24h',
      documents: ['Demande manuscrite', 'Pièce d\'identité', 'Frais de dossier'],
      category: 'etat-civil'
    },
    {
      id: 'acte-mariage',
      name: 'Acte de mariage',
      description: 'Délivrance d\'un acte de mariage certifié conforme',
      price: '10 FC',
      duration: '24h',
      documents: ['Demande manuscrite', 'Pièces d\'identité des époux', 'Frais de dossier'],
      category: 'etat-civil'
    },
    {
      id: 'acte-deces',
      name: 'Acte de décès',
      description: 'Délivrance d\'un acte de décès certifié conforme',
      price: '5 FC',
      duration: '24h',
      documents: ['Demande manuscrite', 'Certificat médical', 'Pièce d\'identité du demandeur'],
      category: 'etat-civil'
    },
    {
      id: 'certificat-celibat',
      name: 'Certificat de célibat',
      description: 'Attestation certifiant l\'état de célibat du demandeur',
      price: '15 FC',
      duration: '48h',
      documents: ['Demande manuscrite', 'Pièce d\'identité', 'Témoins', 'Frais de dossier'],
      category: 'etat-civil'
    },
    {
      id: 'legalisation',
      name: 'Légalisation de signatures',
      description: 'Légalisation officielle de signatures sur documents',
      price: '3 FC',
      duration: '2h',
      documents: ['Document à légaliser', 'Pièce d\'identité'],
      category: 'etat-civil',
      urgent: true
    },
    {
      id: 'carte-identite',
      name: 'Carte d\'identité',
      description: 'Établissement ou renouvellement de carte d\'identité',
      price: '25 FC',
      duration: '7 jours',
      documents: ['Formulaire rempli', 'Photos d\'identité', 'Acte de naissance', 'Frais'],
      category: 'etat-civil'
    },

    // Fiscalité
    {
      id: 'taxe-fonciere',
      name: 'Taxe foncière',
      description: 'Paiement de la taxe annuelle sur les propriétés foncières',
      price: 'Variable',
      duration: 'Immédiat',
      documents: ['Titre de propriété', 'Quittance précédente', 'Pièce d\'identité'],
      category: 'fiscalite'
    },
    {
      id: 'patente-commerciale',
      name: 'Patente commerciale',
      description: 'Licence d\'exploitation pour activités commerciales',
      price: '50-500 FC',
      duration: '5 jours',
      documents: ['Demande timbrée', 'Plan de localisation', 'Pièce d\'identité', 'Frais'],
      category: 'fiscalite'
    },
    {
      id: 'taxe-vehicule',
      name: 'Taxe sur véhicules',
      description: 'Vignette automobile annuelle',
      price: '30-100 FC',
      duration: '24h',
      documents: ['Carte grise', 'Assurance', 'Contrôle technique', 'Pièce d\'identité'],
      category: 'fiscalite'
    },
    {
      id: 'droits-mutation',
      name: 'Droits de mutation',
      description: 'Taxes sur transactions immobilières',
      price: '5% valeur',
      duration: '3 jours',
      documents: ['Acte de vente', 'Évaluation', 'Pièces d\'identité', 'Frais'],
      category: 'fiscalite'
    },
    {
      id: 'taxe-sejour',
      name: 'Taxe de séjour',
      description: 'Taxe pour hôtels et résidences touristiques',
      price: '2 FC/nuit',
      duration: 'Mensuel',
      documents: ['Registre clients', 'Déclaration', 'Licence tourisme'],
      category: 'fiscalite'
    },
    {
      id: 'redevance-marche',
      name: 'Redevance de marché',
      description: 'Location d\'emplacements sur les marchés communaux',
      price: '5-20 FC/jour',
      duration: 'Quotidien',
      documents: ['Demande d\'emplacement', 'Pièce d\'identité', 'Caution'],
      category: 'fiscalite'
    },

    // Urbanisme
    {
      id: 'permis-construire',
      name: 'Permis de construire',
      description: 'Autorisation de construction ou rénovation',
      price: '100-1000 FC',
      duration: '15 jours',
      documents: ['Plans architecturaux', 'Étude de sol', 'Titre de propriété', 'Frais'],
      category: 'urbanisme'
    },
    {
      id: 'certificat-urbanisme',
      name: 'Certificat d\'urbanisme',
      description: 'Information sur les règles d\'urbanisme applicables',
      price: '20 FC',
      duration: '5 jours',
      documents: ['Demande timbrée', 'Plan de situation', 'Pièce d\'identité'],
      category: 'urbanisme'
    },
    {
      id: 'autorisation-voirie',
      name: 'Autorisation de voirie',
      description: 'Occupation temporaire du domaine public',
      price: '50 FC',
      duration: '3 jours',
      documents: ['Demande motivée', 'Plan d\'occupation', 'Assurance', 'Caution'],
      category: 'urbanisme'
    },
    {
      id: 'plan-lotissement',
      name: 'Approbation de lotissement',
      description: 'Validation de plans de division de terrains',
      price: '500 FC',
      duration: '30 jours',
      documents: ['Plans topographiques', 'Étude d\'impact', 'Titre de propriété'],
      category: 'urbanisme'
    },

    // Social
    {
      id: 'certificat-indigence',
      name: 'Certificat d\'indigence',
      description: 'Attestation de situation financière précaire',
      price: 'Gratuit',
      duration: '24h',
      documents: ['Demande manuscrite', 'Témoignages', 'Enquête sociale'],
      category: 'social'
    },
    {
      id: 'attestation-residence',
      name: 'Attestation de résidence',
      description: 'Certificat de domiciliation dans la commune',
      price: '5 FC',
      duration: '2h',
      documents: ['Demande manuscrite', 'Témoins', 'Factures domicile'],
      category: 'social',
      urgent: true
    },
    {
      id: 'aide-urgence',
      name: 'Aide sociale d\'urgence',
      description: 'Assistance pour situations d\'urgence sociale',
      price: 'Gratuit',
      duration: '24h',
      documents: ['Demande motivée', 'Certificat médical si applicable', 'Enquête sociale'],
      category: 'social'
    },
    {
      id: 'bourse-scolaire',
      name: 'Bourse scolaire',
      description: 'Aide financière pour la scolarité',
      price: 'Gratuit',
      duration: '15 jours',
      documents: ['Bulletin scolaire', 'Certificat d\'indigence', 'Attestation inscription'],
      category: 'social'
    },

    // Technique
    {
      id: 'assainissement',
      name: 'Voirie et assainissement',
      description: 'Entretien des routes et canalisations',
      price: 'Devis',
      duration: 'Variable',
      documents: ['Demande d\'intervention', 'Plan de localisation'],
      category: 'technique'
    },
    {
      id: 'eclairage-public',
      name: 'Éclairage public',
      description: 'Installation et entretien de l\'éclairage',
      price: 'Devis',
      duration: '7 jours',
      documents: ['Demande communautaire', 'Plan d\'implantation'],
      category: 'technique'
    },
    {
      id: 'gestion-dechets',
      name: 'Gestion des déchets',
      description: 'Collecte et traitement des déchets ménagers',
      price: '10 FC/mois',
      duration: 'Continu',
      documents: ['Abonnement', 'Localisation du domicile'],
      category: 'technique'
    },
    {
      id: 'adduction-eau',
      name: 'Adduction d\'eau',
      description: 'Raccordement au réseau d\'eau potable',
      price: '200 FC',
      duration: '10 jours',
      documents: ['Demande technique', 'Plan de raccordement', 'Frais'],
      category: 'technique'
    },

    // Sécurité
    {
      id: 'autorisation-manifestation',
      name: 'Autorisation de manifestation',
      description: 'Permis pour événements publics',
      price: '30 FC',
      duration: '5 jours',
      documents: ['Demande motivée', 'Programme détaillé', 'Assurance', 'Sécurité'],
      category: 'securite'
    },
    {
      id: 'permis-port-armes',
      name: 'Permis de port d\'armes',
      description: 'Autorisation de détention d\'armes',
      price: '100 FC',
      duration: '30 jours',
      documents: ['Demande timbrée', 'Casier judiciaire', 'Certificat médical', 'Formation'],
      category: 'securite'
    },

    // Santé
    {
      id: 'controle-sanitaire',
      name: 'Contrôle sanitaire',
      description: 'Inspection hygiène des établissements',
      price: '25 FC',
      duration: '3 jours',
      documents: ['Demande d\'inspection', 'Licence commerciale'],
      category: 'sante'
    },
    {
      id: 'autorisation-restaurant',
      name: 'Autorisation restaurant',
      description: 'Licence d\'exploitation pour restaurants',
      price: '75 FC',
      duration: '7 jours',
      documents: ['Plans locaux', 'Certificat hygiène', 'Formation alimentaire'],
      category: 'sante'
    },
    {
      id: 'vaccination',
      name: 'Campagne de vaccination',
      description: 'Services de vaccination communautaire',
      price: 'Gratuit',
      duration: 'Immédiat',
      documents: ['Carnet de vaccination', 'Pièce d\'identité'],
      category: 'sante'
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRequestService = (serviceId: string) => {
    alert(`Demande de service ${serviceId} initiée ! (Fonctionnalité en développement)`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Services Communaux</h1>
        <p className="text-gray-600">Découvrez tous les services offerts par l'Administration Communale de KINTAMBO</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">Filtrer par :</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive
                    ? `${category.color} text-white`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-gray-800 flex-1">{service.name}</h3>
                {service.urgent && (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Urgent
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">{service.description}</p>
            </div>

            {/* Details */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">{service.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-600">{service.duration}</span>
                </div>
              </div>

              {/* Documents Required */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Documents requis :</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {service.documents.slice(0, 3).map((doc, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      {doc}
                    </li>
                  ))}
                  {service.documents.length > 3 && (
                    <li className="text-blue-600">+{service.documents.length - 3} autres...</li>
                  )}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleRequestService(service.id)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                Demander ce service
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun service trouvé</h3>
          <p className="text-gray-600">Essayez de modifier vos critères de recherche.</p>
        </div>
      )}

      {/* Statistics */}
      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Statistiques des services</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{services.length}</div>
            <div className="text-sm text-gray-600">Services disponibles</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{categories.length - 1}</div>
            <div className="text-sm text-gray-600">Catégories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">24h</div>
            <div className="text-sm text-gray-600">Délai moyen</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">98%</div>
            <div className="text-sm text-gray-600">Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
