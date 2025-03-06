import React from 'react';
import MawadiLogo from '../assets/logo/MawadiGreenLogo.svg';
import backgroundImage from '../assets/backgroundMawadi.svg';

export const LandingHeader: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Fixed background with overlay */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.2,
          zIndex: -1
        }}
      />
      
      {/* Semi-transparent gradient overlay */}
      <div 
        className="absolute inset-0 w-full h-full bg-gradient-to-b from-green-50/90 to-white/90"
        style={{ zIndex: -1 }}
      />
      
      {/* Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-7xl mx-auto">
          <img 
            src={MawadiLogo} 
            alt="Mawadi Logo" 
            className="h-auto w-80 mx-auto mb-2 animate-float"
          />
          
          <p className="text-xl text-green-700 max-w-2xl mx-auto mb-8 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
            Your comprehensive platform for FCIT subject materials
          </p>
          <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>
      </div>
    </div>
  );
}; 