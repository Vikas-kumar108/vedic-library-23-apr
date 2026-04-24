import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { User, Mail, Lock, LogOut } from 'lucide-react';
import type { Page } from '../App';

interface SettingsProps {
  onNavigate: (page: Page) => void;
}

export function Settings({ onNavigate }: SettingsProps) {
  const [name, setName] = useState('Arjun');
  const [email, setEmail] = useState('arjun@vedic.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdateAccount = () => {
    console.log('Account updated');
  };

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      console.log('Password changed');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem="Settings" onNavigate={onNavigate} />

      <div className="lg:ml-60">
        <Header pageTitle="Settings" userName={name} onNavigate={onNavigate} />

        <main className="p-4 sm:p-6 lg:p-8 pb-16">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-card rounded-[20px] p-6 sm:p-8 shadow-sm border border-border">
              <h3 className="text-foreground mb-6">Account Information</h3>

              <div className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-input-background rounded-2xl border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-input-background rounded-2xl border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleUpdateAccount}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-[20px] p-6 sm:p-8 shadow-sm border border-border">
              <h3 className="text-foreground mb-6">Change Password</h3>

              <div className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Lock className="w-4 h-4" />
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full px-4 py-3 bg-input-background rounded-2xl border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Lock className="w-4 h-4" />
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 bg-input-background rounded-2xl border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Lock className="w-4 h-4" />
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 bg-input-background rounded-2xl border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleChangePassword}
                    disabled={!currentPassword || !newPassword || !confirmPassword}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-[20px] p-6 sm:p-8 shadow-sm border border-border">
              <h3 className="text-foreground mb-4">Account Actions</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Sign out of your account on this device.
              </p>
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
