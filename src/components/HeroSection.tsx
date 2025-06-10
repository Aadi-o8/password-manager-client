import React from 'react';
import { Shield, Lock, Zap } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 paddingTop:10px pt-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-purple-700/30">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Shield className="h-12 w-12 text-purple-400" />
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  Decentralized Password Manager
                </h1>
              </div>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Take complete control of your digital security with our revolutionary decentralized password manager. 
                Built on Solana blockchain technology, your passwords are encrypted client-side using military-grade 
                AES encryption and stored securely on the blockchain. No central servers, no data breaches, no third-party 
                access - just you and your data, protected by the most advanced cryptographic techniques available. 
                Experience true digital sovereignty while maintaining the convenience of modern password management.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-green-400">
                  <Lock className="h-5 w-5" />
                  <span className="font-medium">Client-Side Encryption</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-400">
                  <Zap className="h-5 w-5" />
                  <span className="font-medium">Blockchain Secured</span>
                </div>
                <div className="flex items-center space-x-2 text-purple-400">
                  <Shield className="h-5 w-5" />
                  <span className="font-medium">Zero Trust Architecture</span>
                </div>
              </div>
            </div>

            {/* Right Content - Image Placeholder */}
            <div className="flex justify-center">
              {/* <div className="w-full max-w-md aspect-square bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl border border-gray-600 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Shield className="h-24 w-24 text-purple-400 mx-auto" />
                  <p className="text-gray-400 text-sm">Your Security Fortress</p>
                </div>
              </div> */}
              <div className="w-full max-w-md aspect-square rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-md bg-white/10 relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-purple-400/70">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-blue-400/10 to-purple-400/10 animate-pulse rounded-2xl pointer-events-none"></div>
                <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4 h-full">
                    <Shield className="h-24 w-24 text-purple-400" />
                    <p className="text-gray-300 text-sm">Your Security Fortress</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;