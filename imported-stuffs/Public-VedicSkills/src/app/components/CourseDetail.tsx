import { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface CourseDetailProps {
  onNavigate: (page: string) => void;
}

export function CourseDetail({ onNavigate }: CourseDetailProps) {
  const [expandedModules, setExpandedModules] = useState<number[]>([0, 1]);

  const toggleModule = (index: number) => {
    setExpandedModules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const modules = [
    {
      title: "Module 1: Introduction to the Gita",
      lessons: [
        { title: "Lesson 1: Historical Context", duration: "15 min", completed: false },
        { title: "Lesson 2: The Setting of Kurukshetra", duration: "20 min", completed: false },
        { title: "Lesson 3: Meeting the Characters", duration: "18 min", completed: false },
      ],
    },
    {
      title: "Module 2: The Dialogue Begins",
      lessons: [
        { title: "Lesson 4: Arjuna's Dilemma", duration: "22 min", completed: false },
        { title: "Lesson 5: Krishna's Response", duration: "25 min", completed: false },
        { title: "Lesson 6: The Nature of Duty", duration: "30 min", completed: false },
      ],
    },
    {
      title: "Module 3: Paths to Liberation",
      lessons: [
        { title: "Lesson 7: Karma Yoga - The Path of Action", duration: "28 min", completed: false },
        { title: "Lesson 8: Jnana Yoga - The Path of Knowledge", duration: "32 min", completed: false },
        { title: "Lesson 9: Bhakti Yoga - The Path of Devotion", duration: "26 min", completed: false },
      ],
    },
    {
      title: "Module 4: Living the Teachings",
      lessons: [
        { title: "Lesson 10: Practical Application", duration: "24 min", completed: false },
        { title: "Lesson 11: Modern Interpretation", duration: "20 min", completed: false },
        { title: "Lesson 12: Course Reflection", duration: "15 min", completed: false },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={onNavigate} />
      {/* Header Section */}
      <section className="bg-card border-b border-border py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm mb-4">
              Course
            </div>
            <h1 className="text-5xl lg:text-6xl mb-6">Bhagavad Gita Foundations</h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Explore the timeless wisdom of the Bhagavad Gita through a comprehensive journey that
              bridges ancient teachings with modern life. This foundational course will guide you
              through the core concepts of dharma, karma, and the paths to self-realization,
              providing practical insights you can apply to your daily existence.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left: Modules List */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl mb-8">Course Content</h2>

              {modules.map((module, moduleIndex) => (
                <div
                  key={moduleIndex}
                  className="bg-card rounded-[20px] border border-border overflow-hidden shadow-sm"
                >
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModule(moduleIndex)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-background/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {moduleIndex + 1}
                      </div>
                      <h3 className="text-xl text-left">{module.title}</h3>
                    </div>
                    <svg
                      className={`w-5 h-5 text-foreground/60 transition-transform ${
                        expandedModules.includes(moduleIndex) ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Lessons List */}
                  {expandedModules.includes(moduleIndex) && (
                    <div className="border-t border-border">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lessonIndex}
                          className="px-6 py-4 flex items-center justify-between hover:bg-background/50 transition-colors border-b border-border last:border-b-0 group cursor-pointer"
                        >
                          <div className="flex items-center gap-4">
                            {/* Play Button */}
                            <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                              <svg
                                className="w-4 h-4 ml-0.5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </button>
                            <div>
                              <h4 className="text-base text-foreground group-hover:text-primary transition-colors">
                                {lesson.title}
                              </h4>
                            </div>
                          </div>
                          <span className="text-sm text-foreground/60">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right: Course Info Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-card rounded-[24px] border border-border shadow-lg overflow-hidden">
                  {/* Course Image */}
                  <div className="aspect-video overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1617375361041-b00f3bdd94bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxhbmNpZW50JTIwYm9va3MlMjB2ZWRpYyUyMG1hbnVzY3JpcHRzJTIweW9nYXxlbnwxfHx8fDE3NzY3ODg3NDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Bhagavad Gita Foundations"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Course Stats */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-foreground/60"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-foreground/70">8 weeks, self-paced</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-foreground/60"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span className="text-foreground/70">12 lessons</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-foreground/60"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        <span className="text-foreground/70">Beginner friendly</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <svg
                          className="w-5 h-5 text-foreground/60"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        <span className="text-foreground/70">2,847 students</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border"></div>

                    {/* What You'll Learn */}
                    <div>
                      <h4 className="text-lg mb-3">What you'll learn</h4>
                      <ul className="space-y-2.5">
                        <li className="flex items-start gap-2 text-sm text-foreground/70">
                          <svg
                            className="w-5 h-5 text-accent mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Core teachings of the Bhagavad Gita
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground/70">
                          <svg
                            className="w-5 h-5 text-accent mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Three paths to self-realization
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground/70">
                          <svg
                            className="w-5 h-5 text-accent mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Practical application in daily life
                        </li>
                        <li className="flex items-start gap-2 text-sm text-foreground/70">
                          <svg
                            className="w-5 h-5 text-accent mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Understanding dharma and karma
                        </li>
                      </ul>
                    </div>

                    {/* Start Button */}
                    <button onClick={() => onNavigate("lesson")} className="w-full bg-primary text-primary-foreground py-4 rounded-[16px] hover:opacity-90 transition-opacity shadow-md">
                      Start Course
                    </button>

                    <button className="w-full bg-secondary text-secondary-foreground py-3 rounded-[16px] hover:bg-secondary/80 transition-colors border border-border text-sm">
                      Save for Later
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
