import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Search } from 'lucide-react';
import CredentialCard from '../components/CredentialCard';
import { Credential, Vault } from '../types';

// Dummy vault data for demonstration
const dummyVault: Vault = {
  id: '1',
  name: 'Personal Accounts',
  description: 'Social media, email, and personal services',
  credentials: [
    {
      id: '1',
      siteName: 'Gmail',
      username: 'user@gmail.com',
      password: 'SecurePass123!',
      url: 'https://gmail.com',
      notes: 'Primary email account',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      siteName: 'Twitter',
      username: '@myusername',
      password: 'TwitterPass456@',
      url: 'https://twitter.com',
      notes: 'Personal Twitter account',
      createdAt: new Date('2024-01-16'),
      updatedAt: new Date('2024-01-16')
    },
    {
      id: '3',
      siteName: 'Netflix',
      username: 'user@gmail.com',
      password: 'NetflixSecure789#',
      url: 'https://netflix.com',
      createdAt: new Date('2024-01-17'),
      updatedAt: new Date('2024-01-17')
    },
    {
      id: '4',
      siteName: 'GitHub',
      username: 'developer123',
      password: 'GitHubDev2024$',
      url: 'https://github.com',
      notes: 'Development repositories',
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-18')
    }
  ],
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-18')
};

const VaultDetails: React.FC = () => {
  const { vaultId } = useParams<{ vaultId: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [vault] = useState<Vault>(dummyVault);

  const filteredCredentials = vault.credentials.filter(credential =>
    credential.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    credential.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditCredential = (credential: Credential) => {
    // Navigate to edit page or open modal
    console.log('Edit credential:', credential);
  };

  const handleDeleteCredential = (credentialId: string) => {
    // Handle credential deletion
    console.log('Delete credential:', credentialId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Vault: {vault.name}
                </h1>
                {vault.description && (
                  <p className="text-gray-400 mt-1">{vault.description}</p>
                )}
              </div>
            </div>
            
            <Link
              to="/add-credential"
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Add Credential</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search credentials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>

          {/* Credentials Grid */}
          {filteredCredentials.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCredentials.map((credential) => (
                <CredentialCard
                  key={credential.id}
                  credential={credential}
                  onEdit={handleEditCredential}
                  onDelete={handleDeleteCredential}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-600 mb-4">
                {searchTerm ? (
                  <p>No credentials found matching "{searchTerm}"</p>
                ) : (
                  <p>No credentials in this vault yet</p>
                )}
              </div>
              <Link
                to="/add-credential"
                className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Add Your First Credential</span>
              </Link>
            </div>
          )}

          {/* Vault Stats */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-purple-400">{vault.credentials.length}</p>
                <p className="text-sm text-gray-400">Total Credentials</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400">
                  {new Date(vault.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-400">Created</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-400">
                  {new Date(vault.updatedAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-400">Last Updated</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-400">100%</p>
                <p className="text-sm text-gray-400">Encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaultDetails;