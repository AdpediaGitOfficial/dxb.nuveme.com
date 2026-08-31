import { CountUp } from "@/components/ui/CountUp";
import { stats } from "@/content/stats";
import { cn } from "@/lib/utils";

/**
 * The 2×2 figures panel from the About section.
 *
 * Every dimension in the 2×2 layout is expressed in `cqw` against the panel
 * itself, which is a container. That reproduces the Figma frame's internal
 * proportions at any panel width instead of only at the 1920px artboard —
 * ratios taken from the source (panel 655 × 681):
 *
 *   label 20px → 3.05cqw       body 19px → 2.9cqw
 *   left inset 43px → 6.56cqw  right column +86.5px → 13.2cqw
 *   top inset 66px → 9.3cqw    bottom inset 64px → 8.85cqw
 *   body measure 204px → 31.15cqw
 *
 * The figure is the one exception: the design sets it at 36px in Saol Display
 * (5.5cqw), but the Playfair fallback has a noticeably larger cap height, so
 * 36px there renders ~23% taller than the artboard. It is set to 4.9cqw to
 * match the drawn size optically. Restore 5.5cqw alongside the licensed Saol
 * WOFF2 — the two changes belong together.
 *
 * Type sizes are clamped so the panel stays readable when it goes full-width
 * between `sm` and `lg`, where it is wider than the design ever intended.
 *
 * Other geometry carried over from the frame:
 *   • the panel is very slightly taller than it is wide (655/681);
 *   • the divider is the exported 483 × 483 crosshair element, whose rules
 *     fade out at both ends — not full-bleed grid gaps;
 *   • the top row hangs from the top of its cells and the bottom row sits on
 *     the bottom, leaving the open middle band the crosshair runs through.
 *
 * Below `sm` the crosshair is dropped and the four figures stack, since a 2×2
 * grid of three-line descriptions is unreadable at phone widths.
 */
export function StatsPanel() {
  return (
    <div className="@container relative bg-surface">
      {/*
        The crosshair is the exported design element: a 483 × 483 square whose
        two hairlines fade to transparent at both ends. It is centred on the
        panel horizontally and sits at 46.3% vertically, matching the source.
        Decorative, so it is a background image and stays out of the a11y tree.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[46.3%] hidden aspect-square w-[73.7%] -translate-x-1/2 -translate-y-1/2 bg-contain bg-center bg-no-repeat sm:block"
        style={{ backgroundImage: "url(/icons/ui/crosshair.svg)" }}
      />

      <dl className="relative divide-y divide-hairline sm:grid sm:aspect-[655/681] sm:grid-cols-2 sm:grid-rows-2 sm:divide-y-0">
        {stats.map((stat, index) => {
          const isTopRow = index < 2;
          const isLeftColumn = index % 2 === 0;

          return (
            <div
              key={stat.id}
              className={cn(
                "flex flex-col px-7 py-9 sm:px-0 sm:py-0",
                // Top row hangs from the top; bottom row sits on the floor.
                isTopRow
                  ? "sm:justify-start sm:pt-[9.3cqw]"
                  : "sm:justify-end sm:pb-[8.85cqw]",
                isLeftColumn
                  ? "sm:pl-[6.56cqw] sm:pr-[5cqw]"
                  : "sm:pl-[13.21cqw] sm:pr-[3cqw]",
              )}
            >
              {/* The figure sets the em basis so the raised "+" tracks it. */}
              <dd className="flex items-start font-display leading-none text-[1.75rem] sm:text-[clamp(1.5rem,4.9cqw,2.625rem)]">
                {/*
                  The figure counts up on first view, so the visible number is
                  decorative and the whole reading — figure and raised "+"
                  together — is carried here as one string. Otherwise a screen
                  reader announces a number mid-count, and the "+" not at all.
                */}
                <span className="sr-only">
                  {stat.value}
                  {stat.suffix}
                </span>
                <CountUp value={stat.value} />
                {stat.suffix && (
                  <span
                    aria-hidden="true"
                    className="ml-[0.12em] -translate-y-1/2 text-[1.11em]"
                  >
                    {stat.suffix}
                  </span>
                )}
              </dd>

              <dt className="mt-4 font-sans text-base text-bone-strong sm:mt-[2.1cqw] sm:text-[clamp(0.9375rem,3.05cqw,1.5rem)]">
                {stat.label}
              </dt>
              <p className="mt-3 max-w-[24ch] font-sans text-sm leading-[1.25] text-bone-subtle sm:mt-[0.92cqw] sm:max-w-[31.15cqw] sm:text-[clamp(0.8125rem,2.9cqw,1.375rem)]">
                {stat.description}
              </p>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
