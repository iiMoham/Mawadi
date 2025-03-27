# Mawadi

A modern platform for university subjects with a bilingual interface (English/Arabic) and an admin dashboard for content management.

## Features

- View and search university subjects
- Bilingual interface (English/Arabic)
- Admin dashboard for managing subjects
- Responsive design for all devices
- Appwrite database integration

## Tech Stack

- React with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Appwrite for backend services
- React Router for navigation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Appwrite account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your Appwrite credentials:
   ```
   VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=your-project-id
   VITE_APPWRITE_DATABASE_ID=your-database-id
   VITE_APPWRITE_SUBJECTS_COLLECTION_ID=your-subjects-collection-id
   ```

### Setting up Appwrite

1. Create an account on [Appwrite](https://appwrite.io/)
2. Create a new project
3. Create a new database
4. Create a collection named "subjects" with the following attributes:
   - `name` (string, required)
   - `description` (string, required)
   - `slide_link` (string, optional)
   - `test_bank_link` (string, optional)
   - `category` (string, required): The category of the subject (CS, IT, or IS)
   - `created_at` (datetime, required)
5. Set up appropriate permissions for the collection:
   - Allow read access for all users
   - Allow write access only for authenticated users (or use API keys)
6. Copy your project ID, database ID, and collection ID to the `.env` file

### Running the Application

```bash
npm run dev
```

The application will be available at http://localhost:5173


## Deployment

To build the application for production:

```bash
npm run build
```

The build files will be in the `dist` directory, which you can deploy to any static hosting service.

## Customization

- Edit the translations in `src/utils/translations.ts` to add or modify language strings
- Modify the theme colors in the Tailwind configuration file
- Add new features by extending the existing components 
