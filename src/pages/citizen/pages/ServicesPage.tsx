import React, { useState } from 'react';
import DemandeModal from '../components/modals/DemandeModal';
import {
  FileText,
  DollarSign,
  Building,
  Award,
  Store,
  Truck,
  Baby,
  MapPin,
  Clock,
  Phone,
  Search,
  Filter,
  AlertCircle,
  CheckCircle
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

interface ServicesPageProps {
  currentUser?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
  };
}

const ServicesPage: React.FC<ServicesPageProps> = ({ currentUser }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Utilisateur par défaut si non fourni
  const defaultUser = {
    firstName: 'Utilisateur',
    lastName: 'Test',
    email: 'test@commune.cd',
    phone: '+243 999 999 999',
    address: 'Kinshasa, RDC'
  };

  const user = currentUser || defaultUser;

  const handleDemandeClick = (service: Service) => {
    if (service.statut === 'disponible') {
      setSelectedService(service);
      setIsModalOpen(true);
    }
  };

  const services: Service[] = [
    // ÉTAT CIVIL
    {
      id: 'naissance',
      nom: 'Acte de Naissance',
      description: 'Déclaration et établissement d\'acte de naissance',
      prix: '1 500 FC',
      delai: '2-3 jours',
      documents: ['Certificat médical d\'accouchement', 'Pièce d\'identité des parents', 'Certificat de mariage (si applicable)'],
      categorie: 'etat-civil',
      statut: 'disponible',
      responsable: 'Marie Nzita Mukolo'
    },
    {
      id: 'deces',
      nom: 'Acte de Décès',
      description: 'Déclaration et établissement d\'acte de décès',
      prix: '2 000 FC',
      delai: '1-2 jours',
      documents: ['Certificat médical de décès', 'Pièce d\'identité du défunt', 'Témoignages de 2 personnes'],
      categorie: 'etat-civil',
      statut: 'disponible',
      responsable: 'Marie Nzita Mukolo'
    },
    {
      id: 'mariage',
      nom: 'Acte de Mariage',
      description: 'Célébration et enregistrement de mariage civil',
      prix: '5 000 FC',
      delai: '1 semaine',
      documents: ['Actes de naissance des époux', 'Certificat de célibat', 'Témoins (4 personnes)', 'Photos d\'identité'],
      categorie: 'etat-civil',
      statut: 'disponible',
      responsable: 'Marie Nzita Mukolo'
    },
    {
      id: 'copie-conforme',
      nom: 'Copies Conformes',
      description: 'Certification de copies d\'actes d\'état civil',
      prix: '500 FC/page',
      delai: 'Immédiat',
      documents: ['Document original', 'Pièce d\'identité'],
      categorie: 'etat-civil',
      statut: 'disponible'
    },

    // FINANCES COMMUNALES
    {
      id: 'taxe-balayage',
      nom: 'Taxe de Balayage',
      description: 'Taxe annuelle pour l\'entretien et le nettoyage des voies publiques',
      prix: '12 000 FC/an',
      delai: 'Immédiat',
      documents: ['Pièce d\'identité', 'Justificatif de résidence'],
      categorie: 'finances',
      statut: 'disponible'
    },
    {
      id: 'taxe-vehicule',
      nom: 'Vignette Véhicule',
      description: 'Taxe communale annuelle sur les véhicules',
      prix: '15 000 - 50 000 FC',
      delai: 'Immédiat',
      documents: ['Carte grise', 'Permis de conduire', 'Assurance'],
      categorie: 'finances',
      statut: 'disponible'
    },
    {
      id: 'taxe-marche',
      nom: 'Taxe sur les Marchés',
      description: 'Autorisation et taxe pour activité commerciale sur les marchés',
      prix: '1 000 - 5 000 FC/mois',
      delai: '1 jour',
      documents: ['Pièce d\'identité', 'Photo', 'Caution'],
      categorie: 'finances',
      statut: 'disponible'
    },
    {
      id: 'taxe-propriete',
      nom: 'Taxe d\'Habitation',
      description: 'Impôt annuel sur la propriété bâtie',
      prix: 'Selon évaluation',
      delai: '3-5 jours',
      documents: ['Titre de propriété', 'Quittance précédente', 'Plan de la parcelle'],
      categorie: 'finances',
      statut: 'disponible'
    },
    {
      id: 'taxe-commerce',
      nom: 'Taxe Activité Commerciale',
      description: 'Autorisation d\'exercer une activité commerciale',
      prix: '10 000 - 50 000 FC',
      delai: '2-3 jours',
      documents: ['Registre de commerce', 'Pièce d\'identité', 'Bail commercial'],
      categorie: 'finances',
      statut: 'disponible'
    },
    {
      id: 'taxe-publicite',
      nom: 'Taxe Panneaux Publicitaires',
      description: 'Autorisation et taxe pour affichage publicitaire',
      prix: '20 000 - 100 000 FC',
      delai: '1 semaine',
      documents: ['Maquette du panneau', 'Plan d\'implantation', 'Autorisation propriétaire'],
      categorie: 'finances',
      statut: 'disponible'
    },

    // ATTESTATIONS ADMINISTRATIVES
    {
      id: 'attestation-residence',
      nom: 'Attestation de Résidence',
      description: 'Certificat confirmant le lieu de résidence',
      prix: '2 000 - 5 000 FC',
      delai: '1-2 jours',
      documents: ['Pièce d\'identité', 'Facture eau/électricité', 'Témoignage de 2 voisins'],
      categorie: 'attestations',
      statut: 'disponible'
    },
    {
      id: 'attestation-celibat',
      nom: 'Attestation de Célibat',
      description: 'Certificat de situation matrimoniale (célibataire)',
      prix: '3 000 FC',
      delai: '2-3 jours',
      documents: ['Acte de naissance', 'Pièce d\'identité', 'Témoignage de 2 personnes'],
      categorie: 'attestations',
      statut: 'disponible'
    },
    {
      id: 'attestation-vie',
      nom: 'Attestation de Vie',
      description: 'Certificat confirmant qu\'une personne est en vie',
      prix: '2 000 FC',
      delai: '1 jour',
      documents: ['Pièce d\'identité', 'Photo récente'],
      categorie: 'attestations',
      statut: 'disponible'
    },
    {
      id: 'attestation-non-polygamie',
      nom: 'Attestation de Non-Polygamie',
      description: 'Certificat confirmant l\'absence de polygamie',
      prix: '3 000 FC',
      delai: '2-3 jours',
      documents: ['Acte de mariage', 'Pièce d\'identité', 'Déclaration sous serment'],
      categorie: 'attestations',
      statut: 'disponible'
    },
    {
      id: 'certificat-propriete',
      nom: 'Certificat de Propriété',
      description: 'Document attestant la propriété d\'un bien immobilier',
      prix: '10 000 - 20 000 FC',
      delai: '1-2 semaines',
      documents: ['Titre foncier', 'Plan de la parcelle', 'Quittances taxes', 'Attestation maire'],
      categorie: 'attestations',
      statut: 'disponible'
    },

    // URBANISME & TRAVAUX
    {
      id: 'permis-construire',
      nom: 'Permis de Construire',
      description: 'Autorisation de construction d\'un bâtiment',
      prix: '2-5% coût construction',
      delai: '2-4 semaines',
      documents: ['Plans architecturaux', 'Étude de sol', 'Titre de propriété', 'Devis détaillé'],
      categorie: 'urbanisme',
      statut: 'disponible'
    },
    {
      id: 'declaration-travaux',
      nom: 'Déclaration de Travaux',
      description: 'Déclaration pour travaux de rénovation ou extension mineure',
      prix: '5 000 - 15 000 FC',
      delai: '1-2 semaines',
      documents: ['Plans des travaux', 'Devis', 'Autorisation voisins si nécessaire'],
      categorie: 'urbanisme',
      statut: 'disponible'
    },
    {
      id: 'permis-demolition',
      nom: 'Permis de Démolition',
      description: 'Autorisation de démolir un bâtiment',
      prix: '15 000 FC',
      delai: '1 semaine',
      documents: ['Plan du bâtiment', 'Justification démolition', 'Plan de sécurité'],
      categorie: 'urbanisme',
      statut: 'disponible'
    },
    {
      id: 'alignement-parcelle',
      nom: 'Alignement de Parcelle',
      description: 'Définition des limites officielles d\'une parcelle',
      prix: '10 000 FC',
      delai: '1-2 semaines',
      documents: ['Titre de propriété', 'Demande motivée', 'Plan de situation'],
      categorie: 'urbanisme',
      statut: 'disponible'
    },
    {
      id: 'numerotage-maison',
      nom: 'Numérotage de Maison',
      description: 'Attribution d\'un numéro officiel à une habitation',
      prix: '2 000 FC',
      delai: '3-5 jours',
      documents: ['Titre de propriété', 'Plan de localisation'],
      categorie: 'urbanisme',
      statut: 'disponible'
    },

    // COMMERCE & ACTIVITÉS  
    {
      id: 'autorisation-commerce',
      nom: 'Autorisation Commerce',
      description: 'Permis d\'ouverture d\'établissement commercial',
      prix: '5 000 - 25 000 FC',
      delai: '3-5 jours',
      documents: ['Registre commerce', 'Bail commercial', 'Plan du local', 'Certificat salubrité'],
      categorie: 'commerce',
      statut: 'disponible'
    },
    {
      id: 'licence-debit-boisson',
      nom: 'Licence Débit de Boisson',
      description: 'Autorisation de vente d\'alcool',
      prix: '50 000 - 100 000 FC',
      delai: '2-3 semaines',
      documents: ['Casier judiciaire', 'Certificat médical', 'Plan du local', 'Caution'],
      categorie: 'commerce',
      statut: 'disponible'
    },
    {
      id: 'occupation-voie-publique',
      nom: 'Occupation Voie Publique',
      description: 'Autorisation temporaire d\'occuper l\'espace public',
      prix: '1 000 - 10 000 FC/jour',
      delai: '3-5 jours',
      documents: ['Plan d\'occupation', 'Assurance responsabilité', 'Caution'],
      categorie: 'commerce',
      statut: 'disponible'
    },

    // SERVICES TECHNIQUES
    {
      id: 'raccordement-eau',
      nom: 'Raccordement Eau',
      description: 'Demande de raccordement au réseau d\'eau potable',
      prix: '25 000 - 100 000 FC',
      delai: '2-4 semaines',
      documents: ['Titre de propriété', 'Plan de raccordement', 'Devis technique'],
      categorie: 'technique',
      statut: 'disponible'
    },
    {
      id: 'vidange-fosse',
      nom: 'Vidange Fosse Septique',
      description: 'Service de vidange des fosses septiques',
      prix: '15 000 - 30 000 FC',
      delai: '2-3 jours',
      documents: ['Localisation précise', 'Accès véhicule'],
      categorie: 'technique',
      statut: 'disponible'
    },
    {
      id: 'enlèvement-dechets',
      nom: 'Enlèvement Déchets Spéciaux',
      description: 'Collecte de déchets volumineux ou dangereux',
      prix: '5 000 - 20 000 FC',
      delai: '1 semaine',
      documents: ['Description des déchets', 'Localisation'],
      categorie: 'technique',
      statut: 'disponible'
    }
  ];

  const categories = [
    { id: 'tous', nom: 'Tous les Services', icon: FileText, color: 'bg-gray-500' },
    { id: 'etat-civil', nom: 'État Civil', icon: Baby, color: 'bg-pink-500' },
    { id: 'finances', nom: 'Finances & Taxes', icon: DollarSign, color: 'bg-green-500' },
    { id: 'attestations', nom: 'Attestations', icon: Award, color: 'bg-blue-500' },
    { id: 'urbanisme', nom: 'Urbanisme & Travaux', icon: Building, color: 'bg-orange-500' },
    { id: 'commerce', nom: 'Commerce & Activités', icon: Store, color: 'bg-purple-500' },
    { id: 'technique', nom: 'Services Techniques', icon: Truck, color: 'bg-red-500' }
  ];

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'tous' || service.categorie === selectedCategory;
    const matchesSearch = service.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'disponible': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'maintenance': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'ferme': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusText = (statut: string) => {
    switch (statut) {
      case 'disponible': return 'Disponible';
      case 'maintenance': return 'En maintenance';
      case 'ferme': return 'Fermé';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Services Communaux</h1>
            <p className="text-blue-100 text-lg">Commune de Kinshasa - République Démocratique du Congo</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Barre de recherche */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Filtres par catégorie */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    selectedCategory === category.id
                      ? `${category.color} text-white shadow-lg`
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.nom}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Services</p>
                <p className="text-2xl font-bold text-gray-900">{services.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Disponibles</p>
                <p className="text-2xl font-bold text-green-600">
                  {services.filter(s => s.statut === 'disponible').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Catégories</p>
                <p className="text-2xl font-bold text-blue-600">{categories.length - 1}</p>
              </div>
              <Filter className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Temps Moyen</p>
                <p className="text-2xl font-bold text-orange-600">2-5j</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Liste des services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1">{service.nom}</h3>
                  <div className="flex items-center space-x-1 ml-2">
                    {getStatusIcon(service.statut)}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Prix:</span>
                    <span className="text-sm font-bold text-green-600">{service.prix}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Délai:</span>
                    <span className="text-sm text-gray-600">{service.delai}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Statut:</span>
                    <span className={`text-sm font-medium ${
                      service.statut === 'disponible' ? 'text-green-600' :
                      service.statut === 'maintenance' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {getStatusText(service.statut)}
                    </span>
                  </div>

                  {service.responsable && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Responsable:</span>
                      <span className="text-sm text-blue-600">{service.responsable}</span>
                    </div>
                  )}
                </div>

                {/* Documents requis */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-700 mb-2">Documents requis:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {service.documents.slice(0, 2).map((doc, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                        {doc}
                      </li>
                    ))}
                    {service.documents.length > 2 && (
                      <li className="text-blue-600 font-medium">
                        +{service.documents.length - 2} autres documents
                      </li>
                    )}
                  </ul>
                </div>

                {/* Boutons d'action */}
                <div className="mt-6 flex space-x-2">
                  <button 
                    onClick={() => handleDemandeClick(service)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      service.statut === 'disponible'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={service.statut !== 'disponible'}
                  >
                    Demander
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                    Détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun service trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche ou de filtrage.</p>
          </div>
        )}
      </div>

      {/* Footer d'information */}
      <div className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Horaires d'Ouverture</h4>
              <div className="space-y-2 text-gray-300">
                <p>Lundi - Vendredi: 8h00 - 15h00</p>
                <p>Samedi: 8h00 - 12h00</p>
                <p>Dimanche: Fermé</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+243 999 999 999</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Avenue de la Paix, Kinshasa</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Information Importante</h4>
              <p className="text-gray-300 text-sm">
                Les prix peuvent varier selon la complexité du dossier. 
                Tous les documents doivent être en cours de validité.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de demande */}
      {selectedService && (
        <DemandeModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedService(null);
          }}
          service={selectedService}
          currentUser={user}
        />
      )}
    </div>
  );
};

export default ServicesPage;
