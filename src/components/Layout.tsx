import React from 'react';
import backgroundImage from '../assets/backgroundMawadi.svg';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  // Add a style tag to override specific backgrounds
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      body, #root {
        background-image: none !important;
        background-color: transparent !important;
      }
      
      .bg-gradient-to-br {
        background-image: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <div 
        className="fixed inset-0 w-full h-full"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.35,
          zIndex: -1
        }}
      />
      {children}
    </>
  );
} 