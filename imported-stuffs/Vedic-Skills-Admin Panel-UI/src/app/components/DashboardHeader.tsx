import { Search, Bell } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="bg-white border-b border-[rgba(0,0,0,0.08)] px-8 py-4 flex items-center justify-between">
      <h1>Admin Dashboard</h1>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-[300px] pl-10 pr-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <button className="relative p-2 rounded-lg hover:bg-[#F8F7F4] transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
        </button>

        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
          AD
        </div>
      </div>
    </header>
  );
}
