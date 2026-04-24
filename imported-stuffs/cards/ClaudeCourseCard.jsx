// CourseCard.jsx — Full component system
// Stack: React + Next.js + Tailwind CSS + shadcn/ui
// Variants: Standard, Featured, Compact, Progress, Skeleton, Carousel

"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

/**
 * @typedef {Object} CourseSchema
 * @property {string}   id
 * @property {string}   title
 * @property {string}   slug
 * @property {string}   description
 * @property {string}   thumbnailUrl
 * @property {string}   previewVideoUrl      - short trailer URL (optional)
 * @property {Instructor} instructor
 * @property {number}   rating               - 0–5
 * @property {number}   reviewCount
 * @property {number}   studentCount
 * @property {number}   price                - current price in smallest currency unit
 * @property {number}   [originalPrice]      - before discount
 * @property {string}   currency             - e.g. "INR", "USD"
 * @property {string[]} tags                 - e.g. ["React", "Advanced"]
 * @property {string[]} highlights           - pill metadata: ["42 hours", "186 lessons", "Certificate"]
 * @property {BadgeType} [badge]             - "bestseller" | "new" | "trending" | "free"
 * @property {number}   [lessonCount]
 * @property {number}   [durationHours]
 */

/**
 * @typedef {Object} Instructor
 * @property {string} name
 * @property {string} avatarUrl
 * @property {string} [initials]   - fallback when no avatarUrl
 */

/**
 * @typedef {"standard"|"featured"|"compact"|"progress"|"skeleton"} CardVariant
 * @typedef {"bestseller"|"new"|"trending"|"free"} BadgeType
 */

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const BADGE_STYLES = {
  bestseller: "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-300",
  new:        "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-300",
  trending:   "bg-orange-100 text-orange-900 dark:bg-orange-900/30 dark:text-orange-300",
  free:       "bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-300",
};

const BADGE_LABELS = {
  bestseller: "Bestseller",
  new:        "New",
  trending:   "Trending",
  free:       "Free",
};

/** Format price (INR example; adapt locale/currency as needed) */
function formatPrice(amount, currency = "INR") {
  if (amount === 0) return "Free";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Discount percentage */
function discountPct(original, current) {
  if (!original || original <= current) return null;
  return Math.round(((original - current) / original) * 100);
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

/** Star rating display */
function RatingStars({ rating, reviewCount, size = "sm" }) {
  const fullStars  = Math.floor(rating);
  const hasHalf    = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
  const sz         = size === "sm" ? "w-2.5 h-2.5" : "w-3.5 h-3.5";

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-px">
        {Array.from({ length: fullStars }).map((_, i) => (
          <StarIcon key={`f${i}`} className={cn(sz, "fill-amber-400 text-amber-400")} />
        ))}
        {hasHalf && <HalfStarIcon className={cn(sz, "fill-amber-400 text-amber-400")} />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <StarIcon key={`e${i}`} className={cn(sz, "fill-muted text-muted-foreground/30")} />
        ))}
      </div>
      <span className="text-[11px] text-muted-foreground tabular-nums">
        {rating.toFixed(1)} ({reviewCount?.toLocaleString()})
      </span>
    </div>
  );
}

/** Price display with optional strikethrough + discount badge */
function PriceBadge({ price, originalPrice, currency, className }) {
  const pct = discountPct(originalPrice, price);

  return (
    <div className={cn("flex items-baseline gap-1.5", className)}>
      <span className="text-[17px] font-medium leading-none">
        {formatPrice(price, currency)}
      </span>
      {originalPrice && originalPrice > price && (
        <>
          <span className="text-xs text-muted-foreground line-through">
            {formatPrice(originalPrice, currency)}
          </span>
          {pct && (
            <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded-full">
              -{pct}%
            </span>
          )}
        </>
      )}
    </div>
  );
}

/** Instructor avatar with initials fallback */
function InstructorAvatar({ instructor, size = 22 }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (instructor.avatarUrl && !imgFailed) {
    return (
      <Image
        src={instructor.avatarUrl}
        alt={instructor.name}
        width={size}
        height={size}
        className="rounded-full object-cover flex-shrink-0"
        style={{ width: size, height: size }}
        onError={() => setImgFailed(true)}
      />
    );
  }

  const initials = instructor.initials
    ?? instructor.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div
      className="rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 flex items-center justify-center flex-shrink-0 font-medium"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </div>
  );
}

/** Lesson progress dots */
function LessonDots({ total = 9, completed = 0, current = -1 }) {
  return (
    <div className="flex gap-1 flex-wrap">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-2 h-2 rounded-full transition-all",
            i < completed
              ? "bg-emerald-400"
              : i === current
              ? "bg-amber-400"
              : "bg-border"
          )}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Thumbnail with hover play button
// ─────────────────────────────────────────────

function CourseCardThumbnail({ course, height = 156, priority = false, showPlay = true }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden bg-zinc-900 flex-shrink-0"
      style={{ height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail image */}
      {course.thumbnailUrl ? (
        <Image
          src={course.thumbnailUrl}
          alt={course.title}
          fill
          className={cn(
            "object-cover transition-transform duration-500",
            isHovered && "scale-105"
          )}
          sizes="(max-width: 640px) 100vw, 320px"
          priority={priority}
        />
      ) : (
        // Gradient fallback (no external image needed)
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 flex items-center justify-center">
          <span className="text-4xl select-none" aria-hidden>
            {course.emoji ?? "📚"}
          </span>
        </div>
      )}

      {/* Hover overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-black/20 transition-opacity duration-200",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Play button */}
      {showPlay && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-200",
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
          )}
        >
          <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <PlayIcon className="w-4 h-4 fill-white text-white ml-0.5" />
          </div>
        </div>
      )}

      {/* Badge */}
      {course.badge && (
        <div className="absolute top-2.5 left-2.5">
          <span
            className={cn(
              "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide",
              BADGE_STYLES[course.badge]
            )}
          >
            {BADGE_LABELS[course.badge]}
          </span>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Variant: Standard
// ─────────────────────────────────────────────

function CourseCardStandard({ course, onEnroll, onCardClick, priority, className }) {
  return (
    <Card
      className={cn(
        "group w-full overflow-hidden border border-border/50 rounded-xl",
        "transition-all duration-[220ms] ease-[cubic-bezier(.2,.8,.2,1)]",
        "hover:-translate-y-1 hover:scale-[1.012] hover:border-border hover:shadow-sm",
        "cursor-pointer",
        className
      )}
      onClick={onCardClick}
    >
      <CourseCardThumbnail course={course} height={156} priority={priority} />

      <CardContent className="p-4">
        {/* Tags */}
        {course.tags?.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mb-2">
            {course.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full border border-border/60 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-[14px] font-medium leading-snug text-foreground mb-2.5 line-clamp-2">
          {course.title}
        </h3>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-2.5">
          <InstructorAvatar instructor={course.instructor} size={22} />
          <span className="text-[12px] text-muted-foreground truncate">
            {course.instructor.name}
          </span>
        </div>

        {/* Rating */}
        <div className="mb-3">
          <RatingStars rating={course.rating} reviewCount={course.reviewCount} />
        </div>

        {/* Footer: price + CTA */}
        <div className="flex items-center justify-between">
          <PriceBadge
            price={course.price}
            originalPrice={course.originalPrice}
            currency={course.currency}
          />
          <Button
            size="sm"
            className="rounded-full text-xs h-8 px-4"
            onClick={(e) => {
              e.stopPropagation();
              onEnroll?.();
            }}
          >
            Enroll
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────
// Variant: Featured (horizontal)
// ─────────────────────────────────────────────

function CourseCardFeatured({ course, onEnroll, onCardClick, priority, className }) {
  return (
    <Card
      className={cn(
        "group flex overflow-hidden border border-border/50 rounded-xl w-full max-w-2xl",
        "transition-all duration-[220ms] ease-[cubic-bezier(.2,.8,.2,1)]",
        "hover:-translate-y-1 hover:border-border hover:shadow-sm cursor-pointer",
        className
      )}
      onClick={onCardClick}
    >
      {/* Thumbnail — fixed width */}
      <div className="w-52 flex-shrink-0">
        <CourseCardThumbnail
          course={course}
          height="100%"
          priority={priority}
          showPlay
        />
      </div>

      {/* Body */}
      <CardContent className="flex flex-col gap-2.5 p-5 flex-1 min-w-0">
        <h3 className="text-[17px] font-medium leading-snug text-foreground line-clamp-2">
          {course.title}
        </h3>

        {course.description && (
          <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2">
            {course.description}
          </p>
        )}

        {/* Instructor */}
        <div className="flex items-center gap-2">
          <InstructorAvatar instructor={course.instructor} size={20} />
          <span className="text-[12px] text-muted-foreground">{course.instructor.name}</span>
          <span className="text-border mx-1">·</span>
          <RatingStars rating={course.rating} reviewCount={course.reviewCount} />
        </div>

        {/* Highlight pills */}
        {course.highlights?.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {course.highlights.map((h) => (
              <span
                key={h}
                className="text-[11px] px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground"
              >
                {h}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-2.5 border-t border-border/50">
          <div className="flex gap-4">
            <span className="text-[12px] text-muted-foreground">
              <span className="font-medium text-foreground">{course.studentCount?.toLocaleString()}</span> students
            </span>
          </div>
          <div className="flex items-center gap-3">
            <PriceBadge
              price={course.price}
              originalPrice={course.originalPrice}
              currency={course.currency}
            />
            <Button
              size="sm"
              className="rounded-full text-xs h-8 px-4 flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                onEnroll?.();
              }}
            >
              Enroll
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────
// Variant: Compact list row
// ─────────────────────────────────────────────

function CourseCardCompact({ course, onEnroll, onCardClick, className }) {
  return (
    <div
      className={cn(
        "group flex items-center gap-3 px-3.5 py-3 rounded-xl",
        "border border-transparent hover:border-border/50 hover:bg-muted/50",
        "transition-all duration-150 cursor-pointer",
        className
      )}
      onClick={onCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onCardClick?.()}
    >
      {/* Mini thumbnail */}
      <div className="w-[52px] h-[52px] rounded-xl overflow-hidden flex-shrink-0 bg-zinc-900 relative">
        {course.thumbnailUrl ? (
          <Image src={course.thumbnailUrl} alt="" fill className="object-cover" sizes="52px" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xl">
            {course.emoji ?? "📚"}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium text-foreground truncate leading-tight">
          {course.title}
        </div>
        <div className="text-[11px] text-muted-foreground mt-0.5 truncate">
          {course.instructor.name}
          {course.durationHours && ` · ${course.durationHours}h`}
          {course.tags?.[0] && ` · ${course.tags[0]}`}
        </div>
      </div>

      {/* Right: price + rating */}
      <div className="text-right flex-shrink-0">
        <div className="text-[14px] font-medium text-foreground leading-tight">
          {formatPrice(course.price, course.currency)}
        </div>
        <div className="text-[11px] text-muted-foreground mt-0.5">
          ★ {course.rating.toFixed(1)}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Variant: Progress (enrolled)
// ─────────────────────────────────────────────

function CourseCardProgress({
  course,
  progress = 0,           // 0–100
  completedLessons = 0,
  totalLessons = 9,
  currentLesson,          // { title, durationMin }
  onContinue,
  onCardClick,
  className,
}) {
  return (
    <Card
      className={cn(
        "group w-full overflow-hidden border border-border/50 rounded-xl",
        "transition-all duration-[220ms] ease-[cubic-bezier(.2,.8,.2,1)]",
        "hover:-translate-y-1 hover:border-border hover:shadow-sm cursor-pointer",
        className
      )}
      onClick={onCardClick}
    >
      {/* Thumbnail with progress overlay */}
      <div className="relative">
        <CourseCardThumbnail course={course} height={140} showPlay={false} />

        {/* Progress bar overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-3 py-2">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] text-white/70 flex-shrink-0">Progress</span>
            <div className="flex-1 h-[3px] bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[12px] font-medium text-white flex-shrink-0">
              {progress}%
            </span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Title */}
        <h3 className="text-[14px] font-medium leading-snug text-foreground mb-2.5 line-clamp-2">
          {course.title}
        </h3>

        {/* Lesson dots */}
        <div className="mb-2.5">
          <LessonDots
            total={totalLessons}
            completed={completedLessons}
            current={completedLessons < totalLessons ? completedLessons : -1}
          />
        </div>

        {/* Next lesson */}
        {currentLesson && (
          <p className="text-[11px] text-muted-foreground mb-3 truncate">
            Next: {currentLesson.title}
            {currentLesson.durationMin && ` · ${currentLesson.durationMin} min`}
          </p>
        )}

        {/* Continue CTA */}
        <Button
          className="w-full rounded-full text-sm h-9"
          onClick={(e) => {
            e.stopPropagation();
            onContinue?.();
          }}
        >
          Continue learning
        </Button>
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────
// Variant: Skeleton loading state
// ─────────────────────────────────────────────

function CourseCardSkeleton({ variant = "standard", className }) {
  const pulse = "animate-pulse bg-muted rounded";

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-3 px-3.5 py-3 rounded-xl border border-transparent", className)}>
        <div className={cn(pulse, "w-[52px] h-[52px] rounded-xl flex-shrink-0")} />
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className={cn(pulse, "h-3.5 w-3/4")} />
          <div className={cn(pulse, "h-2.5 w-1/2")} />
        </div>
        <div className="flex-shrink-0 text-right space-y-1.5">
          <div className={cn(pulse, "h-4 w-12")} />
          <div className={cn(pulse, "h-2.5 w-8 ml-auto")} />
        </div>
      </div>
    );
  }

  return (
    <Card className={cn("w-full overflow-hidden border border-border/50 rounded-xl", className)}>
      {/* Thumbnail */}
      <div className={cn(pulse, "w-full h-[156px] rounded-none")} />

      <CardContent className="p-4 space-y-2.5">
        {/* Tags */}
        <div className="flex gap-1.5">
          <div className={cn(pulse, "h-4 w-14 rounded-full")} />
          <div className={cn(pulse, "h-4 w-20 rounded-full")} />
        </div>
        {/* Title lines */}
        <div className={cn(pulse, "h-3.5 w-full")} />
        <div className={cn(pulse, "h-3.5 w-4/5")} />
        {/* Instructor */}
        <div className="flex items-center gap-2">
          <div className={cn(pulse, "w-[22px] h-[22px] rounded-full")} />
          <div className={cn(pulse, "h-3 w-28")} />
        </div>
        {/* Rating */}
        <div className={cn(pulse, "h-3 w-32")} />
        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <div className={cn(pulse, "h-5 w-16")} />
          <div className={cn(pulse, "h-8 w-20 rounded-full")} />
        </div>
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────
// Main CourseCard orchestrator
// ─────────────────────────────────────────────

/**
 * CourseCard — renders the correct variant based on props.
 *
 * @param {Object} props
 * @param {CourseSchema}   props.course
 * @param {CardVariant}    [props.variant="standard"]
 * @param {boolean}        [props.isEnrolled=false]
 * @param {number}         [props.progress=0]        - used when isEnrolled
 * @param {number}         [props.completedLessons=0]
 * @param {number}         [props.totalLessons=9]
 * @param {Object}         [props.currentLesson]     - { title, durationMin }
 * @param {boolean}        [props.isLoading=false]   - renders skeleton
 * @param {boolean}        [props.priority=false]    - next/image priority
 * @param {Function}       [props.onEnroll]
 * @param {Function}       [props.onContinue]
 * @param {Function}       [props.onCardClick]       - default: navigate to /courses/[slug]
 * @param {string}         [props.className]
 */
export function CourseCard({
  course,
  variant = "standard",
  isEnrolled = false,
  progress = 0,
  completedLessons = 0,
  totalLessons = 9,
  currentLesson,
  isLoading = false,
  priority = false,
  onEnroll,
  onContinue,
  onCardClick,
  className,
}) {
  if (isLoading) {
    return <CourseCardSkeleton variant={variant} className={className} />;
  }

  const handleCardClick = onCardClick ?? (() => {
    if (typeof window !== "undefined") {
      window.location.href = `/courses/${course.slug}`;
    }
  });

  const resolvedVariant = isEnrolled ? "progress" : variant;

  switch (resolvedVariant) {
    case "featured":
      return (
        <CourseCardFeatured
          course={course}
          onEnroll={onEnroll}
          onCardClick={handleCardClick}
          priority={priority}
          className={className}
        />
      );

    case "compact":
      return (
        <CourseCardCompact
          course={course}
          onEnroll={onEnroll}
          onCardClick={handleCardClick}
          className={className}
        />
      );

    case "progress":
      return (
        <CourseCardProgress
          course={course}
          progress={progress}
          completedLessons={completedLessons}
          totalLessons={totalLessons}
          currentLesson={currentLesson}
          onContinue={onContinue}
          onCardClick={handleCardClick}
          className={className}
        />
      );

    case "skeleton":
      return <CourseCardSkeleton variant="standard" className={className} />;

    default: // "standard"
      return (
        <CourseCardStandard
          course={course}
          onEnroll={onEnroll}
          onCardClick={handleCardClick}
          priority={priority}
          className={className}
        />
      );
  }
}

// ─────────────────────────────────────────────
// CourseCardGrid — responsive grid wrapper
// ─────────────────────────────────────────────

/**
 * @param {Object}  props
 * @param {CourseSchema[]} props.courses
 * @param {CardVariant}    [props.variant="standard"]
 * @param {boolean}        [props.isLoading=false]
 * @param {number}         [props.skeletonCount=4]
 * @param {Function}       [props.onEnroll]
 * @param {Function}       [props.onCardClick]    - called with (course)
 * @param {string}         [props.className]
 */
export function CourseCardGrid({
  courses = [],
  variant = "standard",
  isLoading = false,
  skeletonCount = 4,
  onEnroll,
  onCardClick,
  className,
}) {
  if (variant === "compact") {
    return (
      <div className={cn("flex flex-col", className)}>
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, i) => (
              <CourseCardSkeleton key={i} variant="compact" />
            ))
          : courses.map((course) => (
              <CourseCardCompact
                key={course.id}
                course={course}
                onCardClick={() => onCardClick?.(course)}
                onEnroll={() => onEnroll?.(course)}
              />
            ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-4",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
    >
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))
        : courses.map((course, i) => (
            <CourseCard
              key={course.id}
              course={course}
              variant={variant}
              priority={i < 4}
              onEnroll={() => onEnroll?.(course)}
              onCardClick={() => onCardClick?.(course)}
            />
          ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Minimal icon components (no external dep)
// ─────────────────────────────────────────────

function PlayIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 2.5v11L13 8z" />
    </svg>
  );
}

function StarIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 0l1.2 3.7H10L7 6l1.2 3.7L5 7.5l-3.2 2.2L3 6 0 3.7h3.8z" />
    </svg>
  );
}

function HalfStarIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 0l1.2 3.7H10L7 6l1.2 3.7L5 7.5V0z" />
      <path d="M5 7.5l-3.2 2.2L3 6 0 3.7h3.8L5 0" fill="none" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}

// ─────────────────────────────────────────────
// Example usage
// ─────────────────────────────────────────────

/**

// pages/courses/index.jsx (or app/courses/page.jsx)

import { CourseCard, CourseCardGrid } from "@/components/CourseCard";

const SAMPLE_COURSE = {
  id: "1",
  slug: "complete-react-developer",
  title: "The Complete React Developer Course — Hooks, Context & Beyond",
  description: "Master modern React including hooks, context, routing, and performance.",
  thumbnailUrl: "/images/react-course.jpg",
  emoji: "⚛️",                 // fallback if no thumbnailUrl
  badge: "bestseller",
  instructor: {
    name: "Sarah Reynolds",
    avatarUrl: "/avatars/sarah.jpg",
    initials: "SR",
  },
  rating: 4.8,
  reviewCount: 12340,
  studentCount: 54000,
  price: 799,
  originalPrice: 3999,
  currency: "INR",
  tags: ["React", "Advanced"],
  highlights: ["42 hours", "186 lessons", "Certificate"],
  durationHours: 42,
  lessonCount: 186,
};

// Standard card
<CourseCard course={SAMPLE_COURSE} variant="standard" onEnroll={() => {}} />

// Featured card
<CourseCard course={SAMPLE_COURSE} variant="featured" />

// Compact list row
<CourseCard course={SAMPLE_COURSE} variant="compact" />

// Enrolled with 68% progress
<CourseCard
  course={SAMPLE_COURSE}
  isEnrolled
  progress={68}
  completedLessons={6}
  totalLessons={9}
  currentLesson={{ title: "Context API Deep Dive", durationMin: 24 }}
  onContinue={() => router.push("/learn/react/context-api")}
/>

// Loading skeleton (shape-accurate)
<CourseCard course={SAMPLE_COURSE} isLoading />

// Responsive grid (handles loading state + auto-skeleton)
<CourseCardGrid
  courses={courses}
  isLoading={isLoading}
  skeletonCount={8}
  onEnroll={(course) => handleEnroll(course.id)}
  onCardClick={(course) => router.push(`/courses/${course.slug}`)}
/>

*/
