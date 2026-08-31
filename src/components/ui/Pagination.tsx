import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * The numbered pager drawn on the About and Careers artboards: a 62 × 70
 * chevron box either side of an 01…04 run on a 78 pitch, the whole group
 * centred on the content column.
 *
 * It is built from links rather than state so every page is its own crawlable
 * URL (DESIGN-SYSTEM.md §9). `href` is a function of the page number so each
 * caller keeps its own query-string shape.
 *
 * Everything is drawn in `currentColor`: the About and Careers artboards put
 * this on a black panel at 80%/60% white, the blog artboard puts the same
 * object on paper at 80%/60% ink. Colouring it `bone` would have made it
 * invisible on the third one.
 */
export function Pagination({
  current,
  pageCount,
  href,
  label,
  className,
}: {
  current: number;
  pageCount: number;
  href: (page: number) => string;
  label: string;
  className?: string;
}) {
  if (pageCount < 2) return null;

  return (
    <nav
      aria-label={label}
      className={cn("flex items-center justify-center gap-[2.97vw]", className)}
    >
      <PageStep
        direction="previous"
        href={href(current - 1)}
        disabled={current === 1}
      />

      <ol className="flex items-center gap-[3.02vw]">
        {Array.from({ length: pageCount }, (_, index) => index + 1).map(
          (number) => {
            const active = number === current;

            return (
              <li key={number}>
                <Link
                  href={href(number)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "font-sans font-light text-sm transition-opacity duration-300",
                    "lg:text-[clamp(0.75rem,0.938vw,1.125rem)]",
                    active ? "opacity-100" : "opacity-50 hover:opacity-100",
                  )}
                >
                  {String(number).padStart(2, "0")}
                </Link>
              </li>
            );
          },
        )}
      </ol>

      <PageStep
        direction="next"
        href={href(current + 1)}
        disabled={current === pageCount}
      />
    </nav>
  );
}

function PageStep({
  direction,
  href,
  disabled,
}: {
  direction: "previous" | "next";
  href: string;
  disabled: boolean;
}) {
  // 80% for a live step, 60% for a dead one — the two weights the artboards
  // draw. No hover fill: none of them draw one, and a bone fill would vanish
  // on the blog's paper ground.
  const classes = cn(
    "inline-flex h-14 w-12 items-center justify-center border-[0.6px] border-current backdrop-blur-[15px]",
    "lg:h-[3.646vw] lg:w-[3.229vw]",
    disabled
      ? "pointer-events-none opacity-60"
      : "opacity-80 transition-opacity duration-300 hover:opacity-100",
  );

  const chevron = (
    <svg
      aria-hidden="true"
      viewBox="0 0 18 18"
      fill="none"
      className={cn(
        "h-[1.125rem] w-[1.125rem]",
        direction === "previous" && "rotate-180",
      )}
    >
      <path
        d="M6.5 2.5 13 9l-6.5 6.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
    </svg>
  );

  const body = (
    <>
      <span className="sr-only">
        {direction === "previous" ? "Previous page" : "Next page"}
      </span>
      {chevron}
    </>
  );

  if (disabled) {
    return (
      <span aria-disabled="true" className={classes}>
        {body}
      </span>
    );
  }

  return (
    <Link href={href} className={classes} rel={direction}>
      {body}
    </Link>
  );
}
