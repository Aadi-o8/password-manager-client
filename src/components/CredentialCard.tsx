import React, { useState } from 'react';
import { Eye, EyeOff, Edit, Trash2, ExternalLink, Copy } from 'lucide-react';
import { Credential } from '../types';

interface CredentialCardProps {
  credential: Credential;
  onEdit: (credential: Credential) => void;
  onDelete: (credentialId: string) => void;
}

const CredentialCard: React.FC<CredentialCardProps> = ({ credential, onEdit, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const maskPassword = (password: string) => {
    return '•'.repeat(password.length);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-white">{credential.siteName}</h3>
              {credential.url && (
                <a
                  href={credential.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
            <p className="text-sm text-gray-400">{credential.username}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onEdit(credential)}
              className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(credential.id)}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Credentials */}
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-gray-900/50 rounded-lg p-3">
            <div className="flex items-center space-x-3 flex-1">
              <span className="text-sm text-gray-400 w-16">Username:</span>
              <span className="text-white font-mono">{credential.username}</span>
            </div>
            <button
              onClick={() => copyToClipboard(credential.username, 'username')}
              className="p-1 text-gray-400 hover:text-purple-400 transition-colors"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center justify-between bg-gray-900/50 rounded-lg p-3">
            <div className="flex items-center space-x-3 flex-1">
              <span className="text-sm text-gray-400 w-16">Password:</span>
              <span className="text-white font-mono">
                {showPassword ? credential.password : maskPassword(credential.password)}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 text-gray-400 hover:text-purple-400 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              <button
                onClick={() => copyToClipboard(credential.password, 'password')}
                className="p-1 text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Notes */}
        {credential.notes && (
          <div className="pt-3 border-t border-gray-700">
            <p className="text-sm text-gray-400">Notes:</p>
            <p className="text-sm text-gray-300 mt-1">{credential.notes}</p>
          </div>
        )}

        {/* Copy feedback */}
        {copied && (
          <div className="text-xs text-green-400 flex items-center space-x-1">
            <span>✓</span>
            <span>{copied} copied to clipboard</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CredentialCard;