import React, { useContext } from 'react';
import backgroundImage from '../assets/backgroundMawadi.svg';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  
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
      
      .dark {
        color-scheme: dark;
      }
      
      .dark .bg-white {
        background-color: #1f2937 !important;
      }
      
      .dark .text-gray-800, .dark .text-green-800 {
        color: #e5e7eb !important;
      }
      
      .dark .bg-green-700, .dark .from-green-800, .dark .to-green-700 {
        background-color: #111827 !important;
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
        className="fixed inset-0 w-full h-full dark:opacity-10"
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