"use client"

import { useEffect, useState } from "react"
import { BookOpen, GraduationCap, Clock, ArrowRight, Star, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const FALLBACK_COURSES = [
  {
    id: "gita-foundations",
    title: "Foundations of Bhagavad Gita",
    description: "A comprehensive journey through the first six chapters, focusing on the science of the soul and the path of action.",
    instructor: "Institutional Sages",
    duration: "12 Weeks",
    level: "Beginner",
    enrolled: "1,200+",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80"
  },
  {
    id: "vedic-leadership",
    title: "Vedic Leadership & Governance",
    description: "Ancient principles from the Arthashastra and Mahabharata applied to modern organizational management.",
    instructor: "Dr. Vedic Scholar",
    duration: "8 Weeks",
    level: "Advanced",
    enrolled: "450+",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80"
  }
]

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('http://localhost:4444/academy/courses')
        const data = await res.json()
        
        if (data && data.length > 0) {
          // Map database fields to UI fields
          const mapped = data.map((c: any) => ({
            id: c.id,
            title: c.title,
            description: c.description || "No description manifest.",
            instructor: "Sacred Faculty",
            duration: `${c._count.steps} Modules`,
            level: "Institutional",
            enrolled: `${c._count.userProgress} Seekers`,
            rating: 5.0,
            image: "https://images.unsplash.com/photo-1544640805-35c0fa68759a?auto=format&fit=crop&q=80"
          }))
          setCourses(mapped)
        } else {
          setCourses(FALLBACK_COURSES)
        }
      } catch (error) {
        console.error("🏛️ Curriculum Sync Error:", error)
        setCourses(FALLBACK_COURSES)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  return (
    <div className="min-h-screen bg-[#fdfcf5] pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e67e22]/10 text-[#e67e22] text-[10px] font-black uppercase tracking-widest mb-6">
            <GraduationCap className="size-3" />
            Institutional Curriculum
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold italic text-slate-900 leading-tight mb-6">
            Explore the Path of
            <span className="text-[#e67e22] block">Vedic Excellence</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Our courses are meticulously designed to bridge ancient wisdom with modern application, 
            facilitating a profound transformation in consciousness and conduct.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="size-12 text-[#e67e22] animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map((course) => (
              <div key={course.id} className="group bg-white rounded-[2.5rem] border border-[#e8e4d9] overflow-hidden hover:shadow-2xl hover:shadow-[#e67e22]/5 transition-all flex flex-col">
                <div className="h-56 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-6 left-6 z-20">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-black text-orange-600 rounded-full uppercase tracking-widest">
                      {course.level}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1"><Clock className="size-3" /> {course.duration}</span>
                    <span className="flex items-center gap-1"><Star className="size-3 text-amber-500" /> {course.rating}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold italic text-slate-900 mb-4 group-hover:text-orange-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-8 line-clamp-3">
                    {course.description}
                  </p>
                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       {course.enrolled}
                     </div>
                     <Button asChild variant="ghost" className="p-0 text-orange-600 font-bold hover:bg-transparent group/btn">
                       <Link href={`/courses/${course.id}`} className="flex items-center">
                          View Course <ArrowRight className="ml-2 size-4 group-hover/btn:translate-x-1 transition-transform" />
                       </Link>
                     </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
