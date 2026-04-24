interface NavbarProps {
  onNavigate: (page: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-12">
            <button onClick={() => onNavigate("home")} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary"></div>
              <span className="font-semibold text-xl text-foreground">VedicSkills</span>
            </button>

            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => onNavigate("explore")} className="text-foreground/70 hover:text-foreground transition-colors">
                Explore
              </button>
              <button onClick={() => onNavigate("courses")} className="text-foreground/70 hover:text-foreground transition-colors">
                Courses
              </button>
              <button onClick={() => onNavigate("article")} className="text-foreground/70 hover:text-foreground transition-colors">
                Library
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate("login")} className="text-foreground/70 hover:text-foreground transition-colors px-4 py-2">
              Login
            </button>
            <button onClick={() => onNavigate("signup")} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-[20px] hover:opacity-90 transition-opacity shadow-sm">
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
