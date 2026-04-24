import { CourseCardCompact } from './components/CourseCardCompact';
import { CourseCardFeatured } from './components/CourseCardFeatured';
import { CourseCardHorizontal } from './components/CourseCardHorizontal';
import { CourseCardCarousel } from './components/CourseCardCarousel';
import { CourseCardPremium } from './components/CourseCardPremium';
import ClaudePage from "./pages/ClaudePage";

export default function App() {
  const sampleCourses = [
    {
      title: "Complete Web Development Bootcamp 2026",
      instructor: "Dr. Angela Yu",
      instructorVerified: true,
      price: 89,
      originalPrice: 199,
      rating: 4.8,
      reviewCount: 12453,
      duration: "52h 30m",
      lessonsCount: 342,
      level: "Beginner" as const,
      thumbnail: "https://images.unsplash.com/photo-1593720213681-e9a8778330a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      badge: "Bestseller" as const,
      category: "Web Development",
    },
    {
      title: "Advanced React & TypeScript Patterns",
      instructor: "Maximilian Schwarzmüller",
      instructorVerified: true,
      price: 73,
      originalPrice: 149,
      rating: 4.9,
      reviewCount: 8921,
      duration: "28h 15m",
      lessonsCount: 187,
      level: "Advanced" as const,
      thumbnail: "https://images.unsplash.com/photo-1593720218365-b2076cfdefee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      badge: "Trending" as const,
      category: "React",
    },
    {
      title: "Full Stack JavaScript Developer Path",
      instructor: "Colt Steele",
      instructorVerified: true,
      price: 99,
      rating: 4.7,
      reviewCount: 15234,
      duration: "64h 45m",
      lessonsCount: 425,
      level: "Intermediate" as const,
      thumbnail: "https://images.unsplash.com/photo-1637937459053-c788742455be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      badge: "New" as const,
      category: "Full Stack",
    },
    {
      title: "Node.js, Express & MongoDB Masterclass",
      instructor: "Jonas Schmedtmann",
      instructorVerified: true,
      price: 69,
      originalPrice: 139,
      rating: 4.9,
      reviewCount: 9834,
      duration: "42h 20m",
      lessonsCount: 276,
      level: "Intermediate" as const,
      thumbnail: "https://images.unsplash.com/photo-1774620396033-18782cda8242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      category: "Backend",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Premium Course Cards Showcase
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Apple-inspired UI/UX patterns for online learning platforms
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Featured Hero Card */}
        <section>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
            Featured Hero Card
          </h2>
          <CourseCardFeatured
            title="Complete Web Development Bootcamp 2026"
            description="Master web development from scratch. Learn HTML, CSS, JavaScript, React, Node.js, and deploy real-world projects. Perfect for aspiring developers ready to launch their tech career."
            instructor="Dr. Angela Yu"
            instructorBio="Lead Instructor at App Brewery • 500K+ students worldwide"
            price={89}
            originalPrice={199}
            rating={4.8}
            reviewCount={12453}
            studentsEnrolled={45782}
            duration="52h 30m"
            lessonsCount={342}
            thumbnail="https://images.unsplash.com/photo-1593720213681-e9a8778330a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            badge="Bestseller"
          />
        </section>

        {/* Compact Grid Cards */}
        <section>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
            Compact Grid Cards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleCourses.map((course, index) => (
              <CourseCardCompact key={index} {...course} />
            ))}
          </div>
        </section>

        {/* Horizontal List Cards */}
        <section>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
            Horizontal List Cards (My Learning)
          </h2>
          <div className="space-y-4">
            <CourseCardHorizontal
              title="Complete Web Development Bootcamp 2026"
              instructor="Dr. Angela Yu"
              thumbnail="https://images.unsplash.com/photo-1593720213681-e9a8778330a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              progress={67}
              duration="52h 30m"
              lessonsCount={342}
              rating={4.8}
              enrolled={true}
            />
            <CourseCardHorizontal
              title="Advanced React & TypeScript Patterns"
              instructor="Maximilian Schwarzmüller"
              thumbnail="https://images.unsplash.com/photo-1593720218365-b2076cfdefee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              progress={32}
              duration="28h 15m"
              lessonsCount={187}
              rating={4.9}
              enrolled={true}
            />
            <CourseCardHorizontal
              title="Full Stack JavaScript Developer Path"
              instructor="Colt Steele"
              thumbnail="https://images.unsplash.com/photo-1637937459053-c788742455be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              duration="64h 45m"
              lessonsCount={425}
              rating={4.7}
              enrolled={false}
            />
          </div>
        </section>

        {/* Carousel Cards */}
        <section>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
            Carousel Cards (Trending Now)
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6">
            <CourseCardCarousel
              title="Complete Web Development Bootcamp 2026"
              instructor="Dr. Angela Yu"
              price={89}
              rating={4.8}
              thumbnail="https://images.unsplash.com/photo-1593720213681-e9a8778330a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            />
            <CourseCardCarousel
              title="Advanced React & TypeScript Patterns"
              instructor="Maximilian Schwarzmüller"
              price={79}
              rating={4.9}
              thumbnail="https://images.unsplash.com/photo-1593720218365-b2076cfdefee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            />
            <CourseCardCarousel
              title="Full Stack JavaScript Developer Path"
              instructor="Colt Steele"
              price={99}
              rating={4.7}
              thumbnail="https://images.unsplash.com/photo-1637937459053-c788742455be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            />
            <CourseCardCarousel
              title="Node.js, Express & MongoDB Masterclass"
              instructor="Jonas Schmedtmann"
              price={69}
              rating={4.9}
              thumbnail="https://images.unsplash.com/photo-1774620396033-18782cda8242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            />
            <CourseCardCarousel
              title="Python for Data Science & Machine Learning"
              instructor="Jose Portilla"
              price={84}
              rating={4.6}
              thumbnail="https://images.unsplash.com/photo-1581276879432-15e50529f34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            />
          </div>
        </section>

        {/* Premium Enterprise Card */}
        <section>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
            Premium Enterprise Card
          </h2>
          <div className="max-w-md">
            <CourseCardPremium
              title="AWS Certified Solutions Architect Professional"
              instructor="Stephane Maarek"
              price={299}
              rating={4.9}
              reviewCount={18432}
              thumbnail="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              certificationType="AWS Professional Certification"
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-neutral-500">
          Premium Course Cards • Built with React, Tailwind CSS & shadcn/ui
        </div>
      </footer>
    </div>
  );
  
}

