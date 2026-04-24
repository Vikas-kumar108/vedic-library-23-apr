import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Library } from './components/Library';
import { Courses } from './components/Courses';
import { Notes } from './components/Notes';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { Lesson } from './components/Lesson';

export type Page = 'dashboard' | 'library' | 'courses' | 'notes' | 'profile' | 'settings' | 'lesson';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'library':
        return <Library onNavigate={setCurrentPage} />;
      case 'courses':
        return <Courses onNavigate={setCurrentPage} />;
      case 'notes':
        return <Notes onNavigate={setCurrentPage} />;
      case 'profile':
        return <Profile onNavigate={setCurrentPage} />;
      case 'settings':
        return <Settings onNavigate={setCurrentPage} />;
      case 'lesson':
        return <Lesson onNavigate={setCurrentPage} />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return <>{renderPage()}</>;
}
