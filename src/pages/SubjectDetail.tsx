import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, TestTube, Calendar } from 'lucide-react';
import type { Subject } from '../types';

interface SubjectDetailProps {
  subjects: Subject[];
  language: 'en' | 'ar';
}

// export function SubjectDetail({ subjects, language }: SubjectDetailProps) {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const subject = subjects.find(s => s.id === id);

  // if (!subject) {
  //   return (
  //     <div className="min-h-screen bg-white flex items-center justify-center">
  //       <div className="text-center">
  //         <h2 className="text-2xl font-bold text-green-800">
  //           {getTranslation(language, 'subjectNotFound')}
  //         </h2>
  //         <button
  //           onClick={() => navigate('/')}
  //           className="mt-4 inline-flex items-center text-green-600 hover:text-green-800"
  //         >
  //           <ArrowLeft className="h-5 w-5 mr-2" />
  //           {getTranslation(language, 'backToSubjects')}
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

//   const createdDate = new Date(subject.created_at).toLocaleDateString(
//     language === 'en' ? 'en-US' : 'ar-SA', 
//     {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     }
//   );

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         <button
//           onClick={() => navigate('/')}
//           className="mb-6 inline-flex items-center text-green-600 hover:text-green-800"
//         >
//           <ArrowLeft className="h-5 w-5 mr-2" />
//           {getTranslation(language, 'backToSubjects')}
//         </button>
        
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100">
//           <div className="p-8">
//             <h1 className="text-3xl font-bold text-green-800 mb-4">{subject.name}</h1>
            
//             <div className="flex items-center text-sm text-gray-500 mb-6">
//               <Calendar className="h-4 w-4 mr-1" />
//               <span>{getTranslation(language, 'addedOn')} {createdDate}</span>
//             </div>
            
//             <div className="prose max-w-none mb-8">
//               <p className="text-gray-600 text-lg leading-relaxed">
//                 {subject.description}
//               </p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {subject.slide_link && (
//                 <a
//                   href={subject.slide_link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center justify-center p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
//                 >
//                   <FileText className="h-6 w-6 text-green-600 mr-3" />
//                   <span className="text-lg font-medium text-green-600">
//                     {getTranslation(language, 'viewSlides')}
//                   </span>
//                 </a>
//               )}
              
//               {subject.test_bank_link && (
//                 <a
//                   href={subject.test_bank_link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center justify-center p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
//                 >
//                   <TestTube className="h-6 w-6 text-green-600 mr-3" />
//                   <span className="text-lg font-medium text-green-600">
//                     {getTranslation(language, 'accessTestBank')}
//                   </span>
//                 </a>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }