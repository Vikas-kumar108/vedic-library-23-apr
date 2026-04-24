import { Star, Clock, BookOpen, Play, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface CourseCardCompactProps {
  title: string;
  instructor: string;
  instructorVerified?: boolean;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  duration: string;
  lessonsCount: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  badge?: 'Bestseller' | 'New' | 'Trending';
  category?: string;
}

export function CourseCardCompact({
  title,
  instructor,
  instructorVerified = false,
  price,
  originalPrice,
  rating,
  reviewCount,
  duration,
  lessonsCount,
  level,
  thumbnail,
  badge,
  category,
}: CourseCardCompactProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <motion.article
      className="group relative bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl shadow-sm"
      whileHover={{ scale: 1.01 }}
      onHoverStart={() => setShowPreview(true)}
      onHoverEnd={() => setShowPreview(false)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-105"
        />

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium">
          {duration}
        </div>

        {/* Trust Badge */}
        {badge && (
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
            badge === 'Bestseller' ? 'bg-amber-400 text-amber-900' :
            badge === 'New' ? 'bg-green-400 text-green-900' :
            'bg-blue-400 text-blue-900'
          }`}>
            {badge}
          </div>
        )}

        {/* Hover Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showPreview ? 1 : 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center"
        >
          <button className="bg-white hover:bg-neutral-100 text-neutral-900 px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg transition-all hover:scale-105">
            <Play className="w-4 h-4" />
            Preview Course
          </button>
        </motion.div>

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
        >
          <Heart
            className={`w-4 h-4 transition-all ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-neutral-700'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        {category && (
          <span className="inline-block px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs rounded-md">
            {category}
          </span>
        )}

        {/* Title */}
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        {/* Instructor */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full" />
          <span className="text-sm text-neutral-600 dark:text-neutral-400">
            {instructor}
            {instructorVerified && (
              <span className="ml-1 text-blue-500">✓</span>
            )}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-neutral-900 dark:text-white">
              {rating.toFixed(1)}
            </span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-neutral-200 text-neutral-200 dark:fill-neutral-700 dark:text-neutral-700'
                  }`}
                />
              ))}
            </div>
          </div>
          <span className="text-sm text-neutral-500">({reviewCount.toLocaleString()})</span>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{lessonsCount} lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800" />

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-neutral-900 dark:text-white">
              ${price}
            </span>
            {originalPrice && (
              <>
                <span className="text-sm text-neutral-400 line-through">
                  ${originalPrice}
                </span>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs font-semibold rounded">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>
        </div>

        {/* Level Badge */}
        <div className="flex justify-between items-center">
          <span className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-md">
            {level}
          </span>
          <button className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors">
            Enroll Now
          </button>
        </div>
      </div>
    </motion.article>
  );
}
