import { useState } from "react";

interface ArticlePageProps {
  onNavigate: (page: string) => void;
}

export function ArticlePage({ onNavigate }: ArticlePageProps) {
  const [noteContent, setNoteContent] = useState("");

  const relatedArticles = [
    {
      title: "Understanding Karma: Action and Consequence",
      duration: "8 min read",
      image: "https://images.unsplash.com/photo-1617375361041-b00f3bdd94bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxhbmNpZW50JTIwYm9va3MlMjB2ZWRpYyUyMG1hbnVzY3JpcHRzJTIweW9nYXxlbnwxfHx8fDE3NzY3ODg3NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "The Three Paths to Self-Realization",
      duration: "12 min read",
      image: "https://images.unsplash.com/photo-1772368872233-4539a0b63f2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxhbmNpZW50JTIwYm9va3MlMjB2ZWRpYyUyMG1hbnVzY3JpcHRzJTIweW9nYXxlbnwxfHx8fDE3NzY3ODg3NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Living with Purpose and Meaning",
      duration: "10 min read",
      image: "https://images.unsplash.com/photo-1641391400871-3a6578a11d5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBzcGlyaXR1YWwlMjBjYWxtfGVufDF8fHx8MTc3Njc4ODc0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
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
                <button onClick={() => onNavigate("explore")} className="text-foreground/70 hover:text-foreground transition-colors">
                  Explore
                </button>
                <button onClick={() => onNavigate("course-detail")} className="text-foreground/70 hover:text-foreground transition-colors">
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
            </div>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <header className="max-w-3xl mx-auto px-6 py-16 lg:py-20 text-center">
        <div className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm mb-6">
          Article
        </div>
        <h1 className="text-4xl lg:text-5xl xl:text-6xl mb-6 leading-tight">
          What is Dharma in Daily Life?
        </h1>
        <p className="text-xl text-foreground/70 leading-relaxed">
          Discover how this ancient principle can bring clarity, purpose, and harmony to your everyday actions and decisions.
        </p>
        <div className="flex items-center justify-center gap-6 mt-8 text-sm text-foreground/60">
          <span>10 min read</span>
          <span>•</span>
          <span>April 21, 2026</span>
        </div>
      </header>

      {/* Main Content */}
      <article className="max-w-3xl mx-auto px-6 pb-16">
        <div className="prose prose-lg">
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              In a world filled with endless choices and competing priorities, the ancient concept of dharma offers a compass for navigating life's complexity. But what does dharma truly mean, and how can we apply it to our modern lives?
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Dharma is often translated as "duty," "righteousness," or "cosmic law," but these translations only scratch the surface of its profound meaning. At its essence, dharma represents the natural order of the universe and your unique role within it.
            </p>
          </div>

          {/* Section 1 */}
          <div className="mb-12">
            <h2 className="text-3xl mb-6">The Personal and Universal Nature of Dharma</h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Dharma operates on two levels simultaneously. On the universal level, it represents the fundamental laws that govern existence—truth, compassion, non-violence, and harmony. These principles apply to all beings, regardless of background or circumstance.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              On the personal level, dharma is your unique path—the specific way you're meant to contribute to the world based on your talents, circumstances, and stage of life. Your dharma is not someone else's dharma. It's deeply personal and evolves as you grow.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h2 className="text-3xl mb-6">Recognizing Your Dharma</h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              How do you discover your dharma? It begins with honest self-reflection. Ask yourself: What are my natural gifts? What brings me genuine joy and fulfillment? Where do my talents meet the world's needs?
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Your dharma often lies at the intersection of what you love, what you're good at, and what serves others. When you're living in alignment with your dharma, you feel a sense of flow—as if you're swimming with the current rather than against it.
            </p>
          </div>

          {/* Mid-page CTA */}
          <div className="my-16">
            <div className="bg-card rounded-[24px] p-10 lg:p-12 text-center border border-border shadow-sm">
              <h3 className="text-2xl lg:text-3xl mb-4">Want to go deeper into this topic?</h3>
              <p className="text-lg text-foreground/70 mb-6 max-w-xl mx-auto">
                Join our comprehensive course on dharma and discover your unique path to purpose and fulfillment.
              </p>
              <button onClick={() => onNavigate("course-detail")} className="bg-primary text-primary-foreground px-10 py-4 rounded-[20px] hover:opacity-90 transition-opacity shadow-md">
                Start Learning
              </button>
            </div>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h2 className="text-3xl mb-6">Dharma in Everyday Decisions</h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Living your dharma doesn't require dramatic life changes. It begins with small, conscious choices aligned with your values and purpose. Before making a decision, pause and ask: Does this align with my deeper truth? Does it serve not just myself, but others?
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Whether you're choosing how to spend your time, what work to pursue, or how to respond to a challenging situation, letting dharma guide you creates a life of integrity and meaning.
            </p>
          </div>

          {/* Section 4 */}
          <div className="mb-12">
            <h2 className="text-3xl mb-6">When Dharma Conflicts Arise</h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Sometimes different aspects of dharma seem to conflict. Your duty to family might clash with your professional calling. Your need for self-care might compete with obligations to others. These moments aren't failures—they're opportunities for deeper wisdom.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              The Bhagavad Gita teaches that when faced with such dilemmas, we must look to the deeper principle: act with pure intention, remain unattached to outcomes, and choose what upholds the greater good while honoring your authentic self.
            </p>
          </div>

          {/* Conclusion */}
          <div className="mb-12">
            <h2 className="text-3xl mb-6">The Journey Continues</h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              Understanding and living your dharma is a lifelong journey, not a destination. As you grow in wisdom and self-awareness, your understanding of your path will deepen and evolve. What matters is remaining committed to the journey itself—to living with intention, integrity, and purpose.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              The beauty of dharma is that it's always available to guide you. In every moment, in every choice, you have the opportunity to align with your highest purpose and contribute to the harmony of the whole.
            </p>
          </div>
        </div>
      </article>

      {/* Notes Section */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-border">
        <div className="bg-card rounded-[24px] p-8 lg:p-10 border border-border shadow-sm">
          <h2 className="text-2xl mb-6">Your Reflection</h2>
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Write your reflection..."
            className="w-full h-40 p-6 bg-background border border-border rounded-[16px] focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none text-foreground placeholder:text-foreground/40 mb-4"
          />
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-[16px] hover:opacity-90 transition-opacity shadow-sm">
            Save Note
          </button>
          <p className="text-sm text-foreground/50 mt-3">
            Login to save your insights
          </p>
        </div>
      </section>

      {/* Related Content */}
      <section className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <h2 className="text-3xl mb-10 text-center">Related Content</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {relatedArticles.map((article, index) => (
            <div
              key={index}
              onClick={() => onNavigate("article")}
              className="bg-card rounded-[20px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border group cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-foreground/60 text-sm">{article.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-[32px] p-12 lg:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary-foreground/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl text-primary-foreground mb-4">
              Continue your journey
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Transform insights into understanding. Join our community of learners exploring timeless wisdom.
            </p>
            <button onClick={() => onNavigate("signup")} className="bg-accent text-accent-foreground px-10 py-4 rounded-[20px] hover:opacity-90 transition-opacity shadow-lg text-lg">
              Create Account
            </button>
          </div>
        </div>
      </section>

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
