import { Home, BookOpen, GraduationCap, Users, FileText, Settings, ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";

export function AdminSidebar({ currentPage, onNavigate }: { currentPage?: string; onNavigate?: (page: string) => void }) {
  const [contentOpen, setContentOpen] = useState(true);

  return (
    <div className="w-[260px] bg-white border-r border-[rgba(0,0,0,0.08)] h-screen flex flex-col">
      <div className="p-6 border-b border-[rgba(0,0,0,0.08)]">
        <h2 className="text-primary">Learning Platform</h2>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <NavItem
          icon={Home}
          label="Dashboard"
          active={currentPage === "dashboard"}
          onClick={() => onNavigate?.("dashboard")}
        />

        <div>
          <button
            onClick={() => setContentOpen(!contentOpen)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F8F7F4] transition-colors text-foreground"
          >
            <BookOpen className="w-5 h-5" />
            <span className="flex-1 text-left">Content</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${contentOpen ? 'rotate-180' : ''}`} />
          </button>
          {contentOpen && (
            <div className="ml-8 mt-1 space-y-1">
              <SubNavItem
                label="Lessons"
                active={currentPage === "lessons"}
                onClick={() => onNavigate?.("lessons")}
              />
              <SubNavItem
                label="Articles"
                active={currentPage === "articles"}
                onClick={() => onNavigate?.("articles")}
              />
              <SubNavItem
                label="Library"
                active={currentPage === "library"}
                onClick={() => onNavigate?.("library")}
              />
            </div>
          )}
        </div>

        <NavItem
          icon={GraduationCap}
          label="Courses"
          active={currentPage === "courses"}
          onClick={() => onNavigate?.("courses")}
        />
        <NavItem icon={Users} label="Users" />
        <NavItem icon={FileText} label="Notes" />
        <NavItem icon={Settings} label="Settings" />
      </nav>

      <div className="p-4 border-t border-[rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">Admin User</div>
            <div className="text-xs text-muted-foreground">admin@platform.com</div>
          </div>
        </div>
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F8F7F4] transition-colors text-foreground">
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, active = false, onClick }: { icon: any; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        active
          ? 'bg-primary text-primary-foreground'
          : 'hover:bg-[#F8F7F4] text-foreground'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}

function SubNavItem({ label, active = false, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors text-sm ${
        active
          ? 'bg-primary/10 text-primary'
          : 'hover:bg-[#F8F7F4] text-foreground'
      }`}
    >
      {label}
    </button>
  );
}
