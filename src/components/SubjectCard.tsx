import React from 'react';
import { FileText, TestTube, ExternalLink } from 'lucide-react';
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full flex flex-col border border-green-100 dark:border-gray-700
        group relative overflow-hidden
        transition-all duration-500 ease-in-out
        transform hover:scale-[1.03] hover:-translate-y-1">
        
        {/* Background gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-700 dark:from-green-700 dark:to-green-900 
          opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out -z-10"></div>
        
        {/* Animated corner accent */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-green-500/20 dark:bg-green-400/20 rounded-full 
          transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out"></div>
        
        {/* Header section */}
        <div className="mb-2">
          <h3 className="text-xl font-semibold text-green-800 dark:text-green-400
            group-hover:text-white transition-colors duration-300
            transform group-hover:translate-x-1">
            {subject.name}
          </h3>
        </div>
        
        {/* Content section - with flex-grow to push buttons to bottom */}
        <div className="flex-grow">
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3
            group-hover:text-white/90 transition-colors duration-300">
            {subject.description}
          </p>
        </div>
        
        {/* Buttons section - at the bottom */}
        <div className="mt-3 pt-2 border-t border-green-100 dark:border-gray-600
          group-hover:border-green-300/30 transition-colors duration-300">
          <div className="flex flex-wrap gap-1.5">
            {subject.slide_link && (
              <a
                href={subject.slide_link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center px-2 py-1 rounded text-xs font-medium 
                  bg-green-600 text-white dark:bg-green-200 dark:text-green-800
                  hover:bg-green-700 hover:text-white dark:hover:bg-green-300 dark:hover:text-green-900
                  group-hover:bg-green-600 group-hover:text-white dark:group-hover:bg-green-200 dark:group-hover:text-green-800
                  transition-colors duration-300"
              >
                <FileText className="h-3 w-3 mr-1" />
                {getTranslation(language, 'slides')}
              </a>
            )}
            
            {subject.test_bank_link && (
              <a
                href={subject.test_bank_link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center px-2 py-1 rounded text-xs font-medium 
                  bg-blue-600 text-white dark:bg-blue-200 dark:text-blue-800
                  hover:bg-blue-700 hover:text-white dark:hover:bg-blue-300 dark:hover:text-blue-900
                  group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-200 dark:group-hover:text-blue-800
                  transition-colors duration-300"
              >
                <TestTube className="h-3 w-3 mr-1" />
                {getTranslation(language, 'testBank')}
              </a>
            )}
            
            {subject.telegram_channel && (
              <a
                href={subject.telegram_channel}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center px-2 py-1 rounded text-xs font-medium 
                  bg-cyan-600 text-white dark:bg-cyan-200 dark:text-cyan-800
                  hover:bg-cyan-700 hover:text-white dark:hover:bg-cyan-300 dark:hover:text-cyan-900
                  group-hover:bg-cyan-600 group-hover:text-white dark:group-hover:bg-cyan-200 dark:group-hover:text-cyan-800
                  transition-colors duration-300"
              >
                <img 
                  src={TelegramIcon} 
                  alt="Telegram" 
                  className="h-3 w-3 mr-1" 
                />
                {getTranslation(language, 'telegram')}
              </a>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

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