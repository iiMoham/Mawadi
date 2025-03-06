import React from 'react';
import MawadiLogo from '../assets/logo/MawadiGreenLogo.svg';
import MawadiWhiteLogo from '../assets/logo/MawadiWhiteLogo.svg';
import backgroundImage from '../assets/backgroundMawadi.svg';

interface LandingHeaderProps {
  darkMode?: boolean;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({ darkMode = false }) => {
  return (
    <div className="relative overflow-hidden">
      
      <div 
        className={`absolute inset-0 w-full h-full ${darkMode ? 'opacity-10' : 'opacity-20'}`}
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1
        }}
      />
      
      <div 
        className={`absolute inset-0 w-full h-full ${
          darkMode 
            ? 'bg-gradient-to-b from-gray-900/90 to-gray-800/90' 
            : 'bg-gradient-to-b from-green-50/90 to-white/90'
        }`}
        style={{ zIndex: -1 }}
      />
      
      <div className="py-16 px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-7xl mx-auto">
          <img 
            src={darkMode ? MawadiWhiteLogo : MawadiLogo} 
            alt="Mawadi Logo" 
            className="h-auto w-80 mx-auto mb-2 animate-float"
          />
          
          <p className={`text-xl ${
            darkMode ? 'text-green-400' : 'text-green-700'
          } max-w-2xl mx-auto mb-8 animate-fadeIn`} style={{ animationDelay: '0.5s' }}>
            Your comprehensive platform for FCIT subject materials
          </p>
          
          <div className={`w-24 h-1 ${
            darkMode ? 'bg-green-500' : 'bg-green-500'
          } mx-auto rounded-full`}></div>
          
          {darkMode && (
            <div className="mt-12 relative">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
              <div className="absolute -top-8 left-1/3 transform -translate-x-1/2 w-32 h-32 bg-green-400/10 rounded-full blur-xl"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 