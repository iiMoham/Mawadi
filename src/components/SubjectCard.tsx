import React from 'react';
import { FileText, TestTube } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Subject } from '../types';
import TelegramIcon from '../assets/avatars/telegram.svg';

interface SubjectCardProps {
  subject: Subject;
  language: 'en' | 'ar';
}

export function SubjectCard({ subject, language }: SubjectCardProps) {
  return (
    <Link to={`/subject/${subject.id}`} className="block h-full transform perspective-1000">
      <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col border border-green-100 
        hover:bg-green-600 hover:border-green-700 hover:shadow-xl group
        transition-all duration-500 ease-in-out
        transform hover:scale-105 hover:-translate-y-1 hover:rotate-1">
        <h3 className="text-xl font-semibold text-green-800 mb-3 
          group-hover:text-white transition-colors duration-300
          transform group-hover:translate-x-1">
          {subject.name}
        </h3>
        <p className="text-gray-600 mb-6 flex-grow line-clamp-4 
          group-hover:text-white transition-colors duration-300">
          {subject.description}
        </p>
        <div className="flex space-x-4 pt-4 border-t border-green-100 
          group-hover:border-green-300 transition-colors duration-300">
          {subject.slide_link && (
            <span className="flex items-center text-green-600 
              group-hover:text-white transition-all duration-300
              transform group-hover:translate-y-[-2px]">
              <FileText className="h-5 w-5 mr-1 transition-transform duration-500 group-hover:scale-110 group-hover:animate-pulse" />
              <span>{getTranslation(language, 'slides')}</span>
            </span>
          )}
          {subject.test_bank_link && (
            <span className="flex items-center text-green-600 
              group-hover:text-white transition-all duration-300
              transform group-hover:translate-y-[-2px]">
              <TestTube className="h-5 w-5 mr-1 transition-transform duration-500 group-hover:scale-110 group-hover:animate-pulse" />
              <span>{getTranslation(language, 'testBank')}</span>
            </span>
          )}
          {subject.telegram_channel && (
            <span className="flex items-center text-green-600 
              group-hover:text-white transition-all duration-300
              transform group-hover:translate-y-[-2px]">
              <img 
                src={TelegramIcon} 
                alt="Telegram" 
                className="h-5 w-5 mr-1 transition-transform duration-500 group-hover:scale-110 group-hover:animate-pulse" 
              />
              <span>{getTranslation(language, 'telegram')}</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// Helper function for translations
function getTranslation(language: 'en' | 'ar', key: string): string {
  const translations: Record<string, Record<string, string>> = {
    en: {
      slides: 'Slides',
      testBank: 'Test Bank',
      telegram: 'Telegram'
    },
    ar: {
      slides: 'الشرائح',
      testBank: 'بنك الاختبارات',
      telegram: 'تيليجرام'
    }
  };
  
  return translations[language][key] || key;
}