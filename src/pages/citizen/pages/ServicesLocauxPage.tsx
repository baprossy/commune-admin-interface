import React, { useState } from 'react';
import { MapPin, Phone, Clock, Globe, Mail, Star, Search, Filter, Building, Users, Wrench, Heart, Briefcase, GraduationCap } from 'lucide-react';

interface ServiceLocal {
  id: string;
  nom: string;
  categorie: 'administration' | 'sante' | 'education' | 'social' | 'technique' | 'securite';
  description: string;
  adresse: string;
  telephone?: string;
  email?: string;
  horaires: string;
  site?: string;
  note: number;
  distance: string;
  services: string[];
  responsable?: string;
}

const ServicesLocauxPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceLocal | null>(null);

  const [services] = useState<ServiceLocal[]>([
    {
      id: '1',
      nom: 'Mairie Centrale',
      categorie: 'administration',
      description: 'Hôtel de ville principal - Services administratifs centraux',
      adresse: '123 Avenue de l\'Indépendance, Kinshasa',
      telephone: '+243 123 456 789',
      email: 'contact@mairie-kinshasa.cd',
      horaires: 'Lun-Ven: 07:30-15:30',
      site: 'www.mairie-kinshasa.cd',
      note: 4.2,
      distance: '0.5 km',
      services: ['État civil', 'Urbanisme', 'Taxes', 'Permis'],
      responsable: 'Jean Mukendi'
    },
    {
      id: '2',
      nom: 'Centre de Santé Communautaire',
      categorie: 'sante',
      description: 'Centre de soins de santé primaire',
      adresse: '456 Boulevard Lumumba, Kinshasa',
      telephone: '+243 987 654 321',
      email: 'sante@commune.cd',
      horaires: 'Lun-Dim: 06:00-18:00',
      note: 4.5,
      distance: '1.2 km',
      services: ['Consultations', 'Vaccinations', 'Soins d\'urgence', 'Maternité'],
      responsable: 'Dr. Marie Kabila'
    },
    {
      id: '3',
      nom: 'École Primaire Communale',
      categorie: 'education',
      description: 'Établissement d\'enseignement primaire public',
      adresse: '789 Rue de l\'École, Kinshasa',
      telephone: '+243 555 123 456',
      email: 'ecole@education.cd',
      horaires: 'Lun-Ven: 07:00-13:00',
      note: 4.0,
      distance: '0.8 km',
      services: ['Enseignement primaire', 'Cantine scolaire', 'Bibliothèque'],
      responsable: 'Directeur Paul Tshisekedi'
    },
    {
      id: '4',
      nom: 'Centre Social Municipal',
      categorie: 'social',
      description: 'Services d\'aide et d\'accompagnement social',
      adresse: '321 Avenue de la Solidarité, Kinshasa',
      telephone: '+243 444 789 123',
      email: 'social@commune.cd',
      horaires: 'Lun-Ven: 08:00-16:00',
      note: 4.3,
      distance: '1.5 km',
      services: ['Aide sociale', 'Allocations', 'Conseil familial', 'Insertion professionnelle'],
      responsable: 'Grace Ndala'
    },
    {
      id: '5',
      nom: 'Services Techniques Municipaux',
      categorie: 'technique',
      description: 'Maintenance et travaux publics',
      adresse: '654 Rue des Travaux, Kinshasa',
      telephone: '+243 333 456 789',
      email: 'technique@commune.cd',
      horaires: 'Lun-Ven: 06:00-14:00',
      note: 3.8,
      distance: '2.1 km',
      services: ['Voirie', 'Éclairage public', 'Assainissement', 'Espaces verts'],
      responsable: 'Ing. Robert Kasongo'
    },
    {
      id: '6',
      nom: 'Poste de Police Municipal',
      categorie: 'securite',
      description: 'Sécurité et ordre public',
      adresse: '147 Boulevard de la Paix, Kinshasa',
      telephone: '+243 111 222 333',
      horaires: '24h/24 - 7j/7',
      note: 4.1,
      distance: '0.7 km',
      services: ['Patrouilles', 'Plaintes', 'Circulation', 'Prévention'],
      responsable: 'Commissaire Michel Kabongo'
    }
  ]);

  const categories = [
    { id: 'tous', label: 'Tous les services', icon: Building, color: 'text-gray-600' },
    { id: 'administration', label: 'Administration', icon: Building, color: 'text-blue-600' },
    { id: 'sante', label: 'Santé', icon: Heart, color: 'text-red-600' },
    { id: 'education', label: 'Éducation', icon: GraduationCap, color: 'text-green-600' },
    { id: 'social', label: 'Social', icon: Users, color: 'text-purple-600' },
    { id: 'technique', label: 'Technique', icon: Wrench, color: 'text-orange-600' },
    { id: 'securite', label: 'Sécurité', icon: Briefcase, color: 'text-gray-800' }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'tous' || service.categorie === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCallService = (telephone: string) => {
    window.open(`tel:${telephone}`, '_self');
  };

  const handleEmailService = (email: string) => {
    window.open(`mailto:${email}`, '_blank');
  };

  const handleVisitWebsite = (site: string) => {
    window.open(`https://${site}`, '_blank');
  };

  const handleGetDirections = (adresse: string) => {
    const encodedAddress = encodeURIComponent(adresse);
    window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank');
  };

  const renderStars = (note: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= note ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({note}/5)</span>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Services Locaux</h1>
            <p className="text-gray-600">Trouvez facilement tous les services municipaux près de chez vous</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>Kinshasa, République Démocratique du Congo</span>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {categories.slice(1).map(category => {
          const count = services.filter(s => s.categorie === category.id).length;
          const Icon = category.icon;
          
          return (
            <div key={category.id} className="bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gray-100`}>
                  <Icon className={`w-5 h-5 ${category.color}`} />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-800">{count}</p>
                  <p className="text-xs text-gray-600">{category.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Catégories */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Recherche */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Liste des services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredServices.map((service) => {
          const categoryInfo = categories.find(c => c.id === service.categorie);
          const CategoryIcon = categoryInfo?.icon || Building;
          
          return (
            <div key={service.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              {/* Header du service */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg bg-gray-100`}>
                    <CategoryIcon className={`w-6 h-6 ${categoryInfo?.color || 'text-gray-600'}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{service.nom}</h3>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium bg-gray-100 ${categoryInfo?.color || 'text-gray-600'}`}>
                      {categoryInfo?.label || 'Service'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  {renderStars(service.note)}
                  <div className="text-xs text-gray-500 mt-1">{service.distance}</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4">{service.description}</p>

              {/* Services proposés */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Services proposés:</h4>
                <div className="flex flex-wrap gap-1">
                  {service.services.map((serviceItem, index) => (
                    <span
                      key={index}
                      className="inline-flex px-2 py-1 rounded-md text-xs bg-blue-50 text-blue-700"
                    >
                      {serviceItem}
                    </span>
                  ))}
                </div>
              </div>

              {/* Informations de contact */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{service.adresse}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{service.horaires}</span>
                </div>

                {service.responsable && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{service.responsable}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                {service.telephone && (
                  <button
                    onClick={() => handleCallService(service.telephone!)}
                    className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Appeler
                  </button>
                )}
                
                {service.email && (
                  <button
                    onClick={() => handleEmailService(service.email!)}
                    className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </button>
                )}

                <button
                  onClick={() => handleGetDirections(service.adresse)}
                  className="flex items-center gap-1 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                >
                  <MapPin className="w-4 h-4" />
                  Itinéraire
                </button>

                {service.site && (
                  <button
                    onClick={() => handleVisitWebsite(service.site!)}
                    className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    <Globe className="w-4 h-4" />
                    Site web
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Message si aucun résultat */}
      {filteredServices.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">Aucun service trouvé</h3>
          <p className="text-gray-600">
            Essayez de modifier vos critères de recherche ou sélectionnez une autre catégorie.
          </p>
        </div>
      )}
    </div>
  );
};

export default ServicesLocauxPage;
