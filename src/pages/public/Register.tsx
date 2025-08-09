import React, { useState } from 'react';
import { Mail, User, Phone, MapPin, Lock, Eye, EyeOff, Building2, Users, MapPin as Building } from 'lucide-react';

interface RegisterProps {
  onRegister: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    userType?: string;
    matricule?: string;
    commune?: string;
    fonction?: string;
    service?: string;
    adresseCommune?: string;
  }) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [userType, setUserType] = useState<'citoyen' | 'agent'>('citoyen');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    // Champs spécifiques aux agents
    matricule: '',
    commune: '',
    fonction: '',
    service: '',
    adresseCommune: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 6) {
      alert('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    // Validation spécifique aux agents
    if (userType === 'agent') {
      if (!formData.matricule || !formData.commune || !formData.fonction) {
        alert('Tous les champs obligatoires pour un agent doivent être remplis');
        return;
      }
    }

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      userType,
      ...(userType === 'agent' && {
        matricule: formData.matricule,
        commune: formData.commune,
        fonction: formData.fonction,
        service: formData.service,
        adresseCommune: formData.adresseCommune
      })
    };

    onRegister(userData);
  };

  // Conversion des images en base64 (vous devrez remplacer ces données par vos vraies images)
  const drapeauRDC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="; // Placeholder
  const armoiriesRDC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="; // Placeholder

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
        
        {/* En-tête avec images nationales */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-6 mb-4">
            <img 
              src={drapeauRDC} 
              alt="Drapeau RDC" 
              className="w-16 h-12 object-cover rounded shadow-lg border border-white/30"
            />
            <img 
              src={armoiriesRDC} 
              alt="Armoiries RDC" 
              className="w-12 h-12 object-cover rounded shadow-lg border border-white/30"
            />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            République Démocratique du Congo
          </h2>
          <p className="text-blue-100 text-sm mb-4">Administration Communale Officielle</p>
          
          {/* Toggle Citoyen/Agent */}
          <div className="flex bg-white/20 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => setUserType('citoyen')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                userType === 'citoyen'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <User className="inline w-4 h-4 mr-2" />
              Citoyen
            </button>
            <button
              type="button"
              onClick={() => setUserType('agent')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                userType === 'agent'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Building2 className="inline w-4 h-4 mr-2" />
              Agent Communal
            </button>
          </div>
          
          <h3 className="text-xl font-semibold text-white">
            {userType === 'citoyen' ? 'Inscription Citoyenne' : 'Inscription Agent Communal'}
          </h3>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {/* Champs communs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Prénom"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Nom"
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Adresse email"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Numéro de téléphone"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="address"
              name="address"
              type="text"
              required
              value={formData.address}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Adresse de résidence"
            />
          </div>

          {/* Champs spécifiques aux agents */}
          {userType === 'agent' && (
            <>
              <div className="border-t border-white/20 pt-4 mt-6">
                <h4 className="text-white font-medium mb-4 text-center">Informations professionnelles</h4>
                
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="matricule"
                    name="matricule"
                    type="text"
                    required
                    value={formData.matricule}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Matricule agent"
                  />
                </div>

                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="commune"
                    name="commune"
                    type="text"
                    required
                    value={formData.commune}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Nom de la commune"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <select
                    id="fonction"
                    name="fonction"
                    required
                    value={formData.fonction}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Fonction</option>
                    <option value="secretaire">Secrétaire</option>
                    <option value="chef-service">Chef de Service</option>
                    <option value="agent-etat-civil">Agent État Civil</option>
                    <option value="agent-finances">Agent Finances</option>
                    <option value="agent-urbanisme">Agent Urbanisme</option>
                    <option value="maire-adjoint">Maire Adjoint</option>
                    <option value="autre">Autre</option>
                  </select>

                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Service</option>
                    <option value="etat-civil">État Civil</option>
                    <option value="finances">Finances</option>
                    <option value="urbanisme">Urbanisme</option>
                    <option value="social">Affaires Sociales</option>
                    <option value="technique">Services Techniques</option>
                    <option value="administration">Administration</option>
                  </select>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="adresseCommune"
                    name="adresseCommune"
                    type="text"
                    value={formData.adresseCommune}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Adresse de la commune"
                  />
                </div>
              </div>
            </>
          )}

          {/* Mots de passe */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={handleChange}
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Mot de passe"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Confirmer le mot de passe"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              S'inscrire
            </button>
          </div>

          <div className="text-center">
            <a href="/login" className="text-blue-200 hover:text-white text-sm">
              Déjà un compte ? Se connecter
            </a>
          </div>
        </form>

        <div className="text-center text-blue-100 text-xs">
          <p>En vous inscrivant, vous acceptez les conditions d'utilisation</p>
          <p>de l'administration municipale de la RDC</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
