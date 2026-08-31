import { cn } from "@/lib/utils";

interface RatingProps {
  value: 1 | 2 | 3 | 4 | 5;
  className?: string;
}

/**
 * A five-point rating rendered as a single labelled group rather than five
 * separate images, so screen readers announce "Rated 4 out of 5" once.
 *
 * The stars take `currentColor`, so the surface decides: ink on the outlined
 * testimonial card, gold once it inverts on hover.
 */
export function Rating({ value, className }: RatingProps) {
  return (
    <div
      role="img"
      aria-label={`Rated ${value} out of 5`}
      className={cn("flex items-center gap-1", className)}
    >
      {Array.from({ length: value }, (_, index) => (
        <svg key={index} viewBox="0 0 17 17" aria-hidden="true" className="h-3.5 w-3.5">
          <path
            fill="currentColor"
            d="M8.5 0l2.598 5.214 5.486 1.005-3.88 4.227.792 5.835L8.5 13.68l-4.996 2.601.792-5.835-3.88-4.227L5.902 5.214 8.5 0Z"
          />
        </svg>
      ))}
    </div>
  );
}
