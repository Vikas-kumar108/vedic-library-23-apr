import { CourseCardFeatured } from "../components/CourseCardFeatured";

export default function FeaturedPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <CourseCardFeatured
        title="Web Dev Bootcamp"
        description="Master web development"
        instructor="Dr. Angela Yu"
        price={89}
        rating={4.8}
        reviewCount={12000}
        studentsEnrolled={45000}
        duration="52h"
        lessonsCount={342}
        thumbnail="https://images.unsplash.com/photo-1593720213681-e9a8778330a7?w=1080"
      />
    </div>
  );
}