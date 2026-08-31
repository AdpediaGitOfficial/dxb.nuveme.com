import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { OffPlanCard } from "@/components/off-plan/OffPlanCard";
import { Pagination } from "@/components/ui/Pagination";
import { OFF_PLAN_PER_PAGE, listings, sortOptions } from "@/content/off-plan";
import type { SortValue } from "@/content/off-plan";
import { cn } from "@/lib/utils";
import type { Property } from "@/types";

export const LISTINGS_ANCHOR = "off-plan-listings";

/**
 * "Exclusive Off-Plan Developments" — the listing grid on a dark panel.
 *
 * Two columns of 854 × 809 cards on a 17 gutter, with the drawn sort control
 * at the right of the heading row.
 *
 * Sort is a `<details>` disclosure holding three links rather than a
 * `<select>`: a select needs JavaScript to submit on change, and a bare GET
 * form would need a separate Apply button the artboard does not draw. Links
 * keep every sort order a real, shareable URL (DESIGN-SYSTEM.md §9).
 */
export function OffPlanListings({
  properties,
  page,
  sort,
}: {
  properties: Property[];
  page: number;
  sort: SortValue;
}) {
  const pageCount = Math.max(
    1,
    Math.ceil(properties.length / OFF_PLAN_PER_PAGE),
  );
  const current = Math.min(Math.max(page, 1), pageCount);
  const visible = properties.slice(
    (current - 1) * OFF_PLAN_PER_PAGE,
    current * OFF_PLAN_PER_PAGE,
  );

  const url = (next: { page?: number; sort?: SortValue }) => {
    const params = new URLSearchParams();
    const nextSort = next.sort ?? sort;
    const nextPage = next.page ?? current;
    if (nextSort !== "newest") params.set("sort", nextSort);
    if (nextPage > 1) params.set("page", String(nextPage));
    const query = params.toString();
    return `/off-plan${query ? `?${query}` : ""}#${LISTINGS_ANCHOR}`;
  };

  const currentLabel =
    sortOptions.find((option) => option.value === sort)?.label ??
    "Newest First";

  return (
    <section
      id={LISTINGS_ANCHOR}
      aria-labelledby="listings-title"
      className="panel py-14 sm:py-16 lg:pb-[5.208vw] lg:pt-[6.56vw]"
    >
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div>
            <p className="eyebrow">{listings.eyebrow}</p>
            <h2
              id="listings-title"
              className="display-2 text-balance-title mt-6 lg:mt-[2.24vw] lg:max-w-[35.78vw]"
            >
              {listings.title}
            </h2>
          </div>

          <div className="flex items-center gap-4 lg:gap-[1.667vw]">
            <span className="font-sans font-light text-bone lg:text-[clamp(0.875rem,1.042vw,1.25rem)]">
              Sort
            </span>

            <details className="relative">
              <summary
                className={cn(
                  "flex h-14 w-56 cursor-pointer list-none items-center justify-between px-5",
                  "glass-pane font-sans font-light text-bone hover:bg-white/[0.06]",
                  "transition-colors duration-300 ease-(--ease-editorial)",
                  "[&::-webkit-details-marker]:hidden",
                  "lg:h-[4.427vw] lg:w-[12.76vw] lg:px-[1.25vw] lg:text-[clamp(0.875rem,1.042vw,1.25rem)]",
                )}
              >
                {currentLabel}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="h-3 w-3 shrink-0"
                >
                  <path
                    d="M2 4.5 6 8.5 10 4.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              </summary>

              <ul className="absolute right-0 z-20 mt-1 w-56 border-[0.4px] border-white/30 bg-ink lg:w-[12.76vw]">
                {sortOptions.map((option) => (
                  <li key={option.value}>
                    <Link
                      href={url({ sort: option.value, page: 1 })}
                      aria-current={option.value === sort ? "true" : undefined}
                      className={cn(
                        "block px-5 py-3 font-sans font-light transition-colors lg:px-[1.25vw]",
                        "lg:text-[clamp(0.8125rem,0.938vw,1.125rem)]",
                        option.value === sort
                          ? "bg-surface text-bone"
                          : "text-bone/70 hover:bg-surface hover:text-bone",
                      )}
                    >
                      {option.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </div>

        <ul className="mt-12 grid gap-6 lg:mt-[3.021vw] lg:grid-cols-2 lg:gap-[0.885vw]">
          {visible.map((property, index) => (
            <li key={property.slug}>
              <OffPlanCard property={property} priority={index < 2} />
            </li>
          ))}
        </ul>

        <Pagination
          current={current}
          pageCount={pageCount}
          href={(next) => url({ page: next })}
          label="Off-plan pagination"
          className="mt-10 lg:mt-[4.635vw]"
        />
      </Container>
    </section>
  );
}
