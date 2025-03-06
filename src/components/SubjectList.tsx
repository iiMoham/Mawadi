import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, FileText, TestTube } from 'lucide-react';
import { Subject } from '../types';

interface SubjectListProps {
  subjects: Subject[];
  isLoading: boolean;
  onSubjectSelect: (subject: Subject) => void;
}

export function SubjectList({ subjects, isLoading, onSubjectSelect }: SubjectListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (subjects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No subjects found. Try a different search or category.
        </p>
      </div>
    );
  }

  const getCategoryStyle = (category: string) => {
    switch(category) {
      case 'CS':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 group-hover:bg-purple-200 group-hover:text-purple-900 dark:group-hover:bg-purple-800 dark:group-hover:text-purple-100';
      case 'IT':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 group-hover:bg-blue-200 group-hover:text-blue-900 dark:group-hover:bg-blue-800 dark:group-hover:text-blue-100';
      case 'IS':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 group-hover:bg-green-200 group-hover:text-green-900 dark:group-hover:bg-green-800 dark:group-hover:text-green-100';
      case 'ALL':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 group-hover:bg-yellow-200 group-hover:text-yellow-900 dark:group-hover:bg-yellow-800 dark:group-hover:text-yellow-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 group-hover:bg-gray-200 group-hover:text-gray-900 dark:group-hover:bg-gray-600 dark:group-hover:text-gray-100';
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-700 dark:text-green-500 mb-6">
        Available Subjects
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <Link 
            key={subject.id}
            to={`/subject/${subject.id}`}
            onClick={() => onSubjectSelect(subject)}
            className="block"
          >
            <div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 
                transition-all duration-300 hover:-translate-y-1 group hover:bg-green-600 dark:hover:bg-green-700 h-full"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-green-800 dark:text-green-400 mb-2 group-hover:text-white transition-colors duration-300">
                    {subject.name}
                  </h2>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors duration-300 ${getCategoryStyle(subject.category)}`}>
                    {subject.category}
                  </span>
                </div>
                
                <div className="flex-grow">
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 group-hover:text-white/90 transition-colors duration-300">
                    {subject.description}
                  </p>
                </div>
                
                <div className="mt-auto pt-2 border-t border-gray-200 dark:border-gray-700 group-hover:border-green-300/30">
                  <div className="flex flex-wrap gap-1.5 mt-2">
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
                        Slides
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
                        Test Bank
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 