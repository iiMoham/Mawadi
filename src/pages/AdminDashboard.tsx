import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash, Edit, Plus, X, Check, Loader2 } from 'lucide-react';
import { Subject, SubjectCategory } from '../types';

interface AdminDashboardProps {
  subjects: Subject[];
  onAddSubject: (subject: Omit<Subject, 'id' | 'created_at'>) => Promise<boolean>;
  onEditSubject: (id: string, subject: Omit<Subject, 'id' | 'created_at'>) => Promise<boolean>;
  onDeleteSubject: (id: string) => Promise<boolean>;
  isLoading: boolean;
}

export function AdminDashboard({ 
  subjects, 
  onAddSubject, 
  onEditSubject, 
  onDeleteSubject,
  isLoading
}: AdminDashboardProps) {
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [editingSubjectId, setEditingSubjectId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    slide_link: '',
    test_bank_link: '',
    telegram_channel: '',
    category: 'CS' as SubjectCategory
  });
  const [formError, setFormError] = useState('');

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      slide_link: '',
      test_bank_link: '',
      telegram_channel: '',
      category: 'CS' as SubjectCategory
    });
    setFormError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'category' ? value as SubjectCategory : value 
    }));
  };

  const handleAddClick = () => {
    setIsAddingSubject(true);
    resetForm();
  };

  const handleEditClick = (subject: Subject) => {
    setEditingSubjectId(subject.id);
    setFormData({
      name: subject.name,
      description: subject.description,
      slide_link: subject.slide_link || '',
      test_bank_link: subject.test_bank_link || '',
      telegram_channel: subject.telegram_channel || '',
      category: subject.category
    });
  };

  const handleCancelEdit = () => {
    setEditingSubjectId(null);
    resetForm();
  };

  const handleCancelAdd = () => {
    setIsAddingSubject(false);
    resetForm();
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormError('Subject name is required');
      return false;
    }
    if (!formData.description.trim()) {
      setFormError('Description is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (editingSubjectId) {
      // Edit existing subject
      const success = await onEditSubject(editingSubjectId, formData);
      if (success) {
        setEditingSubjectId(null);
        resetForm();
      }
    } else {
      // Add new subject
      const success = await onAddSubject(formData);
      if (success) {
        setIsAddingSubject(false);
        resetForm();
      }
    }
  };

  const handleDeleteClick = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      await onDeleteSubject(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <Link 
            to="/" 
            className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-400 mt-2">
            Admin Dashboard
          </h1>
        </div>
        
        {!isAddingSubject && !editingSubjectId && (
          <button
            onClick={handleAddClick}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800"
            disabled={isLoading}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Subject
          </button>
        )}
      </div>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 text-green-500 animate-spin" />
          <span className="ml-2 text-gray-600 dark:text-gray-300">Loading...</span>
        </div>
      )}
      
      {/* Add/Edit Subject Form */}
      {(isAddingSubject || editingSubjectId) && (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-green-800 dark:text-green-400">
              {editingSubjectId ? 'Edit Subject' : 'Add New Subject'}
            </h2>
            <button 
              onClick={editingSubjectId ? handleCancelEdit : handleCancelAdd}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {formError && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
              {formError}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-600 dark:focus:border-green-600 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-600 dark:focus:border-green-600 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-600 dark:focus:border-green-600 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                >
                  <option value="CS">CS</option>
                  <option value="IT">IT</option>
                  <option value="IS">IS</option>
                  <option value="ALL">ALL</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="slide_link" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Slides Link (optional)
                </label>
                <input
                  type="url"
                  name="slide_link"
                  id="slide_link"
                  value={formData.slide_link}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-600 dark:focus:border-green-600 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label htmlFor="test_bank_link" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Test Bank Link (optional)
                </label>
                <input
                  type="url"
                  name="test_bank_link"
                  id="test_bank_link"
                  value={formData.test_bank_link}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-600 dark:focus:border-green-600 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div>
                <label htmlFor="telegram_channel" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Telegram Channel (optional)
                </label>
                <input
                  type="url"
                  name="telegram_channel"
                  id="telegram_channel"
                  value={formData.telegram_channel}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-600 dark:focus:border-green-600 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={editingSubjectId ? handleCancelEdit : handleCancelAdd}
                className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    {editingSubjectId ? 'Update Subject' : 'Add Subject'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Subjects List */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Subjects List
          </h3>
        </div>
        
        {subjects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {subjects.map((subject) => (
                  <tr key={subject.id} className={editingSubjectId === subject.id ? 'bg-green-50 dark:bg-green-900/20' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {subject.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 max-w-md truncate">
                      {subject.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        subject.category === 'CS' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                        subject.category === 'IT' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        subject.category === 'IS' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {subject.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditClick(subject)}
                          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                          disabled={isLoading || !!editingSubjectId || isAddingSubject}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(subject.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                          disabled={isLoading || !!editingSubjectId || isAddingSubject}
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500 dark:text-gray-400">
            {isLoading ? 'Loading subjects...' : 'No subjects found. Add your first subject!'}
          </div>
        )}
      </div>
    </div>
  );
} 