import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { EncryptionService } from '../utils/encryption';

const AddCredential: React.FC = () => {
  const [formData, setFormData] = useState({
    siteName: '',
    username: '',
    password: '',
    url: '',
    notes: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePassword = () => {
    const newPassword = EncryptionService.generatePassword(16);
    setFormData(prev => ({
      ...prev,
      password: newPassword
    }));
    setShowPassword(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.siteName.trim() || !formData.username.trim() || !formData.password.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate credential addition
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Adding credential:', formData);
      
      // Navigate back to vault details
      navigate('/vault/1'); // In real implementation, use proper vault ID
    } catch (error) {
      console.error('Failed to add credential:', error);
      alert('Failed to add credential. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <Link
              to="/vault/1"
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Add New Credential</h1>
              <p className="text-gray-400 mt-1">Securely store a new password</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-300 mb-2">
                  Site/Service Name *
                </label>
                <input
                  type="text"
                  id="siteName"
                  name="siteName"
                  value={formData.siteName}
                  onChange={handleInputChange}
                  placeholder="e.g., Gmail, Twitter, Netflix"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Username/Email *
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="your@email.com or username"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter or generate a secure password"
                    className="w-full px-4 py-3 pr-20 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    required
                    disabled={isSubmitting}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 text-gray-400 hover:text-purple-400 transition-colors"
                      disabled={isSubmitting}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={generatePassword}
                      className="p-1 text-gray-400 hover:text-green-400 transition-colors"
                      disabled={isSubmitting}
                      title="Generate secure password"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
                  Website URL (Optional)
                </label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Additional notes about this credential..."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
                  disabled={isSubmitting}
                />
              </div>

              <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
                <h4 className="text-yellow-300 font-medium mb-2">Security Reminder</h4>
                <p className="text-yellow-200 text-sm leading-relaxed">
                  Your credential will be encrypted using AES-256 encryption before being stored. 
                  Only you can decrypt and view this information using your connected wallet.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4">
                <Link
                  to="/vault/1"
                  className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                  tabIndex={isSubmitting ? -1 : 0}
                >
                  Cancel
                </Link>
                
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.siteName.trim() || !formData.username.trim() || !formData.password.trim()}
                  className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  <span>{isSubmitting ? 'Adding...' : 'Add Credential'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCredential;