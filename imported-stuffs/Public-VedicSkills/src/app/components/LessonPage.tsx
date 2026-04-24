import { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LessonPageProps {
  onNavigate: (page: string) => void;
}

export function LessonPage({ onNavigate }: LessonPageProps) {
  const [activeTab, setActiveTab] = useState<"learn" | "notes" | "discuss">("learn");
  const [noteContent, setNoteContent] = useState("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);

  const handleSaveNote = () => {
    if (noteContent.trim()) {
      setSavedNotes([...savedNotes, noteContent]);
      setNoteContent("");
    }
  };

  const relatedLessons = [
    { title: "The Nature of Duty", duration: "22 min" },
    { title: "Paths to Liberation", duration: "28 min" },
    { title: "Living with Purpose", duration: "25 min" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={onNavigate} />
      <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Video Player */}
            <div className="mb-8">
              <div className="aspect-video bg-foreground/5 rounded-[24px] overflow-hidden shadow-xl border border-border relative group">
                <img
                  src="https://images.unsplash.com/photo-1641391400871-3a6578a11d5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBzcGlyaXR1YWwlMjBjYWxtfGVufDF8fHx8MTc3Njc4ODc0MHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Lesson video"
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
            <div className="mb-8">
              <h1 className="text-4xl lg:text-5xl mb-4">Understanding Dharma</h1>
              <p className="text-lg text-foreground/70 leading-relaxed max-w-4xl">
                Explore the profound concept of dharma - your sacred duty and righteous path in
                life. This lesson reveals how understanding your dharma can bring clarity, purpose,
                and harmony to every aspect of your existence.
              </p>
            </div>

            {/* Tabs */}
            <div className="mb-8">
              <div className="border-b border-border">
                <div className="flex gap-8">
                  <button
                    onClick={() => setActiveTab("learn")}
                    className={`pb-4 px-1 border-b-2 transition-colors ${
                      activeTab === "learn"
                        ? "border-primary text-primary"
                        : "border-transparent text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    Learn
                  </button>
                  <button
                    onClick={() => setActiveTab("notes")}
                    className={`pb-4 px-1 border-b-2 transition-colors ${
                      activeTab === "notes"
                        ? "border-primary text-primary"
                        : "border-transparent text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    Notes
                  </button>
                  <button
                    onClick={() => setActiveTab("discuss")}
                    className={`pb-4 px-1 border-b-2 transition-colors ${
                      activeTab === "discuss"
                        ? "border-primary text-primary"
                        : "border-transparent text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    Discuss
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="mb-12">
              {/* Learn Tab */}
              {activeTab === "learn" && (
                <div className="bg-card rounded-[20px] p-8 lg:p-10 border border-border shadow-sm">
                  <h2 className="text-2xl mb-6">Key Concepts</h2>
                  <div className="space-y-6 text-foreground/80 leading-relaxed">
                    <div>
                      <h3 className="text-xl mb-3 text-foreground">What is Dharma?</h3>
                      <p>
                        Dharma represents the cosmic order, moral law, and individual duty that
                        sustains the universe. It is both universal truth and personal
                        responsibility, guiding us toward righteous living.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl mb-3 text-foreground">
                        The Four Pillars of Dharma
                      </h3>
                      <ul className="space-y-2 ml-6">
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span>
                            <strong className="text-foreground">Truth (Satya):</strong> Speaking
                            and living truthfully
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span>
                            <strong className="text-foreground">Compassion (Daya):</strong>{" "}
                            Kindness toward all beings
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span>
                            <strong className="text-foreground">Austerity (Tapas):</strong>{" "}
                            Self-discipline and restraint
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span>
                            <strong className="text-foreground">Charity (Dana):</strong> Generous
                            giving without expectation
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl mb-3 text-foreground">Living Your Dharma</h3>
                      <p>
                        Discovering and living your personal dharma requires self-reflection,
                        understanding your unique gifts, and aligning your actions with your
                        deepest values. It is a journey of continuous growth and self-discovery.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes Tab */}
              {activeTab === "notes" && (
                <div className="space-y-6">
                  <div className="bg-card rounded-[20px] p-8 lg:p-10 border border-border shadow-sm">
                    <h2 className="text-2xl mb-6">Your Reflections</h2>
                    <textarea
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      placeholder="Write your thoughts and realizations..."
                      className="w-full h-64 p-6 bg-background border border-border rounded-[16px] focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none text-foreground placeholder:text-foreground/40"
                    />
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={handleSaveNote}
                        className="bg-primary text-primary-foreground px-8 py-3 rounded-[16px] hover:opacity-90 transition-opacity shadow-sm"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>

                  {/* Saved Notes */}
                  {savedNotes.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-xl">Previous Notes</h3>
                      {savedNotes.map((note, index) => (
                        <div
                          key={index}
                          className="bg-card rounded-[16px] p-6 border border-border shadow-sm"
                        >
                          <p className="text-foreground/80 whitespace-pre-wrap">{note}</p>
                          <p className="text-sm text-foreground/50 mt-4">
                            {new Date().toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Discuss Tab */}
              {activeTab === "discuss" && (
                <div className="bg-card rounded-[20px] p-8 lg:p-10 border border-border shadow-sm text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl mb-3">Discussion Coming Soon</h2>
                    <p className="text-foreground/70">
                      Join fellow learners in meaningful conversations about this lesson. The
                      discussion feature will be available soon.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between py-8 border-t border-border">
              <button className="flex items-center gap-2 px-6 py-3 rounded-[16px] bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors border border-border">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous Lesson
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-[16px] bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-sm">
                Next Lesson
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Sidebar - Related Lessons */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-card rounded-[20px] p-6 border border-border shadow-sm">
                <h3 className="text-lg mb-4">Related Lessons</h3>
                <div className="space-y-3">
                  {relatedLessons.map((lesson, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-4 rounded-[12px] bg-background hover:bg-primary/5 transition-colors border border-border group"
                    >
                      <h4 className="text-foreground group-hover:text-primary transition-colors mb-2">
                        {lesson.title}
                      </h4>
                      <p className="text-sm text-foreground/60">{lesson.duration}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress */}
              <div className="bg-card rounded-[20px] p-6 border border-border shadow-sm mt-6">
                <h3 className="text-lg mb-4">Your Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-foreground/70">Course Progress</span>
                      <span className="text-primary">25%</span>
                    </div>
                    <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/60">3 of 12 lessons completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
