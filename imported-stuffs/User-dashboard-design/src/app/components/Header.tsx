import { Search, Bell } from 'lucide-react';
import { useState } from 'react';
import type { Page } from '../App';

interface HeaderProps {
  pageTitle: string;
  userName?: string;
  onNavigate: (page: Page) => void;
}

export function Header({ pageTitle, userName = 'Guest', onNavigate }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleNavigation = (page: Page) => {
    onNavigate(page);
    setShowDropdown(false);
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <h2 className="text-foreground ml-12 lg:ml-0">{pageTitle}</h2>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search lessons, topics..."
            className="w-48 lg:w-80 pl-12 pr-4 py-2.5 bg-input-background rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <button className="p-2.5 hover:bg-sidebar-accent rounded-full transition-all">
          <Bell className="w-5 h-5 text-foreground" />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-all"
          >
            {userName.charAt(0).toUpperCase()}
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-12 w-48 bg-card border border-border rounded-2xl shadow-lg p-2 z-50">
              <button
                onClick={() => handleNavigation('profile')}
                className="w-full text-left px-4 py-2 rounded-xl hover:bg-sidebar-accent transition-all"
              >
                Profile
              </button>
              <button
                onClick={() => handleNavigation('settings')}
                className="w-full text-left px-4 py-2 rounded-xl hover:bg-sidebar-accent transition-all"
              >
                Settings
              </button>
              <div className="h-px bg-border my-2" />
              <button className="w-full text-left px-4 py-2 rounded-xl hover:bg-sidebar-accent transition-all">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
