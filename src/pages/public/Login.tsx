import React, { useState } from 'react';
import { Mail, Lock, User, Shield, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LoginProps {
  onLogin: (email: string, password: string, fullName?: string, userType?: string) => boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    userType: 'citizen' // citizen, agent, admin
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.email || !formData.password) {
      setError('Tous les champs sont requis');
      return;
    }

    const success = onLogin(formData.email, formData.password, formData.fullName, formData.userType);
    if (!success) {
      setError('Identifiants incorrects');
    }
  };

  const getUserTypeIcon = () => {
    switch (formData.userType) {
      case 'agent':
        return <UserCheck className="h-5 w-5 text-blue-600" />;
      case 'admin':
        return <Shield className="h-5 w-5 text-purple-600" />;
      default:
        return <User className="h-5 w-5 text-green-600" />;
    }
  };

  const getUserTypeColor = () => {
    switch (formData.userType) {
      case 'agent':
        return 'border-blue-500 bg-blue-50';
      case 'admin':
        return 'border-purple-500 bg-purple-50';
      default:
        return 'border-green-500 bg-green-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Connexion
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Administration Communale - Accès Sécurisé
          </p>
        </div>

        {/* Formulaire */}
        <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
          
          {/* Type d'utilisateur */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type d'utilisateur
            </label>
            <div className={`relative rounded-lg border-2 transition-colors ${getUserTypeColor()}`}>
              <div className="absolute left-3 top-3">
                {getUserTypeIcon()}
              </div>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-900 font-medium"
              >
                <option value="citizen">Citoyen</option>
                <option value="agent">Agent Municipal</option>
                <option value="admin">Administrateur</option>
              </select>
            </div>
          </div>

          {/* Nom complet */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Nom complet
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Prénom Nom"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Adresse email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="votre.email@commune.cd"
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Bouton de connexion */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Se connecter
          </button>

          {/* Aperçu des infos */}
          {(formData.fullName || formData.email) && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Aperçu de connexion :</h4>
              <div className="space-y-1 text-xs text-gray-600">
                {formData.fullName && (
                  <p><span className="font-medium">Nom :</span> {formData.fullName}</p>
                )}
                {formData.email && (
                  <p><span className="font-medium">Email :</span> {formData.email}</p>
                )}
                <p><span className="font-medium">Type :</span> 
                  <span className={`ml-1 px-2 py-0.5 rounded text-xs font-medium ${
                    formData.userType === 'agent' ? 'bg-blue-100 text-blue-800' :
                    formData.userType === 'admin' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {formData.userType === 'agent' ? 'Agent Municipal' :
                     formData.userType === 'admin' ? 'Administrateur' :
                     'Citoyen'}
                  </span>
                </p>
              </div>
            </div>
          )}
        </form>

        {/* Lien d'inscription */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Pas encore de compte ?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
