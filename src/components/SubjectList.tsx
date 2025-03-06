import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, FileText } from 'lucide-react';
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
        <p className="text-gray-500 text-lg">
          No subjects found. Try a different search or category.
        </p>
      </div>
    );
  }

  // Helper function to get category style
  const getCategoryStyle = (category: string) => {
    switch(category) {
      case 'CS':
        return 'bg-purple-100 text-purple-800 group-hover:bg-purple-200 group-hover:text-purple-900';
      case 'IT':
        return 'bg-blue-100 text-blue-800 group-hover:bg-blue-200 group-hover:text-blue-900';
      case 'IS':
        return 'bg-green-100 text-green-800 group-hover:bg-green-200 group-hover:text-green-900';
      case 'ALL':
        return 'bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200 group-hover:text-yellow-900';
      default:
        return 'bg-gray-100 text-gray-800 group-hover:bg-gray-200 group-hover:text-gray-900';
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-700 mb-6">
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
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group hover:bg-green-600 h-full"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-green-800 mb-2 group-hover:text-white transition-colors duration-300">
                    {subject.name}
                  </h2>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors duration-300 ${getCategoryStyle(subject.category)}`}>
                    {subject.category}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3 group-hover:text-white/90 transition-colors duration-300">
                  {subject.description}
                </p>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="inline-flex items-center text-green-600 group-hover:text-white transition-colors duration-300">
                    {/* <span>View Details</span> */}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </span>
                  
                  <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                    {subject.slide_link && (
                      <a
                        href={subject.slide_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200 transition-colors duration-300 group-hover:bg-white group-hover:text-green-700"
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
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-300 group-hover:bg-white group-hover:text-blue-700"
                      >
                        <FileText className="h-3 w-3 mr-1" />
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