import { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface ExploreProps {
  onNavigate: (page: string) => void;
}

export function Explore({ onNavigate }: ExploreProps) {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [activeTopicPill, setActiveTopicPill] = useState("All");

  const topicPills = ["All", "Dharma", "Karma", "Bhakti", "Life", "Leadership"];

  const featuredContent = {
    main: {
      title: "The Path of Dharma: Living with Purpose",
      type: "Course",
      duration: "10 weeks",
      image: "https://images.unsplash.com/photo-1772368872233-4539a0b63f2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxhbmNpZW50JTIwYm9va3MlMjB2ZWRpYyUyMG1hbnVzY3JpcHRzJTIweW9nYXxlbnwxfHx8fDE3NzY3ODg3NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      description: "Discover your dharma and learn to align your daily actions with your highest purpose.",
    },
    secondary: [
      {
        title: "Understanding Karma",
        type: "Lesson",
        duration: "45 min",
        image: "https://images.unsplash.com/photo-1617375361041-b00f3bdd94bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxhbmNpZW50JTIwYm9va3MlMjB2ZWRpYyUyMG1hbnVzY3JpcHRzJTIweW9nYXxlbnwxfHx8fDE3NzY3ODg3NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        title: "Bhakti: The Path of Devotion",
        type: "Article",
        duration: "12 min read",
        image: "https://images.unsplash.com/photo-1641391400871-3a6578a11d5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBzcGlyaXR1YWwlMjBjYWxtfGVufDF8fHx8MTc3Njc4ODc0MHww&ixlib=rb-4.1.0&q=80&w=1080",
      },
    ],
  };

  const contentItems = [
    {
      title: "Introduction to Vedic Philosophy",
      type: "Course",
      duration: "6 weeks",
      image: "https://images.unsplash.com/photo-1538024333176-f25f63f873ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBzcGlyaXR1YWwlMjBjYWxtfGVufDF8fHx8MTc3Njc4ODc0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "The Science of Self-Realization",
      type: "Lesson",
      duration: "1 hour",
      image: "https://images.unsplash.com/photo-1618425977996-bebc5afe88f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBzcGlyaXR1YWwlMjBjYWxtfGVufDF8fHx8MTc3Njc4ODc0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Living with Awareness",
      type: "Article",
      duration: "8 min read",
      image: "https://images.unsplash.com/photo-1641391400773-dcdd2f5ab7a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBzcGlyaXR1YWwlMjBjYWxtfGVufDF8fHx8MTc3Njc4ODc0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Leadership Through Service",
      type: "Course",
      duration: "4 weeks",
      image: "https://images.unsplash.com/photo-1646693346396-3a9bb5167fbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYm9va3MlMjB2ZWRpYyUyMG1hbnVzY3JpcHRzJTIweW9nYXxlbnwxfHx8fDE3NzY3ODg3NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Daily Meditation Practices",
      type: "Lesson",
      duration: "30 min",
      image: "https://images.unsplash.com/photo-1718976001444-38ffc80cf381?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBzcGlyaXR1YWwlMjBjYWxtfGVufDF8fHx8MTc3Njc4ODc0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "The Art of Mindful Living",
      type: "Article",
      duration: "15 min read",
      image: "https://images.unsplash.com/photo-1613937855439-20cecc75d91a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxhbmNpZW50JTIwYm9va3MlMjB2ZWRpYyUyMG1hbnVzY3JpcHRzJTIweW9nYXxlbnwxfHx8fDE3NzY3ODg3NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Wisdom of the Upanishads",
      type: "Course",
      duration: "8 weeks",
      image: "https://images.unsplash.com/photo-1588600209271-fd4e90553a71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxhbmNpZW50JTIwYm9va3MlMjB2ZWRpYyUyMG1hbnVzY3JpcHRzJTIweW9nYXxlbnwxfHx8fDE3NzY3ODg3NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Cultivating Inner Peace",
      type: "Lesson",
      duration: "40 min",
      image: "https://images.unsplash.com/photo-1641391400871-3a6578a11d5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBzcGlyaXR1YWwlMjBjYWxtfGVufDF8fHx8MTc3Njc4ODc0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Understanding Cosmic Order",
      type: "Article",
      duration: "10 min read",
      image: "https://images.unsplash.com/photo-1772368872233-4539a0b63f2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxhbmNpZW50JTIwYm9va3MlMjB2ZWRpYyUyMG1hbnVzY3JpcHRzJTIweW9nYXxlbnwxfHx8fDE3NzY3ODg3NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={onNavigate} />
      {/* Top Section with Search and Filters */}
      <section className="bg-card border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl mb-8 text-center">Explore</h1>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search teachings, topics, lessons..."
                className="w-full px-6 py-5 rounded-[20px] bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-lg"
              />
              <svg
                className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-foreground/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-6 py-3 rounded-[16px] bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            >
              <option value="">Topic</option>
              <option value="dharma">Dharma</option>
              <option value="karma">Karma</option>
              <option value="bhakti">Bhakti</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-6 py-3 rounded-[16px] bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            >
              <option value="">Type</option>
              <option value="course">Course</option>
              <option value="lesson">Lesson</option>
              <option value="article">Article</option>
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-6 py-3 rounded-[16px] bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            >
              <option value="">Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
            </select>
          </div>
        </div>
      </section>

      {/* Topics Pills */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {topicPills.map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveTopicPill(topic)}
                className={`px-6 py-2.5 rounded-full transition-all ${
                  activeTopicPill === topic
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl mb-8">Featured Content</h2>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Large Featured Card */}
            <div className="lg:col-span-2 bg-card rounded-[24px] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border group">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={featuredContent.main.image}
                  alt={featuredContent.main.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-3 text-sm text-foreground/60">
                  <span>{featuredContent.main.type}</span>
                  <span>•</span>
                  <span>{featuredContent.main.duration}</span>
                </div>
                <h3 className="text-3xl mb-3">{featuredContent.main.title}</h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  {featuredContent.main.description}
                </p>
                <button onClick={() => onNavigate("course-detail")} className="bg-primary text-primary-foreground px-8 py-3 rounded-[16px] hover:opacity-90 transition-opacity">
                  Start Learning
                </button>
              </div>
            </div>

            {/* Smaller Cards */}
            <div className="space-y-6">
              {featuredContent.secondary.map((item, index) => (
                <div
                  key={index}
                  className="bg-card rounded-[20px] overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-border group"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2 text-xs text-foreground/60">
                      <span>{item.type}</span>
                      <span>•</span>
                      <span>{item.duration}</span>
                    </div>
                    <h4 className="text-lg mb-3">{item.title}</h4>
                    <button onClick={() => onNavigate("public-lesson")} className="w-full bg-primary text-primary-foreground py-2.5 rounded-[12px] hover:opacity-90 transition-opacity text-sm">
                      Start Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl mb-8">All Content</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contentItems.map((item, index) => (
              <div
                key={index}
                className="bg-background rounded-[20px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-sm text-foreground/60">
                    <span>{item.type}</span>
                    <span>•</span>
                    <span>{item.duration}</span>
                  </div>
                  <h3 className="text-xl mb-4">{item.title}</h3>
                  <button onClick={() => onNavigate("public-lesson")} className="w-full bg-primary text-primary-foreground py-3 rounded-[16px] hover:opacity-90 transition-opacity">
                    Start Learning
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-secondary text-secondary-foreground px-10 py-4 rounded-[20px] hover:bg-secondary/80 transition-colors border border-border shadow-sm">
              Load More
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
