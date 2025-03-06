import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, ExternalLink } from 'lucide-react';
import { Subject } from '../types';
import TelegramIcon from '../assets/avatars/telegram.svg';

interface SubjectDetailProps {
  subject: Subject | null;
  subjects: Subject[];
  onSubjectSelect: (subject: Subject) => void;
}

export function SubjectDetail({ subject, subjects, onSubjectSelect }: SubjectDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // If subject is not provided directly, find it from the subjects array
  useEffect(() => {
    if (!subject && id) {
      const foundSubject = subjects.find(s => s.id === id);
      if (foundSubject) {
        onSubjectSelect(foundSubject);
      } else {
        // If subject not found, navigate back to home
        navigate('/');
      }
    }
  }, [id, subject, subjects, onSubjectSelect, navigate]);

  if (!subject) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 dark:border-green-400"></div>
        </div>
      </div>
    );
  }

  const relatedSubjects = subjects
    .filter(s => s.id !== subject.id && (s.category === subject.category || s.category === 'ALL' || (subject.category === 'ALL' && ['CS', 'IT', 'IS'].includes(s.category))))
    .slice(0, 3);

  const getCategoryStyle = (category: string) => {
    switch(category) {
      case 'CS':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'IT':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'IS':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'ALL':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Subjects</span>
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-green-800 dark:text-green-400">
              {subject.name}
            </h1>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryStyle(subject.category)}`}>
              {subject.category}
            </span>
          </div>
          
          <div className="prose dark:prose-invert max-w-none mb-8">
            <p className="text-gray-700 dark:text-gray-300 text-base">
              {subject.description}
            </p>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h2 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4">
              Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subject.slide_link ? (
                <a
                  href={subject.slide_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 border border-green-100 dark:border-green-800/50 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                >
                  <div className="bg-green-100 dark:bg-green-800/50 p-3 rounded-full mr-4">
                    <FileText className="h-6 w-6 text-green-700 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Lecture Slides</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">View or download the lecture slides</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 dark:text-gray-500 ml-auto" />
                </a>
              ) : (
                <div className="flex items-center p-4 border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-full mr-4">
                    <FileText className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500 dark:text-gray-400">Lecture Slides</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">No slides available</p>
                  </div>
                </div>
              )}
              
              {subject.test_bank_link ? (
                <a
                  href={subject.test_bank_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 border border-blue-100 dark:border-blue-800/50 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <div className="bg-blue-100 dark:bg-blue-800/50 p-3 rounded-full mr-4">
                    <FileText className="h-6 w-6 text-blue-700 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Test Bank</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Practice with previous exams</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 dark:text-gray-500 ml-auto" />
                </a>
              ) : (
                <div className="flex items-center p-4 border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-full mr-4">
                    <FileText className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500 dark:text-gray-400">Test Bank</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">No test bank available</p>
                  </div>
                </div>
              )}
              
              {subject.telegram_channel ? (
                <a
                  href={subject.telegram_channel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 border border-cyan-100 dark:border-cyan-800/50 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors"
                >
                  <div className="bg-cyan-100 dark:bg-cyan-800/50 p-3 rounded-full mr-4">
                    <img src={TelegramIcon} alt="Telegram" className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Telegram Channel</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Join the subject's Telegram channel</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 dark:text-gray-500 ml-auto" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      
      {relatedSubjects.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-6">
            Related Subjects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedSubjects.map((relatedSubject) => (
              <div 
                key={relatedSubject.id} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 
                  transition-all duration-300 hover:-translate-y-1 group hover:bg-green-600 dark:hover:bg-green-700 h-full"
              >
                <div className="p-4 flex flex-col h-full">
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2 group-hover:text-white transition-colors duration-300">
                      {relatedSubject.name}
                    </h3>
                  </div>
                  
                  <div className="flex-grow">
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
                      {relatedSubject.description}
                    </p>
                  </div>
                  
                  <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700 group-hover:border-green-300/30">
                    <Link
                      to={`/subject/${relatedSubject.id}`}
                      onClick={() => onSubjectSelect(relatedSubject)}
                      className="inline-flex items-center px-2 py-1 rounded text-xs font-medium 
                        bg-green-600 text-white dark:bg-green-200 dark:text-green-800
                        hover:bg-green-700 hover:text-white dark:hover:bg-green-300 dark:hover:text-green-900
                        group-hover:bg-green-600 group-hover:text-white dark:group-hover:bg-green-200 dark:group-hover:text-green-800
                        transition-colors duration-300"
                    >
                      <span>View Details</span>
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 