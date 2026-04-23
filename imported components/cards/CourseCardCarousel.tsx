import { Star } from 'lucide-react';
import { motion } from 'motion/react';

interface CourseCardCarouselProps {
  title: string;
  instructor: string;
  price: number;
  rating: number;
  thumbnail: string;
}

export function CourseCardCarousel({
  title,
  instructor,
  price,
  rating,
  thumbnail,
}: CourseCardCarouselProps) {
  return (
    <motion.article
      className="group relative bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer w-72 flex-shrink-0"
      whileHover={{ y: -6, scale: 1.02 }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-neutral-900 dark:text-white line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {instructor}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-neutral-900 dark:text-white">
              {rating.toFixed(1)}
            </span>
          </div>

          <span className="text-xl font-bold text-neutral-900 dark:text-white">
            ${price}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
