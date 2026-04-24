interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl leading-tight">
              Learn, Reflect, and Apply Timeless Vedic Wisdom
            </h1>
            <p className="text-lg lg:text-xl text-foreground/70 leading-relaxed max-w-xl">
              Structured courses and guided learning designed for real life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => onNavigate("signup")} className="bg-primary text-primary-foreground px-8 py-4 rounded-[20px] hover:opacity-90 transition-opacity shadow-md">
                Start Learning
              </button>
              <button onClick={() => onNavigate("explore")} className="bg-secondary text-secondary-foreground px-8 py-4 rounded-[20px] hover:bg-secondary/80 transition-colors border border-border shadow-sm">
                Explore Content
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-[32px] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1641391400871-3a6578a11d5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBzcGlyaXR1YWwlMjBjYWxtfGVufDF8fHx8MTc3Njc4ODc0MHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Peaceful spiritual meditation"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
