import { useState } from "react";

interface PublicLessonProps {
  onNavigate: (page: string) => void;
}

export function PublicLesson({ onNavigate }: PublicLessonProps) {
  const [noteContent, setNoteContent] = useState("");

  const keyPoints = [
    "Dharma represents your sacred duty and righteous path in life",
    "Understanding dharma brings clarity and purpose to your actions",
    "Living in alignment with dharma creates inner harmony and peace",
    "Your personal dharma evolves as you grow in wisdom and awareness",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-12">
              <button onClick={() => onNavigate("home")} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary"></div>
                <span className="font-semibold text-xl text-foreground">VedicSkills</span>
              </button>

              <div className="hidden md:flex items-center gap-8">
                <a href="#explore" className="text-foreground/70 hover:text-foreground transition-colors">
                  Explore
                </a>
                <a href="#courses" className="text-foreground/70 hover:text-foreground transition-colors">
                  Courses
                </a>
                <a href="#library" className="text-foreground/70 hover:text-foreground transition-colors">
                  Library
                </a>
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
        {/* Video Player */}
        <div className="mb-12">
          <div className="aspect-video bg-foreground/5 rounded-[24px] overflow-hidden shadow-xl border border-border relative group">
            <img
              src="https://images.unsplash.com/photo-1641391400871-3a6578a11d5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBzcGlyaXR1YWwlMjBjYWxtfGVufDF8fHx8MTc3Njc4ODc0MHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Understanding Dharma lesson"
              className="w-full h-full object-cover"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 group-hover:bg-foreground/30 transition-colors cursor-pointer">
              <button className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
            {/* Duration Badge */}
            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-foreground/80 text-background rounded-lg text-sm backdrop-blur-sm">
              18:34
            </div>
          </div>
        </div>

        {/* Title and Description */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl lg:text-5xl mb-4">Understanding Dharma</h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Explore the meaning of duty and purpose in daily life.
          </p>
        </div>

        {/* Key Points Section */}
        <div className="mb-12">
          <div className="bg-card rounded-[24px] p-8 lg:p-10 border border-border shadow-sm">
            <h2 className="text-2xl mb-6">Key Points</h2>
            <ul className="space-y-4">
              {keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-foreground/80 leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Notes Section */}
        <div className="mb-12">
          <div className="bg-card rounded-[24px] p-8 lg:p-10 border border-border shadow-sm">
            <h2 className="text-2xl mb-6">Your Reflections</h2>
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Write your thoughts and realizations..."
              className="w-full h-48 p-6 bg-background border border-border rounded-[16px] focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none text-foreground placeholder:text-foreground/40 mb-4"
            />
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-[16px] hover:opacity-90 transition-opacity shadow-sm">
              Save Note
            </button>
            <p className="text-sm text-foreground/50 mt-3">
              Create an account to save your notes
            </p>
          </div>
        </div>

        {/* Next Lesson - Locked */}
        <div className="mb-16">
          <div className="bg-card rounded-[24px] p-8 lg:p-10 border border-border shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-foreground/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl text-foreground/60 mb-1">Next Lesson</h3>
                  <p className="text-foreground/40">The Nature of Duty</p>
                </div>
              </div>
              <button
                disabled
                className="px-8 py-3 rounded-[16px] bg-foreground/10 text-foreground/40 cursor-not-allowed"
              >
                Locked
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-[32px] p-12 lg:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary-foreground/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl text-primary-foreground mb-4">
                You've started something meaningful.
              </h2>
              <p className="text-lg lg:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Continue your journey.
              </p>
              <button onClick={() => onNavigate("signup")} className="bg-accent text-accent-foreground px-10 py-4 rounded-[20px] hover:opacity-90 transition-opacity shadow-lg text-lg">
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 mt-20">
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
    </div>
  );
}
