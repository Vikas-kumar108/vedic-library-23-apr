import { motion, AnimatePresence } from 'framer-motion'

export default function GuidedReadingPage() {
  const { id } = useParams()
  const router = useRouter()
  const { verse, isLoading, error } = useVerse(id as string)
  const [isCompleted, setIsCompleted] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Tracking scroll progress for the subtle indicator
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Completion trigger: delay to ensure focus
  useEffect(() => {
    if (verse && !isCompleted) {
      const timer = setTimeout(() => {
        setIsCompleted(true)
      }, 7000) // 7 seconds for a more deliberate pace
      return () => clearTimeout(timer)
    }
  }, [verse, isCompleted])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6 text-center"
        >
          <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="font-serif italic text-slate-400">Illuminating the Path...</p>
        </motion.div>
      </div>
    )
  }

  if (error || !verse) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center p-10 text-center space-y-6">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center text-rose-500">
           <BookOpen className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-slate-900 italic">The text is temporarily veiled.</h1>
        <p className="text-slate-500 max-w-sm">We couldn't retrieve this specific node. Please return to your path.</p>
        <Button asChild variant="outline" className="rounded-xl px-8 h-12 border-slate-200">
           <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 selection:bg-primary/10 transition-colors duration-1000">
      
      {/* 1. SACRED PROGRESS INDICATOR (Minimal Top Bar) */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-slate-50">
        <motion.div 
          className="h-full bg-primary/40 shadow-[0_0_10px_rgba(230,126,34,0.3)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. MINIMAL NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 h-24 flex items-center justify-between px-10 bg-[#FDFCFB]/60 backdrop-blur-md z-50 transition-all duration-1000">
        <Link 
          href="/dashboard" 
          className="group flex items-center gap-4 text-slate-400 hover:text-slate-900 transition-all"
        >
          <div className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-xl group-hover:shadow-slate-200/50 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">End Session</span>
        </Link>

        <div className="flex items-center gap-4">
           <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">{verse.meta?.canonicalRef || 'Eternal Shastra'}</div>
        </div>
      </header>

      {/* 3. GUIDED READING CONTENT */}
      <main className="max-w-2xl mx-auto pt-48 pb-60 px-8 space-y-32">
        
        {/* Sanskrit & Mula */}
        <section className="text-center space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] rounded-full"
          >
            <Sun className="w-4 h-4" /> Revelation
          </motion.div>
          
          <div className="space-y-14">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 2 }}
              className="text-4xl md:text-6xl font-serif leading-[1.3] text-slate-900 tracking-tight"
            >
              {verse.text?.devanagari}
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 2 }}
              className="text-lg md:text-xl font-serif italic text-slate-400 max-w-xl mx-auto leading-relaxed"
            >
              {verse.text?.iast}
            </motion.div>
          </div>
        </section>

        {/* Translation */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="bg-white p-16 md:p-24 rounded-[5rem] border border-slate-100/40 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] space-y-10"
        >
           <div className="text-[10px] font-black text-slate-200 uppercase tracking-[0.4em] text-center border-b border-slate-50 pb-8">Realization</div>
           <p className="text-3xl md:text-5xl font-serif text-slate-900 leading-[1.2] italic text-center px-6">
             "{verse.meanings?.translations?.en || verse.translationsByAuthor?.[0]?.text}"
           </p>
        </motion.section>

        {/* Purport / Deep Insight */}
        <section className="space-y-14">
           <div className="flex items-center gap-6">
              <div className="h-px flex-1 bg-slate-50" />
              <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Deep Insight</div>
              <div className="h-px flex-1 bg-slate-50" />
           </div>
           
           <div className="text-xl md:text-2xl text-slate-600 leading-[1.9] font-serif space-y-12 transition-all">
              {verse.commentary?.[0]?.content?.en?.split('\n').map((p: string, i: number) => (
                <motion.p 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.2, duration: 1 }}
                  key={i}
                  className="first-letter:text-6xl first-letter:font-bold first-letter:text-primary/20 first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8]"
                >
                  {p}
                </motion.p>
              )) || (
                <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-primary/20 first-letter:mr-4 first-letter:float-left first-letter:leading-[0.8]">
                  {verse.purport}
                </p>
              )}
           </div>
        </section>

        {/* 4. COMPLETION STATE */}
        <AnimatePresence>
          {isCompleted && (
            <motion.section 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative"
            >
              <div className="bg-slate-900 rounded-[5rem] p-20 text-white text-center space-y-12 relative overflow-hidden group shadow-3xl shadow-slate-900/40">
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12 group-hover:scale-110 group-hover:rotate-6 transition-all duration-1000">
                   <CheckCircle2 className="w-80 h-80" />
                </div>
                
                <div className="relative z-10 space-y-6">
                  <div className="inline-flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-[0.4em]">
                     <Sparkles className="w-5 h-5" /> Path Progressed
                  </div>
                  <h2 className="text-5xl font-serif font-bold italic tracking-tight leading-tight">
                    Your realization is complete.
                  </h2>
                  <p className="text-slate-400 max-w-md mx-auto text-base leading-relaxed font-serif italic">
                    The eternal wisdom has found its home. Your path continues into deeper light.
                  </p>
                </div>
    
                <Button asChild size="lg" className="relative z-10 h-20 px-16 rounded-[2rem] bg-primary text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/40 hover:scale-105 hover:bg-[#e67e22] active:scale-95 transition-all">
                  <Link href="/dashboard" className="flex items-center gap-4">
                    Continue Your Journey <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

      </main>

      {/* Floating Insight Tracker (Minimal) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-12 left-1/2 -translate-x-1/2 px-10 py-5 bg-white/40 backdrop-blur-2xl border border-white/20 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex items-center gap-8 z-50"
      >
         <div className="flex flex-col">
            <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em] leading-none mb-1">Seeker Presence</span>
            <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest whitespace-nowrap">Focused Study</span>
         </div>
         <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary shadow-[0_0_8px_rgba(230,126,34,0.5)]" 
              initial={{ width: "10%" }}
              animate={{ width: isCompleted ? "100%" : "40%" }}
              transition={{ duration: 5, ease: "easeInOut" }}
            />
         </div>
      </motion.div>

    </div>
  )
}
