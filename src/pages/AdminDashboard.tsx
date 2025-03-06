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
            className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold text-green-800 mt-2">
            Admin Dashboard
          </h1>
        </div>
        
        {!isAddingSubject && !editingSubjectId && (
          <button
            onClick={handleAddClick}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      )}
      
      {/* Add/Edit Subject Form */}
      {(isAddingSubject || editingSubjectId) && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-green-800">
              {editingSubjectId ? 'Edit Subject' : 'Add New Subject'}
            </h2>
            <button 
              onClick={editingSubjectId ? handleCancelEdit : handleCancelAdd}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {formError && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
              {formError}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., CPCS-203"
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter subject description"
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label htmlFor="slide_link" className="block text-sm font-medium text-gray-700 mb-1">
                  Slides Link
                </label>
                <input
                  type="url"
                  id="slide_link"
                  name="slide_link"
                  value={formData.slide_link}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="https://example.com/slides"
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label htmlFor="test_bank_link" className="block text-sm font-medium text-gray-700 mb-1">
                  Test Bank Link
                </label>
                <input
                  type="url"
                  id="test_bank_link"
                  name="test_bank_link"
                  value={formData.test_bank_link}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="https://example.com/test-bank"
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label htmlFor="telegram_channel" className="block text-sm font-medium text-gray-700 mb-1">
                  Telegram Channel (Optional)
                </label>
                <input
                  type="url"
                  id="telegram_channel"
                  name="telegram_channel"
                  value={formData.telegram_channel}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="https://t.me/channel_name"
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  disabled={isLoading}
                >
                  <option value="CS">CS</option>
                  <option value="IT">IT</option>
                  <option value="IS">IS</option>
                  <option value="ALL">ALL</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={editingSubjectId ? handleCancelEdit : handleCancelAdd}
                className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors"
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
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            Subjects List
          </h3>
        </div>
        
        {subjects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subjects.map((subject) => (
                  <tr key={subject.id} className={editingSubjectId === subject.id ? 'bg-green-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {subject.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-md truncate">
                      {subject.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        subject.category === 'CS' ? 'bg-purple-100 text-purple-800' :
                        subject.category === 'IT' ? 'bg-blue-100 text-blue-800' :
                        subject.category === 'IS' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {subject.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEditClick(subject)}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors"
                          disabled={isLoading || !!editingSubjectId || isAddingSubject}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(subject.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
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
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No subjects found. Add your first subject!
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 