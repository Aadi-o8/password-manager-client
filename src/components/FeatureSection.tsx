import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureSectionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  imagePosition: 'left' | 'right';
  gradient: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  imagePosition, 
  gradient 
}) => {
  const content = (
    <>
      {/* Text Content */}
      <div className={`space-y-6 ${imagePosition === 'right' ? 'md:order-1' : 'md:order-2'}`}>
        <div className="flex items-center space-x-3">
          <Icon className="h-10 w-10 text-purple-400" />
          <h3 className="text-3xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-lg text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Visual Content */}
      <div className={`flex justify-center ${imagePosition === 'right' ? 'md:order-2' : 'md:order-1'}`}>
        <div className={`relative w-full max-w-sm aspect-square ${gradient} rounded-2xl border border-purple-400/30 backdrop-blur-md bg-white/10 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-purple-400/70`}>
          
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-blue-400/10 to-purple-400/10 animate-pulse rounded-2xl pointer-events-none" />

          <div className="relative z-10 flex items-center justify-center h-full">
            <Icon className="h-20 w-20 text-white/80" />
          </div>

        </div>
      </div>
    </>
  );

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-purple-700/30">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;