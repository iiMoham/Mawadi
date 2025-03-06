import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, GraduationCap, ShieldCheck, Menu, X, Users, Moon, Sun } from 'lucide-react';
import { SubjectCategory } from '../types';
import MawadiLogo from '../assets/logo/MawadiWhiteLogo.svg';

interface NavbarProps {
  onSearch: (query: string) => void;
  onAdminClick: () => void;
  onCategorySelect: (category: SubjectCategory | null) => void;
  selectedCategory: SubjectCategory | null;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export function Navbar({ 
  onSearch, 
  onAdminClick,
  onCategorySelect,
  selectedCategory,
  darkMode = false,
  onToggleDarkMode = () => {}
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <nav className={`bg-gradient-to-r from-green-800 to-green-700 shadow-md ${darkMode ? 'dark' : ''}`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img src={MawadiLogo} alt="Mawadi Logo" className="h-20 w-auto mr-2" />
            </Link>
            
            
            <div className="hidden md:flex ml-6 space-x-4">
              <Link
                to="/"
                className="text-white hover:bg-green-600/50 px-3 py-2 rounded-md text-sm font-medium"
              >
                Subjects
              </Link>
              <Link
                to="/about"
                className="text-white hover:bg-green-600/50 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <Users className="h-4 w-4 mr-1" />
                About Us
              </Link>
            </div>
          </div>

          
          <div className="hidden md:block flex-grow max-w-md mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-3 py-2 border-0 rounded-full leading-5 bg-white/90 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white sm:text-sm"
              />
            </div>
          </div>

          
          <div className="flex items-center space-x-3">
            <button 
              onClick={onToggleDarkMode}
              className="flex items-center justify-center px-3 py-1.5 rounded-full bg-white/90 text-green-700 hover:bg-white transition-colors duration-200"
              aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            
            <button 
              onClick={onAdminClick}
              className="flex items-center justify-center px-3 py-1.5 rounded-full bg-white/90 text-green-700 hover:bg-white transition-colors duration-200"
              aria-label="Admin Dashboard"
            >
              <ShieldCheck className="h-4 w-4 mr-1" />
              <span className="font-medium text-sm">Admin</span>
            </button>
            
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-green-600 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <div className="bg-green-700/80 shadow-inner">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          {/* Desktop category tabs */}
          <div className="hidden md:flex justify-center space-x-1">
            <button
              onClick={() => onCategorySelect('ALL')}
              className={`px-4 py-3 text-sm font-medium rounded-t-md transition-colors duration-200 ${
                selectedCategory === 'ALL' || selectedCategory === null
                  ? 'bg-green-800 text-white shadow-sm' 
                  : 'text-white hover:bg-green-600/50'
              }`}
            >
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></span>
                ALL
              </span>
            </button>
            
            <button
              onClick={() => onCategorySelect('CS')}
              className={`px-4 py-3 text-sm font-medium rounded-t-md transition-colors duration-200 ${
                selectedCategory === 'CS' 
                  ? 'bg-green-800 text-white shadow-sm' 
                  : 'text-white hover:bg-green-600/50'
              }`}
            >
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                CS
              </span>
            </button>
            
            <button
              onClick={() => onCategorySelect('IT')}
              className={`px-4 py-3 text-sm font-medium rounded-t-md transition-colors duration-200 ${
                selectedCategory === 'IT' 
                  ? 'bg-green-800 text-white shadow-sm' 
                  : 'text-white hover:bg-green-600/50'
              }`}
            >
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                IT
              </span>
            </button>
            
            <button
              onClick={() => onCategorySelect('IS')}
              className={`px-4 py-3 text-sm font-medium rounded-t-md transition-colors duration-200 ${
                selectedCategory === 'IS' 
                  ? 'bg-green-800 text-white shadow-sm' 
                  : 'text-white hover:bg-green-600/50'
              }`}
            >
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                IS
              </span>
            </button>
          </div>
          
          
          <div className="md:hidden flex justify-between overflow-x-auto py-2 space-x-1">
            <button
              onClick={() => onCategorySelect('ALL')}
              className={`flex-1 px-2 py-2 text-xs font-medium rounded-md transition-colors duration-200 ${
                selectedCategory === 'ALL' || selectedCategory === null
                  ? 'bg-green-800 text-white shadow-sm' 
                  : 'text-white bg-green-600/50'
              }`}
            >
              <span className="flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-yellow-400 mr-1"></span>
                ALL
              </span>
            </button>
            
            <button
              onClick={() => onCategorySelect('CS')}
              className={`flex-1 px-2 py-2 text-xs font-medium rounded-md transition-colors duration-200 ${
                selectedCategory === 'CS' 
                  ? 'bg-green-800 text-white shadow-sm' 
                  : 'text-white bg-green-600/50'
              }`}
            >
              <span className="flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-purple-400 mr-1"></span>
                CS
              </span>
            </button>
            
            <button
              onClick={() => onCategorySelect('IT')}
              className={`flex-1 px-2 py-2 text-xs font-medium rounded-md transition-colors duration-200 ${
                selectedCategory === 'IT' 
                  ? 'bg-green-800 text-white shadow-sm' 
                  : 'text-white bg-green-600/50'
              }`}
            >
              <span className="flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-blue-400 mr-1"></span>
                IT
              </span>
            </button>
            
            <button
              onClick={() => onCategorySelect('IS')}
              className={`flex-1 px-2 py-2 text-xs font-medium rounded-md transition-colors duration-200 ${
                selectedCategory === 'IS' 
                  ? 'bg-green-800 text-white shadow-sm' 
                  : 'text-white bg-green-600/50'
              }`}
            >
              <span className="flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-green-400 mr-1"></span>
                IS
              </span>
            </button>
          </div>
          
          
          <div className="md:hidden py-2 px-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-3 py-2 border-0 rounded-full leading-5 bg-white/90 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-green-700 pb-3 px-4">
          
          <div className="pt-2 pb-3 border-t border-green-600">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Subjects
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-green-600 flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Users className="h-4 w-4 mr-1" />
              About Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}