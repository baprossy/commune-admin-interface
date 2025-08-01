import React, { useState } from 'react';
import { Mail } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-24 h-16 rounded-xl overflow-hidden shadow-2xl mb-6 relative border-4 border-white/20">
            <div className="w-full h-full relative" style={{
              background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)'
            }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white font-bold text-lg">RDC</div>
              </div>
              <div className="absolute top-1 right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="absolute bottom-1 left-1 w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="absolute bottom-1 right-1 w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Connexion
          </h2>
          <p className="text-blue-100">
            Administration Municipale - République Démocratique du Congo
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Adresse email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Adresse email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="text-gray-400 text-sm">
                  {showPassword ? 'Masquer' : 'Afficher'}
                </span>
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Se connecter
            </button>
          </div>

          <div className="text-center">
            <a href="/register" className="text-blue-200 hover:text-white text-sm">
              Pas encore de compte ? S'inscrire
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
