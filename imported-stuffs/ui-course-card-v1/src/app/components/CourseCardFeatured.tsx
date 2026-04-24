import { Star, Clock, BookOpen, Users, Award, TrendingUp, Play } from 'lucide-react';
import { motion } from 'motion/react';

interface CourseCardFeaturedProps {
  title: string;
  description: string;
  instructor: string;
  instructorBio: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  studentsEnrolled: number;
  duration: string;
  lessonsCount: number;
  thumbnail: string;
  badge?: string;
}

export function CourseCardFeatured({
  title,
  description,
  instructor,
  instructorBio,
  price,
  originalPrice,
  rating,
  reviewCount,
  studentsEnrolled,
  duration,
  lessonsCount,
  thumbnail,
  badge,
}: CourseCardFeaturedProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <motion.article
      className="group relative bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
      whileHover={{ y: -4 }}
    >
      <div className="grid md:grid-cols-2 gap-0">
        {/* Left: Thumbnail */}
        <div className="relative aspect-video md:aspect-auto overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Play Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
            <button className="flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-white text-neutral-900 px-6 py-3 rounded-full font-semibold shadow-lg transition-all hover:scale-105">
              <Play className="w-5 h-5" />
              Watch Preview
            </button>
          </div>

          {badge && (
            <div className="absolute top-6 left-6 px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {badge}
            </div>
          )}
        </div>

        {/* Right: Content */}
        <div className="p-8 md:p-10 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white leading-tight mb-3">
                {title}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed">
                {description}
              </p>
            </div>

            {/* Instructor */}
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex-shrink-0" />
              <div>
                <div className="font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                  {instructor}
                  <span className="text-blue-500">✓</span>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {instructorBio}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-100 dark:bg-amber-950 rounded-lg">
                  <Star className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900 dark:text-white">
                    {rating.toFixed(1)} Rating
                  </div>
                  <div className="text-xs text-neutral-500">
                    {reviewCount.toLocaleString()} reviews
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900 dark:text-white">
                    {studentsEnrolled.toLocaleString()}
                  </div>
                  <div className="text-xs text-neutral-500">students enrolled</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 dark:bg-green-950 rounded-lg">
                  <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900 dark:text-white">
                    {lessonsCount} Lessons
                  </div>
                  <div className="text-xs text-neutral-500">comprehensive content</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 dark:bg-purple-950 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-bold text-neutral-900 dark:text-white">{duration}</div>
                  <div className="text-xs text-neutral-500">total duration</div>
                </div>
              </div>
            </div>

            {/* Certificate Badge */}
            <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/50 rounded-xl border border-blue-200 dark:border-blue-900">
              <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-blue-900 dark:text-blue-200 font-medium">
                Certificate of Completion included
              </span>
            </div>
          </div>

          {/* Price & CTAs */}
          <div className="mt-8 space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-neutral-900 dark:text-white">
                ${price}
              </span>
              {originalPrice && (
                <>
                  <span className="text-xl text-neutral-400 line-through">
                    ${originalPrice}
                  </span>
                  <span className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-4 rounded-xl font-bold text-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all hover:scale-[1.02] shadow-lg">
                Enroll Now
              </button>
              <button className="px-6 py-4 border-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white rounded-xl font-semibold hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all">
                Add to Cart
              </button>
            </div>

            <p className="text-xs text-center text-neutral-500">
              30-day money-back guarantee • Lifetime access
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
