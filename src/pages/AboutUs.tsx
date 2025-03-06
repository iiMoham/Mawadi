import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import avatar1 from '../assets/avatars/avatar1.jpg';
import avatar12 from '../assets/avatars/avatar1_4.jpg';
import avatar2 from '../assets/avatars/avatar2.svg';
import avatar3 from '../assets/avatars/avatar3.svg';
import avatar4 from '../assets/avatars/avatar4.svg';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

export function AboutUs() {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Mohammed Al-Saleh',
      role: 'Full-Stack Web Developer',
      avatar: avatar12,
      linkedin: 'https://www.linkedin.com/in/mohammed-alsaleh-326496318?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      twitter: 'https://x.com/iimoh9x',
      github: 'https://github.com/iiMoham'
    },
    {
      id: 2,
      name: 'Fahad Al-Hawas',
      role: 'Project Supervisor',
      avatar: avatar2,
      linkedin: 'https://linkedin.com/in/fahad-alhawas',
      twitter: 'https://twitter.com/fahad_supervisor',
      github: 'https://github.com/fahad-alhawas'
    },
    {
      id: 3,
      name: 'Mohammed Al-Otaibi',
      role: 'Data collector',
      avatar: avatar3,
      linkedin: 'https://linkedin.com/in/mohammed-alotaibi',
      twitter: 'https://twitter.com/mohammed_dev',
      github: 'https://github.com/mohammed-alotaibi'
    },
    {
      id: 4,
      name: 'Fatima Al-Harbi',
      role: 'Data collector',
      avatar: avatar4,
      linkedin: 'https://linkedin.com/in/fatima-alharbi',
      twitter: 'https://twitter.com/fatima_pm',
      github: 'https://github.com/fatima-alharbi'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Home</span>
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-2">
        About Us
      </h1>
      
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
        We are a team of passionate students and educators dedicated to making university subjects more accessible and easier to understand. Our platform provides a centralized repository of study materials, lecture slides, and test banks for various courses.
      </p>
      
      <h2 className="text-2xl font-semibold text-green-700 dark:text-green-500 mb-6">
        Our Team
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <div className="p-4 flex flex-col items-center">
              <img 
                src={member.avatar} 
                alt={member.name} 
                className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-green-500 dark:border-green-400"
              />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{member.name}</h3>
              <p className="text-green-600 dark:text-green-400 mb-3">{member.role}</p>
              
              <div className="flex space-x-3 mt-2">
                {member.linkedin && (
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                    title="LinkedIn"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                )}
                
                {member.twitter && (
                  <a 
                    href={member.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                    title="X (formerly Twitter)"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
                
                {member.github && (
                  <a 
                    href={member.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                    title="GitHub"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-8">
        <h2 className="text-2xl font-semibold text-green-700 dark:text-green-500 mb-6">
          Our Mission
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          To provide a comprehensive platform that helps university students access quality study materials, collaborate with peers, and excel in their academic journey. We believe that education should be accessible to all, and our platform is designed to break down barriers to academic success.
        </p>
        
        <h2 className="text-2xl font-semibold text-green-700 dark:text-green-500 mb-6">
          Contact Us
        </h2>
        
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 mb-8 border border-green-100 dark:border-green-900/30 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-100 dark:bg-green-900/20 rounded-full"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-green-50 dark:bg-green-900/10 rounded-full"></div>
          
          <div className="relative">
            <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-6 flex items-center">
              <span className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </span>
              Get in Touch
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 transform transition-transform hover:scale-[1.02] hover:shadow-md">
                <div className="flex items-center">
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-full mr-4 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Us</h4>
                    <a href="mailto:contact@mawadi.edu" className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium text-lg hover:underline transition-colors">
                      contact@mawadi.edu
                    </a>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
                  Feel free to email us with any questions, suggestions, or feedback. We typically respond within 24 hours.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 transform transition-transform hover:scale-[1.02] hover:shadow-md">
                <div className="flex items-center">
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-full mr-4 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">WhatsApp</h4>
                    <a href="https://wa.me/966533367972" className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium text-lg hover:underline transition-colors">
                      +966 53 33 67972
                    </a>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
                  For quick responses and direct communication, reach out to us on WhatsApp. We're available during business hours.
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-green-600 dark:bg-green-700 rounded-xl text-white shadow-lg">
              <h4 className="text-xl font-semibold mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Quick Connect
              </h4>
              <p className="mb-4 text-white/90">
                Want to contribute or have a suggestion? We'd love to hear from you!
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="mailto:contact@mawadi.edu" className="inline-flex items-center px-4 py-2 bg-white text-green-700 rounded-full text-sm font-medium hover:bg-green-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Us
                </a>
                <a href="https://github.com/mawadi-team" className="inline-flex items-center px-4 py-2 bg-white text-green-700 rounded-full text-sm font-medium hover:bg-green-50 transition-colors">
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Have questions or suggestions? Reach out to us at <a href="mailto:contact@mawadi.edu" className="text-green-600 dark:text-green-400 hover:underline">contact@mawadi.edu</a> or check out our <a href="https://github.com/mawadi-team" className="text-green-600 dark:text-green-400 hover:underline">GitHub organization</a> for open-source contributions.
        </p>
      </div>
    </div>
  );
} 