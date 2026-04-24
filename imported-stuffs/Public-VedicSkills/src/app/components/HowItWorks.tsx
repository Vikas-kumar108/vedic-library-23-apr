export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Learn",
      description: "Engage with structured lessons and teachings from ancient Vedic texts, presented in a modern, accessible format.",
    },
    {
      number: "2",
      title: "Reflect",
      description: "Take time to internalize the wisdom through guided reflection exercises and journaling prompts.",
    },
    {
      number: "3",
      title: "Grow",
      description: "Apply these timeless principles to your daily life and experience meaningful personal transformation.",
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl mb-4">How It Works</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            A simple, effective approach to integrating Vedic wisdom into your life
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl mb-6">
                {step.number}
              </div>
              <h3 className="text-2xl mb-4">{step.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
