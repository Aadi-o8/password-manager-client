import React from 'react';
import { Link } from 'react-router-dom';
import { Vault, Key, Calendar } from 'lucide-react';
import { Vault as VaultType } from '../types';

interface VaultTileProps {
  vault: VaultType;
}

const VaultTile: React.FC<VaultTileProps> = ({ vault }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  return (
    <Link 
      to={`/vault/${vault.id}`}
      className="group block bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-600/20 rounded-lg group-hover:bg-purple-600/30 transition-colors">
              <Vault className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                {vault.name}
              </h3>
              {vault.description && (
                <p className="text-sm text-gray-400 mt-1">
                  {vault.description}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <Key className="h-4 w-4" />
            <span>{vault.credentials.length} credentials</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(vault.createdAt)}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-700">
          <p className="text-xs text-gray-500">
            Last updated: {formatDate(vault.updatedAt)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VaultTile;