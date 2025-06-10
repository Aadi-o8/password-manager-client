import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Shield } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="text-center space-y-8 px-4">
        <div className="space-y-4">
          <Shield className="h-24 w-24 text-purple-400 mx-auto opacity-50" />
          <div className="space-y-2">
            <h1 className="text-8xl font-bold text-gray-700">404</h1>
            <h2 className="text-3xl font-bold text-white">Page Not Found</h2>
            <p className="text-xl text-gray-400 max-w-md mx-auto">
              The page you're looking for seems to have vanished into the blockchain void.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-medium transition-colors text-lg"
          >
            <Home className="h-6 w-6" />
            <span>Return to Dashboard</span>
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Lost? Here are some helpful links:</p>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <Link to="/" className="text-purple-400 hover:text-purple-300 transition-colors">
                Dashboard
              </Link>
              <Link to="/new-vault" className="text-purple-400 hover:text-purple-300 transition-colors">
                Create Vault
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
          <p className="text-gray-300 text-sm">
            If you believe this is an error, please check the URL or navigate back to the main dashboard 
            to access your secure vaults.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;