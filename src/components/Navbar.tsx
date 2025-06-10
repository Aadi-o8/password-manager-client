import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWalletContext } from '../context/WalletContext';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { connected } = useWalletContext();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Shield className="h-8 w-8 text-purple-400" />
            <span className="text-xl font-bold text-white">SecureVault</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {connected && (
              <>
                <Link
                  to="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/') 
                      ? 'text-purple-400 bg-purple-400/10' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/new-vault"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/new-vault') 
                      ? 'text-purple-400 bg-purple-400/10' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  Create Vault
                </Link>
              </>
            )}
          </div>

          {/* Wallet Button */}
          <div className="hidden md:block">
            <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-lg !font-medium !transition-colors" />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {connected && (
                <>
                  <Link
                    to="/"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive('/') 
                        ? 'text-purple-400 bg-purple-400/10' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/new-vault"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive('/new-vault') 
                        ? 'text-purple-400 bg-purple-400/10' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Create Vault
                  </Link>
                </>
              )}
              <div className="pt-4 pb-2">
                <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700 !rounded-lg !font-medium !transition-colors !w-full" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;