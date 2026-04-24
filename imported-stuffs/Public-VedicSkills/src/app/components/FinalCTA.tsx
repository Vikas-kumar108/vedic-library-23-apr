interface FinalCTAProps {
  onNavigate: (page: string) => void;
}

export function FinalCTA({ onNavigate }: FinalCTAProps) {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-[32px] p-12 lg:p-20 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl text-primary-foreground mb-6">
              Start your journey today
            </h2>
            <p className="text-lg lg:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of learners discovering the transformative power of Vedic wisdom
            </p>
            <button onClick={() => onNavigate("signup")} className="bg-accent text-accent-foreground px-10 py-4 rounded-[20px] hover:opacity-90 transition-opacity shadow-lg text-lg">
              Begin Learning
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
