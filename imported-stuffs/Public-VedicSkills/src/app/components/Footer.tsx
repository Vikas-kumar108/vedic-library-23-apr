export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary"></div>
              <span className="font-semibold text-xl text-foreground">VedicSkills</span>
            </div>
            <p className="text-foreground/60 text-sm">
              Bringing ancient wisdom to modern life
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-foreground">Learn</h4>
            <ul className="space-y-2 text-foreground/60 text-sm">
              <li><a href="#" className="hover:text-foreground transition-colors">Courses</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Library</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Resources</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-foreground">Company</h4>
            <ul className="space-y-2 text-foreground/60 text-sm">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Teachers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-foreground">Support</h4>
            <ul className="space-y-2 text-foreground/60 text-sm">
              <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-foreground/60 text-sm">
          <p>&copy; 2026 VedicSkills. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
