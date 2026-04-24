import { useState } from 'react';
import { LayoutDashboard, Library, BookOpen, User, Settings, LogOut, Menu, X, FileText } from 'lucide-react';
import type { Page } from '../App';

interface SidebarProps {
  activeItem?: string;
  onNavigate: (page: Page) => void;
}

export function Sidebar({ activeItem = 'Dashboard', onNavigate }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, page: 'dashboard' as Page },
    { name: 'Library', icon: Library, page: 'library' as Page },
    { name: 'Courses', icon: BookOpen, page: 'courses' as Page },
    { name: 'Notes', icon: FileText, page: 'notes' as Page },
    { name: 'Profile', icon: User, page: 'profile' as Page },
  ];

  const bottomItems = [
    { name: 'Settings', icon: Settings, page: 'settings' as Page },
  ];

  const handleNavigation = (page: Page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-xl shadow-lg border border-border"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-foreground" />
        ) : (
          <Menu className="w-6 h-6 text-foreground" />
        )}
      </button>

      <div
        className={`fixed left-0 top-0 h-screen w-60 bg-sidebar border-r border-sidebar-border flex flex-col z-40 transition-transform lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 pt-20 lg:pt-6">
          <h1 className="text-primary">VedicSkills</h1>
        </div>

        <nav className="flex-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.name === activeItem;
            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.page)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl mb-1 transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-3 pb-6">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.page)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl mb-1 text-sidebar-foreground hover:bg-sidebar-accent transition-all"
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            );
          })}
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl mb-1 text-sidebar-foreground hover:bg-sidebar-accent transition-all">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}
    </>
  );
}
