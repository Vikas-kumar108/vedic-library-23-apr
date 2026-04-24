import { Star, Award, Users, Briefcase, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface CourseCardPremiumProps {
  title: string;
  instructor: string;
  price: number;
  rating: number;
  reviewCount: number;
  thumbnail: string;
  trustedByLogos?: string[];
  certificationType: string;
}

export function CourseCardPremium({
  title,
  instructor,
  price,
  rating,
  reviewCount,
  thumbnail,
  certificationType,
}: CourseCardPremiumProps) {
  return (
    <motion.article
      className="group relative bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-neutral-900 dark:via-blue-950/20 dark:to-purple-950/20 rounded-3xl overflow-hidden transition-all duration-300"
      style={{
        boxShadow: '0 10px 40px rgba(0,0,0,0.08), 0 0 0 2px rgba(59, 130, 246, 0.1)',
      }}
      whileHover={{
        y: -8,
        boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 0 0 2px rgba(59, 130, 246, 0.3)',
      }}
    >
      {/* Premium Badge with Shimmer */}
      <div className="absolute top-0 right-0 z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 blur-sm opacity-75 animate-pulse" />
          <div className="relative bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-900 px-4 py-2 rounded-bl-2xl rounded-tr-2xl font-bold text-sm flex items-center gap-1 shadow-lg">
            <Sparkles className="w-4 h-4" />
            PREMIUM
          </div>
        </div>
      </div>

      {/* Gradient Border Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Instructor with Premium Badge */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full ring-2 ring-blue-200 dark:ring-blue-900" />
          <div className="flex-1">
            <div className="font-semibold text-neutral-900 dark:text-white flex items-center gap-1">
              {instructor}
              <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-xs text-neutral-500">Certified Expert Instructor</p>
          </div>
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-neutral-200 text-neutral-200 dark:fill-neutral-700 dark:text-neutral-700'
                }`}
              />
            ))}
          </div>
          <span className="font-semibold text-neutral-900 dark:text-white">
            {rating.toFixed(1)}
          </span>
          <span className="text-sm text-neutral-500">
            ({reviewCount.toLocaleString()} reviews)
          </span>
        </div>

        {/* Certificate Badge */}
        <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-xl border-2 border-blue-200 dark:border-blue-900">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
                {certificationType}
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Industry-recognized credential included
              </p>
            </div>
          </div>
        </div>

        {/* Trusted By */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Trusted by 500+ organizations</span>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-2 text-xs">
            <Users className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
            <span className="text-green-700 dark:text-green-400 font-medium">
              156 professionals enrolled this week
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800" />

        {/* Price & CTA */}
        <div className="space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${price}
            </span>
            <span className="text-sm text-neutral-500">/ lifetime access</span>
          </div>

          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:scale-[1.02]">
            Enroll in Premium Course
          </button>

          <p className="text-xs text-center text-neutral-500">
            30-day money-back guarantee • Payment plans available
          </p>
        </div>
      </div>
    </motion.article>
  );
}
