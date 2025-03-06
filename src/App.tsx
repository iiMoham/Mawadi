import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { SubjectList } from './components/SubjectList';
import { SubjectDetail } from './components/SubjectDetail';
import { AdminDashboard } from './pages/AdminDashboard';
import { AboutUs } from './pages/AboutUs';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Subject, SubjectCategory } from './types';
import { subjectService } from './lib/appwrite';
import { Layout } from './components/Layout';
import { LandingHeader } from './components/LandingHeader';

interface AdminRouteProps {
  subjects: Subject[];
  onAddSubject: (subject: Omit<Subject, 'id' | 'created_at'>) => Promise<boolean>;
  onEditSubject: (id: string, subject: Omit<Subject, 'id' | 'created_at'>) => Promise<boolean>;
  onDeleteSubject: (id: string) => Promise<boolean>;
  isLoading: boolean;
}

// Protected route for admin dashboard
function AdminRoute({ subjects, onAddSubject, onEditSubject, onDeleteSubject, isLoading }: AdminRouteProps) {
  const location = useLocation();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (!isAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <AdminDashboard 
      subjects={subjects} 
      onAddSubject={onAddSubject} 
      onEditSubject={onEditSubject}
      onDeleteSubject={onDeleteSubject}
      isLoading={isLoading}
    />
  );
}

function AppContent() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SubjectCategory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState('en');
  const [showLanding, setShowLanding] = useState(true);
  const location = useLocation();

  // Hide landing page when navigating to other routes
  useEffect(() => {
    if (location.pathname !== '/') {
      setShowLanding(false);
    }
  }, [location.pathname]);

  // Fetch subjects on component mount
  useEffect(() => {
    const fetchSubjects = async () => {
      setIsLoading(true);
      try {
        console.log('Fetching subjects...');
        const fetchedSubjects = await subjectService.getAllSubjects();
        console.log('Fetched subjects:', fetchedSubjects);
        setSubjects(fetchedSubjects);
        setFilteredSubjects(fetchedSubjects); // Initialize filtered subjects with all subjects
        setError(null);
      } catch (err) {
        console.error('Detailed error fetching subjects:', err);
        if (err instanceof Error) {
          console.error('Error message:', err.message);
          console.error('Error stack:', err.stack);
        }
        setError('Failed to load subjects. Please try again later.');
        // Load fallback data if database fails
        const fallbackData = [
    {
      id: '1',
      name: 'CPCS-203',
      description: 'Introduction to differential and integral calculus. Topics include limits, derivatives, applications of differentiation, integrals, and the fundamental theorem of calculus. Essential for STEM majors.',
      slide_link: 'https://example.com/calculus-slides',
      test_bank_link: 'https://example.com/calculus-tests',
            telegram_channel: 'https://t.me/calculus_channel',
      created_at: new Date().toISOString(),
            category: 'CS' as SubjectCategory
    },
    {
      id: '2',
      name: 'Introduction to Psychology',
      description: 'Explore the fundamentals of human behavior and mental processes. Learn about perception, cognition, emotion, personality, and psychological disorders. Perfect for understanding human nature.',
      slide_link: 'https://example.com/psychology-slides',
      test_bank_link: 'https://example.com/psychology-tests',
            telegram_channel: 'https://t.me/psychology_channel',
      created_at: new Date().toISOString(),
            category: 'IS' as SubjectCategory
    },
    {
      id: '3',
            name: 'IT-101',
            description: 'Introduction to Information Technology. Learn about computer systems, networks, and modern IT infrastructure.',
            slide_link: 'https://example.com/it-slides',
            test_bank_link: 'https://example.com/it-tests',
            telegram_channel: 'https://t.me/it_channel',
      created_at: new Date().toISOString(),
            category: 'IT' as SubjectCategory
    },
    {
      id: '4',
            name: 'Academic Writing',
            description: 'Learn essential academic writing skills for all disciplines. This course covers research methods, citation styles, and effective communication techniques applicable to any field of study.',
            slide_link: 'https://example.com/writing-slides',
            test_bank_link: 'https://example.com/writing-tests',
      created_at: new Date().toISOString(),
            category: 'ALL' as SubjectCategory
          },
        ];
        console.log('Using fallback data:', fallbackData);
        setSubjects(fallbackData);
        setFilteredSubjects(fallbackData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  // Apply filters whenever subjects, search query, or selected category changes
  useEffect(() => {
    applyFilters();
  }, [subjects, searchQuery, selectedCategory]);

  // Function to apply both search and category filters
  const applyFilters = (subjectsToFilter = subjects) => {
    let filtered = [...subjectsToFilter];
    
    // Apply category filter if a category is selected and not ALL
    if (selectedCategory && selectedCategory !== 'ALL') {
      console.log(`Filtering by category: ${selectedCategory}`);
      // Show subjects that match the selected category OR have the ALL category
      filtered = filtered.filter(subject => 
        subject.category === selectedCategory || subject.category === 'ALL'
      );
    } else {
      console.log('Showing all categories (no category filter applied)');
    }
    
    // Apply search filter if there's a search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      console.log(`Filtering by search query: "${query}"`);
      filtered = filtered.filter(subject => 
        subject.name.toLowerCase().includes(query) || 
        subject.description.toLowerCase().includes(query)
      );
    }
    
    console.log('Filtered subjects:', filtered);
    console.log('Selected category:', selectedCategory);
    console.log('Search query:', searchQuery);
    
    setFilteredSubjects(filtered);
  };

  const handleAdminClick = () => {
    setIsAdminLoginModalOpen(true);
  };

  const handleAddSubject = async (newSubject: Omit<Subject, 'id' | 'created_at'>) => {
    setIsLoading(true);
    try {
      console.log('🔍 handleAddSubject called with:', JSON.stringify(newSubject, null, 2));
      
      // Make sure the category is valid (not ALL for new subjects)
      const validatedSubject = {
        ...newSubject,
        category: newSubject.category === 'ALL' ? 'CS' : newSubject.category
      };
      
      console.log('Validated subject category:', validatedSubject.category);
      
      const addedSubject = await subjectService.createSubject(validatedSubject);
      
      if (addedSubject) {
        console.log('✅ Subject received from service:', JSON.stringify(addedSubject, null, 2));
        
        // Check if this is a fallback subject (created in memory) by checking if id is a string without a $ prefix
        // Appwrite IDs in responses have $id property, but our fallback uses regular id
        const isFallbackSubject = typeof addedSubject.id === 'string' && !addedSubject.id.includes('$');
        
        if (isFallbackSubject) {
          console.log('⚠️ Using fallback subject (not saved to Appwrite)');
          // Show a warning message to the user
          setError('Subject was created but could not be saved to the database. It will disappear on page refresh.');
        } else {
          console.log('✅ Subject successfully saved to Appwrite');
          setError(null);
        }
        
        // Update the subjects list
        setSubjects(prevSubjects => {
          const updatedSubjects = [...prevSubjects, addedSubject];
          console.log('📋 Updated subjects list:', updatedSubjects.length);
          return updatedSubjects;
        });
        
        // Force a refresh of all subjects from the database
        try {
          console.log('Refreshing subjects from database...');
          const refreshedSubjects = await subjectService.getAllSubjects();
          console.log('Refreshed subjects after add:', refreshedSubjects);
          setSubjects(refreshedSubjects);
          
          // Apply filters to the refreshed subjects
          applyFilters(refreshedSubjects);
        } catch (refreshError) {
          console.error('Error refreshing subjects:', refreshError);
          // If refresh fails, just apply filters to current state
          applyFilters();
        }
        
        return true;
      } else {
        console.error('❌ Failed to add subject: null response from service');
        setError('Failed to add subject. Please try again later.');
        return false;
      }
    } catch (error) {
      console.error('❌ Error in handleAddSubject:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      setError('An unexpected error occurred. Please try again later.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSubject = async (id: string, updatedSubject: Omit<Subject, 'id' | 'created_at'>) => {
    setIsLoading(true);
    try {
      const editedSubject = await subjectService.updateSubject(id, updatedSubject);
      if (editedSubject) {
        setSubjects(prevSubjects => 
          prevSubjects.map(subject => 
            subject.id === id ? editedSubject : subject
          )
        );
        // Filtering will be applied by the useEffect
      }
      return true;
    } catch (error) {
      console.error('Error editing subject:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSubject = async (id: string) => {
    setIsLoading(true);
    try {
      await subjectService.deleteSubject(id);
      
      // Remove from subjects list
      setSubjects(prevSubjects => prevSubjects.filter(subject => subject.id !== id));
      // Filtering will be applied by the useEffect
      
      return true;
    } catch (error) {
      console.error('Error deleting subject:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    // Filtering will be applied by the useEffect
  };

  const handleCategorySelect = (category: SubjectCategory | null) => {
    // Treat null as 'ALL'
    const newCategory = category === null ? 'ALL' as SubjectCategory : category;
    console.log('Setting selected category to:', newCategory);
    setSelectedCategory(newCategory);
    
    // Immediately apply filters with the new category
    let filtered = [...subjects];
    
    // Apply category filter if a category is selected and not ALL
    if (newCategory && newCategory !== 'ALL') {
      console.log(`Filtering by category: ${newCategory}`);
      // Show subjects that match the selected category OR have the ALL category
      filtered = filtered.filter(subject => 
        subject.category === newCategory || subject.category === 'ALL'
      );
    } else {
      console.log('Showing all categories (no category filter applied)');
    }
    
    // Apply search filter if there's a search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      console.log(`Filtering by search query: "${query}"`);
      filtered = filtered.filter(subject => 
        subject.name.toLowerCase().includes(query) || 
        subject.description.toLowerCase().includes(query)
      );
    }
    
    console.log('Filtered subjects after category change:', filtered);
    setFilteredSubjects(filtered);
  };

  const handleExplore = () => {
    setShowLanding(false);
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col">
        <Navbar 
          onSearch={handleSearch} 
          onAdminClick={handleAdminClick}
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
        
        <main className="flex-grow">
      <Routes>
        <Route
          path="/"
          element={
                <div>
                  <LandingHeader />
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {error && (
                      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded shadow-sm">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <SubjectList 
                      subjects={filteredSubjects} 
                      isLoading={isLoading}
                      onSubjectSelect={setSelectedSubject} 
                    />
                  </div>
                </div>
          }
        />
            
        <Route
          path="/subject/:id"
          element={
                <SubjectDetail 
                  subject={selectedSubject} 
                  subjects={subjects}
                  onSubjectSelect={setSelectedSubject}
                />
              } 
            />
            
            <Route 
              path="/about" 
              element={<AboutUs />} 
            />
            
            <Route 
              path="/admin" 
              element={
                <AdminRoute 
                  subjects={subjects}
                  onAddSubject={handleAddSubject}
                  onEditSubject={handleEditSubject}
                  onDeleteSubject={handleDeleteSubject}
                  isLoading={isLoading}
                />
              } 
            />
      </Routes>
        </main>
        
        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center">
                <span className="text-green-700 font-semibold">Mawadi</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-500 text-sm">© {new Date().getFullYear()} All rights reserved</span>
              </div>
              <div className="mt-4 md:mt-0">
                <nav className="flex space-x-4">
                  <Link to="/" className="text-gray-500 hover:text-green-700 transition-colors">Home</Link>
                  <Link to="/about" className="text-gray-500 hover:text-green-700 transition-colors">About</Link>
                  <a href="#" className="text-gray-500 hover:text-green-700 transition-colors">Privacy</a>
                  <a href="#" className="text-gray-500 hover:text-green-700 transition-colors">Terms</a>
                </nav>
              </div>
            </div>
          </div>
        </footer>
        
        {isAdminLoginModalOpen && (
          <AdminLoginModal 
            isOpen={isAdminLoginModalOpen} 
            onClose={() => setIsAdminLoginModalOpen(false)} 
          />
        )}
    </div>
    </Layout>
  );
}

function App() {
  return (
    <Router>
        <AppContent />
    </Router>
  );
}

export default App;