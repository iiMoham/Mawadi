import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode?: boolean;
}

export function AdminLoginModal({ isOpen, onClose, darkMode = false }: AdminLoginModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password check - in a real app, this would be a secure authentication system
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      onClose();
      navigate('/admin');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden`}>
        <div className={`flex justify-between items-center p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>Admin Login</h2>
          <button 
            onClick={onClose}
            className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className={`mb-4 p-3 ${darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-50 text-red-600'} rounded-md text-sm`}>
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border ${
                darkMode 
                  ? 'border-gray-600 bg-gray-700 text-gray-100 focus:ring-green-600 focus:border-green-600' 
                  : 'border-gray-300 bg-white text-gray-900 focus:ring-green-500 focus:border-green-500'
              } rounded-md shadow-sm focus:outline-none focus:ring-2`}
              placeholder="Enter admin password"
              required
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className={`mr-3 px-4 py-2 text-sm font-medium ${
                darkMode 
                  ? 'text-gray-200 bg-gray-700 hover:bg-gray-600' 
                  : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
              } rounded-md transition-colors`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 