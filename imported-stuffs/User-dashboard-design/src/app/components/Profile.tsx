import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { BookCheck, FileText, Flame, Mail, User as UserIcon, LogOut } from 'lucide-react';
import type { Page } from '../App';

interface ProfileProps {
  onNavigate: (page: Page) => void;
}

export function Profile({ onNavigate }: ProfileProps) {
  const [name, setName] = useState('Arjun');
  const [email] = useState('arjun@vedic.com');
  const [isEditingName, setIsEditingName] = useState(false);

  const stats = [
    {
      label: 'Lessons Completed',
      value: 24,
      icon: BookCheck,
      color: 'text-primary',
    },
    {
      label: 'Notes Written',
      value: 47,
      icon: FileText,
      color: 'text-accent',
    },
    {
      label: 'Learning Streak',
      value: 12,
      icon: Flame,
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem="Profile" onNavigate={onNavigate} />

      <div className="lg:ml-60">
        <Header pageTitle="Profile" userName={name} onNavigate={onNavigate} />

        <main className="p-4 sm:p-6 lg:p-8 pb-16">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-[20px] p-6 sm:p-8 shadow-sm border border-border mb-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl">
                  {name.charAt(0).toUpperCase()}
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-foreground mb-1">{name}</h2>
                  <p className="text-muted-foreground">{email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="text-center p-6 rounded-2xl bg-muted/30"
                    >
                      <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                      <p className="text-3xl text-foreground mb-1">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-card rounded-[20px] p-6 sm:p-8 shadow-sm border border-border mb-6">
              <h3 className="text-foreground mb-6">Account Settings</h3>

              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <UserIcon className="w-4 h-4" />
                    Name
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={!isEditingName}
                      className="flex-1 px-4 py-3 bg-input-background rounded-2xl border border-border focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-70"
                    />
                    <button
                      onClick={() => setIsEditingName(!isEditingName)}
                      className="px-6 py-3 border border-border text-foreground rounded-full hover:border-primary transition-all"
                    >
                      {isEditingName ? 'Save' : 'Edit'}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full px-4 py-3 bg-input-background rounded-2xl border border-border opacity-70"
                  />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-[20px] p-6 sm:p-8 shadow-sm border border-border">
              <button className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-destructive text-destructive rounded-full hover:bg-destructive/10 transition-all">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
