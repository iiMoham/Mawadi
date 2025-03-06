import { Client, Databases, ID, Query, Account, Teams } from 'appwrite';
import type { Subject } from '../types';

// Log environment variables (without sensitive values)
console.log('📋 Appwrite Configuration:');
console.log('VITE_APPWRITE_ENDPOINT:', import.meta.env.VITE_APPWRITE_ENDPOINT);
console.log('VITE_APPWRITE_PROJECT_ID:', import.meta.env.VITE_APPWRITE_PROJECT_ID ? '✓ Set' : '❌ Not set');
console.log('VITE_APPWRITE_DATABASE_ID:', import.meta.env.VITE_APPWRITE_DATABASE_ID ? '✓ Set' : '❌ Not set');
console.log('VITE_APPWRITE_SUBJECTS_COLLECTION_ID:', import.meta.env.VITE_APPWRITE_SUBJECTS_COLLECTION_ID ? '✓ Set' : '❌ Not set');

/**
 * ⚠️ APPWRITE PERMISSIONS CONFIGURATION GUIDE ⚠️
 * 
 * If subjects aren't being saved to the database, you need to fix Appwrite permissions:
 * 
 * 1. Go to your Appwrite Console (https://cloud.appwrite.io)
 * 2. Navigate to your project
 * 3. Go to Databases > [Your Database] > [Subjects Collection]
 * 4. Click on "Settings" tab
 * 5. Under "Permissions", add these permissions:
 *    - create: ["role:all"]
 *    - read: ["role:all"]
 *    - update: ["role:all"]
 *    - delete: ["role:all"]
 * 6. Click "Update"
 * 
 * This allows any user (including guests) to read/write data.
 * For a production app, you would want more restrictive permissions.
 */

// Initialize the Appwrite client
const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// Initialize Appwrite services
export const databases = new Databases(client);
export const account = new Account(client);

// Database and collection IDs
export const DATABASES = {
  MAIN: import.meta.env.VITE_APPWRITE_DATABASE_ID,
};

export const COLLECTIONS = {
  SUBJECTS: import.meta.env.VITE_APPWRITE_SUBJECTS_COLLECTION_ID,
};

// Check if we have all required configuration
const validateConfiguration = () => {
  const missingVars = [];
  
  if (!import.meta.env.VITE_APPWRITE_ENDPOINT) missingVars.push('VITE_APPWRITE_ENDPOINT');
  if (!import.meta.env.VITE_APPWRITE_PROJECT_ID) missingVars.push('VITE_APPWRITE_PROJECT_ID');
  if (!import.meta.env.VITE_APPWRITE_DATABASE_ID) missingVars.push('VITE_APPWRITE_DATABASE_ID');
  if (!import.meta.env.VITE_APPWRITE_SUBJECTS_COLLECTION_ID) missingVars.push('VITE_APPWRITE_SUBJECTS_COLLECTION_ID');
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingVars.join(', '));
    return false;
  }
  
  return true;
};

// Call validation
const isConfigValid = validateConfiguration();
if (!isConfigValid) {
  console.error('⚠️ Appwrite configuration is incomplete. Some features may not work correctly.');
}

// Subject database functions
export const subjectService = {
  // Get all subjects
  async getAllSubjects(): Promise<Subject[]> {
    try {
      console.log('Fetching all subjects from Appwrite...');
      console.log('Database ID:', DATABASES.MAIN);
      console.log('Collection ID:', COLLECTIONS.SUBJECTS);
      
      const response = await databases.listDocuments(
        DATABASES.MAIN,
        COLLECTIONS.SUBJECTS
      );
      
      console.log('Appwrite response:', response);
      console.log('Number of documents:', response.documents.length);
      
      const subjects = response.documents.map(doc => ({
        id: doc.$id,
        name: doc.name,
        description: doc.description,
        slide_link: doc.slide_link,
        test_bank_link: doc.test_bank_link,
        telegram_channel: doc.telegram_channel,
        created_at: doc.created_at,
        category: doc.category
      }));
      
      console.log('Mapped subjects:', subjects);
      return subjects;
    } catch (error) {
      console.error('Detailed error fetching all subjects:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      
      // Return fallback data for development
      const fallbackData = [
        {
          id: '1',
          name: 'CPCS-203',
          description: 'Introduction to differential and integral calculus. Topics include limits, derivatives, applications of differentiation, integrals, and the fundamental theorem of calculus. Essential for STEM majors.',
          slide_link: 'https://example.com/calculus-slides',
          test_bank_link: 'https://example.com/calculus-tests',
          telegram_channel: 'https://t.me/calculus_channel',
          created_at: new Date().toISOString(),
          category: 'CS' as const
        },
        {
          id: '2',
          name: 'Introduction to Psychology',
          description: 'Explore the fundamentals of human behavior and mental processes. Learn about perception, cognition, emotion, personality, and psychological disorders. Perfect for understanding human nature.',
          slide_link: 'https://example.com/psychology-slides',
          test_bank_link: 'https://example.com/psychology-tests',
          telegram_channel: 'https://t.me/psychology_channel',
          created_at: new Date().toISOString(),
          category: 'IS' as const
        }
      ];
      
      console.log('Using fallback data:', fallbackData);
      return fallbackData;
    }
  },

  // Get a subject by ID
  async getSubject(id: string): Promise<Subject | null> {
    try {
      const doc = await databases.getDocument(
        DATABASES.MAIN,
        COLLECTIONS.SUBJECTS,
        id
      );
      
      return {
        id: doc.$id,
        name: doc.name,
        description: doc.description,
        slide_link: doc.slide_link,
        test_bank_link: doc.test_bank_link,
        telegram_channel: doc.telegram_channel,
        created_at: doc.created_at,
        category: doc.category
      };
    } catch (error) {
      console.error(`Error fetching subject with ID ${id}:`, error);
      return null;
    }
  },

  // Create a new subject
  async createSubject(subject: Omit<Subject, 'id' | 'created_at'>): Promise<Subject | null> {
    try {
      console.log('Attempting to create subject with following data:', JSON.stringify(subject, null, 2));
      console.log('Using database:', DATABASES.MAIN);
      console.log('Using collection:', COLLECTIONS.SUBJECTS);
      
      // Create a unique ID for the subject
      const uniqueId = ID.unique();
      console.log('Generated ID:', uniqueId);
      
      // Prepare data object with all required fields
      // Make sure category is one of CS, IT, or IS (not ALL)
      const validCategory = subject.category === 'ALL' ? 'CS' : subject.category;
      
      const data = {
        name: subject.name,
        description: subject.description,
        slide_link: subject.slide_link || '',
        test_bank_link: subject.test_bank_link || '',
        telegram_channel: subject.telegram_channel || '',
        category: validCategory,
        created_at: new Date().toISOString(),
      };
      
      console.log('Document data to be sent:', JSON.stringify(data, null, 2));
      
      try {
        // Attempt to create the document
        const response = await databases.createDocument(
          DATABASES.MAIN,
          COLLECTIONS.SUBJECTS,
          uniqueId,
          data
        );
        
        console.log('✅ Subject created successfully!');
        console.log('Response from Appwrite:', JSON.stringify(response, null, 2));
        
        return {
          id: response.$id,
          name: response.name,
          description: response.description,
          slide_link: response.slide_link,
          test_bank_link: response.test_bank_link,
          telegram_channel: response.telegram_channel,
          category: response.category,
          created_at: response.created_at,
        };
      } catch (createError: any) {
        console.error('❌ Error during createDocument call:', createError);
        console.error('Error type:', typeof createError);
        console.error('Error code:', createError.code);
        console.error('Error message:', createError.message);
        
        if (createError.code === 401) {
          console.error('Authentication error: User is not authorized');
          alert(`
            ⚠️ APPWRITE PERMISSIONS ISSUE ⚠️
            
            Subjects can't be saved to the database because Appwrite permissions are not set correctly.
            
            Please follow these steps to fix it:
            1. Go to your Appwrite Console (https://cloud.appwrite.io)
            2. Navigate to your project
            3. Go to Databases > [Your Database] > [Subjects Collection]
            4. Click on "Settings" tab
            5. Under "Permissions", add these permissions:
               - create: ["role:all"]
               - read: ["role:all"]
               - update: ["role:all"]
               - delete: ["role:all"]
            6. Click "Update"
            7. Refresh this page
          `);
        } else if (createError.code === 403) {
          console.error('Permission error: User does not have write permissions for this collection');
          alert('Permission error: The application does not have write permissions for this collection. Please check Appwrite console and update collection permissions.');
        } else if (createError.code === 404) {
          console.error('Not found error: Database or collection does not exist');
          console.error('Check your environment variables:');
          console.error('VITE_APPWRITE_DATABASE_ID:', DATABASES.MAIN);
          console.error('VITE_APPWRITE_SUBJECTS_COLLECTION_ID:', COLLECTIONS.SUBJECTS);
          alert('Database or collection not found. Please check your Appwrite configuration.');
        }
        
        // For testing/debugging: Try to create a fallback subject in memory
        const fallbackSubject = {
          id: uniqueId,
          name: subject.name,
          description: subject.description,
          slide_link: subject.slide_link || '',
          test_bank_link: subject.test_bank_link || '',
          telegram_channel: subject.telegram_channel || '',
          category: validCategory,
          created_at: new Date().toISOString(),
        };
        
        console.log('🔄 Created fallback subject in memory:', fallbackSubject);
        
        // Return the fallback subject to allow the UI to show something
        return fallbackSubject;
      }
    } catch (outerError) {
      console.error('❌ Outer error in createSubject:', outerError);
      return null;
    }
  },

  // Update an existing subject
  async updateSubject(id: string, subject: Partial<Omit<Subject, 'id' | 'created_at'>>): Promise<Subject | null> {
    try {
      const doc = await databases.updateDocument(
        DATABASES.MAIN,
        COLLECTIONS.SUBJECTS,
        id,
        {
          ...subject
        }
      );
      
      return {
        id: doc.$id,
        name: doc.name,
        description: doc.description,
        slide_link: doc.slide_link,
        test_bank_link: doc.test_bank_link,
        telegram_channel: doc.telegram_channel,
        created_at: doc.created_at,
        category: doc.category
      };
    } catch (error) {
      console.error(`Error updating subject with ID ${id}:`, error);
      return null;
    }
  },

  // Delete a subject
  async deleteSubject(id: string): Promise<boolean> {
    try {
      await databases.deleteDocument(
        DATABASES.MAIN,
        COLLECTIONS.SUBJECTS,
        id
      );
      return true;
    } catch (error) {
      console.error(`Error deleting subject with ID ${id}:`, error);
      return false;
    }
  },

  // Search subjects
  async searchSubjects(query: string): Promise<Subject[]> {
    try {
      const response = await databases.listDocuments(
        DATABASES.MAIN,
        COLLECTIONS.SUBJECTS,
        [
          Query.or([
            Query.search('name', query),
            Query.search('description', query)
          ])
        ]
      );
      
      return response.documents.map(doc => ({
        id: doc.$id,
        name: doc.name,
        description: doc.description,
        slide_link: doc.slide_link,
        test_bank_link: doc.test_bank_link,
        telegram_channel: doc.telegram_channel,
        created_at: doc.created_at,
        category: doc.category
      }));
    } catch (error) {
      console.error(`Error searching subjects with query "${query}":`, error);
      return [];
    }
  }
}; 