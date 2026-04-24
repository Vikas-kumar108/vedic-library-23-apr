export function ValueProposition() {
  const values = [
    {
      title: "Learn",
      description: "Structured courses designed to guide you through timeless Vedic teachings with clarity and depth.",
      icon: "📚",
    },
    {
      title: "Reflect",
      description: "Write insights and capture your thoughts as you deepen your understanding of ancient wisdom.",
      icon: "✍️",
    },
    {
      title: "Apply",
      description: "Transform your daily life by integrating Vedic principles into practical, real-world actions.",
      icon: "🌟",
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-background p-8 lg:p-10 rounded-[24px] shadow-sm hover:shadow-lg transition-all duration-300 border border-border"
            >
              <div className="text-5xl mb-6">{value.icon}</div>
              <h3 className="text-2xl mb-4">{value.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
