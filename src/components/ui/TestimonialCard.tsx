import Image from "next/image";

import { Rating } from "@/components/ui/Rating";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  /** Ordinal shown above the name — I., II., III., IV. in the design. */
  index: number;
  /**
   * Renders the filled state without waiting for a pointer. The artboard
   * draws the first column this way, so one card carries it from the start.
   */
  active?: boolean;
  className?: string;
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

/** The drawn filled state: solid ink, no stroke, quote at 60% bone. */
const FILLED = "border-transparent bg-ink text-bone/60";

/** The drawn outlined state. */
const OUTLINED = "border-ink/40 bg-transparent text-ink/60";

/**
 * Hands the filled state over to whichever card the pointer is on.
 *
 * Only one card should read as filled at a time. The card marked `active`
 * holds that state at rest, so it has to give it up the moment a *different*
 * card takes it — otherwise two cards are filled at once and the emphasis
 * stops meaning anything.
 *
 * The test is `[data-active=false]:hover`, not `:hover`, and that is what
 * keeps it simple: hovering the active card itself does not match, so its own
 * filled state is never fighting a revert rule for the same element. Matching
 * a bare `:hover` would, and `:has()` takes the specificity of its argument,
 * so the revert would win and the active card would blank out under the
 * pointer.
 */
const YIELD_ON_SIBLING_HOVER = [
  "group-has-[[data-active=false]:hover]/cards:border-ink/40",
  "group-has-[[data-active=false]:hover]/cards:bg-transparent",
  "group-has-[[data-active=false]:hover]/cards:text-ink/60",
].join(" ");

/**
 * A client testimonial.
 *
 * Two states, both drawn. The artboard gives the first card (`981:798`) a
 * solid `#000` fill and *no* stroke, and the other three (`981:773`, `781`,
 * `791`) no fill and a 0.6px 40%-black stroke — so the filled column is a
 * state the design commits to, not a hover demonstration. `active` renders it
 * from the start; every other card reaches it on hover.
 *
 * Card geometry from the artboard (319 x 405): padding 40 top and bottom,
 * 18 left, 17 right, expressed in `cqw` so it holds at any column width.
 */
export function TestimonialCard({
  testimonial,
  index,
  active = false,
  className,
}: TestimonialCardProps) {
  return (
    <figure
      data-active={active}
      className={cn("group flex h-full flex-col", className)}
    >
      {/* Ordinal, name and role measured off the artboard: 18 / 22 / 14px. */}
      <p className="font-display text-[clamp(0.75rem,0.9375vw,1.125rem)] text-ink/70">
        {ROMAN[index] ?? index + 1}.
      </p>

      <figcaption className="mt-[2.3cqw] lg:mt-[7.5%]">
        <p className="font-display text-[clamp(1.0625rem,1.146vw,1.375rem)] leading-[1.15] text-ink">
          {testimonial.author}
        </p>
        <p className="mt-1.5 font-sans text-[clamp(0.75rem,0.729vw,0.875rem)] font-light text-ink/70">
          {testimonial.role}
        </p>
      </figcaption>

      <blockquote
        className={cn(
          "@container mt-6 flex flex-1 flex-col justify-between gap-8 lg:mt-[7.8%] lg:min-h-[21.09vw]",
          "border-[0.6px] transition-colors duration-300 ease-(--ease-editorial)",
          active
            ? cn(FILLED, YIELD_ON_SIBLING_HOVER)
            : cn(
                OUTLINED,
                "group-hover:border-transparent group-hover:bg-ink group-hover:text-bone/60",
              ),
          "pt-[clamp(1.25rem,12.54cqw,2.5rem)] pb-[clamp(1.25rem,12.54cqw,2.5rem)]",
          "pl-[clamp(1rem,5.64cqw,1.125rem)] pr-[clamp(1rem,5.33cqw,1.0625rem)]",
        )}
      >
        {/* 20px at leading 1.3 on the 319px card = 6.27cqw. */}
        <p className="font-prose text-[clamp(0.875rem,6.27cqw,1.25rem)] leading-[1.3]">
          {testimonial.quote}
        </p>

        <div className="flex items-center gap-3">
          <Image
            src="/icons/social/google.png"
            alt="Google review"
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />
          <span
            aria-hidden="true"
            className={cn(
              "h-4 w-px transition-colors",
              active
                ? "bg-bone/30 group-has-[[data-active=false]:hover]/cards:bg-ink/25"
                : "bg-ink/25 group-hover:bg-bone/30",
            )}
          />
          <Rating
            value={testimonial.rating}
            className={cn(
              "transition-colors",
              active
                ? "text-[#FBBD00] group-has-[[data-active=false]:hover]/cards:text-ink"
                : "text-ink group-hover:text-[#FBBD00]",
            )}
          />
        </div>
      </blockquote>
    </figure>
  );
}
