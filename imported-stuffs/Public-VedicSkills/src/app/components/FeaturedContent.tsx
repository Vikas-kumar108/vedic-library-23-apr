interface FeaturedContentProps {
  onNavigate: (page: string) => void;
}

export function FeaturedContent({ onNavigate }: FeaturedContentProps) {
  const courses = [
    {
      title: "Introduction to Vedic Philosophy",
      duration: "6 weeks",
      image: "https://images.unsplash.com/photo-1772368872233-4539a0b63f2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxhbmNpZW50JTIwYm9va3MlMjB2ZWRpYyUyMG1hbnVzY3JpcHRzJTIweW9nYXxlbnwxfHx8fDE3NzY3ODg3NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Bhagavad Gita: A Modern Interpretation",
      duration: "8 weeks",
      image: "https://images.unsplash.com/photo-1617375361041-b00f3bdd94bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxhbmNpZW50JTIwYm9va3MlMjB2ZWRpYyUyMG1hbnVzY3JpcHRzJTIweW9nYXxlbnwxfHx8fDE3NzY3ODg3NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Meditation & Mindfulness Practices",
      duration: "4 weeks",
      image: "https://images.unsplash.com/photo-1618425977996-bebc5afe88f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBzcGlyaXR1YWwlMjBjYWxtfGVufDF8fHx8MTc3Njc4ODc0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl mb-4">Featured Content</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Explore our carefully curated courses designed to guide your spiritual journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="group bg-card rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl mb-2">{course.title}</h3>
                <p className="text-foreground/60 mb-4">{course.duration}</p>
                <button onClick={() => onNavigate("course-detail")} className="w-full bg-primary text-primary-foreground py-3 rounded-[16px] hover:opacity-90 transition-opacity">
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
